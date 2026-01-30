'use client';

import { useDocumentStore } from '../../stores/useDocumentStore';
import { Loader2, FileText } from 'lucide-react';

export function UploadProgress() {
  const isProcessing = useDocumentStore((s) => s.isProcessing);
  const processingMessage = useDocumentStore((s) => s.processingMessage);

  if (!isProcessing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-[3px] border border-border/50 bg-background px-8 py-6">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-[3px] bg-foreground/[0.06]">
            <FileText className="h-5 w-5 text-foreground/60" />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-background border border-border/40">
            <Loader2 className="h-3 w-3 animate-spin text-blue-500" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-[13px] font-medium text-foreground">
            {processingMessage || 'Processing...'}
          </p>
          <p className="mt-1 text-[11px] text-foreground/50">
            This may take a moment
          </p>
        </div>
      </div>
    </div>
  );
}
