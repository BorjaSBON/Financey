import { Text, StyleSheet, type TextProps } from 'react-native';
import { Colors } from '../../constants/colors';

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
});