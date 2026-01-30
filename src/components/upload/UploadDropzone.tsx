'use client';

import { useCallback, useState } from 'react';
import { Upload, FileText, Image, File } from 'lucide-react';
import { cn } from '../../lib/cn';
import { ACCEPTED_FILE_INPUT } from '../../lib/constants';

interface UploadDropzoneProps {
  onUpload: (files: File[]) => void;
}

export function UploadDropzone({ onUpload }: UploadDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onUpload(files);
      }
    },
    [onUpload]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ACCEPTED_FILE_INPUT;
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        onUpload(Array.from(files));
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main drop area */}
      <div
        className={cn(
          'group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-[3px] border border-dashed px-6 py-10 transition-colors sm:px-10 sm:py-14',
          isDragOver
            ? 'border-blue-500 bg-blue-500/[0.08]'
            : 'border-canvas-foreground/20 hover:border-blue-500/50 hover:bg-canvas-foreground/[0.04]'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        role="button"
        tabIndex={0}
      >
        {/* Upload icon */}
        <div className={cn(
          'mb-5 flex h-14 w-14 items-center justify-center rounded-[3px] transition-colors',
          isDragOver
            ? 'bg-blue-600 text-white'
            : 'bg-canvas-foreground/[0.08] text-canvas-foreground/50 group-hover:bg-blue-600/15 group-hover:text-blue-400'
        )}>
          <Upload className="h-6 w-6" />
        </div>

        <h3 className="mb-1.5 text-[14px] font-semibold text-canvas-foreground">
          {isDragOver ? 'Drop files here' : 'Drop files or click to upload'}
        </h3>
        <p className="mb-5 text-[12px] text-canvas-foreground/60">
          Select PDF, JPG, PNG, or TIFF files to get started
        </p>

        {/* Button */}
        <div className="rounded-[3px] bg-blue-600 px-5 py-2 text-[12px] font-medium text-white transition-colors group-hover:bg-blue-500">
          Choose Files
        </div>
      </div>

      {/* Supported file types */}
      <div className="flex items-center gap-5">
        {[
          { icon: FileText, label: 'PDF' },
          { icon: Image, label: 'JPG / PNG' },
          { icon: File, label: 'TIFF' },
        ].map((type) => (
          <div
            key={type.label}
            className="flex items-center gap-1.5 text-[11px] text-canvas-foreground/50"
          >
            <type.icon className="h-3.5 w-3.5" />
            <span>{type.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
