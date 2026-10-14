import { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { ThemedText } from '@ui/themed-text';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import MoreIcon from '@assets/more.svg';

interface Props {
    // Variables
    years: number[];

    // Methods
    onChange: (year: number) => void;
}

const YearsPediod = ({ years, onChange }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const [yearIndex, setYearIndex] = useState<number>(0);

    const changeYearIndex = (index: number) => {
        if (index < 0) index = 0;
        if (index >= years.length) index = years.length - 1;

        setYearIndex(index);
        onChange(years[index]);
    };

    if (!years) return;

    return (
        <View style={ styles.container }>
            <Pressable 
                style={({ pressed }) => [
                    styles.icon,
                    pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
                ]}
                onPress={ () => changeYearIndex(yearIndex + 1) }
            >
                <MoreIcon style={[ styles.moreIcon, { transform: [{ rotate: '180deg' }, { scale: 0.75 }] } ]} color={ colors.iconBackground } />
            </Pressable>

            <ThemedText style={ styles.year }  weight='light'> { years[yearIndex] }</ThemedText>

            <Pressable 
                style={({ pressed }) => [
                    styles.icon,
                    pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
                ]}
                onPress={ () => changeYearIndex(yearIndex - 1) }
            >
                <MoreIcon style={[ styles.moreIcon, { transform: [{ scale: 0.75 }] } ]} color={ colors.iconBackground } />
            </Pressable>
        </View>
    );
};

export default YearsPediod;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            display: 'flex',
            flexDirection: 'row',
            columnGap: 10,
            alignItems: 'center',
            marginHorizontal: 'auto',
            marginBottom: 10,
        },

        year: {

        },

        icon: {
            borderRadius: 25,
        },

        moreIcon: {
            transform: [{ scale: 0.75 }]
        },
    }
);
