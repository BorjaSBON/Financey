import { Text, StyleSheet, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
};

export function ThemedText({ style, ...rest }:ThemedTextProps) {
    return (
        <Text
            style={[
                styles.general,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    general: {
        color: '#0F172A',
    },
});