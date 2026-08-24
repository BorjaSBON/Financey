import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import Input from '@components/common/input';
import TypeButtons from '@components/data/type-buttons';
import DeleteElement from '@components/data/delete_element';

type Category = {
    value: string;
    label: string;
};

const DataModify = () => {
    // ID of the element
    const { id } = useLocalSearchParams<{ id: string }>();

    // Get the data of the element
    const typeElement = 'income';
    const categoryElement = 'nómina';
    const valueElement = '12.75';
    const dateElement = new Date('2026-07-20');

    // Get the categories
    const expense_categories:Category[] = require('@/docs/expense_categories.json');
    const income_categories:Category[] = require('@/docs/income_categories.json');

    // Active type
    const [expenseActive, setExpenseActive] = useState(false);
    let categories = expenseActive ? expense_categories : income_categories;

    const expenseActivation = () => {
        setExpenseActive(true);
    }

    const incomeActivation = () => {
        setExpenseActive(false);
    }

    // Category select
    const [selectValue, setSelectValue] = useState(categoryElement);

    // Amount and date value
    const [amount, setAmount] = useState(valueElement);
    const [date, setDate] = useState<Date | null>(dateElement);

    // Delete popup
    const [deleteElement, setDeleteElement] = useState(false);
    const activeDeleteElement = () => {
        setDeleteElement(prev => !prev);
    }
    
    return (
        <View style={ styles.container }>
            <View>
                <TypeButtons expenseActive={ expenseActive } expenseOnPress={ expenseActivation } incomeOnPress={ incomeActivation } />

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
                    <Input name='Category' type='select' selectData={ categories } selectValue={ selectValue } onSelect={ (item) => { setSelectValue(item.value); }} />
                    <Input name='Date' type='date' dateValue={ date } onChange={ setDate } />
                </View>

                <View style={ styles.buttons }>
                    <ThemedButton label='Delete' type='delete' onPress={ activeDeleteElement } />
                    <ThemedButton label='Modify' type='default' onPress={ () => router.push('/data/list') }/>
                </View>
            </View>

            <DeleteElement active={ deleteElement } cancelAction={ activeDeleteElement } />
        </View>
    );
};

export default DataModify;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Values.topNotHeader,
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

    buttons: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
        marginTop: 25,
        marginHorizontal: 'auto',
    },
});
