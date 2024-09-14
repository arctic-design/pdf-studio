import { Inter } from 'next/font/google';

import './global.scss';
import '@pigment-css/react/styles.css';
import '@arctic-kit/snow/style.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '900'],
});

export const metadata = {
  title: 'PDF Studio',
  description: 'Combine images and pdf to a single document',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="theme-light">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
