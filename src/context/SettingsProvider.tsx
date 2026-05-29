import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import i18n from '@/i18n';
import { SettingsContext } from './settingsContext';
import type { Language, Theme } from './settingsTypes';

function readTheme(): Theme {
  const stored = localStorage.getItem('lotto649-theme');
  return stored === 'light' ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('light', theme === 'light');
  root.classList.toggle('dark', theme === 'dark');
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => readTheme());
  const [language, setLanguageState] = useState<Language>(
    () => (i18n.language?.startsWith('fr') ? 'fr' : 'en'),
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('lotto649-theme', theme);
  }, [theme]);

  useEffect(() => {
    void i18n.changeLanguage(language);
    dayjs.locale(language === 'fr' ? 'fr' : 'en');
    localStorage.setItem('lotto649-language', language);
  }, [language]);

  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const setLanguage = useCallback((lng: Language) => setLanguageState(lng), []);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      language,
      setLanguage,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [theme, language, settingsOpen, setTheme, setLanguage],
  );

  useEffect(() => {
    applyTheme(readTheme());
    dayjs.locale(i18n.language?.startsWith('fr') ? 'fr' : 'en');
  }, []);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
