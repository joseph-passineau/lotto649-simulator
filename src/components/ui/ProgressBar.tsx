interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: 'amber' | 'green' | 'red' | 'custom';
  barColor?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = 'amber',
  barColor,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  const fillClass =
    variant === 'green'
      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500'
      : variant === 'red'
        ? 'bg-gradient-to-r from-red-700 to-red-400'
        : 'bg-gradient-to-r from-[var(--amber)] to-amber-400';

  return (
    <div className="h-[5px] overflow-hidden rounded-sm bg-[var(--border)]">
      <div
        className={`h-full rounded-sm transition-[width] duration-500 ease-out ${barColor ? '' : fillClass}`}
        style={{
          width: `${pct}%`,
          ...(barColor ? { background: barColor } : {}),
        }}
      />
    </div>
  );
}
