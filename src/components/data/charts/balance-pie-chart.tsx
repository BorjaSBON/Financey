import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { ThemedText } from '@ui/themed-text';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { useTransactions } from '@/src/hooks/useTransactions';

interface Props {
    // Variables
    year: number,
    month: number,
}

const BalancePieChart = ({ year, month }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Database
    const { getBalance, loadingTransactions } = useTransactions();
    
    // Variables
    const [expense, setExpense] = useState(0);
    const [difference, setDifference] = useState(0);

    useEffect(() => {
        const loadBalance = async () => {
            const balance = await getBalance(new Date(Date.UTC(year, month-1, 1)).toISOString(), new Date(Date.UTC(year, month, 1)).toISOString());
            
            setExpense(balance.expense);
            setDifference(balance.income < balance.expense ? 0 : balance.income - balance.expense);
        };

        loadBalance();
    }, [getBalance, year, month]);

    const chartData = [ 
        { value: difference, color: colors.positive },
        { value: expense, color: colors.negative },
    ];

    const charTextValue = ((expense / (difference + expense)) * 100).toFixed(0);

    // Check if the transactions are laoded
    if (loadingTransactions) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <PieChart
                donut
                semiCircle

                data={ chartData }

                strokeWidth={ 1.5 }
                strokeColor={ colors.backgroundSecondary }

                showText = { false }
                textColor='white'
                textSize={ 12 }
                fontWeight='500'

                innerRadius={ 50 }
                radius={ 75 }

                backgroundColor={ colors.backgroundPrimary }
                centerLabelComponent={() => {
                    return (
                        <View>
                            <ThemedText style={ styles.centerLabelValue } weight='medium'>
                                { charTextValue }
                                <ThemedText style={ styles.centerLabelValueUnit } weight='regular'> %</ThemedText>
                            </ThemedText>
                            <ThemedText style={ styles.centerLabelTitle } weight='light'>{ languages['expenses'] }</ThemedText>
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default BalancePieChart;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            paddingVertical: 5,
            marginHorizontal: 'auto',
        },

        centerLabelTitle: {
            color: colors.fontPrimary,
            fontSize: 11,
            marginBottom: 5,
        },

        centerLabelValue: {
            color: colors.fontPrimary,
            fontSize: 14,
            textAlign: 'center',
        },

        centerLabelValueUnit: {
            color: colors.fontPrimary,
            fontSize: 11,
        },
    }
);
