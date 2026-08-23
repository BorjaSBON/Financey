import { View, TextInput, StyleSheet, InputModeOptions } from 'react-native';

import { Colors } from '@constants/colors';

interface Props {
    // Variables
    value?: string;
    placeholder?: string;
    type?: InputModeOptions;

    // Methods
    onChange?: (value:string) => void;
}

export function ThemedInput({ value='', placeholder='', type='text', onChange=()=>{} }: Props) {
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

const styles = StyleSheet.create({
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
        backgroundColor: Colors.inputBackground,
        color: Colors.fontPrimary,
        paddingStart: 15,
        paddingEnd: 35,
        borderRadius: 12,
    },

    icon: {
        position: 'absolute',
        right: 15,
        width: 20
    },
});