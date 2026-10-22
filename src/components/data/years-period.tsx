import { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

import { ThemedText } from '@ui/themed-text';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import MoreIcon from '@assets/more.svg';

interface Props {
    // Variables
    range: number[];
    months?: boolean;

    // Methods
    onChange: (date: number) => void;
}

const YearsPediod = ({ range, months=false, onChange }: Props) => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Year / Month
    const [rangeIndex, setRangeIndex] = useState<number>(0);

    useEffect(() => {
        if (months) setRangeIndex(0);
    }, [range]);

    const changeRangeIndex = (index: number) => {
        if (index < 0) index = 0;
        if (index >= range.length) index = range.length - 1;

        setRangeIndex(index);
        onChange(range[index]);
    };

    // Generate the months
    const monthNames = Array.from({ length: 12 }, (_, i) => {
        const month = new Date(2026, i, 1).toLocaleDateString(languages['dateFormat'], { month: 'long' });
        return month.charAt(0).toUpperCase() + month.slice(1);
    });

    if (!range) return;

    return (
        <View style={ styles.container }>
            <Pressable 
                style={({ pressed }) => [
                    styles.icon,
                    pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
                ]}
                onPress={ () => changeRangeIndex(rangeIndex + 1) }
            >
                <MoreIcon style={[ styles.moreIcon, { transform: [{ rotate: '180deg' }, { scale: 0.45 }] } ]} color={ colors.iconBackground } />
            </Pressable>

            <ThemedText weight='light'> { months ? monthNames[range[rangeIndex] - 1] : range[rangeIndex] }</ThemedText>

            <Pressable 
                style={({ pressed }) => [
                    styles.icon,
                    pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
                ]}
                onPress={ () => changeRangeIndex(rangeIndex - 1) }
            >
                <MoreIcon style={[ styles.moreIcon, { transform: [{ scale: 0.45 }] } ]} color={ colors.iconBackground } />
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

        icon: {
            borderRadius: 25,
        },

        moreIcon: {
            transform: [{ scale: 0.75 }]
        },
    }
);
