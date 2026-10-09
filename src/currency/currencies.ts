export const CURRENCIES = {
    EUR: {
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
        locale: 'es-ES',
    },
    USD: {
        code: 'USD',
        name: 'Dolar',
        symbol: '$',
        locale: 'en-US',
    },
    JPY: {
        code: 'JPY',
        name: 'Yen',
        symbol: '¥',
        locale: 'ja-JP',
    },
    RUB: {
        code: 'RUB',
        name: 'Ruble',
        symbol: '₽',
        locale: 'ru-RU',
    },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;