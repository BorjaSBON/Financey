import { Text, StyleSheet, type TextProps } from 'react-native';

import { Colors } from '@constants/colors';

export type ThemedTextProps = TextProps & {
    weight?: 'thin' | 'extraLight' | 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold' | 'black';
};

export function ThemedText({ style, weight='regular', ...rest }: ThemedTextProps) {
    return (
        <Text
            style={[
                styles.general,
                weight === 'thin' && styles.thin,
                weight === 'extraLight' && styles.extraLight,
                weight === 'light' && styles.light,
                weight === 'regular' && styles.regular,
                weight === 'medium' && styles.medium,
                weight === 'semiBold' && styles.semiBold,
                weight === 'bold' && styles.bold,
                weight === 'extraBold' && styles.extraBold,
                weight === 'black' && styles.black,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    general: {
        color: Colors.fontPrimary,
    },

    thin: {
        fontFamily: 'MontserratThin',
        fontWeight: 100,
    },
    extraLight: {
        fontFamily: 'MontserratExtraLight',
        fontWeight: 100,
    },
    light: {
        fontFamily: 'MontserratLight',
        fontWeight: 100,
    },
    regular: {
        fontFamily: 'MontserratRegular',
        fontWeight: 900,
    },
    medium: {
        fontFamily: 'MontserratMedium',
        fontWeight: 900,
    },
    semiBold: {
        fontFamily: 'MontserratSemiBold',
        fontWeight: 900,
    },
    bold: {
        fontFamily: 'MontserratBold',
        fontWeight: 900,
    },
    extraBold: {
        fontFamily: 'MontserratExtraBold',
        fontWeight: 900,
    },
    black: {
        fontFamily: 'MontserratBlack',
        fontWeight: 900,
    },
});