import React, { createContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';

import { Languages, LanguageName, LanguagePreference } from '@language/locales/locales';

const LANGUAGE_STORAGE_KEY = '@language_preference';

interface LanguageContextType {
    // Variables
    languagePreference: LanguagePreference;
    resolvedLanguage: LanguageName;
    languages: typeof Languages.es;

    // Methods
    setLanguagePreference: (preference: LanguagePreference) => Promise<void>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode; }) {
    const systemLanguage = getLocales()[0].languageCode;

    const [languagePreference, setLanguagePreferenceState] = useState<LanguagePreference>('en');

    useEffect(() => {
        loadLanguagePreference();
    }, []);

    const loadLanguagePreference = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

            if ( 
                savedLanguage === 'es' || 
                savedLanguage === 'en'
            ) {
                setLanguagePreferenceState(savedLanguage);
            }
        } catch (error) {
            console.error('Error loading language preference:', error);
        }
    };

    const setLanguagePreference = async (preference: LanguagePreference) => {
        try {
            setLanguagePreferenceState(preference);

            await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, preference);
        } catch (error) {
            console.error('Error saving language preference:', error);
        }
    };

    const resolvedLanguage: LanguageName = (languagePreference === 'es' || languagePreference === 'en') ? languagePreference : (systemLanguage === 'es') ? 'es' : 'en';

    const languages = useMemo(() => Languages[resolvedLanguage],[resolvedLanguage]);

    return (
        <LanguageContext.Provider
            value={{
                languagePreference,
                resolvedLanguage,
                languages,
                setLanguagePreference,
            }}
        >
            { children }
        </LanguageContext.Provider>
    );
}