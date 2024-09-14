import { PDFDocument } from 'pdf-lib';
import UTIF from 'utif';
import { RedactFile } from './types';

const createBlobFromArrayBuffer = async (
  idf: UTIF.IFD,
  fileBytyes: ArrayBuffer,
  canvas: OffscreenCanvas
) => {
  UTIF.decodeImage(fileBytyes, idf);

  const rgba = UTIF.toRGBA8(idf); // Convert current TIFF frame to RGBA

  const width = idf.width;
  const height = idf.height;

  // Create a canvas to draw the image and convert to PNG
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const imgData = new ImageData(new Uint8ClampedArray(rgba), width, height);

  ctx?.putImageData(imgData, 0, 0);

  // Convert canvas to PNG blob. The default type is 'image/png'
  const imgBlob = await canvas.convertToBlob();

  return { imgBlob, width, height, imgData };
};

const processTiffImages = async (
  fileBytyes: ArrayBuffer,
  pdfDoc: PDFDocument,
  canvas: OffscreenCanvas
) => {
  let processingResult = false;

  const ifds = UTIF.decode(fileBytyes);

  for (const ifd of ifds) {
    const { imgBlob, width, height } = await createBlobFromArrayBuffer(
      ifd,
      fileBytyes,
      canvas
    );

    if (imgBlob) {
      // Embed the PNG image in the PDF
      const image = await pdfDoc.embedPng(await imgBlob.arrayBuffer());

      const page = pdfDoc.addPage([width, height]);

      const { width: pageWidth, height: pageHeight } = page.getSize();

      let imageWidth = image.width;
      let imageHeight = image.height;

      // Calculate the scale factor to fit the image inside the page dimensions
      const imgScaleFactor = Math.min(
        pageWidth / imageWidth,
        pageHeight / imageHeight
      );

      imageWidth *= imgScaleFactor;
      imageHeight *= imgScaleFactor;

      page.drawImage(image, {
        x: pageWidth / 2 - imageWidth / 2,
        y: pageHeight / 2 - imageHeight / 2,
        width: imageWidth,
        height: imageHeight,
      });
      processingResult = true;
    }
  }

  return processingResult;
};

const processOtherSupportedImages = async (
  fileBytyes: ArrayBuffer,
  pdfDoc: PDFDocument,
  fileType: string
) => {
  let image;
  let processingResult = false;
  switch (fileType) {
    case 'image/png':
      image = await pdfDoc.embedPng(fileBytyes);
      break;
    case 'image/jpeg':
    case 'image/jpg':
      image = await pdfDoc.embedJpg(fileBytyes);
      break;
    default:
      console.error('Unsupported image type');
      break;
  }

  if (!image) {
    processingResult = false;
  } else {
    const page = pdfDoc.addPage();
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();
    let imgWidth = image.width;
    let imgHeight = image.height;
    // Calculate the scale factor to fit the image inside the page dimensions
    const scaleFactor = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
    imgWidth *= scaleFactor;
    imgHeight *= scaleFactor;

    page.drawImage(image, {
      x: pageWidth / 2 - imgWidth / 2,
      y: pageHeight / 2 - imgHeight / 2,
      width: imgWidth,
      height: imgHeight,
    });
    processingResult = true;
  }

  return processingResult;
};

export const processUploadedFile = async (
  file: File,
  uniqueId: string,
  canvas: OffscreenCanvas
): Promise<{
  uploadedFile: RedactFile;
  blobUrl: string;
  errorMessage?: string;
  error?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}> => {
  const emptyResponse = {
    uploadedFile: {
      originalFile: file,

      totalPages: 0,
      id: uniqueId,
    },
    blobUrl: '',
    errorMessage: 'Error processing file',
  };
  try {
    const fileBytyes = await file.arrayBuffer();
    const fileType = file.type;

    if (fileType === 'application/pdf') {
      // Load a PDFDocument from the ArrayBuffer
      const pdfDoc = await PDFDocument.load(fileBytyes);

      // Create a blob from the bytes
      const blob = new Blob([fileBytyes], {
        type: 'application/pdf',
      });

      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(blob);

      return {
        uploadedFile: {
          originalFile: file,
          totalPages: pdfDoc.getPageCount(),
          id: uniqueId,
        },
        blobUrl,
      };
    } else if (fileType.startsWith('image/')) {
      const pdfDocWithImg = await PDFDocument.create();

      let processingResult = false;
      if (fileType === 'image/tiff' || fileType === 'image/tif') {
        processingResult = await processTiffImages(
          fileBytyes,
          pdfDocWithImg,
          canvas
        );
      } else {
        processingResult = await processOtherSupportedImages(
          fileBytyes,
          pdfDocWithImg,
          fileType
        );
      }

      if (processingResult) {
        // const startTime = performance.now();

        // This process can be slow for large files. TODO: Optimize
        const pdfBytes = await pdfDocWithImg.save();
        // const endTime = performance.now();
        // const timeTaken = endTime - (startTime ?? endTime); // Calculate time difference
        // console.log(
        //   `File saving took ${(timeTaken / 1000).toFixed(2)} seconds.`,
        // );

        const imgBlob = new Blob([pdfBytes], {
          type: 'application/pdf',
        });
        const pdfFile = new File([imgBlob], `${file.name}.pdf`, {
          type: 'application/pdf',
        });

        const imgBlobUrl = URL.createObjectURL(imgBlob);

        return {
          uploadedFile: {
            originalFile: pdfFile,

            totalPages: pdfDocWithImg.getPageCount(),
            id: uniqueId,
          },
          blobUrl: imgBlobUrl,
        };
      }
    }
    return emptyResponse;
  } catch (error) {
    return { ...emptyResponse, error };
  }
};

export const mergePDFs = async (
  files: File[]
): Promise<{ blobUrl: string; errorMessage?: string }> => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    return { blobUrl };
  } catch (error) {
    return { blobUrl: '', errorMessage: 'Error merging files' };
  }
};
