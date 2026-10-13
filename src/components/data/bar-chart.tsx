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

const GroupedBars = ({ year }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Database
    const { getBalanceMonthly } = useTransactions();

    // Balance Monthly
    const [barData, setBarData] = useState<any[] | null>([]);

    useEffect(() => {
        const loadBalanceMonthly = async () => {
            const bm = await getBalanceMonthly(year);

            let barDat:any[] = [];
            const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

            bm.forEach((element) => {
                barDat.push({
                    value: element.income / 100,
                    label: months[element.month - 1],
                    spacing: 1.5,
                    labelWidth: 10,
                    labelTextStyle: styles.horizontalLabelText,
                    frontColor: colors.positive,
                });
                barDat.push({ value: element.expense / 100, frontColor: colors.negative });
            });

            setBarData(barDat);
        };

        loadBalanceMonthly();
    }, [getBalanceMonthly]);

    if (!barData) {
        return;
    }

    return (
        <View style={ styles.container }>
            <BarChart
                data={ barData }
                
                height={ 150 }

                spacing={ 12 }
                initialSpacing={ 5 }
                endSpacing={ 2.5 }

                rulesType='solid'
                rulesColor={ colors.rulesColor }
                rulesThickness={ 1 }

                barWidth={ 4 }
                roundedTop
                roundedBottom

                xAxisThickness={ 0 }
                yAxisThickness={ 0 }
                yAxisTextStyle={ styles.verticalLabelText}

                noOfSections={ 4 }
            />
        </View>
    );
};

export default GroupedBars;

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
