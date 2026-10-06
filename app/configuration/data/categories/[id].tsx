import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

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
    
    // Database
    const { removeTransactionsByCategory, loadingTransactions } = useTransactions();
    const { category, getCategory, modifyCategory, removeCategory, loadingCategories } = useCategories();
    const { modifyProfileLastAction } = useProfiles();

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

    const expenseActivation = () => {
        setExpenseActive(true);
    }

    const incomeActivation = () => {
        setExpenseActive(false);
    }

    // Category name
    const [name, setName] = useState('');

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

        setName(category.name);
    }, [category]);

    // MODIFY CATEGORY ACTION
    async function modidyCategoryAction() {
        // Check if the values are valid
        if (!name) {
            setError('Fill the name input');
            return;
        }

        setError(null);

        // Modify category
        await modifyCategory({ id: Number(id), name });

        // Modify profile
        await modifyProfileLastAction({ lastAction: 'Modify category' });

        // Return to the prevous page
        router.back();
    };

    // DELETE CATEGORY ACTION
    async function deleteCategoryAction() {
        // Remove the transactions related to the category
        await removeTransactionsByCategory(Number(id));

        // Remove the category
        await removeCategory(Number(id));

        // Modify the profile
        await modifyProfileLastAction({ lastAction: 'Delete category' });

        // Return to the prevous page
        router.back();
    }

    // Check if the data is loaded
    if (loadingTransactions || loadingCategories) {
        return <ActivityIndicator />;
    }
    
    return (
        <View style={ styles.container }>
            <View>
                <TypeButtons expenseActive={ expenseActive } expenseOnPress={ expenseActivation } incomeOnPress={ incomeActivation } />

                <View style={ styles.inputs }>
                    <Input name='Name' type='text' placeholder='Category name' value={ name } onChangeText={ setName } />
                </View>

                { error && <ThemedText weight='extraLight' style={ styles.error }>{ error }</ThemedText> }

                <View style={ styles.buttons }>
                    <ThemedButton label='Delete' type='delete' onPress={ activeDeleteElementPopup } />
                    <ThemedButton label='Modify' type='default' onPress={ modidyCategoryAction }/>
                    <ThemedButton label='Cancel' type='default' onPress={ () => { router.back() } }/>
                </View>
            </View>

            <DeleteElement active={ deleteElementPopup } title='Are you sure you want to delete the element? All the related transactions will be lost.' titleButton='Delete' deleteAction={ deleteCategoryAction } cancelAction={ activeDeleteElementPopup } />
        </View>
    );
};

export default DataModify;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            top: Values.topIfHeader,
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
