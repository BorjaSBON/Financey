import { useState } from 'react';
import { View, TextInput, StyleSheet, InputModeOptions } from 'react-native';
import { DropDownSelect } from 'react-native-simple-dropdown-select';

import { Colors } from '@constants/colors';

import Logo from '@assets/calendar.svg';

interface Props {
    // Variables
    value?: string;
    placeholder?: string;

    type?: 'text' | 'number' | 'date';
}

export function ThemedInput({ value='', placeholder='', type='text' }: Props) {
    const [text, setText] = useState(value);

    let inputMode = 'text' as InputModeOptions;
    switch (type) {
        case 'number':
            inputMode = 'decimal';
    }

    return (
        <View style={ styles.container }>
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