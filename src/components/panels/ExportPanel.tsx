'use client';

import { Download, Check } from 'lucide-react';
import { usePdfExport } from '../../hooks/usePdfExport';
import { useDocumentStore } from '../../stores/useDocumentStore';

export function ExportPanel() {
  const pages = useDocumentStore((s) => s.pages);
  const watermarkConfig = useDocumentStore((s) => s.watermarkConfig);
  const pageNumberConfig = useDocumentStore((s) => s.pageNumberConfig);
  const { exportPdf } = usePdfExport();

  const handleExport = () => {
    exportPdf({
      watermark: watermarkConfig ?? undefined,
      pageNumbers: pageNumberConfig ?? undefined,
    });
  };

  const includes = [
    'All page rotations',
    'Custom page order',
  ];
  if (watermarkConfig) includes.push('Applied watermark');
  if (pageNumberConfig) includes.push('Page numbering');

  return (
    <div className="space-y-4 p-3">
      <div className="flex items-baseline justify-between px-1.5 text-[12px]">
        <span className="text-foreground/60">Pages</span>
        <span className="font-medium text-foreground">
          {pages.length} page{pages.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="mx-1.5 h-px bg-border/40" />

      <div className="space-y-1.5">
        <span className="px-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/50">
          Includes
        </span>
        <div className="space-y-0.5">
          {includes.map((item) => (
            <div key={item} className="flex items-center gap-2 px-1.5 py-1 text-[12px] text-foreground/60">
              <Check className="h-3 w-3 text-blue-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleExport}
        className="flex h-8 w-full items-center justify-center gap-2 rounded-[3px] bg-blue-600 text-[12px] font-medium text-white hover:bg-blue-500 disabled:opacity-30"
        disabled={pages.length === 0}
      >
        <Download className="h-3.5 w-3.5" />
        Download PDF
      </button>
    </div>
  );
}
