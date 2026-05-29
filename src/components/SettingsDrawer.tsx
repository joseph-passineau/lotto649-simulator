import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { useSettings } from '@/context/useSettings';
import type { Language, Theme } from '@/context/settingsTypes';

export function SettingsDrawer() {
  const { t } = useTranslation();
  const { theme, setTheme, language, setLanguage, settingsOpen, closeSettings } = useSettings();

  if (!settingsOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-label={t('Close settings')}
        onClick={closeSettings}
      />
      <aside className="relative flex h-full w-full max-w-sm flex-col border-l border-[var(--border)] bg-[var(--surface)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <h2 className="font-mono text-lg font-extrabold tracking-wide text-[var(--text-primary)]">
            {t('Settings')}
          </h2>
          <button
            type="button"
            onClick={closeSettings}
            className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--surface2)]"
            aria-label={t('Close settings')}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-5">
          <section>
            <h3 className="mb-3 text-[10px] font-bold tracking-widest text-[var(--text-secondary)] uppercase">
              {t('Appearance')}
            </h3>
            <label className="mb-2 block text-xs text-[var(--text-secondary)]">{t('Theme')}</label>
            <div className="flex gap-2">
              {(['dark', 'light'] as Theme[]).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setTheme(opt)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition-colors ${
                    theme === opt
                      ? 'border-[var(--amber)] bg-amber-500/10 text-[var(--amber)]'
                      : 'border-[var(--border2)] text-[var(--text-secondary)] hover:border-slate-500'
                  }`}
                >
                  {opt === 'dark' ? t('dark') : t('light')}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="mb-3 text-[10px] font-bold tracking-widest text-[var(--text-secondary)] uppercase">
              {t('Language')}
            </h3>
            <div className="flex gap-2">
              {(
                [
                  { id: 'en' as Language, label: t('English') },
                  { id: 'fr' as Language, label: t('French') },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLanguage(opt.id)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    language === opt.id
                      ? 'border-[var(--amber)] bg-amber-500/10 text-[var(--amber)]'
                      : 'border-[var(--border2)] text-[var(--text-secondary)] hover:border-slate-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
