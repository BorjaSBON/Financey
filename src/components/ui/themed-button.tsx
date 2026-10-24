import { Pressable, StyleSheet } from 'react-native';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

interface Props {
    // Variables
    label: string;
    type?: 'default' | 'clear' | 'delete';

    // Methods
    onPress?: () => void;
    onLongPress?: () => void;
}

export function ThemedButton({ label, type, onPress, onLongPress }: Props) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed ? { opacity: 0.85 } : { opacity: 1 },
                type === 'default' && styles.default,
                type === 'clear' && styles.clear,
                type === 'delete' && styles.delete,
            ]}
            onPress={ onPress }
            onLongPress={ onLongPress }
        >
            <ThemedText style={ styles.text } weight='regular'>{ label }</ThemedText>
        </Pressable>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        button: {
            borderRadius: 30,
            paddingTop: 5,
            paddingBottom: 6,
            paddingStart: 25,
            paddingEnd: 25,
            minWidth: 125,
            alignItems: 'center'
        },

        default: {
            backgroundColor: colors.buttonBackgroundPrimary,
        },
        clear: {
            backgroundColor: colors.buttonBackgroundSecondary,
        },
        delete: {
            backgroundColor: colors.buttonBackgroundWarning,
        },

        text: {
            color: colors.buttonFont,
            fontSize: 14,
        }
    }
);