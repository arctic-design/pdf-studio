'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ExternalLink, Sun, Moon } from 'lucide-react';
import { Logo } from '../shared/Logo';
import { useTheme } from 'next-themes';

const footerLinks = {
  product: [
    { label: 'Open Studio', href: '/studio', internal: true },
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Privacy', href: '#privacy' },
  ],
  resources: [
    { label: 'GitHub', href: 'https://github.com/arctic-design/pdf-studio', external: true },
    { label: 'Portfolio', href: 'https://www.barunprasad.com', external: true },
  ],
};

function FooterThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      <Sun className="h-3.5 w-3.5 dark:hidden" />
      <Moon className="hidden h-3.5 w-3.5 dark:block" />
      <span>{mounted ? (isDark ? 'Light mode' : 'Dark mode') : 'Toggle theme'}</span>
    </button>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-t dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-6">
        {/* Main footer */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5">
              <Logo size="md" className="rounded-xl" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                PDF Studio
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              A free, client-side PDF toolkit built for people who care about
              privacy and speed.
            </p>
            <FooterThemeToggle />
          </div>

          {/* Product links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200">
              Product
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {link.internal ? (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resource links */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                    {link.external && <ExternalLink className="h-3 w-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200">
              Built with
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['Next.js', 'Tailwind', 'pdf-lib', 'pdf.js'].map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:shadow-sm dark:shadow-black/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 border-t border-gray-200 py-6 dark:border-gray-800 sm:flex-row sm:justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} PDF Studio. Open-source and free to use.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            Made with
            <Heart className="h-3 w-3 text-red-500" fill="currentColor" />
            by{' '}
            <a
              href="https://www.barunprasad.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900 dark:text-gray-300 dark:decoration-gray-600 dark:hover:text-white"
            >
              Barun Prasad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
