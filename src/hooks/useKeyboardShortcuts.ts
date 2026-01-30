'use client';

import { useEffect } from 'react';
import { useDocumentStore } from '../stores/useDocumentStore';
import { useUIStore } from '../stores/useUIStore';
import { useHistoryStore } from '../stores/useHistoryStore';

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const ctrl = e.ctrlKey || e.metaKey;
      const docStore = useDocumentStore.getState();
      const uiStore = useUIStore.getState();
      const historyStore = useHistoryStore.getState();

      // Ctrl+Z - Undo
      if (ctrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        const restored = historyStore.undo();
        if (restored) docStore.reorderPages(restored);
        return;
      }

      // Ctrl+Y or Ctrl+Shift+Z - Redo
      if (ctrl && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        const restored = historyStore.redo();
        if (restored) docStore.reorderPages(restored);
        return;
      }

      // Ctrl+A - Select all
      if (ctrl && e.key === 'a') {
        e.preventDefault();
        docStore.selectAll();
        return;
      }

      // Delete / Backspace - Delete selected
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        const selected = Array.from(docStore.selectedPageIds);
        if (selected.length > 0) {
          historyStore.pushState(docStore.pages);
          docStore.removePagesById(selected);
        }
        return;
      }

      // R - Rotate selected right
      if (e.key === 'r' && !ctrl) {
        e.preventDefault();
        const selected = Array.from(docStore.selectedPageIds);
        if (selected.length > 0) {
          historyStore.pushState(docStore.pages);
          docStore.rotatePages(selected, 90);
        }
        return;
      }

      // D - Duplicate selected
      if (e.key === 'd' && !ctrl) {
        e.preventDefault();
        const selected = Array.from(docStore.selectedPageIds);
        if (selected.length > 0) {
          historyStore.pushState(docStore.pages);
          docStore.duplicatePages(selected);
        }
        return;
      }

      // + / = - Zoom in
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        uiStore.zoomIn();
        return;
      }

      // - - Zoom out
      if (e.key === '-') {
        e.preventDefault();
        uiStore.zoomOut();
        return;
      }

      // 0 - Reset zoom
      if (e.key === '0' && ctrl) {
        e.preventDefault();
        uiStore.resetZoom();
        return;
      }

      // Cmd/Ctrl+K - Toggle command palette
      if (ctrl && e.key === 'k') {
        e.preventDefault();
        uiStore.toggleCommandPalette();
        return;
      }

      // ? - Open command palette
      if (e.key === '?') {
        e.preventDefault();
        uiStore.setCommandPaletteOpen(true);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
