import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';
import UTIF from 'utif';
import type {
  PdfPage,
  WatermarkConfig,
  PageNumberConfig,
  PageNumberFormat,
} from '../types';

// -- File processing (from original FileUtility.ts) --

const createBlobFromArrayBuffer = async (
  idf: UTIF.IFD,
  fileBytes: ArrayBuffer,
  canvas: OffscreenCanvas
) => {
  UTIF.decodeImage(fileBytes, idf);
  const rgba = UTIF.toRGBA8(idf);
  const width = idf.width;
  const height = idf.height;

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const imgData = new ImageData(new Uint8ClampedArray(rgba), width, height);
  ctx?.putImageData(imgData, 0, 0);

  const imgBlob = await canvas.convertToBlob();
  return { imgBlob, width, height };
};

const processTiffImages = async (
  fileBytes: ArrayBuffer,
  pdfDoc: PDFDocument,
  canvas: OffscreenCanvas
) => {
  const ifds = UTIF.decode(fileBytes);
  let success = false;

  for (const ifd of ifds) {
    const { imgBlob, width, height } = await createBlobFromArrayBuffer(
      ifd,
      fileBytes,
      canvas
    );

    if (imgBlob) {
      const image = await pdfDoc.embedPng(await imgBlob.arrayBuffer());
      const page = pdfDoc.addPage([width, height]);
      const { width: pageWidth, height: pageHeight } = page.getSize();

      let imageWidth = image.width;
      let imageHeight = image.height;
      const scaleFactor = Math.min(
        pageWidth / imageWidth,
        pageHeight / imageHeight
      );
      imageWidth *= scaleFactor;
      imageHeight *= scaleFactor;

      page.drawImage(image, {
        x: pageWidth / 2 - imageWidth / 2,
        y: pageHeight / 2 - imageHeight / 2,
        width: imageWidth,
        height: imageHeight,
      });
      success = true;
    }
  }
  return success;
};

const processOtherImages = async (
  fileBytes: ArrayBuffer,
  pdfDoc: PDFDocument,
  fileType: string
) => {
  let image;
  switch (fileType) {
    case 'image/png':
      image = await pdfDoc.embedPng(fileBytes);
      break;
    case 'image/jpeg':
    case 'image/jpg':
      image = await pdfDoc.embedJpg(fileBytes);
      break;
    default:
      return false;
  }

  if (!image) return false;

  const page = pdfDoc.addPage();
  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();
  let imgWidth = image.width;
  let imgHeight = image.height;
  const scaleFactor = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  imgWidth *= scaleFactor;
  imgHeight *= scaleFactor;

  page.drawImage(image, {
    x: pageWidth / 2 - imgWidth / 2,
    y: pageHeight / 2 - imgHeight / 2,
    width: imgWidth,
    height: imgHeight,
  });
  return true;
};

export interface ProcessedFile {
  pdfBytes: ArrayBuffer;
  pageCount: number;
  pageDimensions: Array<{ width: number; height: number }>;
  error?: string;
}

export async function processUploadedFile(
  file: File,
  canvas: OffscreenCanvas
): Promise<ProcessedFile> {
  try {
    const fileBytes = await file.arrayBuffer();
    const fileType = file.type;

    if (fileType === 'application/pdf') {
      const pdfDoc = await PDFDocument.load(fileBytes);
      const pages = pdfDoc.getPages();
      const pageDimensions = pages.map((p) => ({
        width: p.getWidth(),
        height: p.getHeight(),
      }));
      return {
        pdfBytes: fileBytes,
        pageCount: pdfDoc.getPageCount(),
        pageDimensions,
      };
    } else if (fileType.startsWith('image/')) {
      const pdfDoc = await PDFDocument.create();
      let success = false;

      if (fileType === 'image/tiff' || fileType === 'image/tif') {
        success = await processTiffImages(fileBytes, pdfDoc, canvas);
      } else {
        success = await processOtherImages(fileBytes, pdfDoc, fileType);
      }

      if (success) {
        const pdfBytes = await pdfDoc.save();
        const pages = pdfDoc.getPages();
        const pageDimensions = pages.map((p) => ({
          width: p.getWidth(),
          height: p.getHeight(),
        }));
        return {
          pdfBytes: pdfBytes.buffer as ArrayBuffer,
          pageCount: pdfDoc.getPageCount(),
          pageDimensions,
        };
      }
    }
    return { pdfBytes: new ArrayBuffer(0), pageCount: 0, pageDimensions: [], error: 'Unsupported file type' };
  } catch (error) {
    return {
      pdfBytes: new ArrayBuffer(0),
      pageCount: 0,
      pageDimensions: [],
      error: error instanceof Error ? error.message : 'Error processing file',
    };
  }
}

