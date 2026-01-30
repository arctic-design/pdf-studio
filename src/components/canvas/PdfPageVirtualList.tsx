'use client';

import { useRef, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { useUIStore } from '../../stores/useUIStore';
import { PdfPage } from './PdfPage';
import { getEffectiveDimensions } from '../../lib/page-model';
import { VIRTUAL_SCROLL_OVERSCAN } from '../../lib/constants';

export function PdfPageVirtualList() {
  const parentRef = useRef<HTMLDivElement>(null);
  const pages = useDocumentStore((s) => s.pages);
  const zoom = useUIStore((s) => s.zoom);
  const scrollToPageId = useUIStore((s) => s.scrollToPageId);
  const setScrollToPageId = useUIStore((s) => s.setScrollToPageId);

  const rowVirtualizer = useVirtualizer({
    count: pages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      const page = pages[index];
      const dims = getEffectiveDimensions(page);
      return (dims.height * (zoom / 100)) + 16;
    },
    overscan: VIRTUAL_SCROLL_OVERSCAN,
  });

  // Scroll to the requested page when scrollToPageId changes
  useEffect(() => {
    if (!scrollToPageId) return;

    const index = pages.findIndex((p) => p.id === scrollToPageId);
    setScrollToPageId(null);

    if (index === -1) return;

    // Calculate offset manually to avoid virtualizer's retry loop
    requestAnimationFrame(() => {
      const scrollEl = parentRef.current;
      if (!scrollEl) return;

      // Sum estimated heights of all pages before the target
      let offset = 0;
      for (let i = 0; i < index; i++) {
        const page = pages[i];
        const dims = getEffectiveDimensions(page);
        offset += (dims.height * (zoom / 100)) + 16;
      }

      // Center the target page in the viewport
      const pageHeight = rowVirtualizer.getVirtualItems().find(
        (item) => item.index === index
      )?.size ?? ((getEffectiveDimensions(pages[index]).height * (zoom / 100)) + 16);

      const viewportHeight = scrollEl.clientHeight;
      const centeredOffset = Math.max(0, offset - (viewportHeight - pageHeight) / 2);

      scrollEl.scrollTo({ top: centeredOffset, behavior: 'smooth' });
    });
  }, [scrollToPageId, pages, zoom, rowVirtualizer, setScrollToPageId]);

  return (
    <div
      ref={parentRef}
      className="h-full w-full overflow-auto"
      style={{ contain: 'strict' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const page = pages[virtualItem.index];
          return (
            <div
              key={page.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <PdfPage page={page} scale={zoom} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
