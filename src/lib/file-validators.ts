import { SUPPORTED_FILE_TYPES } from './constants';

export function isValidFileType(file: File): boolean {
  return (SUPPORTED_FILE_TYPES as readonly string[]).includes(file.type);
}

export function isPdf(file: File): boolean {
  return file.type === 'application/pdf';
}

export function isImage(file: File): boolean {
  return file.type.startsWith('image/');
}

export function isTiff(file: File): boolean {
  return file.type === 'image/tiff' || file.type === 'image/tif';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function filterValidFiles(files: File[]): File[] {
  return files.filter(isValidFileType);
}
