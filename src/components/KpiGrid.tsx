import { useTranslation } from 'react-i18next';
import { fmt, fmtCount } from '@engine/fmt';
import { Card } from './ui/Card';

interface KpiGridProps {
  balance: bigint;
  roi: string;
  tickets: bigint;
  winRate: string;
}

function KpiCard({
  label,
  value,
  sub,
  valueColor,
}: {
  label: string;
  value: string;
  sub: string;
  valueColor: string;
}) {
  return (
    <Card className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold tracking-widest text-[var(--text-secondary)] uppercase">
        {label}
      </span>
      <span className={`font-mono text-[22px] leading-none font-semibold ${valueColor}`}>
        {value}
      </span>
      <span className="mt-0.5 text-[10px] text-[var(--text-muted)]">{sub}</span>
    </Card>
  );
}

export function KpiGrid({ balance, roi, tickets, winRate }: KpiGridProps) {
  const { t } = useTranslation();
  const balanceColor =
    balance > 0n ? 'text-[var(--emerald)]' : balance < 0n ? 'text-[var(--red)]' : 'text-[var(--text-primary)]';
  const roiNegative = roi.startsWith('−') || roi.startsWith('-');

  const balanceStr = balance < 0n ? `−${fmt(-balance)}` : fmt(balance);

  return (
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard label={t('Balance')} value={balanceStr} sub={t('Net P&L')} valueColor={balanceColor} />
      <KpiCard
        label={t('Return')}
        value={roi}
        sub={t('ROI on spend')}
        valueColor={roiNegative ? 'text-[var(--red)]' : 'text-[var(--emerald)]'}
      />
      <KpiCard
        label={t('Tickets')}
        value={fmtCount(tickets)}
        sub={t('Total played')}
        valueColor="text-[var(--text-primary)]"
      />
      <KpiCard label={t('Win Rate')} value={winRate} sub={t('Any prize')} valueColor="text-[var(--amber)]" />
    </div>
  );
}
