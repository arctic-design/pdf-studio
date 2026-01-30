'use client';

import { useCallback } from 'react';
import { useDocumentStore } from '../stores/useDocumentStore';
import { useUIStore } from '../stores/useUIStore';

export function usePageSelection() {
  const togglePageSelection = useDocumentStore((s) => s.togglePageSelection);
  const selectRange = useDocumentStore((s) => s.selectRange);
  const selectAll = useDocumentStore((s) => s.selectAll);
  const clearSelection = useDocumentStore((s) => s.clearSelection);
  const setScrollToPageId = useUIStore((s) => s.setScrollToPageId);

  const handlePageClick = useCallback(
    (pageId: string, event: React.MouseEvent) => {
      if (event.shiftKey) {
        selectRange(pageId);
      } else if (event.ctrlKey || event.metaKey) {
        togglePageSelection(pageId, true);
      } else {
        togglePageSelection(pageId, false);
        // Single click — scroll canvas to this page
        setScrollToPageId(pageId);
      }
    },
    [togglePageSelection, selectRange, setScrollToPageId]
  );

  return { handlePageClick, selectAll, clearSelection };
}
