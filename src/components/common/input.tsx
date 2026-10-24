import { StyleSheet, View, Pressable } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';

import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedDateInput } from '@ui/themed-date-input';
import { ThemedSelectInput } from '@ui/themed-select-input';

import { AddIcon } from '@icons/add';

type DropdownItem = {
    label: string;
    value: string;
};

interface Props {
    // Variables
    name: string;
    type?: 'text' | 'numeric' | 'date' | 'select';
    addButton?: boolean;

    // Text and numeric
    value?: string;
    placeholder?: string;
    onChangeText?: (value: string) => void;

    // Date
    dateValue?: Date | null;
    minimumDate?: Date | null;
    onChange?: (date: Date) => void;

    // Select
    selectData?: DropdownItem[];
    selectValue?: string;
    onSelect?: (item: DropdownItem) => void;
}

export default function Input({ name, type='text', addButton=false, value='', placeholder='', onChangeText=()=>{}, dateValue=null, minimumDate=null, onChange=()=>{}, selectData=[], selectValue='', onSelect=()=>{} }: Props) {
    // Theme
    const { colors } = useTheme();

    return (
        <View style={ styles.input }>
            { addButton ?
                <View style={ styles.header }>
                    <ThemedText style={ styles.title } weight='medium'>{ name }</ThemedText>
                    <Pressable onPress={ () => router.push('/configuration/data/categories/add') }>
                        <AddIcon size={ 14 } backgroundColor={ colors.iconColor } iconColor={colors.iconBackground} />
                    </Pressable>
                </View> : <ThemedText style={ styles.title } weight='medium'>{ name }</ThemedText>
            }

            { type === 'text' && <ThemedInput type='text' placeholder={ placeholder } value={ value } onChange={ onChangeText } /> }
            { type === 'numeric' && <ThemedInput type='decimal' placeholder={ placeholder } value={ value } onChange={ onChangeText } /> }
            { type === 'date' && <ThemedDateInput value={ dateValue } minimumDate={ minimumDate }onChange={ onChange } /> }
            { type === 'select' && <ThemedSelectInput data={ selectData } value={ selectValue } onSelect={ onSelect } /> }
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: Values.rowGapSection,
        paddingHorizontal: Values.paddingApp,
        width: '100%',
    },

    title: {
        fontSize: 13,
    },

    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        columnGap: 8,
        alignItems: 'center'
    },
});
