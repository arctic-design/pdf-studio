import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import 'lenis/dist/lenis.css';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
});

const SITE_URL = 'https://pdf.bpstack.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PDF Studio — Free Browser-Based PDF Toolkit',
    template: '%s | PDF Studio',
  },
  description:
    'Merge, split, rotate, watermark, compress and password-protect PDFs entirely in your browser. No uploads, no servers — your files never leave your device.',
  keywords: [
    'PDF editor',
    'merge PDF',
    'split PDF',
    'rotate PDF',
    'compress PDF',
    'watermark PDF',
    'password protect PDF',
    'browser PDF tool',
    'free PDF editor',
    'client-side PDF',
    'privacy PDF',
    'no upload PDF',
  ],
  authors: [{ name: 'Barun Prasad', url: 'https://www.barunprasad.com' }],
  creator: 'Barun Prasad',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'PDF Studio',
    title: 'PDF Studio — Free Browser-Based PDF Toolkit',
    description:
      'Merge, split, rotate, watermark, compress and protect PDFs — all in your browser. No uploads, no servers.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF Studio — Free Browser-Based PDF Toolkit',
    description:
      'Merge, split, rotate, watermark, compress and protect PDFs — all in your browser. No uploads.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
