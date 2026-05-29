import { useTranslation } from 'react-i18next';
import { fmt, fmtCount } from '@engine/fmt';
import { formatPercent } from '@/lib/simulatorStats';
import type { buildSimulatorStats } from '@/lib/simulatorStats';
import { Card } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';

type Stats = ReturnType<typeof buildSimulatorStats>;

interface ExtraStatsRowProps {
  stats: Stats;
  tickets: bigint;
}

export function ExtraStatsRow({ stats, tickets }: ExtraStatsRowProps) {
  const { t } = useTranslation();
  const perfLabel =
    stats.performanceVsOdds > 0
      ? t('Luckier than average (still losing)')
      : stats.performanceVsOdds < 0
        ? t('Unluckier than average')
        : t('On par with expected odds');

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
      <Card className="!p-4">
        <div className="mb-2 text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
          {t('Total invested (lifetime)')}
        </div>
        <div className="font-mono text-xl font-semibold text-[var(--text-primary)]">
          {fmt(stats.totalSpent)}
        </div>
      </Card>

      <Card className="!p-4">
        <div className="mb-2 text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
          {t('If invested in S&P 500 instead')}
        </div>
        <div className="font-mono text-xl font-semibold text-[var(--emerald)]">
          ~{fmt(stats.sp500Value)}
        </div>
        <div className="mt-1.5 text-[10px] text-[var(--text-muted)]">
          {t('Approx. 7% annual compounding')}
        </div>
      </Card>

      <Card className="!p-4">
        <div className="mb-2 text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
          {t('Winning tickets')}
        </div>
        <div className="font-mono text-xl font-semibold text-[var(--amber)]">
          {fmtCount(BigInt(stats.winningDraws))}{' '}
          <span className="text-[13px] text-[var(--text-muted)]">/ {fmtCount(tickets)}</span>
        </div>
        <div className="mt-2">
          <ProgressBar value={stats.winRateValue} variant="amber" />
        </div>
      </Card>

      <Card className="!p-4">
        <div className="mb-2 text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
          {t('Your performance vs odds')}
        </div>
        <div className="font-mono text-xl font-semibold text-[var(--amber)]">
          {formatPercent(stats.performanceVsOdds, true)}
        </div>
        <div className="mt-1.5 text-[10px] text-[var(--text-muted)]">{perfLabel}</div>
      </Card>

      <Card className="!p-4">
        <div className="mb-2 text-[10px] tracking-widest text-[var(--text-muted)] uppercase">
          {t('5/6 + Jackpot wins')}
        </div>
        <div className="font-mono text-xl font-semibold text-[var(--text-muted)]">
          {fmtCount(BigInt(stats.bigWins))}
        </div>
        <div className="mt-1.5 text-[10px] text-[var(--text-muted)]">
          {stats.time.years > 0
            ? stats.time.years === 1
              ? t('Over {{years}} simulated year', { years: stats.time.years })
              : t('Over {{years}} simulated years', { years: stats.time.years })
            : t('As expected over time')}
        </div>
      </Card>
    </div>
  );
}
