import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

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
}

const CategoriesPieChart = ({ year, month }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();
    
    // Currency
    const { currencyInfo } = useCurrency();

    // Functions
    function ReadableNumber(value: number) {
        return (value / 100).toLocaleString('de-DE').replace(',', '\'');
    }

    function interpolateColor(factor: number): string {
        const start = colors.chartNegativeRange.replace('#', '');
        const end = colors.negative.replace('#', '');

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

    // Active category and amount
    const [categoryPressed, setCategoryPressed] = useState<string>('');
    const [amountPressed, setAmountPressed] = useState<number>(0);

    useEffect(() => {
        const loadCategoriesAmount = async () => {
            const categoriesAmount = await getCategoriesAmount(year, month, 'expense');
            let dataDonutProcessed:any[] = [];

            categoriesAmount.forEach((element, index) => {
                dataDonutProcessed.push({ value: element.amount, label: element.category, color: interpolateColor((index + 1) / categoriesAmount.length) });
            });

            const totalAmount = dataDonutProcessed.reduce((sum, item) => sum + item.value, 0);

            setChartPieData(dataDonutProcessed);
            setAmountPressed(totalAmount);
            setCategoryPressed(languages['total']);
        };

        loadCategoriesAmount();
    }, [getCategoriesAmount]);

    // Calculate the radius of the container
    const [containerWidth, setContainerWidth] = useState(0);

    const radius = Math.max(0, ((containerWidth - 15) * 0.95) / 2);
    const innerRadius = radius * 0.725;

    // Check if the transactions are laoded
    if (loadingTransactions) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container } onLayout={(event) => { setContainerWidth(event.nativeEvent.layout.width); }}>
            <PieChart
                data={ chartPieData }
                donut
                sectionAutoFocus
                focusOnPress
                strokeWidth={ 0.5 }
                strokeColor={ colors.backgroundSecondary }
                onPress={ (item: { label: string, value: number }) => {
                    if (categoryPressed == item.label) {
                        const totalAmount = chartPieData.reduce((sum, item) => sum + item.value, 0);
                        setAmountPressed(totalAmount);
                        setCategoryPressed(languages['total']);
                    } else {
                        setCategoryPressed(item.label);
                        setAmountPressed(item.value);
                    }
                }}
                radius={ radius }
                innerRadius={ innerRadius }
                innerCircleColor={ colors.backgroundSecondary }
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
    );
};

export default CategoriesPieChart;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 5,
        },

        data: {
            fontSize: 12,
            textAlign: 'center',
        },

        currency: {
            fontSize: 9,
        },

        category: {
            fontSize: 9,
            textAlign: 'center',
        },
    }
);
