import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Zap } from 'lucide-react';
import type { Ticket } from '@engine/Ticket';
import type { Lottery } from '@engine/Lottery';
import type { FixedLengthArray } from '@engine/types';
import { fmt } from '@engine/fmt';
import { Ball } from './ui/Ball';
import { Card, SectionHeader } from './ui/Card';
import { PickTicketDialog } from './PickTicketDialog';

interface YourNumbersCardProps {
  ticket: Ticket;
  lottery: Lottery;
  onTicketChange: (numbers: FixedLengthArray<[number, number, number, number, number, number]>) => void;
  onRandom: () => void;
  disabled?: boolean;
}

export function YourNumbersCard({
  ticket,
  lottery,
  onTicketChange,
  onRandom,
  disabled,
}: YourNumbersCardProps) {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const draw = lottery.result;
  const drawNumbers = draw ? [...draw.numbers] : [];

  return (
    <>
      <Card>
        <SectionHeader
          title={t('Your Numbers')}
          action={
            <button
              type="button"
              onClick={onRandom}
              disabled={disabled}
              className="flex cursor-pointer items-center gap-1 text-[11px] font-semibold tracking-wide text-[var(--amber)] uppercase transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Zap size={12} />
              {t('RANDOM')}
            </button>
          }
        />
        <div className="flex min-h-[52px] flex-wrap items-center gap-1.5">
          {ticket.numbers.map((n) => {
            const matched = drawNumbers.includes(n);
            return (
              <Ball key={n} variant={matched ? 'matched' : 'green'} size="lg">
                {n}
              </Ball>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3">
          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            disabled={disabled}
            className="cursor-pointer text-xs font-semibold text-[var(--amber)] hover:underline disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t('Edit numbers')}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--text-secondary)]">{t('Ticket price')}</span>
            <span className="font-mono text-sm font-semibold text-[var(--amber)]">
              {fmt(lottery.ticketPrice)}
            </span>
          </div>
        </div>
      </Card>
      <PickTicketDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        save={onTicketChange}
        disabled={disabled}
      />
    </>
  );
}
