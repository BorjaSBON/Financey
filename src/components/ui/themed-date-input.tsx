import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors } from '@constants/colors';
import { ThemedText } from './themed-text';

import Logo from '@assets/calendar.svg';

type DateInputProps = {
    // Variables
    value: Date | null;

    // Methods
    onChange: (date: Date) => void;
};

export function ThemedDateInput({ value, onChange }: DateInputProps) {
    const [showPicker, setShowPicker] = useState(false);
    const formattedDate = value ? value.toLocaleDateString('en-GB') : 'DD/MM/YYYY';

    const handleChange = (_: any, selectedDate?: Date,) => {
        setShowPicker(false);

        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <View>
            <Pressable style={ styles.input } onPress={ () => setShowPicker(true) }>
                <ThemedText style={[ styles.text, !value && styles.placeholder ]} weight='light'>{ formattedDate }</ThemedText>
                <Logo style={ styles.icon } />
            </Pressable>

            { showPicker && (
                <DateTimePicker
                    value={ value ?? new Date() }
                    mode="date"
                    display={ Platform.OS === 'android' ? 'calendar' : 'spinner' }
                    onChange={ handleChange }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        position: 'relative',   
        width: '100%',
        height: 40,
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: Colors.inputBackground,
        borderRadius: 12,
    },

    text: {
        fontSize: 13,
    },

    placeholder: {
        color: Colors.inputTextUnselected,
    },
    
    icon: {
        position: 'absolute',
        right: 15,
        width: 20
    },
});
