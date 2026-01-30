'use client';

import { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/20 to-white dark:hidden" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-gradient-to-b from-red-400/8 via-orange-400/4 to-transparent blur-3xl dark:hidden" />
      <div className="hidden dark:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-gradient-to-b from-red-500/8 via-orange-500/4 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        {/* Message */}
        <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Something went wrong
        </h2>
        <p className="mb-10 text-base leading-relaxed text-gray-500 dark:text-gray-400">
          An unexpected error occurred. Your files are safe — nothing was
          uploaded or lost. You can try again or head back home.
        </p>

        {/* Button */}
        <button
          onClick={reset}
          className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30 hover:brightness-110 dark:shadow-blue-600/10 dark:hover:shadow-blue-600/20"
        >
          <RotateCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
