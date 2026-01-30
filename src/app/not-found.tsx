import Link from 'next/link';
import { ArrowRight, FileText, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white dark:hidden" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-b from-blue-400/10 via-indigo-400/5 to-transparent blur-3xl dark:hidden" />
      <div className="hidden dark:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-b from-blue-500/10 via-indigo-500/6 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        {/* 404 number */}
        <div className="mb-4 text-8xl font-black tracking-tighter sm:text-9xl">
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-300 dark:to-indigo-400">
            404
          </span>
        </div>

        {/* Message */}
        <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Page not found
        </h2>
        <p className="mb-10 text-base leading-relaxed text-gray-500 dark:text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/studio"
            className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30 hover:brightness-110 dark:shadow-blue-600/10 dark:hover:shadow-blue-600/20"
          >
            <FileText className="h-4 w-4" />
            Open Studio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-8 py-3.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:shadow-md dark:shadow-black/25 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
