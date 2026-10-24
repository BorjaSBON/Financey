import { StyleSheet, Pressable } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors, ThemePreference } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useCurrency } from '@currency/useCurrency';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';
import { ThemedSelectInputMini } from '@ui/themed-select-input-mini';

type ThemeSelectItem = {
    label: string;
    value: ThemePreference;
};

export function ConfThemeSelect() {
    // Theme
    const { colors, themePreference, setThemePreference } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Select data
    let valueSelect: ThemePreference = themePreference;
    let dataSelect: ThemeSelectItem[] = [
        { label: languages['light'], value: 'light' },
        { label: languages['dark'], value: 'dark' },
        { label: languages['system'], value: 'system' },
    ];

    const onSelect = (item: ThemeSelectItem) => {
        setThemePreference(item.value);
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.informationElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
        >
            <ThemedText style={styles.title} weight='regular'>{ languages['theme'] }</ThemedText>
            <ThemedSelectInputMini data={ dataSelect } value={ valueSelect } onSelect={ onSelect }/>
        </Pressable>
    );
}

type LanguageCode = 'en' | 'es';
type LanguageSelectItem = {
    label: string;
    value: LanguageCode;
};

export function ConfLanguageSelect() { 
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Languages
    const { languages, languagePreference, setLanguagePreference } = useLanguage();
    const dataSelect: LanguageSelectItem[] = [ 
        { label: 'EN', value: 'en' },
        { label: 'ES', value: 'es' },
    ];

    const onSelect = (item: LanguageSelectItem) => { 
        setLanguagePreference(item.value);
    };

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.informationElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]} 
        >
            <ThemedText style={ styles.title } weight="regular">{ languages['language'] }</ThemedText>
            <ThemedSelectInputMini data={ dataSelect } value={ languagePreference } widthInput={ 50 } onSelect={ onSelect } />
        </Pressable> 
    );
}

type CurrencyCode = 'EUR' | 'USD' | 'GBP' | 'JPY' | 'KRW' | 'RUB' | 'PHP' | 'INR';
type CurrencySelectItem = {
    label: string;
    value: CurrencyCode;
};

export function ConfCurrencySelect() { 
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Currency
    const { currency, setCurrency } = useCurrency();
    const dataSelect: CurrencySelectItem[] = [ 
        { label: '€', value: 'EUR' },
        { label: '$', value: 'USD' },
        { label: '£', value: 'GBP' },
        { label: '¥', value: 'JPY' },
        { label: '₩', value: 'KRW' },
        { label: '₽', value: 'RUB' },
        { label: '₱', value: 'PHP' },
        { label: '₹', value: 'INR' },
    ];

    const onSelect = (item: CurrencySelectItem) => { 
        setCurrency(item.value);
    };

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.informationElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]} 
        >
            <ThemedText style={ styles.title } weight="regular">{ languages['currency'] }</ThemedText>
            <ThemedSelectInputMini data={ dataSelect } value={ currency } widthInput={ 40 } onSelect={ onSelect } />
        </Pressable> 
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        informationElement: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 0,
            height: 34,
            paddingHorizontal: Values.paddingElement,
        },

        title: {
            fontSize: 14,
            color: colors.fontPrimary,
        },
    });