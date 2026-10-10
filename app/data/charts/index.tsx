import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import BalanceResume from '@components/data/balance-resume';
import GroupedBars from '@components/data/bar-chart';
import TypeButtons from '@components/data/type-buttons';

const DataCharts = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);
    
    // Change the router previous page
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (event) => {
            event.preventDefault();
            router.push('/home');
        });

        return unsubscribe;
    }, [navigation]);

    // Active type
    const [expenseActive, setExpenseActive] = useState(true);

    const expenseActivation = () => {
        setExpenseActive(true);
    }

    const incomeActivation = () => {
        setExpenseActive(false);
    }

    return (
        <View style={ styles.container }>
            <BalanceResume squareEnable={ false } />
            <GroupedBars />
            <BalanceResume squareEnable={ false } />
            <TypeButtons expenseActive={ expenseActive } expenseOnPress={ expenseActivation } incomeOnPress={ incomeActivation } />
        </View>
    );
};

export default DataCharts;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            top: Values.topNotHeader,
            width: '100%',
            paddingBottom: 125,
        },
    }
);
