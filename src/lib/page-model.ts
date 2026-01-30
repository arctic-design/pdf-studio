import { PdfPage, PageRotation } from '../types';

export function createPage(
  id: string,
  sourceFileId: string,
  sourcePageIndex: number,
  width: number,
  height: number
): PdfPage {
  return {
    id,
    sourceFileId,
    sourcePageIndex,
    rotation: 0,
    width,
    height,
    thumbnailDataUrl: null,
    thumbnailDirty: true,
  };
}

export function rotatePage(page: PdfPage, degrees: 90 | -90 | 180): PdfPage {
  const newRotation = (((page.rotation + degrees) % 360) + 360) % 360;
  return {
    ...page,
    rotation: newRotation as PageRotation,
    thumbnailDirty: true,
  };
}

export function duplicatePage(page: PdfPage, newId: string): PdfPage {
  return {
    ...page,
    id: newId,
    thumbnailDataUrl: page.thumbnailDataUrl,
    thumbnailDirty: false,
  };
}

export function getEffectiveDimensions(page: PdfPage): {
  width: number;
  height: number;
} {
  if (page.rotation === 90 || page.rotation === 270) {
    return { width: page.height, height: page.width };
  }
  return { width: page.width, height: page.height };
}
