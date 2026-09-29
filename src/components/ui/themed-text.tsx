import { Text, StyleSheet, type TextProps } from 'react-native';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

export type ThemedTextProps = TextProps & {
    weight?: 'thin' | 'extraLight' | 'light' | 'regular' | 'medium' | 'semiBold' | 'bold' | 'extraBold' | 'black';
};

export function ThemedText({ style, weight='regular', ...rest }: ThemedTextProps) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

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

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        general: {
            color: colors.fontPrimary,
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
    }
);