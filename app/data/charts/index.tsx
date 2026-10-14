import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import YearsPeriod from '@components/data/years-period';
import BalanceResume from '@components/data/balance-resume';
import GroupedBars from '@components/data/bar-chart';
import TypeButtons from '@components/data/type-buttons';

import { useTransactions } from '@/src/hooks/useTransactions';

const DataCharts = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Database
    const { getAvailablePeriods } = useTransactions();

    // Available periods
    const [availablePeriods, setAvailablePeriods] = useState<any[] | null>([]);
    
    const [year, setYear] = useState<number | null>(2026);
    const [month, setYMonth] = useState<number>(0);

    useEffect(() => {
        const getTransactionsData = async () => {
            setAvailablePeriods(await getAvailablePeriods());
        };

        getTransactionsData();
    }, [getAvailablePeriods]);
    
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

    if (!availablePeriods || !year) {
        return;
    }

    return (
        <View style={ styles.container }>
            <View>
                <YearsPeriod years={ availablePeriods.map(period => period.year) } onChange={ setYear } />
                <BalanceResume squareEnable={ false } from={ new Date(Date.UTC(year,0,1,0,0,0,0)).toISOString() } to={ new Date(Date.UTC(year,11,31,23,59,59,999)).toISOString() } />
                <GroupedBars year={ year } />
            </View>
            
            <View>
                <View>
                    <YearsPeriod years={ availablePeriods.map(period => period.year) } onChange={ setYear } />
                    <BalanceResume squareEnable={ false } from={ new Date(Date.UTC(year,month,1,0,0,0,0)).toISOString() } to={ new Date(Date.UTC(year,month,31,23,59,59,999)).toISOString() } />
                </View>
                
                <View>
                    <TypeButtons expenseActive={ expenseActive } expenseOnPress={ () => {setExpenseActive(true)} } incomeOnPress={ () => {setExpenseActive(false)} } />
                </View>
            </View>
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
