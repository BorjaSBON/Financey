import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import TypeButtons from '@components/data/type-buttons';
import { CategoryElement, NewCategory } from '@components/configuration/category-element';
import ModifyElement from '@components/common/modify-element';

import { useCategories } from '@/src/hooks/useCategories';
import { useProfiles } from '@/src/hooks/useProfiles';

const Categories = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Change the router previous page
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (event) => {
            event.preventDefault();
            router.push('/configuration');
        });

        return unsubscribe;
    }, [navigation]);

    // Database
    const { categories, category, createCategory, loadingCategories } = useCategories();
    const { modifyProfileLastAction } = useProfiles();

    // Variables
    const [createCategoryPopup, setCreateCategoryPopup] = useState(false);
    const [modifyCategoryPopup, setModifyCategoryPopup] = useState(false);
    const [removeCategoryPopup, setRemoveCategoryPopup] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Popups logic
    const activeCreateCategoryPopup = () => {
        setCreateCategoryPopup(prev => !prev);
        setModifyCategoryPopup(false);
        setRemoveCategoryPopup(false);
        setCategoryName('');
        setError(null);
    }

    const activeModifyCategoryPopup = () => {
        setModifyCategoryPopup(prev => !prev);
        setCreateCategoryPopup(false);
        setRemoveCategoryPopup(false);
        setCategoryName('');
        setError(null);
    }
    
    const activeDeleteCategoryPopup = () => {
        setRemoveCategoryPopup(prev => !prev);
        setCreateCategoryPopup(false);
        setModifyCategoryPopup(false);
        setCategoryName('');
        setError(null);
    }

    // Active type
    const [expenseActive, setExpenseActive] = useState(true);
    let categories_selected = categories.filter(item => item.type === (expenseActive ? 'expense' : 'income'));

    // CREATE CATEGORY ACTION
    const createCategoryAction = async () => {
        try {
            await createCategory({ name: categoryName, type: expenseActive ? 'expense' : 'income' });
            await modifyProfileLastAction({ lastAction: 'Create category' });
            router.push('/configuration/data/categories');
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error creating category');
            setError(error.message);
        }
    };

    // CHANGE CATEGORY NAME ACTION
    // Get the username
    useEffect(() => {
        if (category) {
            setCategoryName(category.name || '');
        }
    }, [category]);

    const changeNameAction = async () => {
        // TODO
    };

    if (loadingCategories) {
        return <View></View>;
    }

    const expenseActivation = () => {
        setExpenseActive(true);
    }

    const incomeActivation = () => {
        setExpenseActive(false);
    }
    
    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.sections }>
                    <TypeButtons expenseActive={ expenseActive } expenseOnPress={ expenseActivation } incomeOnPress={ incomeActivation } />
                        
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>New category</ThemedText>
                        <View style={ styles.elements }>
                            <NewCategory onPress={ activeCreateCategoryPopup } />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Categories</ThemedText>
                        <View style={ styles.elements }>
                            {
                                categories_selected.map((category) => (
                                    <CategoryElement key={ category.name } title={ category.name } type={ category.type } onPress={ () => {
                                        router.push({
                                            pathname: '/configuration/data/categories/[id]',
                                            params: {
                                                id: category.id.toString(),
                                            },
                                        })
                                    } } />
                                )) 
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>

            <ModifyElement active={ createCategoryPopup } title='New category' titleButton='Create' value={ categoryName } placeholder='New category' error={ error } modifyAction={ createCategoryAction } cancelAction={ activeCreateCategoryPopup } onChange={ setCategoryName } />
            <ModifyElement active={ modifyCategoryPopup } title='Modify category' value={ categoryName } placeholder='Modify category' error={ error } modifyAction={ changeNameAction } cancelAction={ activeModifyCategoryPopup } onChange={ setCategoryName } />
        </View>
    );
};

export default Categories;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            top: Values.topIfHeader,
            width: '100%',
            marginTop: 10,
        },
            
        sections: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 15,
            paddingHorizontal: Values.paddingApp,
            paddingBottom: 125,
        },

        section: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 8,
        },

        title: {
            fontSize: 13,
        },

        elements: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
        },
    }
);
