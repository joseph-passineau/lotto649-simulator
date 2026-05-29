import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div
      className={`rounded-[14px] border border-[var(--border)] bg-[var(--surface)] ${padding ? 'p-5' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-display text-[10px] font-bold tracking-[0.15em] text-[var(--text-secondary)] uppercase">
      {children}
    </span>
  );
}

export function SectionHeader({
  title,
  action,
}: {
  title: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <CardLabel>{title}</CardLabel>
      {action}
    </div>
  );
}

export function Divider() {
  return <div className="my-3 h-px bg-[var(--border)]" />;
}
