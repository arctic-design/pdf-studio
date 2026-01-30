import { Upload, PenLine, Download, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: Upload,
    title: 'Upload',
    description:
      'Drop your PDF, image, or TIFF files into the studio. Supports batch upload.',
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBg: 'bg-blue-100 dark:bg-blue-800/50',
  },
  {
    number: 2,
    icon: PenLine,
    title: 'Edit',
    description:
      'Reorder pages, add watermarks, merge files, rotate, or compress — all visually.',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    iconBg: 'bg-indigo-100 dark:bg-indigo-800/50',
  },
  {
    number: 3,
    icon: Download,
    title: 'Download',
    description:
      'Export your finished PDF instantly. No waiting, no email — just download.',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-800/50',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-900 dark:to-gray-950 dark:border-t dark:border-b dark:border-gray-800 dark:border-t-blue-900/50">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:hidden"
        style={{
          backgroundImage: 'radial-gradient(circle, rgb(59 130 246) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-28">
        <div className="mb-4 text-center">
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
            Simple workflow
          </span>
        </div>
        <h2 className="mb-4 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
          How it works
        </h2>
        <p className="mx-auto mb-20 max-w-xl text-center text-lg text-gray-500 dark:text-gray-400">
          Three simple steps to your perfect PDF.
        </p>

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          {/* Connecting arrows (desktop) */}
          <div className="pointer-events-none absolute inset-0 hidden md:flex items-start justify-around pt-14">
            <div className="flex-1" />
            <div className="flex items-center px-4">
              <ArrowRight className="h-6 w-6 text-gray-300 dark:text-gray-600" />
            </div>
            <div className="flex-1" />
            <div className="flex items-center px-4">
              <ArrowRight className="h-6 w-6 text-gray-300 dark:text-gray-600" />
            </div>
            <div className="flex-1" />
          </div>

          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-900/5 dark:border-gray-700 dark:bg-gray-800 dark:shadow-md dark:shadow-black/25 dark:hover:border-blue-900 dark:hover:shadow-xl dark:hover:shadow-black/30"
            >
              {/* Step number */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-md shadow-blue-600/25">
                  {step.number}
                </span>
              </div>

              {/* Icon */}
              <div
                className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${step.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <step.icon className={`h-8 w-8 ${step.iconColor}`} />
              </div>

              <h3 className="mb-2.5 text-xl font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
