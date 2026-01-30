import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { enableMapSet } from 'immer';
import type { PdfPage, SourceFile, ToolType, PageRotation, WatermarkConfig, PageNumberConfig } from '../types';
import { v4 as uuidv4 } from 'uuid';

enableMapSet();

interface DocumentState {
  pages: PdfPage[];
  sourceFiles: Map<string, SourceFile>;
  selectedPageIds: Set<string>;
  activePageId: string | null;
  activeTool: ToolType;
  watermarkConfig: WatermarkConfig | null;
  pageNumberConfig: PageNumberConfig | null;
  isProcessing: boolean;
  processingMessage: string;

  // Actions
  setWatermarkConfig: (config: WatermarkConfig | null) => void;
  setPageNumberConfig: (config: PageNumberConfig | null) => void;
  addSourceFile: (file: SourceFile) => void;
  addPages: (pages: PdfPage[]) => void;
  removePagesById: (pageIds: string[]) => void;
  reorderPages: (newOrder: PdfPage[]) => void;
  movePage: (fromIndex: number, toIndex: number) => void;
  rotatePages: (pageIds: string[], rotation: 90 | -90 | 180) => void;
  duplicatePages: (pageIds: string[]) => void;
  setSelection: (pageIds: Set<string>) => void;
  togglePageSelection: (pageId: string, multi?: boolean) => void;
  selectRange: (pageId: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  setActivePageId: (pageId: string | null) => void;
  setActiveTool: (tool: ToolType) => void;
  setProcessing: (isProcessing: boolean, message?: string) => void;
  updatePageThumbnail: (pageId: string, dataUrl: string) => void;
  getSourceFileBytes: (sourceFileId: string) => ArrayBuffer | undefined;
  reset: () => void;
}

export const useDocumentStore = create<DocumentState>()(
  immer((set, get) => ({
    pages: [],
    sourceFiles: new Map(),
    selectedPageIds: new Set(),
    activePageId: null,
    activeTool: null,
    watermarkConfig: null,
    pageNumberConfig: null,
    isProcessing: false,
    processingMessage: '',

    addSourceFile: (file) =>
      set((state) => {
        state.sourceFiles.set(file.id, file);
      }),

    addPages: (newPages) =>
      set((state) => {
        state.pages.push(...newPages);
        if (!state.activePageId && newPages.length > 0) {
          state.activePageId = newPages[0].id;
        }
        // Auto-select newly added pages
        for (const p of newPages) {
          state.selectedPageIds.add(p.id);
        }
      }),

    removePagesById: (pageIds) =>
      set((state) => {
        const idsToRemove = new Set(pageIds);
        state.pages = state.pages.filter((p) => !idsToRemove.has(p.id));
        for (const id of pageIds) {
          state.selectedPageIds.delete(id);
        }
        if (state.activePageId && idsToRemove.has(state.activePageId)) {
          state.activePageId = state.pages[0]?.id ?? null;
        }
      }),

    reorderPages: (newOrder) =>
      set((state) => {
        state.pages = newOrder;
      }),

    movePage: (fromIndex, toIndex) =>
      set((state) => {
        const [moved] = state.pages.splice(fromIndex, 1);
        state.pages.splice(toIndex, 0, moved);
      }),

    rotatePages: (pageIds, rotation) =>
      set((state) => {
        const idsSet = new Set(pageIds);
        for (const page of state.pages) {
          if (idsSet.has(page.id)) {
            page.rotation = (((page.rotation + rotation) % 360 + 360) % 360) as PageRotation;
            page.thumbnailDirty = true;
          }
        }
      }),

    duplicatePages: (pageIds) =>
      set((state) => {
        const idsSet = new Set(pageIds);
        const newPages: PdfPage[] = [];
        const insertions: Array<{ index: number; page: PdfPage }> = [];

        state.pages.forEach((page, idx) => {
          if (idsSet.has(page.id)) {
            const dup: PdfPage = {
              ...page,
              id: uuidv4(),
              thumbnailDirty: false,
            };
            insertions.push({ index: idx + 1, page: dup });
            newPages.push(dup);
          }
        });

        // Insert in reverse order so indices don't shift
        for (let i = insertions.length - 1; i >= 0; i--) {
          state.pages.splice(insertions[i].index, 0, insertions[i].page);
        }

        // Select the new duplicates
        state.selectedPageIds.clear();
        for (const p of newPages) {
          state.selectedPageIds.add(p.id);
        }
      }),

    setSelection: (pageIds) =>
      set((state) => {
        state.selectedPageIds = pageIds;
      }),

    togglePageSelection: (pageId, multi = false) =>
      set((state) => {
        if (multi) {
          if (state.selectedPageIds.has(pageId)) {
            state.selectedPageIds.delete(pageId);
          } else {
            state.selectedPageIds.add(pageId);
          }
        } else {
          state.selectedPageIds.clear();
          state.selectedPageIds.add(pageId);
        }
        state.activePageId = pageId;
      }),

    selectRange: (pageId) =>
      set((state) => {
        if (!state.activePageId) {
          state.selectedPageIds.clear();
          state.selectedPageIds.add(pageId);
          state.activePageId = pageId;
          return;
        }
        const activeIndex = state.pages.findIndex(
          (p) => p.id === state.activePageId
        );
        const targetIndex = state.pages.findIndex((p) => p.id === pageId);
        if (activeIndex === -1 || targetIndex === -1) return;

        const start = Math.min(activeIndex, targetIndex);
        const end = Math.max(activeIndex, targetIndex);

        state.selectedPageIds.clear();
        for (let i = start; i <= end; i++) {
          state.selectedPageIds.add(state.pages[i].id);
        }
      }),

    selectAll: () =>
      set((state) => {
        state.selectedPageIds.clear();
        for (const p of state.pages) {
          state.selectedPageIds.add(p.id);
        }
      }),

    clearSelection: () =>
      set((state) => {
        state.selectedPageIds.clear();
      }),

    setActivePageId: (pageId) =>
      set((state) => {
        state.activePageId = pageId;
      }),

    setActiveTool: (tool) =>
      set((state) => {
        state.activeTool = state.activeTool === tool ? null : tool;
      }),

    setWatermarkConfig: (config) =>
      set((state) => {
        state.watermarkConfig = config;
      }),

    setPageNumberConfig: (config) =>
      set((state) => {
        state.pageNumberConfig = config;
      }),

    setProcessing: (isProcessing, message = '') =>
      set((state) => {
        state.isProcessing = isProcessing;
        state.processingMessage = message;
      }),

    updatePageThumbnail: (pageId, dataUrl) =>
      set((state) => {
        const page = state.pages.find((p) => p.id === pageId);
        if (page) {
          page.thumbnailDataUrl = dataUrl;
          page.thumbnailDirty = false;
        }
      }),

    getSourceFileBytes: (sourceFileId) => {
      return get().sourceFiles.get(sourceFileId)?.pdfBytes;
    },

    reset: () =>
      set((state) => {
        state.pages = [];
        state.sourceFiles = new Map();
        state.selectedPageIds = new Set();
        state.activePageId = null;
        state.activeTool = null;
        state.watermarkConfig = null;
        state.pageNumberConfig = null;
        state.isProcessing = false;
        state.processingMessage = '';
      }),
  }))
);
