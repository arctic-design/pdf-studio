import type { Metadata } from 'next';
import StudioClient from './StudioClient';

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Open PDF Studio to merge, rotate, watermark, compress and protect your PDF files. Everything runs in your browser — no uploads needed.',
  alternates: {
    canonical: 'https://pdf.bpstack.com/studio',
  },
};

export default function StudioPage() {
  return <StudioClient />;
}
