import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';

import TypeButtons from '@components/data/type-buttons';
import CategoryElement from '@components/configuration/category-element';
import Logo from '@assets/add.svg';

type Category = {
    value: string;
    label: string;
};

const Categories = () => {
    // Get the categories
    const expense_categories:Category[] = require('@/docs/expense_categories.json');
    const income_categories:Category[] = require('@/docs/income_categories.json');

    // Active type
    const [expenseActive, setExpenseActive] = useState(true);
    let categories = expenseActive ? expense_categories : income_categories;

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
                            categories.map((category) => (
                                <CategoryElement key={ category.value } title={ category.label } />
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
