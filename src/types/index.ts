export interface PdfPage {
  id: string;
  sourceFileId: string;
  sourcePageIndex: number;
  rotation: 0 | 90 | 180 | 270;
  width: number;
  height: number;
  thumbnailDataUrl: string | null;
  thumbnailDirty: boolean;
}

export interface SourceFile {
  id: string;
  originalFile: File;
  fileName: string;
  fileSize: number;
  pageCount: number;
  pdfBytes: ArrayBuffer;
}

export type ToolType =
  | 'document-info'
  | 'watermark'
  | 'page-numbers'
  | 'compress'
  | 'password'
  | 'export'
  | null;

export type PageRotation = 0 | 90 | 180 | 270;

export interface WatermarkConfig {
  text: string;
  fontSize: number;
  opacity: number;
  rotation: number;
  color: string;
  position: WatermarkPosition;
}

export type WatermarkPosition =
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center';

export interface PageNumberConfig {
  enabled: boolean;
  position: PageNumberPosition;
  format: PageNumberFormat;
  startNumber: number;
  prefix: string;
  suffix: string;
  fontSize: number;
}

export type PageNumberPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type PageNumberFormat = 'numeric' | 'roman' | 'alphabetic';

export interface CompressConfig {
  quality: number; // 0-100
  imageQuality: number; // 0-100
}

export interface PasswordConfig {
  userPassword: string;
  ownerPassword: string;
  permissions: {
    printing: boolean;
    copying: boolean;
    modifying: boolean;
  };
}

export interface ExportConfig {
  format: 'pdf' | 'png' | 'jpeg';
  quality: number;
  selectedPages: 'all' | 'selected' | 'range';
  pageRange: string;
}

export type HistoryAction =
  | { type: 'add-pages'; pages: PdfPage[] }
  | { type: 'remove-pages'; pageIds: string[] }
  | { type: 'reorder-pages'; fromIndices: number[]; toIndex: number }
  | { type: 'rotate-pages'; pageIds: string[]; rotation: PageRotation }
  | { type: 'duplicate-pages'; pageIds: string[] };

export interface HistoryEntry {
  action: HistoryAction;
  previousPages: PdfPage[];
  timestamp: number;
}
