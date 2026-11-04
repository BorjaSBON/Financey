import { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';
import { useCurrency } from '@currency/useCurrency';

import { ThemedText } from '@ui/themed-text';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useCategories } from '@/src/hooks/useCategories';

interface Props {
    // Variables
    year: number,
    categoryID: number,
}

const CategoryBarChart = ({ year, categoryID }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);
    
    // Traductions
    const { languages } = useLanguage();
        
    // Currency
    const { currencyInfo } = useCurrency();

    // Database
    const { getCategoryBalance } = useTransactions();
    const { category, getCategory } = useCategories();

    // Balance Monthly
    const [lineData, setLineData] = useState<any[] | null>([]);
    const [budgetValue, setBudgetValue] = useState<number | null>(null);
    const [heightChart, setHeightChart] = useState<number>(0);

    useEffect(() => {
        const loadCategoryBalance = async () => {
            // Get the category limit
            await getCategory(categoryID);
            const budget = category?.budget ?? null;
            setBudgetValue(budget);

            // Get the category expenses
            const categoryBalance = await getCategoryBalance(year, categoryID);

            let dataProcessed:any[] = [];
            const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

            for (let i = 0; i <= categoryBalance.length - 1; i++) {
                // Calculate bar data
                dataProcessed.push({
                    value: Math.abs(categoryBalance[i].balance / 100),
                    label: months[categoryBalance[i].month - 1],
                    labelWidth: 6,
                    frontColor: colors.negative,
                });
            }

            setLineData(dataProcessed);

            // Get max value of the chart
            let maxValue = Math.max(...dataProcessed.map(d => d.value));

            if (budget && budget > maxValue) {
                setHeightChart(budget);
            } else {
                setHeightChart(maxValue);
            }
        };

        loadCategoryBalance();
    }, [year, categoryID]);

    // Calculate the radius of the container
    const [containerWidth, setContainerWidth] = useState(0);

    const handleLayout = (e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width);

    function ReadableNumber(value: number) {
        return value.toLocaleString('de-DE').replace(',', '\'');
    }

    if (!lineData || lineData.length === 0 || containerWidth === 0) {
        return <View style={ styles.container } onLayout={ handleLayout }></View>;
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.containerChart } onLayout={ handleLayout }>
                <BarChart
                    key={ `category-${year}` }
                    data={ lineData.map(d => ({ value: d.value, frontColor: d.frontColor, label: d.label, labelWidth: d.labelWidth })) }
                    
                    height={ 150 }
                    maxValue={ heightChart }

                    spacing={ 16 }
                    initialSpacing={ 5 }
                    endSpacing={ 2.5 }
                    noOfSections={ 4 }

                    rulesType='solid'
                    rulesColor={ colors.chartRulesColor }
                    rulesThickness={ 1 }
                    rulesLength={ containerWidth - 55 }

                    barWidth={ 6 }
                    barBorderRadius={ 2 }

                    xAxisThickness={ 1 }
                    xAxisColor={ colors.chartRulesColor }
                    xAxisLabelTextStyle={ styles.horizontalLabelText }
                    yAxisThickness={ 0 }
                    yAxisTextStyle={ styles.verticalLabelText}

                    showReferenceLine1={ budgetValue !== null }
                    referenceLine1Position={ budgetValue ? budgetValue : 0 }
                    referenceLine1Config={{
                        color: colors.chartLineBarColor,
                        thickness: 1,
                        dashWidth: 4,
                        dashGap: 3,
                        width: containerWidth - 55,
                        type: 'dashed',
                    }}
                />
            </View>

            { budgetValue && 
                <ThemedText style={ styles.budgetText } weight='regular'>
                    { languages['budget'] }:
                    <ThemedText style={ styles.budgetTextValue } weight='medium'> { ReadableNumber(budgetValue) }</ThemedText>
                    <ThemedText style={ styles.budgetTextCurrency } weight='regular'> { currencyInfo.symbol }</ThemedText>
                </ThemedText>
            }
        </View>
    );
};

export default CategoryBarChart;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            marginHorizontal: Values.paddingApp,
            rowGap: 10,
        },

        containerChart: {
            backgroundColor: colors.backgroundSecondary,
            paddingVertical: 15,
            borderRadius: 10,
        },

        horizontalLabelText: {
            color: colors.fontSecondary,
            fontSize: 10,
        },

        verticalLabelText: {
            color: colors.fontSecondary,
            fontSize: 10,
        },

        budgetText: {
            fontSize: 12,
        },

        budgetTextValue: {
            fontSize: 14,
        },

        budgetTextCurrency: {
            fontSize: 12,
        },
    }
);
