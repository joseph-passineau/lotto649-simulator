import type { ReactNode } from 'react';

export type BallVariant = 'blue' | 'matched' | 'bonus' | 'green' | 'empty';

const variantClasses: Record<BallVariant, string> = {
  blue: 'bg-gradient-to-br from-blue-500 to-blue-800 text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)]',
  matched:
    'bg-gradient-to-br from-amber-500 to-amber-600 text-[#1a0900] shadow-[0_4px_16px_rgba(245,158,11,0.45)]',
  bonus:
    'bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-[0_4px_12px_rgba(249,115,22,0.3)]',
  green:
    'bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-[0_4px_12px_rgba(16,185,129,0.25)]',
  empty:
    'bg-[var(--surface2)] border-2 border-dashed border-[var(--border2)] text-[var(--text-muted)]',
};

interface BallProps {
  children: ReactNode;
  variant?: BallVariant;
  size?: 'md' | 'lg';
  className?: string;
}

export function Ball({ children, variant = 'blue', size = 'md', className = '' }: BallProps) {
  const sizeClass =
    size === 'lg'
      ? 'size-[52px] text-base after:top-[5px] after:left-2.5 after:h-1.5 after:w-3'
      : 'size-11 text-sm after:top-1 after:left-2 after:h-[5px] after:w-2.5';

  return (
    <div
      className={`relative flex shrink-0 cursor-default select-none items-center justify-center rounded-full font-mono font-semibold transition-transform hover:scale-110 ${sizeClass} ${variantClasses[variant]} ${variant !== 'empty' ? 'after:absolute after:rotate-[-30deg] after:rounded-full after:bg-white/25 after:content-[""]' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
