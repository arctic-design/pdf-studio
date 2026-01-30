'use client';

import { useCallback, useRef } from 'react';
import { Toaster } from 'sonner';
import { TooltipProvider } from '../ui/tooltip';
import { Toolbar } from './Toolbar';
import { StatusBar } from './StatusBar';
import { PanelLayout } from './PanelLayout';
import { PageSidebar } from '../sidebar/PageSidebar';
import { PdfCanvas } from '../canvas/PdfCanvas';
import { ToolPanel } from '../panels/ToolPanel';
import { UploadDropzone } from '../upload/UploadDropzone';
import { UploadProgress } from '../upload/UploadProgress';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { CommandPalette } from '../shared/CommandPalette';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { useUIStore } from '../../stores/useUIStore';
import { useFileUpload } from '../../hooks/useFileUpload';
import { usePdfExport } from '../../hooks/usePdfExport';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useThumbnailRenderer } from '../../hooks/useThumbnailRenderer';
import { ACCEPTED_FILE_INPUT } from '../../lib/constants';

export function PdfStudio() {
  const pages = useDocumentStore((s) => s.pages);
  const confirmDialog = useUIStore((s) => s.confirmDialog);
  const closeConfirmDialog = useUIStore((s) => s.closeConfirmDialog);
  const setToolPanelOpen = useUIStore((s) => s.setToolPanelOpen);
  const setActiveTool = useDocumentStore((s) => s.setActiveTool);

  const { uploadFiles } = useFileUpload();
  const { exportPdf } = usePdfExport();

  useKeyboardShortcuts();
  useThumbnailRenderer();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

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

  const handleExport = useCallback(() => {
    setActiveTool('export');
    setToolPanelOpen(true);
  }, [setActiveTool, setToolPanelOpen]);

  const handleConfirm = useCallback(() => {
    confirmDialog.onConfirm?.();
    closeConfirmDialog();
  }, [confirmDialog, closeConfirmDialog]);

  const showEmptyUpload = pages.length === 0;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-screen flex-col bg-background">
        <Toolbar onExport={handleExport} onUpload={handleUploadClick} />

        {showEmptyUpload ? (
          <div className="flex flex-1 items-center justify-center overflow-hidden bg-canvas p-4 sm:p-8">
            <div className="w-full max-w-md">
              <UploadDropzone onUpload={uploadFiles} />
            </div>
          </div>
        ) : (
          <PanelLayout
            sidebar={<PageSidebar />}
            canvas={<PdfCanvas />}
            toolPanel={<ToolPanel />}
          />
        )}

        <StatusBar />
        <UploadProgress />

        <ConfirmDialog
          open={confirmDialog.open}
          onOpenChange={(open) => {
            if (!open) closeConfirmDialog();
          }}
          title={confirmDialog.title}
          message={confirmDialog.message}
          onConfirm={handleConfirm}
          destructive
        />

        <CommandPalette onUpload={handleUploadClick} />

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={ACCEPTED_FILE_INPUT}
          multiple
          onChange={handleFileChange}
        />
      </div>
      <Toaster position="bottom-right" richColors />
    </TooltipProvider>
  );
}
