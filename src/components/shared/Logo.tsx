import { cn } from '../../lib/cn';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'h-5 w-5',
  md: 'h-9 w-9',
  lg: 'h-12 w-12',
};

const iconScale = {
  sm: 'scale-[0.45]',
  md: 'scale-[0.85]',
  lg: 'scale-100',
};

export function Logo({ size = 'md', className }: LogoProps) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-600/20',
        sizeMap[size],
        size === 'sm' && 'rounded-md shadow-sm',
        className,
      )}
    >
      <svg
        viewBox="0 0 32 32"
        className={cn('absolute inset-0 h-full w-full', iconScale[size])}
        aria-hidden="true"
      >
        {/* Document with folded corner */}
        <path
          d="M10 6h7l5 5v15a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
          fill="white"
          fillOpacity="0.95"
        />
        <path
          d="M17 6l5 5h-4a1 1 0 0 1-1-1V6z"
          fill="white"
          fillOpacity="0.5"
        />
        {/* Text lines */}
        <rect x="12" y="15" width="8" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.45" />
        <rect x="12" y="19" width="6" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.3" />
        <rect x="12" y="23" width="7" height="1.5" rx="0.75" fill="currentColor" fillOpacity="0.18" />
      </svg>
    </div>
  );
}
