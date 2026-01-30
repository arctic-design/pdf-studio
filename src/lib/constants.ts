export const ZOOM_LEVELS = [25, 50, 75, 100, 125, 150, 200, 300, 400] as const;
export const DEFAULT_ZOOM = 100;
export const MIN_ZOOM = 25;
export const MAX_ZOOM = 400;
export const ZOOM_STEP = 25;

export const THUMBNAIL_SCALE = 0.3;
export const THUMBNAIL_MAX_WIDTH = 180;

export const MAX_CANVAS_POOL_SIZE = 15;
export const VIRTUAL_SCROLL_OVERSCAN = 2;

export const SUPPORTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/tiff',
  'image/tif',
] as const;

export const ACCEPTED_FILE_INPUT =
  'application/pdf,image/jpeg,image/png,image/tiff,image/x-tiff';

export const PAGE_GAP = 16;

export const DEFAULT_WATERMARK_CONFIG = {
  text: 'CONFIDENTIAL',
  fontSize: 48,
  opacity: 0.3,
  rotation: -45,
  color: '#888888',
  position: 'center' as const,
};

export const DEFAULT_PAGE_NUMBER_CONFIG = {
  enabled: false,
  position: 'bottom-center' as const,
  format: 'numeric' as const,
  startNumber: 1,
  prefix: '',
  suffix: '',
  fontSize: 12,
};
