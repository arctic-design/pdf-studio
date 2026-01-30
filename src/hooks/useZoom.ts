'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useUIStore } from '../stores/useUIStore';

export function useZoom(containerRef: React.RefObject<HTMLElement | null>) {
  const setZoom = useUIStore((s) => s.setZoom);
  const zoom = useUIStore((s) => s.zoom);
  const zoomIn = useUIStore((s) => s.zoomIn);
  const zoomOut = useUIStore((s) => s.zoomOut);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -10 : 10;
        setZoom(zoom + delta);
      }
    },
    [zoom, setZoom]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [containerRef, handleWheel]);

  return { zoom, setZoom, zoomIn, zoomOut };
}
