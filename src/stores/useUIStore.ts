import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  toolPanelOpen: boolean;
  zoom: number;
  scrollToPageId: string | null;
  commandPaletteOpen: boolean;
  confirmDialog: {
    open: boolean;
    title: string;
    message: string;
    onConfirm: (() => void) | null;
  };

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleToolPanel: () => void;
  setToolPanelOpen: (open: boolean) => void;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setScrollToPageId: (pageId: string | null) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  showConfirmDialog: (title: string, message: string, onConfirm: () => void) => void;
  closeConfirmDialog: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: true,
  toolPanelOpen: false,
  zoom: 100,
  scrollToPageId: null,
  commandPaletteOpen: false,
  confirmDialog: {
    open: false,
    title: '',
    message: '',
    onConfirm: null,
  },

  toggleSidebar: () => set((s) => {
    const next = !s.sidebarOpen;
    // On small screens, close the other panel when opening one
    if (next && window.innerWidth < 768) return { sidebarOpen: true, toolPanelOpen: false };
    return { sidebarOpen: next };
  }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleToolPanel: () => set((s) => {
    const next = !s.toolPanelOpen;
    if (next && window.innerWidth < 768) return { toolPanelOpen: true, sidebarOpen: false };
    return { toolPanelOpen: next };
  }),
  setToolPanelOpen: (open) => set({ toolPanelOpen: open }),

  setZoom: (zoom) => set({ zoom: Math.min(400, Math.max(25, zoom)) }),
  zoomIn: () =>
    set((s) => ({ zoom: Math.min(400, s.zoom + 25) })),
  zoomOut: () =>
    set((s) => ({ zoom: Math.max(25, s.zoom - 25) })),
  resetZoom: () => set({ zoom: 100 }),

  setScrollToPageId: (pageId) => set({ scrollToPageId: pageId }),
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),

  showConfirmDialog: (title, message, onConfirm) =>
    set({
      confirmDialog: { open: true, title, message, onConfirm },
    }),
  closeConfirmDialog: () =>
    set({
      confirmDialog: { open: false, title: '', message: '', onConfirm: null },
    }),
}));
