import { LanguageES } from './es/translation';
import { LanguageEN } from './en/translation';

export const Languages = {
    es: LanguageES,
    en: LanguageEN,
} as const;

export type LanguageName = keyof typeof Languages;
export type LanguagePreference = LanguageName;