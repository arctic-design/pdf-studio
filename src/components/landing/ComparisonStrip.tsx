import { Minus } from 'lucide-react';
import { Logo } from '../shared/Logo';

interface ComparisonPoint {
  category: string;
  ours: string;
  theirs: string;
}

const points: ComparisonPoint[] = [
  {
    category: 'Privacy',
    ours: 'Files never leave your device',
    theirs: 'Uploaded to remote servers',
  },
  {
    category: 'File limits',
    ours: 'Unlimited size, unlimited files',
    theirs: '25-100 MB cap per file',
  },
  {
    category: 'Output',
    ours: 'Clean, watermark-free results',
    theirs: 'Watermarks on free tier',
  },
  {
    category: 'Cost',
    ours: 'Free forever',
    theirs: 'Paywalled after a few uses',
  },
  {
    category: 'Speed',
    ours: 'Instant local processing',
    theirs: 'Upload, wait, download',
  },
  {
    category: 'Offline',
    ours: 'Works without internet',
    theirs: 'Requires constant connection',
  },
];

export function ComparisonStrip() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-5xl px-6 py-28">
        <div className="mb-4 text-center">
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
            Comparison
          </span>
        </div>
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Why PDF Studio?
        </h2>
        <p className="mx-auto mb-16 max-w-xl text-center text-lg text-gray-500 dark:text-gray-400">
          See how we stack up against typical online PDF tools.
        </p>

        {/* Two-column card layout */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* PDF Studio card */}
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-b from-blue-50 to-white p-1 shadow-md dark:border-blue-800 dark:from-gray-900 dark:to-gray-900 dark:shadow-lg dark:shadow-blue-950/40">
            <div className="rounded-xl bg-white p-6 dark:bg-gray-900">
              <div className="mb-6 flex items-center gap-3">
                <Logo size="md" className="rounded-xl" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">PDF Studio</h3>
                  <p className="text-[11px] text-blue-600 dark:text-blue-400">What you get</p>
                </div>
              </div>
              <div className="space-y-0">
                {points.map((point, i) => (
                  <div
                    key={point.category}
                    className={`flex items-start gap-3 py-3 ${i < points.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-[10px] font-bold text-blue-700 dark:bg-blue-800/50 dark:text-blue-400">
                      {point.category.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{point.ours}</p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500">{point.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Others card */}
          <div className="rounded-2xl border border-gray-200 bg-gray-100 p-1 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:shadow-md dark:shadow-black/25">
            <div className="rounded-xl bg-white p-6 dark:bg-gray-800">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-800">
                  <Minus className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400">Other tools</h3>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">What you settle for</p>
                </div>
              </div>
              <div className="space-y-0">
                {points.map((point, i) => (
                  <div
                    key={point.category}
                    className={`flex items-start gap-3 py-3 ${i < points.length - 1 ? 'border-b border-gray-200 dark:border-gray-800' : ''}`}
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-gray-200 text-[10px] font-bold text-gray-400 dark:bg-gray-800 dark:text-gray-500">
                      {point.category.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm text-gray-400 line-through decoration-gray-300 dark:text-gray-500 dark:decoration-gray-700">{point.theirs}</p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-600">{point.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
