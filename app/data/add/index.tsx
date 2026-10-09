import { useState } from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { useCurrency } from '@currency/useCurrency';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import Input from '@components/common/input';
import TypeButtons from '@components/data/type-buttons';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useCategories } from '@/src/hooks/useCategories';
import { useProfiles } from '@/src/hooks/useProfiles';

const DataAdd = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Currency
    const { currencyInfo } = useCurrency();

    // Database
    const { categories, loadingCategories } = useCategories();
    const { createTransaction } = useTransactions();
    const { profile, modifyProfileDataAdded, loadingProfiles } = useProfiles();

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

    // Error
    const [error, setError] = useState<String | null>(null);

    // Add button
    async function addTransaction() {
        if (!amount || !selectValue || !date) {
            setError('Fill all the inputs');
            return;
        }

        setError(null);

        if (isNaN(Number(amount.replace(',', '.')))) {
            setError('The amount is not a valid number');
            return;
        }

        const amountInCents = Math.round(Number(amount) * 100);

        await createTransaction({
            type: expenseActive ? 'expense' : 'income',
            amount: amountInCents,
            profileId: profile?.id || 1,
            categoryId: categories_selected.find(item => item.name.toLowerCase() === selectValue)?.id || 1,
            date: date ? date.toISOString() : new Date().toISOString(),
        });

        await modifyProfileDataAdded();

        router.push('/data/list');
    };

    if (loadingCategories || loadingProfiles) {
        return <ActivityIndicator />;
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
                    placeholderTextColor={ colors.fontSecondary }
                />
                <ThemedText style={ styles.amountUnit } weight='light'>{ currencyInfo.symbol }</ThemedText>
            </View>

            <View style={ styles.inputs }>
                <Input name='Category' type='select' selectData={ categories_formatted } selectValue={ selectValue } onSelect={ (item) => { setSelectValue(item.value); }} />
                <Input name='Date' type='date' dateValue={ date } onChange={ setDate } />
            </View>

            { error && <ThemedText weight='extraLight' style={ styles.error }>{ error }</ThemedText> }

            <View style={ styles.add }>
                <ThemedButton label='Add' type='default' onPress={ addTransaction } />
            </View>
        </View>
    );
};

export default DataAdd;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
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
            color: colors.fontPrimary,
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
        
        error: {
            textAlign: 'center',
            fontSize: 12,
            marginTop: 5,
            color: colors.negative,
        },
    }
);
