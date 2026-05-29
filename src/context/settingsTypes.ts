export type Theme = 'light' | 'dark';
export type Language = 'en' | 'fr';

export interface SettingsContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}
