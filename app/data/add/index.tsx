import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import Input from '@components/common/input';
import TypeButtons from '@components/data/type-buttons';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useCategories } from '@/src/hooks/useCategories';

const DataAdd = () => {
    // Get the categories
    const { categories, loading } = useCategories();

    // Get the function to create a transaction
    const { createTransaction } = useTransactions();

    // Active type
    const [expenseActive, setExpenseActive] = useState(true);
    let categories_selected = categories.filter(item => item.type === (expenseActive ? 'expense' : 'income'));
    let categories_formatted = categories_selected.map((item) => {
        return {
            value: item.name.toLowerCase(),
            label: item.name,
        };
    });

    const expenseActivation = () => {
        setExpenseActive(true);
    }

    const incomeActivation = () => {
        setExpenseActive(false);
    }

    // Category select
    const [selectValue, setSelectValue] = useState('');

    // Amount and date value
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState<Date | null>(null);

    // Add button
    async function addTransaction() {
        if (!amount || !selectValue) {
            return;
        }

        const amountInCents = Math.round(Number(amount) * 100);

        const id = await createTransaction({
            type: expenseActive ? 'expense' : 'income',
            amount: amountInCents,
            categoryId: categories_selected.find(item => item.name.toLowerCase() === selectValue)?.id || 0,
            date: date ? date.toISOString() : new Date().toISOString(),
        });

        console.log('Creada:', id);
    };

    if (loading) {
        return <View></View>;
    }

    return (
        <View style={ styles.container }>
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
                <Input name='Category' type='select' selectData={ categories_formatted } selectValue={ selectValue } onSelect={ (item) => { setSelectValue(item.value); }} />
                <Input name='Date' type='date' dateValue={ date } onChange={ setDate } />
            </View>

            <View style={ styles.add }>
                <ThemedButton label='Add' type='default' onPress={ addTransaction } />
            </View>
        </View>
    );
};

export default DataAdd;

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

    add: {
        marginTop: 25,
        marginHorizontal: 'auto',
    },
});
