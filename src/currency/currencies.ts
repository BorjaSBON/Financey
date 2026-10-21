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
    GBP: {
        code: 'GBP',
        name: 'Pound',
        symbol: '£',
        locale: 'en-GB',
    },
    JPY: {
        code: 'JPY',
        name: 'Yen',
        symbol: '¥',
        locale: 'ja-JP',
    },
    KRW: {
        code: 'KRW',
        name: 'Won',
        symbol: '₩',
        locale: 'ko-KR',
    },
    RUB: {
        code: 'RUB',
        name: 'Ruble',
        symbol: '₽',
        locale: 'ru-RU',
    },
    PHP: {
        code: 'PHP',
        name: 'Peso',
        symbol: '₱',
        locale: 'en-PH',
    },
    INR: {
        code: 'INR',
        name: 'Rupia',
        symbol: '₹',
        locale: 'en-IN',
    },
} as const;

export type CurrencyCode = keyof typeof CURRENCIES;