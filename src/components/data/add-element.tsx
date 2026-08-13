import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import Input from '@components/common/input';
import TypeButtons from '@components/data/type-buttons';

export default function AddElement() {
    const [selectValue, setSelectValue] = useState('category_01');
    const dropDownList = [
        {
            label: 'Category 01',
            value: 'category_01',
        },
        {
            label: 'Category 02',
            value: 'category_02',
        },
        {
            label: 'Category 03',
            value: 'category_03',
        },
        {
            label: 'Category 04',
            value: 'category_04',
        },
        {
            label: 'Category 05',
            value: 'category_05',
        },
        {
            label: 'Category 06',
            value: 'category_06',
        },
        {
            label: 'Category 07',
            value: 'category_07',
        },
        {
            label: 'Category 08',
            value: 'category_08',
        },
        {
            label: 'Category 09',
            value: 'category_09',
        },
        {
            label: 'Category 10',
            value: 'category_10',
        },
    ]

    const [amount, setAmount] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    
    return (
        <View style={ styles.addElement }>
            <TypeButtons />

            <View style={ styles.amountInput }>
                <TextInput
                    style={ styles.amountValue }
                    value={ amount }
                    placeholder='0000.00'
                    onChangeText={ setAmount }
                    inputMode='decimal'
                    autoComplete='off'
                />
                <ThemedText style={ styles.amountUnit } weight='light'>€</ThemedText>
            </View>

            <View style={ styles.inputs }>
                <Input name='Category' type='select' selectData={ dropDownList } selectValue={ selectValue } onSelect={ (item) => { setSelectValue(item.value); }} />
                <Input name='Date' type='date' dateValue={ date } onChange={ setDate } />
            </View>

            <View style={ styles.add }>
                <ThemedButton label='Add' type='default'/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    addElement: {
        flex: 1,
        top: 100,
        width: '100%',
        paddingBottom: 125,
    },

    amountInput: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 0,
        marginHorizontal: 'auto',
        marginTop: 10,
    },

    amountValue: {
        fontSize: 28,
    },

    amountUnit: {
        fontSize: 16,
        marginVertical: 'auto',
        marginBottom: 14,
    },

    inputs: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
        marginVertical: 10,
    },

    pairButtons: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 8,
        position: 'relative',
        width: '49%',
    },

    add: {
        marginTop: 25,
        marginHorizontal: 'auto',
    },
});
