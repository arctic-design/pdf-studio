import Link from 'next/link';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — light mode gradient, hidden in dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white dark:hidden" />


      {/* Radial glow — light mode only */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-b from-blue-400/15 via-indigo-400/8 to-transparent blur-3xl dark:hidden" />

      {/* Ambient glow — dark mode only */}
      <div className="hidden dark:block absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-b from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        {/* Badge — solid backgrounds, no backdrop-blur */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-2 text-sm font-medium text-blue-700 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-blue-400 dark:shadow-md dark:shadow-black/30">
          <Sparkles className="h-4 w-4" />
          100% Client-Side PDF Tools
        </div>

        {/* Heading */}
        <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-8xl">
          Your PDFs,
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400">
              perfected.
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full text-blue-500/30 dark:text-blue-400/20"
              viewBox="0 0 200 8"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M1 5.5C32 2 62 1 100 3.5C138 6 168 5.5 199 3"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400 sm:text-xl">
          Merge, split, rotate, watermark, compress and protect &mdash; all in
          your browser. No uploads. No limits. Completely free.
        </p>

        {/* CTA buttons — solid backgrounds */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/studio"
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-4.5 text-lg font-semibold text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30 hover:brightness-110 dark:shadow-blue-600/10 dark:hover:shadow-blue-600/20"
          >
            <FileText className="h-5 w-5" />
            Open Studio
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 py-4.5 text-lg font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:shadow-md dark:shadow-black/25 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Learn more
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400 dark:text-gray-500 sm:gap-12">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">0 bytes</span>
            <span>uploaded to servers</span>
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">Unlimited</span>
            <span>file size</span>
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-800 dark:text-white">100%</span>
            <span>free forever</span>
          </div>
        </div>
      </div>
    </section>
  );
}
