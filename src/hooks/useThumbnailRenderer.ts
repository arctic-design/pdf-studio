'use client';

import { useEffect, useRef } from 'react';
import { useDocumentStore } from '../stores/useDocumentStore';
import { usePdfRenderer } from './usePdfRenderer';
import { THUMBNAIL_SCALE } from '../lib/constants';

export function useThumbnailRenderer() {
  const pages = useDocumentStore((s) => s.pages);
  const updatePageThumbnail = useDocumentStore((s) => s.updatePageThumbnail);
  const { renderThumbnail } = usePdfRenderer();
  const renderingRef = useRef(new Set<string>());

  useEffect(() => {
    const dirtyPages = pages.filter(
      (p) => p.thumbnailDirty && !renderingRef.current.has(p.id)
    );

    for (const page of dirtyPages) {
      renderingRef.current.add(page.id);

      renderThumbnail(page.sourceFileId, page.sourcePageIndex, THUMBNAIL_SCALE, page.rotation)
        .then((dataUrl) => {
          if (dataUrl) {
            updatePageThumbnail(page.id, dataUrl);
          }
        })
        .finally(() => {
          renderingRef.current.delete(page.id);
        });
    }
  }, [pages, renderThumbnail, updatePageThumbnail]);
}
