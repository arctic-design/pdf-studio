'use client';

import { cn } from '../../lib/cn';
import { Loader2 } from 'lucide-react';
import type { PdfPage } from '../../types';

interface PageThumbnailProps {
  page: PdfPage;
  index: number;
  isSelected: boolean;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function PageThumbnail({
  page,
  index,
  isSelected,
  isActive,
  onClick,
}: PageThumbnailProps) {
  return (
    <div
      className={cn(
        'group relative cursor-pointer rounded-lg border-2 p-1.5 transition-all duration-150',
        isSelected
          ? 'border-blue-500 bg-blue-500/10 shadow-sm shadow-blue-500/10 dark:border-blue-400 dark:bg-blue-400/10'
          : 'border-transparent hover:border-border/60 hover:bg-muted/30',
        isActive && 'ring-2 ring-blue-500/50 ring-offset-1 ring-offset-sidebar dark:ring-blue-400/50'
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
      aria-label={`Page ${index + 1}`}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-white shadow-sm dark:bg-gray-100">
        {page.thumbnailDataUrl ? (
          <img
            src={page.thumbnailDataUrl}
            alt={`Page ${index + 1}`}
            className="h-full w-full object-contain"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground/40" />
          </div>
        )}

        {/* Rotation indicator */}
        {page.rotation !== 0 && (
          <div className="absolute right-1 top-1 rounded-sm bg-black/60 px-1 py-0.5 text-[8px] font-bold text-white backdrop-blur-sm">
            {page.rotation}°
          </div>
        )}
      </div>

      {/* Page number */}
      <div className={cn(
        'mt-1.5 text-center text-[10px] font-medium tabular-nums transition-colors',
        isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-muted-foreground/60'
      )}>
        {index + 1}
      </div>
    </div>
  );
}
