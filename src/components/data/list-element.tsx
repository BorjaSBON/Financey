import { View, StyleSheet, Pressable } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { useCurrency } from '@currency/useCurrency';

import { ThemedText } from '@ui/themed-text';

import Filter from '@assets/filter.svg';
import Add from '@assets/add.svg';

interface TransactionProps {
    // Variables
    type: string;
    category: string;
    value: number;
    date: string;

    // Methods
    onPress?: () => void;
}

interface NewTransactionProp {
    // Methods
    onPress?: () => void;
}

interface TransactionHeaderProp {
    // Variables
    title: string;
}

export function TransactionElement({ type, category, value, date, onPress }: TransactionProps) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Currency
    const { currencyInfo } = useCurrency();

    // Function to transform the values in readable text
    function ReadableNumber(value: number) {
        return (value / 100).toLocaleString('de-DE').replace(',', '\'');
    }

    // Get the formatted date
    const dateFormatted = new Date(date).toLocaleDateString('en-GB');

    // Color of the money depending on the type of data
    const valueColor = type=='income' ? styles.positive : styles.negative;

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.transactionElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <View style={ styles.transactionHeader }>
                <ThemedText style={ styles.category } weight='light'>{ category }</ThemedText>
                <ThemedText style={[ styles.value, valueColor ]} weight='medium'>
                    { ReadableNumber(value) }
                    <ThemedText style={[ styles.unit, valueColor ]} weight='light'> { currencyInfo.symbol }</ThemedText>
                </ThemedText>
            </View>
            
            <ThemedText style={ styles.date } weight='light'>{ dateFormatted }</ThemedText>
        </Pressable>
    );
}

export function NewTransaction({ onPress }: NewTransactionProp) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.actionElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <Add style={ styles.actionIcon } color={ colors.iconBackground } />
            <ThemedText style={ styles.title } weight='light'>Add new transaction</ThemedText>
        </Pressable>
    );
}

export function TransactionHeader({ title }: TransactionHeaderProp) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={ styles.headerElement }>
            <View style={ styles.divider } />
            <ThemedText style={ styles.header } weight='regular'>{ title }</ThemedText>
            <View style={ styles.divider } />
        </View>
    );
}

export function FilterTransactions({ onPress }: NewTransactionProp) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.actionElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <Filter style={ styles.actionIcon } color={ colors.iconBackground } />
            <ThemedText style={ styles.title } weight='light'>Filter</ThemedText>
        </Pressable>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        transactionElement: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 0,
            alignItems: 'flex-start',
            width: '100%',
            minHeight: 36,
            paddingVertical: 6,
            paddingHorizontal: Values.paddingElement,
        },

        actionElement: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            minHeight: 30,
            paddingVertical: 2,
            paddingHorizontal: 10,
            columnGap: 5,
        },

        headerElement: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: 36,
            paddingHorizontal: Values.paddingElement,
        },

        letter: {
            margin: 'auto',
            fontSize: 14,
        },

        title: {
            fontSize: 14,
        },

        transactionHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },

        category: {
            fontSize: 13,
        },

        value: {
            fontSize: 13,
            height: '100%',
            textAlignVertical: 'bottom',
        },

        unit: {
            fontSize: 9,
        },

        positive: {
            color: colors.positive,
        },
        negative: {
            color: colors.negative,
        },

        date: {
            fontSize: 10,
            color: colors.fontSecondary,
        },

        actionIcon: {
            transform: [{ scale: 0.6 }]
        },

        header: {
            fontSize: 14,
        },

        divider: {
            backgroundColor: colors.hoverElement,
            height: 1,
            width: '100%',
            borderRadius: 2,
        },
    }
);
