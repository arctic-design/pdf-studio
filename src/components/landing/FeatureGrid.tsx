import {
  Layers,
  Scissors,
  RotateCw,
  Droplets,
  Minimize2,
  Lock,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
  wide: boolean;
}

const features: Feature[] = [
  {
    icon: Layers,
    title: 'Merge PDFs',
    description:
      'Combine multiple PDF files into one seamless document. Drag and drop to set the order.',
    iconBg: 'bg-blue-100 dark:bg-blue-800/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
    wide: true,
  },
  {
    icon: Scissors,
    title: 'Split PDF',
    description:
      'Extract specific pages or split at intervals. Create separate documents with precision.',
    iconBg: 'bg-violet-100 dark:bg-violet-800/50',
    iconColor: 'text-violet-600 dark:text-violet-400',
    wide: false,
  },
  {
    icon: RotateCw,
    title: 'Rotate & Reorder',
    description:
      'Drag pages to rearrange. Click to rotate. Full page-level control over your document.',
    iconBg: 'bg-emerald-100 dark:bg-emerald-800/50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    wide: false,
  },
  {
    icon: Droplets,
    title: 'Watermark',
    description:
      'Add text watermarks with customizable position, opacity, rotation, color, and font size.',
    iconBg: 'bg-amber-100 dark:bg-amber-800/50',
    iconColor: 'text-amber-600 dark:text-amber-400',
    wide: true,
  },
  {
    icon: Minimize2,
    title: 'Compress',
    description:
      'Reduce file size with a quality slider. Re-encode images to shrink PDFs dramatically.',
    iconBg: 'bg-rose-100 dark:bg-rose-800/50',
    iconColor: 'text-rose-600 dark:text-rose-400',
    wide: false,
  },
  {
    icon: Lock,
    title: 'Password Protect',
    description:
      'Secure your PDFs with user and owner passwords. Control printing, copying, and editing.',
    iconBg: 'bg-sky-100 dark:bg-sky-800/50',
    iconColor: 'text-sky-600 dark:text-sky-400',
    wide: true,
  },
];

function WideCard({ feature }: { feature: Feature }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-900/5 dark:border-gray-800 dark:bg-gray-900 dark:shadow-md dark:shadow-black/25 dark:hover:border-blue-900 dark:hover:shadow-xl dark:hover:shadow-black/30 lg:col-span-2">
      <div className="flex flex-row items-start gap-5">
        <div
          className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
        >
          <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function NarrowCard({ feature }: { feature: Feature }) {
  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-900/5 dark:border-gray-800 dark:bg-gray-900 dark:shadow-md dark:shadow-black/25 dark:hover:border-blue-900 dark:hover:shadow-xl dark:hover:shadow-black/30">
      <div className="mb-2.5 flex items-center gap-3">
        <div
          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}
        >
          <feature.icon className={`h-4 w-4 ${feature.iconColor}`} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {feature.title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {feature.description}
      </p>
    </div>
  );
}

export function FeatureGrid() {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="mb-4 text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
            Features
          </span>
        </div>
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          Everything you need
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-gray-500 dark:text-gray-400">
          A complete toolkit for all your PDF tasks — fast, private, and free.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) =>
            feature.wide ? (
              <WideCard key={feature.title} feature={feature} />
            ) : (
              <NarrowCard key={feature.title} feature={feature} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