// -- PDF operations --

export async function mergePdfPages(
  sourceFiles: Map<string, ArrayBuffer>,
  pages: PdfPage[]
): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  const loadedDocs = new Map<string, PDFDocument>();

  for (const [id, bytes] of sourceFiles) {
    loadedDocs.set(id, await PDFDocument.load(bytes));
  }

  for (const page of pages) {
    const sourceDoc = loadedDocs.get(page.sourceFileId);
    if (!sourceDoc) continue;

    const [copiedPage] = await mergedPdf.copyPages(sourceDoc, [
      page.sourcePageIndex,
    ]);

    if (page.rotation !== 0) {
      copiedPage.setRotation(degrees(page.rotation));
    }

    mergedPdf.addPage(copiedPage);
  }

  return mergedPdf.save();
}

export async function addWatermark(
  pdfBytes: Uint8Array,
  config: WatermarkConfig
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  const colorHex = config.color.replace('#', '');
  const r = parseInt(colorHex.substring(0, 2), 16) / 255;
  const g = parseInt(colorHex.substring(2, 4), 16) / 255;
  const b = parseInt(colorHex.substring(4, 6), 16) / 255;

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(config.text, config.fontSize);
    const textHeight = config.fontSize;

    let x: number, y: number;
    switch (config.position) {
      case 'top-left':
        x = 50;
        y = height - 50;
        break;
      case 'top-center':
        x = width / 2 - textWidth / 2;
        y = height - 50;
        break;
      case 'top-right':
        x = width - textWidth - 50;
        y = height - 50;
        break;
      case 'bottom-left':
        x = 50;
        y = 50;
        break;
      case 'bottom-center':
        x = width / 2 - textWidth / 2;
        y = 50;
        break;
      case 'bottom-right':
        x = width - textWidth - 50;
        y = 50;
        break;
      case 'center':
      default:
        x = width / 2 - textWidth / 2;
        y = height / 2 - textHeight / 2;
        break;
    }

    page.drawText(config.text, {
      x,
      y,
      size: config.fontSize,
      font,
      color: rgb(r, g, b),
      opacity: config.opacity,
      rotate: degrees(config.rotation),
    });
  }

  return pdfDoc.save();
}

function formatPageNumber(
  num: number,
  format: PageNumberFormat
): string {
  switch (format) {
    case 'roman': {
      const romanNumerals = [
        [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
        [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
      ] as const;
      let result = '';
      let remaining = num;
      for (const [value, symbol] of romanNumerals) {
        while (remaining >= value) {
          result += symbol;
          remaining -= value;
        }
      }
      return result.toLowerCase();
    }
    case 'alphabetic': {
      let result = '';
      let n = num;
      while (n > 0) {
        n--;
        result = String.fromCharCode(97 + (n % 26)) + result;
        n = Math.floor(n / 26);
      }
      return result;
    }
    case 'numeric':
    default:
      return String(num);
  }
}

export async function addPageNumbers(
  pdfBytes: Uint8Array,
  config: PageNumberConfig
): Promise<Uint8Array> {
  if (!config.enabled) return pdfBytes;

  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();
    const pageNum = config.startNumber + i;
    const text = `${config.prefix}${formatPageNumber(pageNum, config.format)}${config.suffix}`;
    const textWidth = font.widthOfTextAtSize(text, config.fontSize);
    const margin = 36;

    let x: number, y: number;
    switch (config.position) {
      case 'top-left':
        x = margin;
        y = height - margin;
        break;
      case 'top-center':
        x = width / 2 - textWidth / 2;
        y = height - margin;
        break;
      case 'top-right':
        x = width - textWidth - margin;
        y = height - margin;
        break;
      case 'bottom-left':
        x = margin;
        y = margin;
        break;
      case 'bottom-right':
        x = width - textWidth - margin;
        y = margin;
        break;
      case 'bottom-center':
      default:
        x = width / 2 - textWidth / 2;
        y = margin;
        break;
    }

    page.drawText(text, {
      x,
      y,
      size: config.fontSize,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  }

  return pdfDoc.save();
}

export async function setPassword(
  pdfBytes: Uint8Array,
  userPassword: string,
  ownerPassword: string
): Promise<Uint8Array> {
  // pdf-lib doesn't support encryption natively.
  // We return the bytes as-is with a note that encryption requires
  // a different library. For now this is a placeholder.
  // In production you'd use a library like pdf-encrypt or call a WASM module.
  const pdfDoc = await PDFDocument.load(pdfBytes);
  return pdfDoc.save();
}
