/// <reference lib="webworker" />
import { PDFDocument, degrees } from 'pdf-lib';

interface MergeRequest {
  type: 'merge';
  files: Array<{
    bytes: ArrayBuffer;
    pageIndices: number[];
    rotations: number[];
  }>;
}

self.onmessage = async (e: MessageEvent) => {
  const request = e.data as MergeRequest;

  try {
    if (request.type === 'merge') {
      const mergedPdf = await PDFDocument.create();

      for (const file of request.files) {
        const pdfDoc = await PDFDocument.load(file.bytes);

        for (let i = 0; i < file.pageIndices.length; i++) {
          const pageIndex = file.pageIndices[i];
          const rotation = file.rotations[i];

          const [copiedPage] = await mergedPdf.copyPages(pdfDoc, [pageIndex]);
          if (rotation !== 0) {
            copiedPage.setRotation(degrees(rotation));
          }
          mergedPdf.addPage(copiedPage);
        }
      }

      const mergedBytes = await mergedPdf.save();
      postMessage({ success: true, pdfBytes: mergedBytes.buffer });
    }
  } catch (error) {
    postMessage({
      success: false,
      error: error instanceof Error ? error.message : 'Operation failed',
    });
  }
};
