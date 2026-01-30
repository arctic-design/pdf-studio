'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const PdfStudio = dynamic(
  () =>
    import('../../components/layout/PdfStudio').then((mod) => ({
      default: mod.PdfStudio,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    ),
  }
);

export default function StudioPage() {
  return <PdfStudio />;
}
