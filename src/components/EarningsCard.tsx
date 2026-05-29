import { useTranslation } from 'react-i18next';
import { fmt } from '@engine/fmt';
import { Card, SectionHeader } from './ui/Card';
import { InfoPopover } from './ui/InfoPopover';
import { ProgressBar } from './ui/ProgressBar';

interface EarningsCardProps {
  totalSpent: bigint;
  totalWon: bigint;
  balance: bigint;
  recoveryPct: string;
  recoveryPctValue: number;
  breakEvenRemaining: bigint;
}

export function EarningsCard({
  totalSpent,
  totalWon,
  balance,
  recoveryPct,
  recoveryPctValue,
  breakEvenRemaining,
}: EarningsCardProps) {
  const { t } = useTranslation();
  const netColor =
    balance > 0n ? 'text-[var(--emerald)]' : balance < 0n ? 'text-[var(--red)]' : 'text-[var(--text-primary)]';
  const netStr = balance < 0n ? `−${fmt(-balance)}` : fmt(balance);

  return (
    <Card>
      <SectionHeader title={t('Earnings Breakdown')} />
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="mb-1.5 text-[10px] tracking-wide text-[var(--text-muted)] uppercase">
            {t('Spent')}
          </div>
          <div className="font-mono text-lg font-semibold text-[var(--text-primary)]">
            {fmt(totalSpent)}
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[10px] tracking-wide text-[var(--text-muted)] uppercase">
            {t('Won')}
          </div>
          <div className="font-mono text-lg font-semibold text-[var(--emerald)]">
            {fmt(totalWon)}
          </div>
        </div>
        <div>
          <div className="mb-1.5 text-[10px] tracking-wide text-[var(--text-muted)] uppercase">
            {t('Net')}
          </div>
          <div className={`font-mono text-lg font-semibold ${netColor}`}>{netStr}</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-[10px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            {t('Recovery ratio')}
            <InfoPopover content={t('Recovery ratio help')} />
          </span>
          <span className="font-mono text-[var(--emerald)]">{recoveryPct}</span>
        </div>
        <ProgressBar value={recoveryPctValue} variant="green" />
        <div className="mt-1 flex justify-between text-[9px] text-[var(--text-muted)]">
          <span>$0</span>
          <span>
            {breakEvenRemaining > 0n
              ? t('Break-even remaining', { amount: fmt(breakEvenRemaining) })
              : t('Break-even reached')}
          </span>
        </div>
      </div>
    </Card>
  );
}
