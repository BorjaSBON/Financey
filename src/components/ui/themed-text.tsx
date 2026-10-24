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
            includeFontPadding: false,
            letterSpacing: -0.25,
        },

        thin: {
            fontFamily: 'MontserratThin',
        },
        extraLight: {
            fontFamily: 'MontserratExtraLight',
        },
        light: {
            fontFamily: 'MontserratLight',
        },
        regular: {
            fontFamily: 'MontserratRegular',
        },
        medium: {
            fontFamily: 'MontserratMedium',
        },
        semiBold: {
            fontFamily: 'MontserratSemiBold',
        },
        bold: {
            fontFamily: 'MontserratBold',
        },
        extraBold: {
            fontFamily: 'MontserratExtraBold',
        },
        black: {
            fontFamily: 'MontserratBlack',
        },
    }
);