import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { useTransactions } from '@/src/hooks/useTransactions';

interface Props {
    // Variables
    year: number,
}

const EvolutionBarChart = ({ year }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Database
    const { getBalanceMonthly } = useTransactions();

    // Balance Monthly
    const [lineData, setLineData] = useState<any[] | null>([]);
    const [lineSegments, setLineSegments] = useState<any[] | null>([]);

    useEffect(() => {
        const loadBalanceMonthly = async () => {
            const balanceMonthly = await getBalanceMonthly(year);

            let dataProcessed:any[] = [];
            const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

            balanceMonthly.forEach((element) => {
                // Calculate bar data
                dataProcessed.push({
                    value: element.income / 100,
                    label: months[element.month - 1],
                    labelWidth: 10,
                    labelTextStyle: styles.horizontalLabelText,
                    dataPointColor: colors.positive,
                });
            });

            // Calculate the line segments
            const segments: any[] = [];

            for (let i = 0; i < dataProcessed.length - 1; i++) {
                const isDecreasing = dataProcessed[i].value > dataProcessed[i + 1].value;

                segments.push({ startIndex: i, endIndex: i + 1, color: isDecreasing ? colors.chartNegativeClear : colors.chartPositiveClear });
                dataProcessed[i+1].dataPointColor = isDecreasing ? colors.negative : colors.positive;
            }

            setLineData(dataProcessed);
            setLineSegments(segments);
        };

        loadBalanceMonthly();
    }, [year]);

    // Calculate the radius of the container
    const [containerWidth, setContainerWidth] = useState(0);

    if (!lineData || lineData.length === 0 || !lineSegments || lineSegments.length === 0) {
        return <View style={ styles.container }></View>;
    }

    return (
        <View style={ styles.container } onLayout={(event) => { setContainerWidth(event.nativeEvent.layout.width); }}>
            <LineChart
                data={ lineData }
                
                height={ 150 }

                spacing={ 22 }
                initialSpacing={ 5 }
                endSpacing={ 2.5 }
                noOfSections={ 4 }

                rulesType='solid'
                rulesColor={ colors.chartRulesColor }
                rulesThickness={ 1 }
                rulesLength={ containerWidth - 50 }

                xAxisThickness={ 0 }
                yAxisThickness={ 0 }
                yAxisTextStyle={ styles.verticalLabelText}

                thickness={ 4 }
                dataPointsRadius= { 3.5 }
                lineSegments={ lineSegments }
            />
        </View>
    );
};

export default EvolutionBarChart;

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
