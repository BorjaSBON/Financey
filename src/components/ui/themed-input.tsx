import { useState } from 'react';
import { View, TextInput, StyleSheet, InputModeOptions } from 'react-native';

import { Colors } from '@constants/colors';

import Logo from '@assets/calendar.svg';

interface Props {
    // Variables
    value?: string;
    placeholder?: string;

    type?: 'text' | 'select' | 'number' | 'date';
}

export function ThemedInput({ value='', placeholder='', type='text' }: Props) {
    const [text, setText] = useState(value);

    let inputMode = 'text' as InputModeOptions;
    switch (type) {
        case 'number':
            inputMode = 'decimal';
    }

    return (
        <View style={ styles.inputView }>
            <TextInput
                style={ styles.input }
                value={ text }
                placeholder={ placeholder }
                onChangeText={ setText }
                inputMode={ inputMode }
                autoComplete='off'
            />
            <Logo style={ styles.icon } />
        </View>
    );
}

const styles = StyleSheet.create({
    inputView: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
    },

    input: {
        flex: 1,
        backgroundColor: Colors.inputBackground,
        color: Colors.fontPrimary,
        paddingStart: 15,
        paddingEnd: 50,
        borderRadius: 12,
    },

    icon: {
        position: 'absolute',
        right: 25,
        width: 20
    },
});