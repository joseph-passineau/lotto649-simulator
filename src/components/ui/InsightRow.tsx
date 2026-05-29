import type { ReactNode } from 'react';
import { InfoPopover } from './InfoPopover';

export function InsightRow({
  label,
  value,
  valueClassName = 'text-[var(--text-primary)]',
  help,
}: {
  label: ReactNode;
  value: ReactNode;
  valueClassName?: string;
  help?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] py-2 last:border-b-0">
      <span className="flex min-w-0 items-center gap-1.5 text-xs text-[var(--text-secondary)]">
        <span className="truncate">{label}</span>
        {help ? <InfoPopover content={help} /> : null}
      </span>
      <span className={`shrink-0 font-mono text-[13px] font-medium ${valueClassName}`}>{value}</span>
    </div>
  );
}
