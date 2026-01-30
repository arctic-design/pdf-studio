'use client';

import { useRef } from 'react';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { useZoom } from '../../hooks/useZoom';
import { PdfPageVirtualList } from './PdfPageVirtualList';
import { ZoomControls } from './ZoomControls';
import { EmptyState } from '../shared/EmptyState';
import { FileText } from 'lucide-react';

export function PdfCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pages = useDocumentStore((s) => s.pages);
  useZoom(containerRef);

  if (pages.length === 0) {
    return (
      <div className="relative flex h-full items-center justify-center bg-canvas text-canvas-foreground">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <EmptyState
          icon={
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 shadow-sm dark:from-blue-950/50 dark:to-indigo-950/50">
              <FileText className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
          }
          title="No pages loaded"
          description="Upload PDF or image files to get started. Drop files into the sidebar or use the upload button."
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full bg-canvas">
      <PdfPageVirtualList />
      <ZoomControls />
    </div>
  );
}
