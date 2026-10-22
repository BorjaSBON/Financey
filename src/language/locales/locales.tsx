import { LanguageES } from './es/transalation';
import { LanguageEN } from './en/transalation';

export const Languages = {
    es: LanguageES,
    en: LanguageEN,
} as const;

export type LanguageName = keyof typeof Languages;
export type LanguagePreference = LanguageName;