import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { LanguageCode } from '@/data/languages';

export type DisplayMode = 'auto' | 'both' | 'orig';

type SettingsState = {
  nativeLanguage: LanguageCode;
  displayLanguage: LanguageCode;
  noTranslateLanguage: LanguageCode;
  defaultMode: DisplayMode;
  languagePriority: LanguageCode[];
};

type SettingsContextValue = SettingsState & {
  setNativeLanguage: (lang: LanguageCode) => void;
  setDisplayLanguage: (lang: LanguageCode) => void;
  setNoTranslateLanguage: (lang: LanguageCode) => void;
  setDefaultMode: (mode: DisplayMode) => void;
};

const defaultState: SettingsState = {
  nativeLanguage: 'ja',
  displayLanguage: 'ja',
  noTranslateLanguage: 'en',
  defaultMode: 'auto',
  languagePriority: ['ja', 'en', 'ko', 'zh', 'es'],
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SettingsState>(defaultState);

  const value = useMemo<SettingsContextValue>(
    () => ({
      ...state,
      setNativeLanguage: (lang) => setState((s) => ({ ...s, nativeLanguage: lang })),
      setDisplayLanguage: (lang) => setState((s) => ({ ...s, displayLanguage: lang })),
      setNoTranslateLanguage: (lang) => setState((s) => ({ ...s, noTranslateLanguage: lang })),
      setDefaultMode: (mode) => setState((s) => ({ ...s, defaultMode: mode })),
    }),
    [state],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
