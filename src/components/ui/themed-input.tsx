import { View, TextInput, StyleSheet, InputModeOptions } from 'react-native';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

interface Props {
    // Variables
    value?: string;
    placeholder?: string;
    type?: InputModeOptions;

    // Methods
    onChange?: (value:string) => void;
}

export function ThemedInput({ value='', placeholder='', type='text', onChange=()=>{} }: Props) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={ styles.container }>
            <TextInput
                style={ styles.input }
                value={ value }
                placeholder={ placeholder }
                onChangeText={ onChange }
                inputMode={ type }
                autoComplete='off'
            />
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            position: 'relative',
            width: '100%',
            height: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            elevation: 10,
        },

        input: {
            flex: 1,
            backgroundColor: colors.inputBackground,
            color: colors.inputFont,
            paddingStart: 15,
            paddingEnd: 35,
            borderRadius: 12,
        },

        icon: {
            position: 'absolute',
            right: 15,
            width: 20
        },
    }
);