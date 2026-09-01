import type { Message } from '@/data/chats';
import type { LanguageCode } from '@/data/languages';
import { languageByCode } from '@/data/languages';

/**
 * Mock translation lookup. Messages ship with pre-translated copies so the
 * UI can demonstrate the ToneTranslate flow without a live translation API.
 * Swap this out for a real backend call when one is available.
 */
export function translateFor(message: Message, targetLang: LanguageCode) {
  if (message.lang === targetLang) {
    return { text: message.text, wasTranslated: false };
  }
  const translated = message.translations[targetLang];
  if (translated) {
    return { text: translated, wasTranslated: true };
  }
  return {
    text: `[${languageByCode(targetLang).nameJa}への翻訳は準備中] ${message.text}`,
    wasTranslated: true,
  };
}
