import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedDateInput } from '@ui/themed-date-input';

import Input from '@components/common/input';

export default function Filter() {
    const [selectValueOrder, setSelectValueOrder] = useState('date_new');
    const dropDownListOrder = [
        {
            label: 'Date (New to Old)',
            value: 'date_new',
        },
        {
            label: 'Date (Old to New)',
            value: 'date_old',
        },
        {
            label: 'Amount (Higher to Lower)',
            value: 'amount_higher',
        },
        {
            label: 'Amount (Lower to Higher)',
            value: 'amount_lower',
        },
    ]

    const [selectValueType, setSelectValueType] = useState('');
    const dropDownListType = [
        {
            label: 'Income',
            value: 'income',
        },
        {
            label: 'Expense',
            value: 'expense',
        },
    ]

    const [selectValueCategory, setSelectValueCategory] = useState('');
    const dropDownListCategory = [
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

    const [amountValueStart, setAmountValueStart] = useState('');
    const [amountValueEnd, setAmountValueEnd] = useState('');

    const [dateValueStart, onChangeStart] = useState<Date | null>(null);
    const [dateValueEnd, onChangeEnd] = useState<Date | null>(null);

    return (
        <View style={ styles.filter }>
            <Input name='Order by' type='select' selectData={ dropDownListOrder } selectValue={ selectValueOrder } onSelect={ (item) => { setSelectValueOrder(item.value); }} />
            <Input name='Type' type='select' selectData={ dropDownListType } selectValue={ selectValueType } onSelect={ (item) => { setSelectValueType(item.value); }} />
            <Input name='Category' type='select' selectData={ dropDownListCategory } selectValue={ selectValueCategory } onSelect={ (item) => { setSelectValueCategory(item.value); }} />

            <View style={ styles.input }>
                <ThemedText style={ styles.title } weight='regular'>Amount</ThemedText>
                <View style={ styles.pairButtons }>
                    <ThemedInput type='decimal' placeholder='000.0' value={ amountValueStart } onChange={ setAmountValueStart } />
                    <ThemedInput type='decimal' placeholder='000.0' value={ amountValueEnd } onChange={ setAmountValueEnd } />
                </View>
            </View>

            <View style={ styles.input }>
                <ThemedText style={ styles.title } weight='regular'>Date</ThemedText>
                <View style={ styles.pairButtons }>
                    <ThemedDateInput value={ dateValueStart } onChange={ onChangeStart } />
                    <ThemedDateInput value={ dateValueEnd } onChange={ onChangeEnd } />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    filter: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 15,
        top: 100,
        width: '100%',
        paddingTop: 25,
        paddingBottom: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 2,
        
        shadowColor: Colors.shadow,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

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

    pairButtons: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 8,
        position: 'relative',
        width: '49%',
    },
});
