import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';
import { ThemedSelectInput } from '@ui/themed-select-input';

import ChartsTypeButtons from '@components/data/charts/charts-type-buttons';
import YearsPeriod from '@components/data/years-period';
import BalanceResume from '@components/data/balance-resume';
import TypeButtons from '@components/data/type-buttons';

import MonthlyBarChart from '@components/data/charts/monthly-bar-chart';
import BalancePieChart from '@components/data/charts/balance-pie-chart';
import CategoriesCharts from '@components/data/charts/categories-charts';

import EvolutionBarChart from '@components/data/charts/evolution-bar-chart';
import CategoryBarChart from '@components/data/charts/category-bar-chart';
import CategoryMonthCalendar from '@components/data/charts/category-month-calendar';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useCategories } from '@/src/hooks/useCategories';

type AvailablePeriod = {
    year: number;
    months: number[];
};

const DataCharts = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Database
    const { getAvailablePeriods } = useTransactions();
    const { categories } = useCategories();

    const [availablePeriods, setAvailablePeriods] = useState<AvailablePeriod[]>([]);

    const [year, setYear] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);
    
    const [expenseActive, setExpenseActive] = useState(true);
    const [resumeActive, setResumeActive] = useState(true);

    // Categories
    let categories_selected = categories.filter(item => item.type === 'expense');
    let categories_formatted = categories_selected.map((item) => {
        return {
            value: item.name.toLowerCase(),
            label: item.name,
        };
    });
    
    const [categorySelect, setCategorySelect] = useState('');
    const selectedValue = categories_formatted.some(c => c.value === categorySelect) ? categorySelect : (categories_formatted[0]?.value ?? '');

    const categoryID = categories_selected.find(item => item.name.toLowerCase() === selectedValue)?.id;

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

    if (year === null || month === null || !selectedPeriod || availablePeriods.length === 0) {
        return (
            <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
                <View style={styles.container}>
                    <BalanceResume squareEnable={ false } />
                    <ThemedText style={ styles.noData } weight='regular'>{ languages['noTransactions'] }</ThemedText>
                </View>
            </SafeAreaView>
        )
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
            <View style={styles.container}>
                <ScrollView>
                    <View style={ styles.sections }>
                        <View>
                            <ChartsTypeButtons resumeActive={ resumeActive } resumeOnPress={ () => setResumeActive(true) } evolutionOnPress={ () => setResumeActive(false) } />
                        </View>

                        <View style={ styles.section }>
                            <YearsPeriod range={ availablePeriods.map(period => period.year) } onChange={ handleYearChange } />
                            <BalanceResume squareEnable={ false } from={new Date(Date.UTC(year, 0, 1)).toISOString() } to={ new Date(Date.UTC(year+1, 0, 1)).toISOString() } />

                            { resumeActive ? <MonthlyBarChart year={ year } /> : <EvolutionBarChart year={ year } /> }
                        </View>

                        { !resumeActive &&
                            <View style={ styles.section }>
                                <View style={ styles.inputSection }>
                                    <ThemedSelectInput data={ categories_formatted } value={ selectedValue } onSelect={(item) => { setCategorySelect(item.value); }} maxHeight={ 200 } />
                                </View>
                                { categoryID !== undefined && <CategoryBarChart year={ year } categoryID={ categoryID } /> }
                            </View>
                        }

                        <View style={ styles.section }>
                            <YearsPeriod range={ selectedPeriod.months } months onChange={ setMonth } />
                            { resumeActive && <BalanceResume squareEnable={ false } from={ new Date(Date.UTC(year, month-1, 1)).toISOString() } to={ new Date(Date.UTC(year, month, 1)).toISOString() } /> }
                            { resumeActive ? <BalancePieChart year={ year } month={ month } /> : categoryID !== undefined && <CategoryMonthCalendar year={ year } month={ month } categoryID={ categoryID }/> }
                        </View>

                        { resumeActive && 
                            <View style={ styles.section }>
                                <TypeButtons expenseActive={ expenseActive } expenseOnPress={ () => setExpenseActive(true) } incomeOnPress={ () => setExpenseActive(false) } />
                                <CategoriesCharts year={ year } month={ month } type={ expenseActive ? 'expense' : 'income' } />
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default DataCharts;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            top: Values.topHeader,
            width: '100%',
        },

        sections: {
            paddingBottom: Values.paddingBottom,
            rowGap: 10,
        },

        section: {
            rowGap: 10,
        },

        inputSection: {
            marginHorizontal: Values.paddingApp,
            marginVertical: 5,
        },

        noData: {
            marginHorizontal: 'auto',
            marginVertical: 15,
        },
    }
);