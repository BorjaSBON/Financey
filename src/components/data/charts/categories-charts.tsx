import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { PieChart, BarChart } from 'react-native-gifted-charts';

import { Values } from '@constants/values';
import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { useCurrency } from '@currency/useCurrency';

import { ThemedText } from '@ui/themed-text';

import { useTransactions } from '@/src/hooks/useTransactions';

interface Props {
    // Variables
    year: number,
    month: number,
    type: 'income' | 'expense',
}

const CategoriesCharts = ({ year, month, type }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);
    
    // Currency
    const { currencyInfo } = useCurrency();

    // Functions
    function ReadableNumber(value: number) {
        return (value / 100).toLocaleString('de-DE').replace(',', '\'');
    }

    function interpolateColor(factor: number): string {
        const start = type == 'expense' ? colors.chartNegativeRange.replace('#', '') : colors.chartPositiveRange.replace('#', '');
        const end = type == 'expense' ? colors.negative.replace('#', '') : colors.positive.replace('#', '');

        const startRGB = [
            parseInt(start.substring(0, 2), 16),
            parseInt(start.substring(2, 4), 16),
            parseInt(start.substring(4, 6), 16),
        ];

        const endRGB = [
            parseInt(end.substring(0, 2), 16),
            parseInt(end.substring(2, 4), 16),
            parseInt(end.substring(4, 6), 16),
        ];

        const result = startRGB.map((startValue, index) => {
            const value = Math.round(startValue + (endRGB[index] - startValue) * factor);
            return value.toString(16).padStart(2, '0');
        });

        return `#${result.join('')}`;
    }

    // Database
    const { getCategoriesAmount, loadingTransactions } = useTransactions();

    // Categories amounts
    const [chartPieData, setChartPieData] = useState<any[]>([]);
    const [chartBarData, setChartBarData] = useState<any[]>([]);

    // Active category and amount
    const [categoryPressed, setCategoryPressed] = useState<string>('');
    const [amountPressed, setAmountPressed] = useState<number>(0)

    useEffect(() => {
        const loadCategoriesAmount = async () => {
            const categoriesAmount = await getCategoriesAmount(year, month, type);
            
            let dataDonutProcessed:any[] = [];
            let dataBarProcessed:any[] = [];

            categoriesAmount.forEach((element, index) => {
                dataDonutProcessed.push({ value: element.amount, label: element.category, color: interpolateColor((index + 1) / categoriesAmount.length) });
                dataBarProcessed.push({
                    value: element.amount / 100,
                    label: element.category,
                    spacing: 10,
                    labelWidth: 50,
                    labelTextStyle: styles.horizontalLabelText,
                    frontColor: interpolateColor((index + 1) / categoriesAmount.length),
                });
            });

            const totalAmount = dataDonutProcessed.reduce((sum, item) => sum + item.value,0);

            setChartPieData(dataDonutProcessed);
            setChartBarData(dataBarProcessed);

            setAmountPressed(totalAmount);
            setCategoryPressed('Total');
        };

        loadCategoriesAmount();
    }, [getCategoriesAmount, year, month, type]);

    // Check if the transactions are laoded
    if (loadingTransactions) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.containerDonut }>
                <PieChart
                    data={ chartPieData }
                    donut
                    sectionAutoFocus
                    focusOnPress
                    onPress={ (item: { label: string, value: number }) => {
                        setCategoryPressed(item.label);
                        setAmountPressed(item.value);
                    }}
                    radius={ 80 }
                    innerRadius={ 60 }
                    innerCircleColor={ colors.backgroundPrimary }
                    centerLabelComponent={() => {
                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <ThemedText style={ styles.data } weight='medium' numberOfLines={ 1 } adjustsFontSizeToFit>
                                    { ReadableNumber(amountPressed) }
                                    <ThemedText style={ styles.currency }  weight='light'> { currencyInfo.symbol }</ThemedText>
                                </ThemedText>
                                <ThemedText style={ styles.category } weight='light'>{ categoryPressed }</ThemedText>
                            </View>
                        );
                    }}
                />
            </View>

            <View style={ styles.containerBar }>
                <BarChart
                    data={ chartBarData }
                    horizontal

                    spacing={ 12 }
                    initialSpacing={ 5 }
                    endSpacing={ 2.5 }
                    noOfSections={ 4 }

                    rulesType='solid'
                    rulesColor={ colors.chartRulesColor }
                    rulesThickness={ 1 }

                    barWidth={ 8 }
                    barBorderRadius={ 2.5 }

                    xAxisThickness={ 0 }
                    yAxisThickness={ 0 }
                    yAxisTextStyle={ styles.verticalLabelText}
                />
            </View>
        </View>
    );
};

export default CategoriesCharts;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            width: '100%',
            paddingVertical: 15,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 15,
        },

        containerDonut: {
            marginHorizontal: 'auto',
        },

        containerBar: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            marginHorizontal: Values.paddingApp,
            width: 'auto',
        },

        data: {
            fontSize: 14,
            textAlign: 'center',
        },

        currency: {
            fontSize: 11,
        },

        category: {
            fontSize: 11,
            textAlign: 'center',
        },

        horizontalLabelText: {
            color: colors.fontSecondary,
            fontSize: 10,
            textAlign: 'right'
        },

        verticalLabelText: {
            color: colors.fontSecondary,
            fontSize: 10,
        },
    }
);
