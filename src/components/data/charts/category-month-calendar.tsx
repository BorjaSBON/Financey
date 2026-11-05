import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';
import { useCurrency } from '@currency/useCurrency';

import { ThemedText } from '@ui/themed-text';

import { useTransactions } from '@/src/hooks/useTransactions';

interface Props {
    // Variables
    year: number,
    month: number,
    categoryID: number,
}

const CategoryMonthCalendar = ({ year, month, categoryID }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);
    
    // Traductions
    const { languages, resolvedLanguage } = useLanguage();
        
    // Currency
    const { currencyInfo } = useCurrency();

    // Database
    const { getCategoryBalanceDaily } = useTransactions();

    // Expense of the day
    const [calendarData, setCalendarData] = useState<{ day: number; balance: number }[]>([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [expenseDay, setExpenseDay] = useState(0);

    function ReadableNumber(value: number) {
        return (value / 100).toLocaleString('de-DE').replace(',', '\'');
    }

    useEffect(() => {
        const loadCategoryBalanceDaily = async () => {
            // Get the category expenses daily
            const categoryBalance = await getCategoryBalanceDaily(year, month, categoryID);
            setCalendarData(categoryBalance);
            setSelectedDay('');
            setExpenseDay(0);
        };

        loadCategoryBalanceDaily();
    }, [year, month, categoryID]);

    useEffect(() => {
        LocaleConfig.defaultLocale = resolvedLanguage;
    }, [resolvedLanguage]);

    if (!calendarData || calendarData.length === 0) {
        return <View style={ styles.container }></View>;
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.containerCalendar }>
                <Calendar 
                    disableMonthChange={ true }
                    enableSwipeMonths={ false }
                    hideExtraDays={ true }
                    
                    style={ styles.calendar }
                    customHeaderTitle={ <View /> }
                    hideArrows={ true }
                    

                    initialDate={ new Date(year, month).toISOString() }

                    theme={{
                        backgroundColor: colors.backgroundSecondary,
                        calendarBackground: colors.backgroundSecondary,

                        dayTextColor: colors.fontPrimary,
                        textDayFontFamily: 'MontserratMedium',
                        textDayFontSize: 13,

                        todayTextColor: colors.chartToday,
                    }}

                    dayComponent={ (date) => {
                        if (!date) return null;

                        const amount = calendarData.find(item => item.day === date.date?.day)?.balance ?? 0;
                        const maxExpense = Math.max(...calendarData.map(item => item.balance), 0);

                        const minRadius = 4;
                        const maxRadius = 18;

                        const radius = amount > 0 && maxExpense > 0 ? minRadius + Math.sqrt(amount / maxExpense) * (maxRadius - minRadius) : 0;

                        const isSelected = selectedDay === date.date?.dateString;

                        return (
                            <Pressable
                                onPress={ () => { setSelectedDay(date.date?.dateString || ''); setExpenseDay(amount); } }
                                style={ styles.dayContainer }
                            >
                                {amount > 0 && (
                                    <View
                                        style={{
                                            position: 'absolute',
                                            width: radius * 2,
                                            height: radius * 2,
                                            borderRadius: radius,
                                            backgroundColor: !isSelected ? colors.chartNegativeClear : colors.negative,
                                        }}
                                    />
                                )}

                                <ThemedText 
                                    style={[ styles.dayText, { color: date.state === 'today' ? colors.chartToday : colors.fontPrimary } ]}
                                    weight={ isSelected ? 'bold' : 'regular' }
                                >
                                    { date.date?.day }
                                </ThemedText>
                            </Pressable>
                        );
                    }}
                />
            </View>

            <ThemedText style={ styles.expenseText } weight='regular'>
                { languages['total'] } ({ selectedDay ? new Date(selectedDay).toLocaleDateString('en-GB').replaceAll('/', ' / ') : '?' }):
                { expenseDay || expenseDay > 0 ?
                    <ThemedText style={ styles.expenseTextValue } weight='medium'> { ReadableNumber(expenseDay) }
                        <ThemedText style={ styles.expenseTextCurrency } weight='regular'> { currencyInfo.symbol }</ThemedText>
                    </ThemedText> : 
                    <ThemedText style={ styles.expenseTextValue } weight='medium'> { languages['noCharges'] }</ThemedText>
                }
            </ThemedText>
        </View>
    );
};

export default CategoryMonthCalendar;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            marginHorizontal: Values.paddingApp,
            rowGap: 10,
        },

        containerCalendar: {
            backgroundColor: colors.backgroundSecondary,
            paddingTop: 5,
            paddingBottom: 10,
            borderRadius: 10,
        },

        calendar: {
            borderRadius: 10,
            rowGap: 0,
        },

        dayContainer: {
            marginVertical: 7.5,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
        },

        dayText: {
            fontSize: 14,
        },

        expenseText: {
            fontSize: 12,
        },

        expenseTextValue: {
            fontSize: 14,
        },

        expenseTextCurrency: {
            fontSize: 12,
        },
    }
);
