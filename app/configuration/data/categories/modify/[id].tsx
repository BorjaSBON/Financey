import { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import Input from '@components/common/input';
import TypeButtons from '@components/data/type-buttons';
import DeleteElement from '@components/common/delete-element';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useCategories } from '@/src/hooks/useCategories';
import { useProfiles } from '@/src/hooks/useProfiles';

const DataModify = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();
    
    // Database
    const { removeTransactionsByCategory, loadingTransactions } = useTransactions();
    const { category, getCategory, modifyCategory, removeCategory, loadingCategories } = useCategories();
    const { modifyProfileLastAction, modifyProfileDataDeleted } = useProfiles();

    // ID of the element
    const { id } = useLocalSearchParams<{ id: string }>();

    useEffect(() => {
        const loadCategory = async () => {
            await getCategory(Number(id));
        };

        loadCategory();
    }, [id]);

    // Active type
    const [expenseActive, setExpenseActive] = useState(true);

    // Category name
    const [name, setName] = useState('');

    // Budget amount
    const [budget, setBudget] = useState('');

    // Delete popup
    const [deleteElementPopup, setDeleteElementPopup] = useState(false);
    const activeDeleteElementPopup = () => {
        setDeleteElementPopup(prev => !prev);
    }

    // Error
    const [error, setError] = useState<String | null>(null);

    // Load transaction data into the form
    useEffect(() => {
        if (!category) {
            return;
        }

        // Get the budget
        const budget = category.budget;

        setName(category.name);
        setExpenseActive(category.type === 'expense');

        if (budget) setBudget(String(budget / 100));
    }, [category]);

    // MODIFY CATEGORY ACTION
    async function modidyCategoryAction() {
        // Check if the values are valid
        if (!name) {
            setError(languages['errorInputs']);
            return;
        }

        setError(null);

        let budgetInCents:null | number = null;

        if (budget && expenseActive) {
            // Check if the budget value is a number
            if (isNaN(Number(budget.replace(',', '.')))) {
                setError(languages['errorAmount']);
                return;
            }

            // Check if the budget value is positive
            if (Number(budget.replace(',', '.')) <= 0) {
                setError(languages['errorPositiveAmount']);
                return;
            }

            // Convert the budget value to a valid number
            budgetInCents = Math.round(Number(budget.replace(',', '.')) * 100);
        }

        // Modify category
        await modifyCategory({ id: Number(id), name: name, type: expenseActive ? 'expense' : 'income', budget: budgetInCents });

        // Modify profile
        await modifyProfileLastAction({ lastAction: 'modifyCategory' });

        // Return to the prevous page
        router.back();
    };

    // DELETE CATEGORY ACTION
    async function deleteCategoryAction() {
        // Remove the transactions related to the category
        const count = await removeTransactionsByCategory(Number(id));

        // Remove the category
        await removeCategory(Number(id));

        // Modify the profile
        await modifyProfileDataDeleted(count);
        await modifyProfileLastAction({ lastAction: 'deleteCategory' });

        // Return to the prevous page
        router.back();
    }

    // Check if the data is loaded
    if (loadingTransactions || loadingCategories) {
        return <ActivityIndicator />;
    }
    
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <View style={ styles.container }>
                <TypeButtons expenseActive={ expenseActive } expenseOnPress={ () => setExpenseActive(true) } incomeOnPress={ () => setExpenseActive(false) } />

                <View style={ styles.inputs }>
                    <Input name={ languages['name'] } type='text' placeholder={ languages['categoryPlaceholder'] } value={ name } onChangeText={ setName } />
                    { expenseActive && <Input name={ languages['budget'] } type='numeric' placeholder='0000.00' value={ budget } onChangeText={ setBudget } optional={ true } /> }
                </View>

                { error && <ThemedText weight='light' style={ styles.error }>{ error }</ThemedText> }

                <View style={ styles.buttons }>
                    <ThemedButton label={ languages['delete'] } type='delete' onPress={ activeDeleteElementPopup } />
                    <ThemedButton label={ languages['modify'] } type='default' onPress={ modidyCategoryAction }/>
                    <ThemedButton label={ languages['cancel'] } type='default' onPress={ () => { router.back() } }/>
                </View>
            </View>

            <DeleteElement active={ deleteElementPopup } title={ languages['deleteCategoryTitle'] } titleButton='delete' deleteAction={ deleteCategoryAction } cancelAction={ activeDeleteElementPopup } />
        </View>
    );
};

export default DataModify;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
        },

        amountInput: {
            display: 'flex',
            flexDirection: 'row',
            columnGap: 0,
            marginHorizontal: 'auto',
            marginTop: 10,
        },

        inputs: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 10,
            marginVertical: 10,
        },

        buttons: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 10,
            marginTop: 15,
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
