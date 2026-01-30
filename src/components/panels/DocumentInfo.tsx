'use client';

import { FileText, Layers, HardDrive, File } from 'lucide-react';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { formatFileSize } from '../../lib/file-validators';

export function DocumentInfo() {
  const pages = useDocumentStore((s) => s.pages);
  const sourceFiles = useDocumentStore((s) => s.sourceFiles);

  const totalSize = Array.from(sourceFiles.values()).reduce(
    (sum, f) => sum + f.fileSize,
    0
  );

  return (
    <div className="space-y-4 p-3">
      {/* Stats rows */}
      <div className="space-y-0.5">
        <div className="flex items-center justify-between rounded-[3px] px-1.5 py-1.5 text-[12px]">
          <span className="flex items-center gap-2 text-foreground/60">
            <Layers className="h-3.5 w-3.5" />
            Pages
          </span>
          <span className="font-medium text-foreground">{pages.length}</span>
        </div>
        <div className="mx-1.5 h-px bg-border/40" />
        <div className="flex items-center justify-between rounded-[3px] px-1.5 py-1.5 text-[12px]">
          <span className="flex items-center gap-2 text-foreground/60">
            <FileText className="h-3.5 w-3.5" />
            Files
          </span>
          <span className="font-medium text-foreground">{sourceFiles.size}</span>
        </div>
        <div className="mx-1.5 h-px bg-border/40" />
        <div className="flex items-center justify-between rounded-[3px] px-1.5 py-1.5 text-[12px]">
          <span className="flex items-center gap-2 text-foreground/60">
            <HardDrive className="h-3.5 w-3.5" />
            Total size
          </span>
          <span className="font-medium text-foreground">{formatFileSize(totalSize)}</span>
        </div>
      </div>

      {/* Source files list */}
      {sourceFiles.size > 0 && (
        <div className="space-y-1">
          <span className="px-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
            Source Files
          </span>
          <div className="space-y-px">
            {Array.from(sourceFiles.values()).map((file) => (
              <div
                key={file.id}
                className="flex gap-2 rounded-[3px] px-1.5 py-1.5 hover:bg-foreground/[0.04]"
              >
                <File className="mt-0.5 h-3.5 w-3.5 shrink-0 text-foreground/40" />
                <div className="min-w-0 flex-1">
                  <p className="break-all text-[12px] leading-snug text-foreground/80">
                    {file.fileName}
                  </p>
                  <p className="mt-0.5 text-[11px] tabular-nums text-foreground/50">
                    {file.pageCount} {file.pageCount === 1 ? 'page' : 'pages'} &middot; {formatFileSize(file.fileSize)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
