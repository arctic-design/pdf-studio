'use client';

import { useCallback } from 'react';
import { useDocumentStore } from '../stores/useDocumentStore';
import { mergePdfPages, addWatermark, addPageNumbers } from '../lib/pdf-utils';
import type { WatermarkConfig, PageNumberConfig } from '../types';
import { toast } from 'sonner';

export function usePdfExport() {
  const pages = useDocumentStore((s) => s.pages);
  const sourceFiles = useDocumentStore((s) => s.sourceFiles);
  const setProcessing = useDocumentStore((s) => s.setProcessing);

  const exportPdf = useCallback(
    async (options?: {
      watermark?: WatermarkConfig;
      pageNumbers?: PageNumberConfig;
      fileName?: string;
    }) => {
      if (pages.length === 0) {
        toast.error('No pages to export');
        return;
      }

      setProcessing(true, 'Building PDF...');

      try {
        const sourceMap = new Map<string, ArrayBuffer>();
        for (const [id, file] of sourceFiles) {
          sourceMap.set(id, file.pdfBytes);
        }

        let pdfBytes = await mergePdfPages(sourceMap, pages);

        if (options?.watermark) {
          pdfBytes = await addWatermark(pdfBytes, options.watermark);
        }

        if (options?.pageNumbers?.enabled) {
          pdfBytes = await addPageNumbers(pdfBytes, options.pageNumbers);
        }

        const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = options?.fileName ?? 'pdf-studio-export.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success('PDF exported successfully');
      } catch (err) {
        console.error('Export error:', err);
        toast.error('Failed to export PDF');
      } finally {
        setProcessing(false);
      }
    },
    [pages, sourceFiles, setProcessing]
  );

  return { exportPdf };
}
