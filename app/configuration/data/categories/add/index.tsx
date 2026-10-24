import { useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import Input from '@components/common/input';
import TypeButtons from '@components/data/type-buttons';

import { useCategories } from '@/src/hooks/useCategories';
import { useProfiles } from '@/src/hooks/useProfiles';

const DataAdd = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Database
    const { createCategory, loadingCategories } = useCategories();
    const { modifyProfileLastAction, loadingProfiles } = useProfiles();

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

    // Error
    const [error, setError] = useState<String | null>(null);

    // Add button
    async function addCategory() {
        if (!name) {
            setError(languages['errorInputs']);
            return;
        }

        setError(null);

        try {
            // Create the category
            await createCategory({ name: name, type: expenseActive ? 'expense' : 'income' });

            // Modify profile
            await modifyProfileLastAction({ lastAction: 'createCategory' });

            router.back();
        } catch (err) {
            const error = err instanceof Error ? err : new Error(languages['errorCreateCategory']);
            setError(error.message);
        }
    };

    if (loadingCategories || loadingProfiles) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <TypeButtons expenseActive={ expenseActive } expenseOnPress={ expenseActivation } incomeOnPress={ incomeActivation } />

            <View style={ styles.inputs }>
                <Input name={ languages['name'] } type='text' placeholder={ languages['categoryPlaceholder'] } value={ name } onChangeText={ setName } />
            </View>

            { error && <ThemedText weight='light' style={ styles.error }>{ error }</ThemedText> }

            <View style={ styles.add }>
                <ThemedButton label={ languages['add'] } type='default' onPress={ addCategory } />
            </View>
        </View>
    );
};

export default DataAdd;

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
