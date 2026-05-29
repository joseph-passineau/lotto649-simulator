import { useTranslation } from 'react-i18next';
import sortBy from 'lodash/sortBy';
import type { Lottery } from '@engine/Lottery';
import type { Ticket } from '@engine/Ticket';
import { fmtCount } from '@engine/fmt';
import { getPrizeCategory } from '@/lib/simulatorStats';
import { Ball } from './ui/Ball';
import { Card, SectionHeader } from './ui/Card';

interface LatestDrawCardProps {
  lottery: Lottery;
  ticket: Ticket;
  tickets: bigint;
}

export function LatestDrawCard({ lottery, ticket, tickets }: LatestDrawCardProps) {
  const { t } = useTranslation();
  const draw = lottery.result;
  const prize = getPrizeCategory(ticket, draw, lottery);

  return (
    <Card>
      <SectionHeader
        title={t('Latest Draw')}
        action={
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              {t('Draw #{{n}}', { n: fmtCount(tickets) })}
            </span>
            {tickets > 0n && (
              <span
                className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                  prize.isWin
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-[var(--emerald)]'
                    : 'border-red-500/20 bg-red-500/10 text-[var(--red)]'
                }`}
              >
                {prize.categoryIndex === 6 ? t('JACKPOT!') : prize.resultLabel}
              </span>
            )}
          </div>
        }
      />
      {draw ? (
        <>
          <div className="animate-slide-up flex flex-wrap items-center gap-2">
            {sortBy(draw.numbers).map((n) => (
              <Ball
                key={n}
                size="lg"
                variant={ticket.numbers.includes(n) ? 'matched' : 'blue'}
              >
                {n}
              </Ball>
            ))}
            <div className="mx-1 hidden h-[52px] w-px shrink-0 self-center bg-[var(--border)] sm:block" />
            <div className="relative flex size-[52px] shrink-0 items-center justify-center">
              <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-widest text-[var(--text-muted)] uppercase">
                {t('Bonus')}
              </span>
              <Ball
                size="lg"
                variant={ticket.numbers.includes(draw.bonus) ? 'matched' : 'bonus'}
              >
                {draw.bonus}
              </Ball>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[var(--border)] pt-3">
            <span className="text-[11px] text-[var(--text-muted)]">{t('Matched')}</span>
            <span className="font-mono text-[13px] font-semibold text-[var(--amber)]">
              {t('{{count}} of 6', { count: prize.matchCount })}
            </span>
            <span className="ml-1.5 text-[11px] text-[var(--text-muted)]">→ {t('Prize category')}</span>
            <span className="text-[11px] font-semibold text-slate-400">
              {prize.category === '-' || prize.category === 'No match'
                ? t(prize.category === '-' ? '-' : 'No match')
                : t(prize.category)}
            </span>
          </div>
        </>
      ) : (
        <p className="text-sm text-[var(--text-secondary)]">{t('Start simulation to draw')}</p>
      )}
    </Card>
  );
}
