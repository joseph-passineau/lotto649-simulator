import { useTranslation } from 'react-i18next';
import { fmtCount } from '@engine/fmt';
import { computeTimeUnits } from '@/lib/simulatorStats';
import { Card, Divider, SectionHeader } from './ui/Card';

type TimeUnits = ReturnType<typeof computeTimeUnits>;

interface TimeSimulatedCardProps {
  time: TimeUnits;
}

function TimeCell({ value, label }: { value: bigint; label: string }) {
  return (
    <div>
      <div className="font-mono text-[17px] font-semibold text-[var(--text-primary)]">
        {fmtCount(value)}
      </div>
      <div className="mt-0.5 text-[9px] tracking-widest text-[var(--text-muted)] uppercase">
        {label}
      </div>
    </div>
  );
}

export function TimeSimulatedCard({ time }: TimeSimulatedCardProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <SectionHeader title={t('Time Simulated')} />
      <div className="mb-1 flex items-baseline gap-1.5">
        <span className="font-mono text-[44px] leading-none font-semibold text-[var(--text-primary)]">
          {time.years}
        </span>
        <span className="text-[13px] font-semibold tracking-wide text-[var(--text-secondary)] uppercase">
          {t('yrs')}
        </span>
      </div>
      <Divider />
      <div className="mt-3 grid grid-cols-2 gap-3 max-md:grid-cols-4">
        <TimeCell value={time.days} label={t('Days')} />
        <TimeCell value={BigInt(time.weeks)} label={t('Weeks')} />
        <TimeCell value={BigInt(time.months)} label={t('Months')} />
        <TimeCell value={BigInt(time.decades)} label={t('Decades')} />
      </div>
      {(time.centuries > 0 || time.millennia > 0) && (
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[var(--border)] pt-3">
          {time.centuries > 0 && <TimeCell value={BigInt(time.centuries)} label={t('Centuries')} />}
          {time.millennia > 0 && <TimeCell value={BigInt(time.millennia)} label={t('Millennia')} />}
        </div>
      )}
    </Card>
  );
}
