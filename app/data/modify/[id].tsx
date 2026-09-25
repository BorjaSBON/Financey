import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import Input from '@components/common/input';
import TypeButtons from '@components/data/type-buttons';
import DeleteElement from '@components/common/delete-element';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useCategories } from '@/src/hooks/useCategories';
import { useProfiles } from '@/src/hooks/useProfiles';

const DataModify = () => {
    // Database
    const { categories } = useCategories();
    const { transaction, getTransaction, modifyTransaction, removeTransaction, loading } = useTransactions();
    const { modifyProfileDataModified, modifyProfileDataDeleted } = useProfiles();

    // ID of the element
    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        const loadTransaction = async () => {
            await getTransaction(Number(id));
        };

        loadTransaction();
    }, [id]);

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

    // Delete popup
    const [deleteElementPopup, setDeleteElementPopup] = useState(false);
    const activeDeleteElementPopup = () => {
        setDeleteElementPopup(prev => !prev);
    }

    // Load transaction data into the form
    useEffect(() => {
        if (!transaction) {
            return;
        }

        setAmount(String(transaction.amount / 100));
        setDate(new Date(transaction.date));
        setSelectValue(transaction.categoryName.toLowerCase());
        setExpenseActive(transaction.type === 'expense');
    }, [transaction]);

    // MODIFY TRANSACTION ACTION
    async function modidyTransactionAction() {
        // Check if the values are valid
        if (!amount || !selectValue) {
            return;
        }
        // TODO

        // Convert the amount value to a valid number
        const amountInCents = Math.round(Number(amount) * 100);

        // Modify transaction
        await modifyTransaction({
            id: Number(id),
            type: expenseActive ? 'expense' : 'income',
            amount: amountInCents,
            categoryId: categories_selected.find(item => item.name.toLowerCase() === selectValue)?.id || 1,
            date: date ? date.toISOString() : new Date().toISOString(),
        });

        // Modify profile
        await modifyProfileDataModified();

        // Return to the prevous page (List page)
        router.back();
    };

    // DELETE TRANSACTION ACTION
    async function deleteTransactionAction() {
        // Remove the transaction
        await removeTransaction(transaction?.id || 0);

        // Modify the profile
        await modifyProfileDataDeleted();

        // Return to the prevous page (List page)
        router.back();
    }

    // Check if the data is loaded
    if (loading) {
        return <ActivityIndicator />;
    }
    
    return (
        <View style={ styles.container }>
            <View>
                <TypeButtons expenseActive={ expenseActive } expenseOnPress={ expenseActivation } incomeOnPress={ incomeActivation } />

                <View style={ styles.amountInput }>
                    <TextInput
                        style={ styles.amountValue }
                        value={ String(amount) }
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

                <View style={ styles.buttons }>
                    <ThemedButton label='Delete' type='delete' onPress={ activeDeleteElementPopup } />
                    <ThemedButton label='Modify' type='default' onPress={ modidyTransactionAction }/>
                    <ThemedButton label='Cancel' type='default' onPress={ () => { router.back() } }/>
                </View>
            </View>

            <DeleteElement active={ deleteElementPopup } title='Are you sure you want to delete the element?' titleButton='Delete' deleteAction={ deleteTransactionAction } cancelAction={ activeDeleteElementPopup } />
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
