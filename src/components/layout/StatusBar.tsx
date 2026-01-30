'use client';

import { FileText, Layers, ZoomIn, HardDrive } from 'lucide-react';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { useUIStore } from '../../stores/useUIStore';
import { formatFileSize } from '../../lib/file-validators';

export function StatusBar() {
  const pages = useDocumentStore((s) => s.pages);
  const activePageId = useDocumentStore((s) => s.activePageId);
  const sourceFiles = useDocumentStore((s) => s.sourceFiles);
  const selectedPageIds = useDocumentStore((s) => s.selectedPageIds);
  const zoom = useUIStore((s) => s.zoom);

  const activeIndex = activePageId
    ? pages.findIndex((p) => p.id === activePageId) + 1
    : 0;

  const totalSize = Array.from(sourceFiles.values()).reduce(
    (sum, f) => sum + f.fileSize,
    0
  );

  const fileCount = sourceFiles.size;

  return (
    <div className="flex h-8 items-center justify-between border-t border-border/40 bg-statusbar px-4 text-[11px] text-statusbar-foreground/70">
      <div className="flex items-center gap-1">
        {pages.length > 0 ? (
          <>
            <div className="flex items-center gap-1.5 rounded-md px-2 py-0.5 transition-colors hover:bg-white/5">
              <Layers className="h-3 w-3" />
              <span>
                Page <span className="font-semibold text-statusbar-foreground">{activeIndex}</span>
                <span className="mx-0.5">/</span>
                {pages.length}
              </span>
            </div>
            {selectedPageIds.size > 1 && (
              <>
                <span className="mx-1 text-border">|</span>
                <span className="rounded-md bg-blue-500/10 px-2 py-0.5 font-medium text-blue-400">
                  {selectedPageIds.size} selected
                </span>
              </>
            )}
          </>
        ) : (
          <span className="italic text-statusbar-foreground/40">No document loaded</span>
        )}
      </div>
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1.5 rounded-md px-2 py-0.5 transition-colors hover:bg-white/5">
          <ZoomIn className="h-3 w-3" />
          <span className="font-medium tabular-nums">{zoom}%</span>
        </div>
        {fileCount > 0 && (
          <div className="hidden items-center gap-1 sm:flex">
            <span className="mx-1 text-border">|</span>
            <div className="flex items-center gap-1.5 rounded-md px-2 py-0.5 transition-colors hover:bg-white/5">
              <FileText className="h-3 w-3" />
              <span>
                {fileCount} file{fileCount !== 1 ? 's' : ''}
              </span>
            </div>
            <span className="mx-1 text-border">|</span>
            <div className="flex items-center gap-1.5 rounded-md px-2 py-0.5 transition-colors hover:bg-white/5">
              <HardDrive className="h-3 w-3" />
              <span>{formatFileSize(totalSize)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
