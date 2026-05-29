import { useTranslation } from 'react-i18next';
import { fmt } from '@engine/fmt';
import { formatPercent } from '@/lib/simulatorStats';
import type { buildSimulatorStats } from '@/lib/simulatorStats';
import { Card, SectionHeader } from './ui/Card';
import { InsightRow } from './ui/InsightRow';

type Stats = ReturnType<typeof buildSimulatorStats>;

interface KeyInsightsCardProps {
  stats: Stats;
  tickets: bigint;
}

export function KeyInsightsCard({ stats, tickets }: KeyInsightsCardProps) {
  const { t } = useTranslation();

  const formatOdds = (n: number) => {
    if (n >= 1_000_000) return t('1 in {{n}}M', { n: (n / 1_000_000).toFixed(1) });
    if (n >= 1000) return t('1 in {{n}}', { n: n.toLocaleString() });
    return t('1 in {{n}}', { n });
  };

  const jackpotPace =
    stats.jackpotYears === Infinity || stats.jackpotYears > 999_999
      ? '∞'
      : t('≈{{years}} yrs', { years: stats.jackpotYears.toLocaleString() });

  return (
    <Card>
      <SectionHeader title={t('Key Insights')} />
      <InsightRow
        label={t('Avg. prize per win')}
        help={t('Total winnings divided by the number of draws where you won any prize.')}
        value={stats.avgPrizePerWin > 0n ? fmt(stats.avgPrizePerWin) : '-'}
        valueClassName="text-[var(--amber)]"
      />
      <InsightRow
        label={t('Cost per any win')}
        help={t('Total spent on tickets divided by how many draws produced at least one prize.')}
        value={stats.costPerWin > 0n ? fmt(stats.costPerWin) : '-'}
      />
      <InsightRow
        label={t('Best single win')}
        help={t('The largest prize amount credited on a single draw in this simulation.')}
        value={stats.maxPrize > 0n ? fmt(stats.maxPrize) : '-'}
        valueClassName="text-[var(--emerald)]"
      />
      <InsightRow
        label={t('Worst losing streak')}
        help={t('The longest consecutive run of draws where you did not win any prize.')}
        value={t('{{count}} draws', { count: stats.worstLosing })}
        valueClassName="text-[var(--red)]"
      />
      <InsightRow
        label={t('Best winning streak')}
        help={t('The longest consecutive run of draws where you won a prize each time.')}
        value={t('{{count}} draws', { count: stats.bestWinning })}
        valueClassName="text-[var(--emerald)]"
      />
      <InsightRow
        label={t('Avg spend / year')}
        help={t('Total ticket cost divided by simulated years elapsed (one draw every seven simulated days).')}
        value={fmt(stats.avgSpendPerYear)}
      />
      <InsightRow
        label={t('Expected ROI')}
        help={t('Theoretical return from published odds and fixed payouts, assuming random play over the long run.')}
        value={formatPercent(stats.expectedRoi, true)}
        valueClassName="text-[var(--red)]"
      />
      <InsightRow
        label={t('Your ROI vs Expected')}
        help={t('Your actual return on spend minus the theoretical expected ROI. Positive means you beat the odds (for now).')}
        value={stats.roiVsExpected}
        valueClassName={
          stats.roiVsExpected.startsWith('+') ? 'text-[var(--emerald)]' : 'text-[var(--red)]'
        }
      />
      <InsightRow
        label={t('Jackpot odds')}
        help={t('Published approximate odds of matching all six main numbers (6/6 jackpot tier).')}
        value={formatOdds(stats.jackpotOdds)}
        valueClassName="text-[var(--text-secondary)] text-[11px]"
      />
      <InsightRow
        label={t('Jackpot in')}
        help={t('A rough estimate of years until a jackpot if your current play rate and luck stayed the same. Not a prediction.')}
        value={tickets > 0n ? jackpotPace : '-'}
        valueClassName="text-[var(--text-muted)] text-[11px]"
      />
    </Card>
  );
}
