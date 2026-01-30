import Link from 'next/link';
import { ArrowRight, FileText, Sparkles, Zap } from 'lucide-react';

export function CallToAction() {
  return (
    <section className="relative overflow-hidden border-t border-gray-100 dark:border-gray-800">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent dark:hidden" />

      {/* Radial glow — light mode only */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400/8 via-indigo-400/6 to-transparent blur-3xl dark:hidden" />

      {/* Ambient glow — dark mode only */}
      <div className="hidden dark:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-gradient-to-br from-blue-500/10 via-indigo-500/8 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-blue-300 dark:shadow-md dark:shadow-black/30">
          <Zap className="h-3.5 w-3.5" />
          Ready to get started?
        </div>

        <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Start editing your PDFs
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            in seconds.
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          No sign-up required. No software to install. Just open the studio and
          start working with your PDFs right away.
        </p>

        <Link
          href="/studio"
          className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-4.5 text-lg font-semibold text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30 hover:brightness-110 dark:shadow-blue-600/10 dark:hover:shadow-blue-600/20"
        >
          <FileText className="h-5 w-5" />
          Open Studio
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </Link>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
          {['No account needed', 'Works offline', 'Open source'].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
