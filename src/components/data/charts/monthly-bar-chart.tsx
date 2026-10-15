import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { useTransactions } from '@/src/hooks/useTransactions';

interface Props {
    // Variables
    year: number,
}

const MonthlyBarChart = ({ year }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Database
    const { getBalanceMonthly } = useTransactions();

    // Balance Monthly
    const [chartData, setChartData] = useState<any[] | null>([]);

    useEffect(() => {
        const loadBalanceMonthly = async () => {
            const balanceMonthly = await getBalanceMonthly(year);

            let dataProcessed:any[] = [];
            const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

            balanceMonthly.forEach((element) => {
                dataProcessed.push({
                    value: element.income / 100,
                    label: months[element.month - 1],
                    spacing: 1.5,
                    labelWidth: 10,
                    labelTextStyle: styles.horizontalLabelText,
                    frontColor: colors.positive,
                });
                dataProcessed.push({ value: element.expense / 100, frontColor: colors.negative });
            });

            setChartData(dataProcessed);
        };

        loadBalanceMonthly();
    }, [year]);

    if (!chartData) {
        return;
    }

    return (
        <View style={ styles.container }>
            <BarChart
                data={ chartData }
                
                height={ 150 }

                spacing={ 12 }
                initialSpacing={ 5 }
                endSpacing={ 2.5 }
                noOfSections={ 4 }

                rulesType='solid'
                rulesColor={ colors.chartRulesColor }
                rulesThickness={ 1 }

                barWidth={ 4 }
                barBorderRadius={ 1.5 }

                xAxisThickness={ 0 }
                yAxisThickness={ 0 }
                yAxisTextStyle={ styles.verticalLabelText}
            />
        </View>
    );
};

export default MonthlyBarChart;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            marginHorizontal: Values.paddingApp,
            marginVertical: 15,
            paddingVertical: 15
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
