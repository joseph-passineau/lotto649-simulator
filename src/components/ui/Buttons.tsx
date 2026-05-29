import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
}

export function PlayButton({ children, icon, className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center gap-2 rounded-[9px] border-none bg-[var(--amber)] px-5 py-2.5 font-mono text-xs font-extrabold tracking-[0.08em] text-[#1a0900] shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all hover:bg-amber-400 hover:shadow-[0_0_28px_rgba(245,158,11,0.35)] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export function SecondaryButton({ children, icon, className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center gap-2 rounded-[9px] border border-[var(--border2)] bg-[var(--surface2)] px-4 py-2.5 font-mono text-xs font-bold tracking-[0.06em] text-slate-400 transition-all hover:border-slate-400 hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export function ResetButton({ children, icon, className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center gap-2 rounded-[9px] border border-[#3d1515] bg-transparent px-4 py-2.5 font-mono text-xs font-bold tracking-[0.06em] text-[var(--red)] transition-all hover:border-[var(--red)] hover:bg-red-500/8 ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export function PickButton({
  selected,
  matched,
  disabled,
  children,
  onClick,
}: {
  selected: boolean;
  matched?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  let classes =
    'flex size-[34px] items-center justify-center rounded-lg border border-[var(--border2)] bg-[var(--surface2)] font-mono text-[11px] font-medium text-slate-400 transition-all';

  if (selected && matched) {
    classes =
      'flex size-[34px] items-center justify-center rounded-lg border border-emerald-500 bg-gradient-to-br from-emerald-500 to-emerald-600 font-mono text-[11px] font-bold text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]';
  } else if (selected) {
    classes =
      'flex size-[34px] items-center justify-center rounded-lg border border-[var(--amber)] bg-[var(--amber)] font-mono text-[11px] font-bold text-[#1a0900] shadow-[0_0_12px_rgba(245,158,11,0.35)]';
  } else if (matched) {
    classes =
      'flex size-[34px] items-center justify-center rounded-lg border border-emerald-500 bg-emerald-500/15 font-mono text-[11px] font-medium text-emerald-400';
  } else if (!disabled) {
    classes += ' cursor-pointer hover:border-[var(--amber)] hover:bg-amber-500/8 hover:text-[var(--amber)]';
  }

  if (disabled) classes += ' cursor-not-allowed opacity-35';

  return (
    <button type="button" className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
