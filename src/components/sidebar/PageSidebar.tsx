'use client';

import { useCallback, useRef } from 'react';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { useFileUpload } from '../../hooks/useFileUpload';
import { PageThumbnailList } from './PageThumbnailList';
import { Button } from '../ui/button';
import { Plus, Layers } from 'lucide-react';
import { ACCEPTED_FILE_INPUT } from '../../lib/constants';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';

export function PageSidebar() {
  const pages = useDocumentStore((s) => s.pages);
  const { uploadFiles } = useFileUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      if (files.length > 0) {
        uploadFiles(files);
      }
      e.target.value = '';
    },
    [uploadFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        uploadFiles(files);
      }
    },
    [uploadFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex h-full flex-col"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pages
          </span>
          <span className="inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-muted/60 px-1.5 text-[10px] font-bold tabular-nums text-muted-foreground">
            {pages.length}
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-md text-muted-foreground hover:text-foreground"
              onClick={handleUploadClick}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="text-xs">
            Add more files
          </TooltipContent>
        </Tooltip>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={ACCEPTED_FILE_INPUT}
          multiple
          onChange={handleFileChange}
        />
      </div>

      {/* Thumbnail list */}
      <div className="flex-1 overflow-hidden">
        <PageThumbnailList />
      </div>
    </div>
  );
}
