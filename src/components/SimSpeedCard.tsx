import { useTranslation } from 'react-i18next';
import type { SimSpeed } from '@/hooks/useSimulator';
import { Card } from './ui/Card';

interface SimSpeedCardProps {
  speed: SimSpeed;
  onSpeedChange: (speed: SimSpeed) => void;
}

export function SimSpeedCard({ speed, onSpeedChange }: SimSpeedCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="!p-4">
      <div className="mb-2 text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
        {t('Simulated speed')}
      </div>
      <div className="font-mono text-xl font-semibold text-[var(--text-primary)]">{speed}×</div>
      <div className="mt-2 flex gap-1.5">
        {([1, 10, 100] as SimSpeed[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSpeedChange(s)}
            className={`flex-1 cursor-pointer rounded-md border py-1 font-mono text-[10px] transition-colors disabled:cursor-not-allowed ${
              speed === s
                ? 'border-[var(--amber)] text-[var(--amber)]'
                : 'border-[var(--border2)] text-[var(--text-muted)] hover:border-slate-500'
            } bg-[var(--surface2)]`}
          >
            {s}×
          </button>
        ))}
      </div>
    </Card>
  );
}
