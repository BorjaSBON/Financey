import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';
import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import YearsPeriod from '@components/data/years-period';
import BalanceResume from '@components/data/balance-resume';
import TypeButtons from '@components/data/type-buttons';

import MonthlyBarChart from '@components/data/charts/monthly-bar-chart';
import BalancePieChart from '@components/data/charts/balance-pie-chart';
import CategoriesCharts from '@components/data/charts/categories-charts';

import { useTransactions } from '@/src/hooks/useTransactions';

type AvailablePeriod = {
    year: number;
    months: number[];
};

const DataCharts = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Database
    const { getAvailablePeriods } = useTransactions();

    const [availablePeriods, setAvailablePeriods] = useState<AvailablePeriod[]>([]);

    const [year, setYear] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);
    const [expenseActive, setExpenseActive] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const loadPeriods = async () => {
            const periods = await getAvailablePeriods();

            if (cancelled) return;

            setAvailablePeriods(periods);

            if (periods.length > 0) {
                setYear(periods[0].year);
                setMonth(periods[0].months[0] ?? null);
            }
        };

        loadPeriods();

        return () => {
            cancelled = true;
        };
    }, [getAvailablePeriods]);

    // Period of the selected year
    const selectedPeriod = availablePeriods.find(period => period.year === year);

    // Change the year and select the first month of the list
    const handleYearChange = (newYear: number) => {
        const period = availablePeriods.find(item => item.year === newYear);

        setYear(newYear);
        setMonth(period?.months[0] ?? null);
    };

    // Go back to the previous page
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener(
            'beforeRemove',
            event => {
                event.preventDefault();
                router.push('/home');
            }
        );

        return unsubscribe;
    }, [navigation]);

    if (year === null || month === null || !selectedPeriod || availablePeriods.length === 0) {
        return (
            <View style={styles.container}>
                <BalanceResume squareEnable={ false } />
                <ThemedText style={ styles.noData } weight='regular'>No transactions added</ThemedText>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={ styles.sections }>
                    <View>
                        <YearsPeriod range={ availablePeriods.map(period => period.year) } onChange={ handleYearChange } />
                        <BalanceResume squareEnable={ false } from={new Date(Date.UTC(year, 0, 1)).toISOString() } to={ new Date(Date.UTC(year+1, 0, 1)).toISOString() } />
                        <MonthlyBarChart year={year} />
                    </View>

                    <View>
                        <View>
                            <YearsPeriod range={ selectedPeriod.months } months onChange={ setMonth } />
                            <BalanceResume squareEnable={ false } from={ new Date(Date.UTC(year, month-1, 1)).toISOString() } to={ new Date(Date.UTC(year, month, 1)).toISOString() } />
                            <BalancePieChart year={ year } month={ month } />
                        </View>

                        <View>
                            <TypeButtons expenseActive={ expenseActive } expenseOnPress={ () => setExpenseActive(true) } incomeOnPress={ () => setExpenseActive(false) } />
                            <CategoriesCharts year={ year } month={ month } type={ expenseActive ? 'expense' : 'income' } />
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        },

        sections: {
            paddingBottom: 75,
        },

        noData: {
            marginHorizontal: 'auto',
            marginVertical: 15,
        },
    }
);