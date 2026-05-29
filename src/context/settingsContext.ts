import { createContext } from 'react';
import type { SettingsContextValue } from './settingsTypes';

export const SettingsContext = createContext<SettingsContextValue | null>(null);
