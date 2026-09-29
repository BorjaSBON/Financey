import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import Logo from '@assets/calendar.svg';

type DateInputProps = {
    // Variables
    value: Date | null;

    // Methods
    onChange: (date: Date) => void;
};

export function ThemedDateInput({ value, onChange }: DateInputProps) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Data
    const [open, setOpen] = useState(false);
    const formattedDate = value ? value.toLocaleDateString('en-GB') : 'DD/MM/YYYY';

    const handleChange = (_: any, selectedDate?: Date,) => {
        setOpen(false);

        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <View>
            <Pressable style={ styles.input } onPress={ () => setOpen(true) }>
                <ThemedText style={[ styles.text, !value && styles.placeholder ]} weight='light'>{ formattedDate }</ThemedText>
                <Logo style={ styles.icon } />
            </Pressable>

            { open && (
                <DateTimePicker
                    value={ value ?? new Date() }
                    mode="date"
                    display={ Platform.OS === 'android' ? 'calendar' : 'spinner' }
                    onValueChange={ handleChange }
                />
            )}
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        input: {
            position: 'relative',   
            width: '100%',
            height: 40,
            paddingHorizontal: 15,
            justifyContent: 'center',
            backgroundColor: colors.inputBackground,
            borderRadius: 12,
        },

        text: {
            fontSize: 13,
            color: colors.inputFont,
        },

        placeholder: {
            color: colors.inputFontPlaceholder,
        },
        
        icon: {
            position: 'absolute',
            right: 15,
            width: 20
        },
    }
);
