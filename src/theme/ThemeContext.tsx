import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Themes, ThemeName, ThemePreference } from '@theme/colors';

const THEME_STORAGE_KEY = '@theme_preference';

interface ThemeContextType {
    // Variables
    themePreference: ThemePreference;
    resolvedTheme: ThemeName;
    colors: typeof Themes.light;

    // Methods
    setThemePreference: (preference: ThemePreference) => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode; }) {
    const systemTheme = useColorScheme();

    const [themePreference, setThemePreferenceState] =
        useState<ThemePreference>('system');

    useEffect(() => {
        loadThemePreference();
    }, []);


    const loadThemePreference = async () => {
        try {
            const savedTheme =
                await AsyncStorage.getItem(
                    THEME_STORAGE_KEY
                );

            if (
                savedTheme === 'light' ||
                savedTheme === 'dark' ||
                savedTheme === 'system'
            ) {
                setThemePreferenceState(savedTheme);
            }
        } catch (error) {
            console.error(
                'Error loading theme preference:',
                error
            );
        }
    };


    const setThemePreference = async (preference: ThemePreference) => {
        try {
            setThemePreferenceState(preference);

            await AsyncStorage.setItem(
                THEME_STORAGE_KEY,
                preference
            );
        } catch (error) {
            console.error(
                'Error saving theme preference:',
                error
            );
        }
    };


    const resolvedTheme: ThemeName =
        themePreference === 'system'
            ? systemTheme === 'dark'
                ? 'dark'
                : 'light'
            : themePreference;

    const colors = useMemo(() => Themes[resolvedTheme],[resolvedTheme]);

    return (
        <ThemeContext.Provider
            value={{
                themePreference,
                resolvedTheme,
                colors,
                setThemePreference,
            }}
        >
            { children }
        </ThemeContext.Provider>
    );
}