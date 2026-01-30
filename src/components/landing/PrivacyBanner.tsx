import { ShieldCheck, Server, Eye, Database } from 'lucide-react';

export function PrivacyBanner() {
  return (
    <section id="privacy" className="mx-auto max-w-5xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 shadow-2xl shadow-blue-600/15 dark:shadow-2xl dark:shadow-blue-900/40">
        {/* Decorative accents — solid, no blur */}
        <div
          className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-blue-500 opacity-20"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-indigo-500 opacity-15"
          aria-hidden="true"
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 px-8 py-16 sm:px-16">
          <div className="flex flex-col items-center text-center">
            {/* Shield icon */}
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-800 ring-1 ring-blue-600">
              <ShieldCheck className="h-10 w-10 text-white" />
            </div>

            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Your privacy is non-negotiable.
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-blue-100">
              Every operation runs entirely in your browser. Your files never
              touch a server — not even for a millisecond.
            </p>

            {/* Privacy guarantees */}
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              {[
                { icon: Server, text: 'No server uploads' },
                { icon: Eye, text: 'No tracking or analytics' },
                { icon: Database, text: 'No data stored anywhere' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl bg-blue-800 px-5 py-3 ring-1 ring-blue-600"
                >
                  <item.icon className="h-5 w-5 flex-shrink-0 text-blue-200" />
                  <span className="text-sm font-medium text-white">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
