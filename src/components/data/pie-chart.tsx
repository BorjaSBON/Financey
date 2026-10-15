import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { useTransactions } from '@/src/hooks/useTransactions';
import { ThemedText } from '@ui/themed-text';

interface Props {
    // Variables
    year: number,
    month: number,
}

const BalancePie = ({ year, month }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Database
    const { getBalance, loadingTransactions } = useTransactions();
    
    // Variables
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [difference, setDifference] = useState(0);

    useEffect(() => {
        const loadBalance = async () => {
            const balance = await getBalance(new Date(Date.UTC(year, month-1, 1)).toISOString(), new Date(Date.UTC(year, month, 1)).toISOString());
            
            setIncome(balance.income);
            setExpense(balance.expense);
            setDifference(balance.income < balance.expense ? 0 : balance.income - balance.expense);
        };

        loadBalance();
    }, [getBalance, year, month]);

    const pieData = [
        { value: difference, color: colors.positive, text:`${((difference / (difference + expense)) * 100).toFixed(0)}%` },
        { value: expense, color: colors.negative, text:`${((expense / (difference + expense)) * 100).toFixed(0)}%` },
    ];

    // Check if the transactions are laoded
    if (loadingTransactions) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <PieChart
                showText
                textColor='white'
                radius={ 90 }
                textSize={ 13 }
                data={ pieData }
                fontWeight='bold'
            >
            </PieChart>
        </View>
    );
};

export default BalancePie;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            borderRadius: 10,
            paddingVertical: 20,
            marginHorizontal: 'auto',
        },

        horizontalLabelText: {
            color: colors.fontSecondary,
            fontSize: 10,
        },

        verticalLabelText: {
            color: colors.fontSecondary,
            fontSize: 10,
        },
    }
);
