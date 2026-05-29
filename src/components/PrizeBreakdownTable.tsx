import { useTranslation } from 'react-i18next';
import { fmt, fmtCount } from '@engine/fmt';
import type { PrizeTableRow } from '@/lib/simulatorStats';
import { Card, CardLabel } from './ui/Card';

interface PrizeBreakdownTableProps {
  rows: PrizeTableRow[];
  tickets: bigint;
  totalWins: number;
}

export function PrizeBreakdownTable({ rows, tickets, totalWins }: PrizeBreakdownTableProps) {
  const { t } = useTranslation();

  const formatTheorOdds = (n: number) => {
    if (n >= 1_000_000) return `1 / ${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1000) return `1 / ${n.toLocaleString()}`;
    return `1 / ${n}`;
  };

  return (
    <Card padding={false} className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] px-4 py-4 sm:px-5">
        <CardLabel>{t('Prize Breakdown')}</CardLabel>
        <span className="font-mono text-[11px] text-[var(--text-muted)]">
          {t('{{wins}} wins across {{tickets}} tickets', {
            wins: fmtCount(BigInt(totalWins)),
            tickets: fmtCount(tickets),
          })}
        </span>
      </div>
      <div className="overflow-x-auto md:overflow-x-visible">
        <table className="w-full min-w-[280px] border-collapse md:min-w-0">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--surface2)]">
              <th className="w-[38%] px-3 py-2.5 text-left font-display text-[10px] font-bold tracking-widest text-[var(--text-secondary)] uppercase sm:w-auto sm:px-4">
                {t('Category')}
              </th>
              <th className="hidden w-[18%] px-3 py-2.5 text-right font-display text-[10px] font-bold tracking-widest text-[var(--text-secondary)] uppercase sm:table-cell sm:px-4">
                {t('Prize')}
              </th>
              <th className="w-[22%] px-3 py-2.5 text-right font-display text-[10px] font-bold tracking-widest text-[var(--text-secondary)] uppercase sm:w-auto sm:px-4">
                {t('Times Won')}
              </th>
              <th className="hidden w-[18%] px-3 py-2.5 text-right font-display text-[10px] font-bold tracking-widest text-[var(--text-secondary)] uppercase md:table-cell md:px-4">
                {t('Theor. Odds')}
              </th>
              <th className="w-[40%] max-w-[108px] px-3 py-2.5 text-right font-display text-[10px] font-bold tracking-widest text-[var(--text-secondary)] uppercase sm:w-[108px] sm:px-4">
                {t('Actual Odds')}
              </th>
              <th className="hidden w-[14%] px-3 py-2.5 text-right font-display text-[10px] font-bold tracking-widest text-[var(--text-secondary)] uppercase lg:table-cell lg:px-4">
                {t('Earned')}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.category}
                className="border-b border-[var(--border)] transition-colors last:border-b-0 hover:bg-[var(--surface2)]"
              >
                <td className="px-3 py-3.5 text-left sm:px-4">
                  <div className="flex min-w-0 items-center gap-2">
                    <div
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: row.color }}
                    />
                    <span className="truncate font-mono text-[13px] font-semibold">
                      {t(row.category)}
                    </span>
                  </div>
                </td>
                <td className="hidden px-3 py-3.5 text-right font-mono text-[13px] font-medium text-[var(--emerald)] sm:table-cell sm:px-4">
                  {fmt(row.prize)}
                </td>
                <td
                  className={`px-3 py-3.5 text-right font-mono text-[15px] font-bold sm:px-4 ${row.wins === 0 ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}
                >
                  {fmtCount(BigInt(row.wins))}
                </td>
                <td className="hidden px-3 py-3.5 text-right font-mono text-xs text-[var(--text-secondary)] md:table-cell md:px-4">
                  {formatTheorOdds(row.theorOdds)}
                </td>
                <td className="w-[108px] max-w-[108px] px-3 py-3.5 text-right sm:px-4">
                  <div className="flex items-center justify-end gap-0.5 tabular-nums">
                    <span
                      className={`block w-full truncate text-right font-mono text-xs font-semibold ${row.wins === 0 ? 'text-[var(--text-muted)]' : row.performance !== null && row.performance > 0 ? 'text-[var(--emerald)]' : 'text-[var(--red)]'}`}
                      title={row.actualOdds}
                    >
                      {row.actualOdds}
                    </span>
                    {row.performance !== null && (
                      <span
                        className={`shrink-0 text-[9px] ${row.performance > 0 ? 'text-[var(--emerald)]' : 'text-[var(--red)]'}`}
                      >
                        {row.performance > 0 ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </td>
                <td
                  className={`hidden px-3 py-3.5 text-right font-mono text-xs lg:table-cell lg:px-4 ${row.earned > 0n ? 'text-[var(--emerald)]' : 'text-[var(--text-muted)]'}`}
                >
                  {row.earned > 0n ? fmt(row.earned) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
