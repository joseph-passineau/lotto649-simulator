import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useTranslation } from 'react-i18next';
import { Pause, Play, RotateCcw, Settings } from 'lucide-react';
import { useSettings } from '@/context/useSettings';
import { LiveDot } from './ui/LiveDot';
import { PlayButton, ResetButton, SecondaryButton } from './ui/Buttons';

dayjs.extend(localizedFormat);

interface HeaderProps {
  isRunning: boolean;
  days: bigint;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function Header({ isRunning, days, onPlay, onPause, onReset }: HeaderProps) {
  const { t } = useTranslation();
  const { openSettings, language } = useSettings();
  const simulatedDate = dayjs()
    .locale(language)
    .add(Number(days), 'day')
    .format('MMMM YYYY');
  const status = isRunning ? t('RUNNING') : days > 0n ? t('PAUSED') : t('IDLE');

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-[60px] max-w-[1600px] items-center gap-4 px-5">
        <div className="flex shrink-0 items-center gap-2.5">
          <img
            src="/pwa-64x64.png"
            alt={t('Lotto 6/49')}
            width={34}
            height={34}
            className="size-[34px] shrink-0 rounded-[10px]"
          />
          <div className="hidden sm:block">
            <div className="font-mono text-lg font-extrabold tracking-widest text-[var(--text-primary)] leading-none">
              {t('LOTTO SIMULATOR')}
            </div>
            <div className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase">
              {t('Loto Québec 6/49')}
            </div>
          </div>
        </div>

        <div className="hidden h-7 w-px bg-[var(--border)] sm:block" />

        <div className="flex flex-wrap items-center gap-2">
          <PlayButton icon={<Play size={12} fill="currentColor" />} onClick={onPlay} disabled={isRunning}>
            {t('PLAY')}
          </PlayButton>
          <SecondaryButton icon={<Pause size={12} fill="currentColor" />} onClick={onPause} disabled={!isRunning}>
            <span className="hidden sm:inline">{t('PAUSE')}</span>
          </SecondaryButton>
          <ResetButton icon={<RotateCcw size={12} />} onClick={onReset}>
            <span className="hidden sm:inline">{t('RESET')}</span>
          </ResetButton>
        </div>

        <div className="flex-1" />

        <div className="hidden shrink-0 text-right sm:block">
          <div className="font-mono text-[15px] font-semibold text-[var(--amber)]">
            {simulatedDate}
          </div>
          <div className="mt-0.5 flex items-center justify-end gap-1.5">
            <span className="text-[9px] tracking-widest text-[var(--text-muted)] uppercase">
              {t('Simulated')}
            </span>
            <LiveDot running={isRunning} />
            <span className="text-[11px] tracking-widest text-[var(--text-secondary)] uppercase">
              {status}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={openSettings}
          className="shrink-0 rounded-lg border border-[var(--border2)] p-2 text-[var(--text-secondary)] transition-colors hover:border-slate-500 hover:text-[var(--text-primary)]"
          aria-label={t('Settings')}
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
