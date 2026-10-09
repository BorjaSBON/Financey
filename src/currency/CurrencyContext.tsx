import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CURRENCIES, type CurrencyCode } from '@currency/currencies';

const STORAGE_KEY = '@currency_preference';

interface CurrencyContextType {
    // Variables
    currency: CurrencyCode;
    currencyInfo: (typeof CURRENCIES)[CurrencyCode];
    loading: boolean;

    // Methods
    setCurrency: (currency: CurrencyCode) => Promise<void>;
};

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode; }) {
    const [currency, setCurrencyState] = useState<CurrencyCode>('EUR');
    const [loading, setLoading] = useState(true);

    // Cargar la moneda guardada al iniciar.
    useEffect(() => {
        let active = true;

        async function loadCurrency() {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);

                if (active && saved && Object.hasOwn(CURRENCIES, saved)) {
                    setCurrencyState(saved as CurrencyCode);
                }
            } catch (error) {
                console.error('Error while loading currency:', error);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadCurrency();

        return () => { active = false; };
    }, []);

    // Change the currency and save it to AsyncStorage
    const setCurrency = useCallback(
        async (newCurrency: CurrencyCode) => {
            await AsyncStorage.setItem(STORAGE_KEY, newCurrency);
            setCurrencyState(newCurrency);
        },
        [],
    );

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                currencyInfo: CURRENCIES[currency],
                loading,
                setCurrency,
            }}
        >
            { children }
        </CurrencyContext.Provider>
    );
}