'use client';

import { useEffect, useRef } from 'react';
import { usePdfRenderer } from '../../hooks/usePdfRenderer';
import type { PdfPage as PdfPageType } from '../../types';

interface PdfPageProps {
  page: PdfPageType;
  scale: number;
}

export function PdfPage({ page, scale }: PdfPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { renderPage } = usePdfRenderer();
  const renderingRef = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || renderingRef.current) return;

    renderingRef.current = true;
    const pxScale = scale / 100;

    renderPage(
      page.sourceFileId,
      page.sourcePageIndex,
      canvasRef.current,
      pxScale,
      page.rotation
    ).finally(() => {
      renderingRef.current = false;
    });
  }, [page.sourceFileId, page.sourcePageIndex, page.rotation, scale, renderPage]);

  return (
    <div className="flex items-center justify-center py-2">
      <canvas
        ref={canvasRef}
        className="shadow-lg"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}
