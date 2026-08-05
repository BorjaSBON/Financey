import { Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

interface Props {
    // Variabls
    label: string;
    type?: 'default' | 'clear' | 'delete';

    // Methods
    onPress?: () => void;
    onLongPress?: () => void;
}

export function ThemedButton({ label, type, onPress, onLongPress }: Props) {
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
            <Text style={ styles.text }>{ label }</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 30,
        paddingTop: 6,
        paddingBottom: 5,
        paddingStart: 25,
        paddingEnd: 25,
        minWidth: 125,
        alignItems: 'center'
    },

    default: {
        backgroundColor: Colors.buttonPrimary,
    },
    clear: {
        backgroundColor: Colors.buttonSecondary,
    },
    delete: {
        backgroundColor: Colors.buttonWarning,
    },

    text: {
        color: Colors.fontSecondary,
        fontFamily: 'Montserrat',
        fontSize: 15,
        fontWeight: 400,
    }
});