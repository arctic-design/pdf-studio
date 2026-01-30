import { type ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-5">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
