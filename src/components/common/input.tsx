import { StyleSheet, View } from 'react-native';

import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedDateInput } from '@ui/themed-date-input';
import { ThemedSelectInput } from '@ui/themed-select-input';

type DropdownItem = {
    label: string;
    value: string;
};

interface Props {
    // Variables
    name: string;
    type?: 'text' | 'numeric' | 'date' | 'select';

    // Text and numeric
    value?: string;
    placeholder?: string;
    onChangeText?: (value: string) => void;

    // Date
    dateValue?: Date | null;
    onChange?: (date: Date) => void;

    // Select
    selectData?: DropdownItem[];
    selectValue?: string;
    onSelect?: (item: DropdownItem) => void;
}

export default function Input({ name, type='text', value='', placeholder='', onChangeText=()=>{}, dateValue=null, onChange=()=>{}, selectData=[], selectValue='', onSelect=()=>{} }: Props) {
    return (
        <View style={ styles.input }>
            <ThemedText style={ styles.title } weight='regular'>{ name }</ThemedText>

            { type === 'text' && <ThemedInput type='text' placeholder={ placeholder } value={ value } onChange={ onChangeText } /> }
            { type === 'numeric' && <ThemedInput type='decimal' placeholder={ placeholder } value={ value } onChange={ onChangeText } /> }
            { type === 'date' && <ThemedDateInput value={ dateValue } onChange={ onChange } /> }
            { type === 'select' && <ThemedSelectInput data={ selectData } value={ selectValue } onSelect={ onSelect } /> }
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 6,
        paddingHorizontal: Values.paddingApp,
        width: '100%',
    },

    title: {
        fontSize: 15,
    },
});
