import { useState } from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';
import { useCurrency } from '@currency/useCurrency';

import { checkBudgetAfterTransaction } from '@services/budgetAlerts';

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

    // Traductions
    const { languages } = useLanguage();

    // Currency
    const { currencyInfo } = useCurrency();

    // Database
    const { categories, loadingCategories } = useCategories();
    const { createTransaction } = useTransactions();
    const { profile, modifyProfileDataAdded, loadingProfiles } = useProfiles();
    
    // Inputs values
    const [expenseActive, setExpenseActive] = useState(true);
    const [categorySelect, setCategorySelect] = useState('');
    const [amount, setAmount] = useState('');
    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [repeatedSelect, setRepeatedSelect] = useState('no');
    const [dateEnd, setDateEnd] = useState<Date | null>(null);

    // Categories
    let categories_selected = categories.filter(item => item.type === (expenseActive ? 'expense' : 'income'));
    let categories_formatted = categories_selected.map((item) => {
        return {
            value: item.name.toLowerCase(),
            label: item.name,
        };
    });

    // Repeat options
    const repeat_options = [
        { value: 'no', label: languages['no']},
        { value: 'daily', label: languages['daily']},
        { value: 'weekly', label: languages['weekly']},
        { value: 'monthly', label: languages['monthly']}
    ];

    // Error
    const [error, setError] = useState<String | null>(null);

    // Function to calculate the monthlt increase
    const getMontlyDate = (date: Date, originalDay: number) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const desiredDay = originalDay;

        // First date of the next month
        const result = new Date(
            year,
            month,
            1,
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        );

        // Last day of the next month
        const lastDay = new Date(year, month + 1, 0).getDate();

        // Utiliza el día deseado o el último disponible
        result.setDate(Math.min(desiredDay, lastDay));

        return result;
    };

    // Add button
    async function addTransaction() {
        // Check if the inputs are filled
        if (!amount || !categorySelect || !dateStart) {
            setError(languages['errorInputs']);
            return;
        }

        setError(null);

        // Check if the amount value is a number
        if (isNaN(Number(amount.replace(',', '.')))) {
            setError(languages['errorAmount']);
            return;
        }

        // Check if the amount value is positive
        if (Number(amount.replace(',', '.')) <= 0) {
            setError(languages['errorPositiveAmount']);
            return;
        }

        // Convert the amount value to a valid number
        const amountInCents = Math.round(Number(amount.replace(',', '.')) * 100);

        let currentDate = new Date(dateStart);
        if (repeatedSelect !== 'no' && dateEnd) {
            if (currentDate > dateEnd) {
                setError(languages['errorDates']);
                return;
            }

            while (currentDate <= dateEnd) {
                await createTransaction({
                    type: expenseActive ? 'expense' : 'income',
                    amount: amountInCents,
                    profileId: profile?.id || 1,
                    categoryId: categories_selected.find(item => item.name.toLowerCase() === categorySelect)?.id || 1,
                    date: currentDate.toISOString(),
                });

                await modifyProfileDataAdded();

                if (repeatedSelect === 'daily') {
                    currentDate.setDate(currentDate.getUTCDate() + 1);
                } else if (repeatedSelect === 'weekly') {
                    currentDate.setDate(currentDate.getUTCDate() + 7);
                } else if (repeatedSelect === 'monthly') {
                    currentDate = getMontlyDate(currentDate, dateStart.getUTCDate());
                }
            }
        } else {
            await createTransaction({
                type: expenseActive ? 'expense' : 'income',
                amount: amountInCents,
                profileId: profile?.id || 1,
                categoryId: categories_selected.find(item => item.name.toLowerCase() === categorySelect)?.id || 1,
                date: dateStart ? dateStart.toISOString() : new Date().toISOString(),
            });

            await modifyProfileDataAdded();
        }

        // Check budget limit
        await checkBudgetAfterTransaction(
            categories_selected.find(item => item.name.toLowerCase() === categorySelect)?.id || 1,
            { title: languages['exceededTitle'], message: languages['exceededMessage']},
            { title: languages['warningTitle'], message: languages['warningMessage']},
        );

        router.back();
    };

    if (loadingCategories || loadingProfiles) {
        return <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}><ActivityIndicator /></SafeAreaView>;
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
            <View style={ styles.container }>
                <TypeButtons expenseActive={ expenseActive } expenseOnPress={() => { setExpenseActive(true); }} incomeOnPress={() => { setExpenseActive(false); }} />

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
                    <ThemedText style={ styles.amountUnit } weight='regular'>{ currencyInfo.symbol }</ThemedText>
                </View>

                <View style={ styles.inputs }>
                    <Input name={ languages['category'] } type='select' addButton params={{ categoryType: expenseActive ? 'expense' : 'income' }} selectData={ categories_formatted } selectValue={ categorySelect } onSelect={ (item) => { setCategorySelect(item.value); }} />
                    <Input name={ languages['date'] } type='date' dateValue={ dateStart } onChange={ setDateStart } />
                    <Input name={ languages['frequency'] } type='select' selectData={ repeat_options } selectValue={ repeatedSelect } onSelect={ (item) => { setRepeatedSelect(item.value); }} />
                    { repeatedSelect !== 'no' && <Input name={ languages['endDate'] } type='date' dateValue={ dateEnd } minimumDate={ dateStart } onChange={ setDateEnd } /> }
                    
                </View>

                { error && <ThemedText weight='light' style={ styles.error }>{ error }</ThemedText> }

                <View style={ styles.add }>
                    <ThemedButton label={ languages['add'] } type='default' onPress={ addTransaction } />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DataAdd;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            top: Values.topHeader,
            width: '100%',
            paddingBottom: Values.paddingBottom,
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
            fontFamily: 'MontserratMedium',
            includeFontPadding: false,
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
