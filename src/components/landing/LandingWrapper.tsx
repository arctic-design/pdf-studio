'use client';

import { SmoothScrollProvider } from '../shared/SmoothScrollProvider';

export function LandingWrapper({ children }: { children: React.ReactNode }) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
