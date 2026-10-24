import { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import DateIcon from '@assets/calendar.svg';

type DateInputProps = {
    // Variables
    value: Date | null;
    minimumDate?: Date | null;

    // Methods
    onChange: (date: Date) => void;
};

export function ThemedDateInput({ value, minimumDate, onChange }: DateInputProps) {
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
            <View style={ styles.container }>
                <Pressable style={ styles.input } onPress={ () => setOpen(true) }>
                    <ThemedText style={[ styles.text, !value && styles.placeholder ]} weight='regular'>{ formattedDate }</ThemedText>
                    <DateIcon style={ styles.icon } color={ colors.iconBackground } />
                </Pressable>
            </View>

            { open && (
                <DateTimePicker
                    value={ value ?? new Date() }
                    mode="date"
                    display={ Platform.OS === 'android' ? 'calendar' : 'spinner' }
                    onValueChange={ handleChange }
                    minimumDate={ minimumDate ? minimumDate : new Date(0,0,0) }
                />
            )}
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            width: '100%',
        },

        input: {
            height: 40,
            width: '100%',
            paddingLeft: 15,
            paddingRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

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
            right: 7.5,
        },
    }
);
