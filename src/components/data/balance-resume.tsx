import { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { useCurrency } from '@currency/useCurrency';

import { ThemedText } from '@ui/themed-text';

import { useTransactions } from '@/src/hooks/useTransactions';

interface Props {
    // Variables
    squareEnable?: boolean,
    from?: string,
    to?: string,
}

export default function BalanceResume({ squareEnable=false, from='0000-01-01T00:00:00.000Z', to='9999-12-31T23:59:59.999Z' }: Props) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Currency
    const { currencyInfo } = useCurrency();

    // Database
    const { getBalance, loadingTransactions } = useTransactions();

    // Variables
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        const loadBalance = async () => {
            const balance = await getBalance(from, to);

            setIncome(balance.income);
            setExpense(balance.expense);
        };

        loadBalance();
    }, [getBalance, from, to]);

    // Function to transform the values in readable text
    function ReadableNumber(value: number) {
        return (value / 100).toLocaleString('de-DE').replace(',', '\'');
    }

    // Calculate the balance
    const balance = Number((income - expense).toFixed(2));
    const balanceColor = balance >= 0 ? styles.positive : styles.negative;

    // Check if the transactions are laoded
    if (loadingTransactions) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.sections }>
                <View style={ styles.section }>
                    <View style= { styles.titleRow }>
                        { squareEnable === true && <View style={[ styles.square, styles.incomes ]} /> }
                        <ThemedText style={ styles.title } weight='medium'>{ languages['incomes'] }</ThemedText>
                    </View>
                    <ThemedText style={ styles.data } weight='regular' numberOfLines={ 1 } adjustsFontSizeToFit>
                        { ReadableNumber(income) }
                        <ThemedText style={ styles.currency } weight='light'> { currencyInfo.symbol }</ThemedText>
                    </ThemedText>
                </View>

                <View style={ styles.section }>
                    <ThemedText style={ styles.title } weight='medium'>{ languages['balance'] }</ThemedText>
                    <ThemedText style={[ styles.data, balanceColor ]} weight='medium' numberOfLines={ 1 } adjustsFontSizeToFit>
                        { ReadableNumber(balance) }
                        <ThemedText style={[ styles.currency, balanceColor ]} weight='regular'> { currencyInfo.symbol }</ThemedText>
                    </ThemedText>
                </View>

                <View style={ styles.section }>
                    <View style= { styles.titleRow }>
                        { squareEnable === true && <View style={[ styles.square, styles.expenses ]} /> }
                        <ThemedText style={ styles.title } weight='medium'>{ languages['expenses'] }</ThemedText>
                    </View>
                    <ThemedText style={ styles.data } weight='regular' numberOfLines={ 1 } adjustsFontSizeToFit>
                        { ReadableNumber(expense) }
                        <ThemedText style={ styles.currency } weight='light'> { currencyInfo.symbol }</ThemedText>
                    </ThemedText>
                </View>
            </View>
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            width: '100%',
            paddingHorizontal: Values.paddingApp,
        },

        sections: {
            display: 'flex',
            flexDirection: 'row',
            columnGap: 3,
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            paddingVertical: 6,
            paddingHorizontal: 10,
            overflow: 'hidden',
        },

        section: {
            width: '33%',
        },

        titleRow: {
            display: 'flex',
            flexDirection: 'row',
            columnGap: 7,
            justifyContent: 'center',
            width: '100%',
        },

        title: {
            fontSize: 13,
            textAlign: 'center',
        },

        data: {
            fontSize: 12,
            textAlign: 'center',
            height: 17,
            verticalAlign: 'bottom',
            letterSpacing: 0,
        },

        currency: {
            fontSize: 9,
        },

        positive: {
            color: colors.positive,
        },
        negative: {
            color: colors.negative,
        },

        square: {
            width: 10,
            height: 10,
            borderRadius: 3,
            alignSelf: 'center',
        },

        incomes: {
            backgroundColor: colors.positive,
        },
        expenses: {
            backgroundColor: colors.negative,
        },
    }
);