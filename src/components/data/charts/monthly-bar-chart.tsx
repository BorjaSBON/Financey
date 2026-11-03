import { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
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
    const [lineData, setLineData] = useState<any[] | null>([]);

    useEffect(() => {
        const loadBalanceMonthly = async () => {
            const balanceMonthly = await getBalanceMonthly(year);

            let dataProcessed:any[] = [];
            let lineDataProcessed: any[] = [];
            const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

            balanceMonthly.forEach((element) => {
                // Calculate bar data
                dataProcessed.push({
                    value: element.income / 100,
                    label: months[element.month - 1],
                    spacing: 1.5,
                    labelWidth: 10,
                    frontColor: colors.positive,
                });
                dataProcessed.push({ value: element.expense / 100, frontColor: colors.negative });
                
                // Calcaulte line data
                let balance = (element.income - element.expense) / 100;
                lineDataProcessed.push({ value: balance >= 0 ? balance : 0 });
            });

            setChartData(dataProcessed);
            setLineData(lineDataProcessed);
        };

        loadBalanceMonthly();
    }, [year]);

    // Calculate the radius of the container
    const [containerWidth, setContainerWidth] = useState(0);
    
    const handleLayout = (e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width);

    if (!chartData || !lineData || chartData.length === 0 || lineData.length === 0 || containerWidth === 0) {
        return <View style={ styles.container } onLayout={ handleLayout }></View>;
    }

    return (
        <View style={ styles.container } onLayout={ handleLayout }>
            <BarChart
                key={ `resume-${year}` }
                data={ chartData }
                
                height={ 150 }

                spacing={ 12 }
                initialSpacing={ 5 }
                endSpacing={ 2.5 }
                noOfSections={ 4 }

                rulesType='solid'
                rulesColor={ colors.chartRulesColor }
                rulesThickness={ 1 }
                rulesLength={ containerWidth - 55 }

                barWidth={ 4 }
                barBorderRadius={ 1.5 }

                xAxisThickness={ 1 }
                xAxisColor={ colors.chartRulesColor }
                xAxisLabelTextStyle={ styles.horizontalLabelText }
                yAxisThickness={ 0 }
                yAxisTextStyle={ styles.verticalLabelText}

                lineData={ lineData }
                lineConfig={{
                    color: colors.chartLineBarColor,
                    thickness: 1.5,
                    curved: false,
                    hideDataPoints: false,
                    dataPointsRadius: 2,
                    dataPointsColor: colors.chartLineBarColor,
                    initialSpacing: 7.5,
                    spacing: 17.5,
                }}
                showLine={ true }
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
