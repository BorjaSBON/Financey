import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import TypeButtons from '@components/data/type-buttons';
import { CategoryElement, NewCategory } from '@components/configuration/category-element';

import { useCategories } from '@/src/hooks/useCategories';

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
    const { categories, loadingCategories } = useCategories();

    // Active type
    const [expenseActive, setExpenseActive] = useState(true);
    let categories_selected = categories.filter(item => item.type === (expenseActive ? 'expense' : 'income'));

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
                            <NewCategory onPress={ () => { router.push('/configuration/data/categories/add') } } />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Categories</ThemedText>
                        <View style={ styles.elements }>
                            {
                                categories_selected.map((category) => (
                                    <CategoryElement key={ category.name } title={ category.name } type={ category.type } onPress={ () => {
                                        router.push({
                                            pathname: '/configuration/data/categories/modify/[id]',
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
