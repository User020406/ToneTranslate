export type LanguageCode = 'ja' | 'en' | 'ko' | 'zh' | 'es';

export type Language = {
  code: LanguageCode;
  flag: string;
  nameJa: string;
  nameNative: string;
  supported: boolean;
};

export const LANGUAGES: Language[] = [
  { code: 'ja', flag: '🇯🇵', nameJa: '日本語', nameNative: '日本語', supported: true },
  { code: 'en', flag: '🇺🇸', nameJa: '英語', nameNative: 'English', supported: true },
  { code: 'ko', flag: '🇰🇷', nameJa: '韓国語', nameNative: '한국어', supported: true },
  { code: 'zh', flag: '🇨🇳', nameJa: '中国語', nameNative: '中文', supported: true },
  { code: 'es', flag: '🇪🇸', nameJa: 'スペイン語', nameNative: 'Español', supported: true },
];

export function languageByCode(code: LanguageCode): Language {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
