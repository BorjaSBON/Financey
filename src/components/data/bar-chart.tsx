import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

const GroupedBars = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const barData = [
        {
            value: 40,
            label: 'J',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 20, frontColor: colors.negative },
        {
            value: 50,
            label: 'F',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 40, frontColor: colors.negative },
        {
            value: 75,
            label: 'M',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 25, frontColor: colors.negative },
        {
            value: 30,
            label: 'A',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 20, frontColor: colors.negative },
        {
            value: 60,
            label: 'M',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 40, frontColor: colors.negative },
        {
            value: 65,
            label: 'J',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 30, frontColor: colors.negative },
        {
            value: 40,
            label: 'J',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 20, frontColor: colors.negative },
        {
            value: 50,
            label: 'A',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 40, frontColor: colors.negative },
        {
            value: 75,
            label: 'S',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 25, frontColor: colors.negative },
        {
            value: 30,
            label: 'O',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 20, frontColor: colors.negative },
        {
            value: 55,
            label: 'N',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 25, frontColor: colors.negative },
        {
            value: 60,
            label: 'D',
            spacing: 1.5,
            labelWidth: 10,
            labelTextStyle: styles.horizontalLabelText,
            frontColor: colors.positive,
        },
        { value: 45, frontColor: colors.negative },
    ];

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

                noOfSections={ 3 }
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
