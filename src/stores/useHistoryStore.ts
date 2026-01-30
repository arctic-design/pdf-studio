import { create } from 'zustand';
import type { PdfPage } from '../types';

interface HistoryEntry {
  pages: PdfPage[];
  timestamp: number;
}

interface HistoryState {
  past: HistoryEntry[];
  future: HistoryEntry[];
  maxHistory: number;

  pushState: (pages: PdfPage[]) => void;
  undo: () => PdfPage[] | null;
  redo: () => PdfPage[] | null;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clear: () => void;
}

export const useHistoryStore = create<HistoryState>()((set, get) => ({
  past: [],
  future: [],
  maxHistory: 50,

  pushState: (pages) =>
    set((state) => {
      const entry: HistoryEntry = {
        pages: pages.map((p) => ({ ...p })),
        timestamp: Date.now(),
      };
      const newPast = [...state.past, entry];
      if (newPast.length > state.maxHistory) {
        newPast.shift();
      }
      return { past: newPast, future: [] };
    }),

  undo: () => {
    const state = get();
    if (state.past.length === 0) return null;

    const previous = state.past[state.past.length - 1];
    set({
      past: state.past.slice(0, -1),
      future: [...state.future],
    });
    return previous.pages;
  },

  redo: () => {
    const state = get();
    if (state.future.length === 0) return null;

    const next = state.future[state.future.length - 1];
    set({
      future: state.future.slice(0, -1),
      past: [...state.past],
    });
    return next.pages;
  },

  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,

  clear: () => set({ past: [], future: [] }),
}));
