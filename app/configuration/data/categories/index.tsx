import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';

import TypeButtons from '@components/data/type-buttons';
import CategoryElement from '@components/configuration/category-element';
import Logo from '@assets/add.svg';

import { useCategories } from '@/src/hooks/useCategories';

const Categories = () => {
    // Get the categories
    const { categories, loading } = useCategories();

    // Active type
    const [expenseActive, setExpenseActive] = useState(true);
    let categories_selected = categories.filter(item => item.type === (expenseActive ? 'expense' : 'income'));

    if (loading) {
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
            <TypeButtons expenseActive={ expenseActive } expenseOnPress={ expenseActivation } incomeOnPress={ incomeActivation } />

            <View style={ styles.categories }>
                <View style={ styles.title }>
                    <ThemedText style={ styles.text } weight='regular'>Categories</ThemedText>
                    <Logo style={ styles.icon } />
                </View>

                <View style={ styles.list }>
                    <ScrollView>
                        {
                            categories_selected.map((category) => (
                                <CategoryElement key={ category.name } title={ category.name } type={ category.type } />
                            )) 
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Values.topIfHeader,
        width: '100%',
        marginTop: 10,
        paddingBottom: 125,
    },

    categories: {
        marginTop: 20,
    },

    title: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 10,
        paddingHorizontal: Values.paddingApp,
    },

    text: {
        fontSize: 16,
    },

    icon: {
        transform: [{ scale: 1.5 }],
        marginTop: 5,
    },

    list: {
        marginTop: 5,
        paddingBottom: 75,
    },
});
