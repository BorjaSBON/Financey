import { StyleSheet, Pressable } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors, ThemePreference } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';
import { ThemedSelectInputMini } from '@ui/themed-select-input-mini';
import { useCurrency } from '@/src/currency/useCurrency';

type ThemeSelectItem = {
    label: string;
    value: ThemePreference;
};

interface Props {
    title: string;
}

export function ConfElementSelect({ title }: Props) {
    // Theme
    const { colors, themePreference, setThemePreference } = useTheme();
    const styles = createStyles(colors);

    // Select data
    let valueSelect: ThemePreference = themePreference;
    let dataSelect: ThemeSelectItem[] = [
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'System', value: 'system' },
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
            <ThemedText style={styles.title} weight='light'>{ title }</ThemedText>
            <ThemedSelectInputMini data={ dataSelect } value={ valueSelect } onSelect={ onSelect }/>
        </Pressable>
    );
}

type CurrencyCode = 'EUR' | 'USD' | 'JPY' | 'RUB';
type CurrencySelectItem = {
    label: string;
    value: CurrencyCode;
};

export function ConfCurrencySelect() { 
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Currency
    const { currency, setCurrency } = useCurrency();
    const dataSelect: CurrencySelectItem[] = [ 
        { label: '€', value: 'EUR' },
        { label: '$', value: 'USD' },
        { label: '¥', value: 'JPY' },
        { label: '₽', value: 'RUB' },
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
            <ThemedText style={ styles.title } weight="light">Currency</ThemedText>
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
            paddingTop: 6,
            paddingBottom: 6,
            paddingHorizontal: Values.paddingElement,
        },

        title: {
            fontSize: 14,
            color: colors.fontPrimary,
        },
    });