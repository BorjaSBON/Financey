import { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useProfiles } from '@/src/hooks/useProfiles';

interface Props {
    // Variables
    squareEnable?: boolean,
}

export default function BalanceResume({ squareEnable=false }: Props) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Database
    const { getBalance, loadingTransactions } = useTransactions();
    const { profile, loadingProfiles } = useProfiles();

    // Variables
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        if (!profile) {
            return;
        }

        const loadBalance = async () => {
            const balance = await getBalance(profile.id);

            setIncome(balance.income);
            setExpense(balance.expense);
        };

        loadBalance();
    }, [profile, getBalance]);

    // Function to transform the values in readable text
    function ReadableNumber(value: number) {
        return (value / 100).toLocaleString('de-DE').replace(',', '\'');
    }

    // Calculate the balance
    const balance = Number((income - expense).toFixed(2));
    const balanceColor = balance >= 0 ? styles.positive : styles.negative;

    // Check if the transactions are laoded
    if (loadingTransactions || loadingProfiles) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.sections }>
                <View style={ styles.section }>
                    <View style= { styles.titleRow }>
                        { squareEnable === true && <View style={[ styles.square, styles.incomes ]} /> }
                        <ThemedText style={ styles.title } weight='regular'>Incomes</ThemedText>
                    </View>
                    <ThemedText style={ styles.data } weight='light' numberOfLines={ 1 } adjustsFontSizeToFit>
                        { ReadableNumber(income) }
                        <ThemedText style={ styles.currency }  weight='light'> €</ThemedText>
                    </ThemedText>
                </View>

                <View style={ styles.section }>
                    <ThemedText style={ styles.title } weight='regular'>Balance</ThemedText>
                    <ThemedText style={[ styles.data, balanceColor ]} weight='regular' numberOfLines={ 1 } adjustsFontSizeToFit>
                        { ReadableNumber(balance) }
                        <ThemedText style={[ styles.currency, balanceColor ]} weight='light'> €</ThemedText>
                    </ThemedText>
                </View>

                <View style={ styles.section }>
                    <View style= { styles.titleRow }>
                        { squareEnable === true && <View style={[ styles.square, styles.expenses ]} /> }
                        <ThemedText style={ styles.title } weight='regular'>Expenses</ThemedText>
                    </View>
                    <ThemedText style={ styles.data } weight='light' numberOfLines={ 1 } adjustsFontSizeToFit>
                        { ReadableNumber(expense) }
                        <ThemedText style={ styles.currency } weight='light'> €</ThemedText>
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
            fontSize: 14,
            textAlign: 'center',
        },

        data: {
            fontSize: 12,
            textAlign: 'center',
            height: 17,
            verticalAlign: 'bottom',
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