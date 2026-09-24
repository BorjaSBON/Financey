import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Values } from '@constants/values';
import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';

import TypeButtons from '@components/data/type-buttons';
import { CategoryElement, NewCategory } from '@components/configuration/category-element';
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
            <ScrollView>
                <View style={ styles.sections }>
                    <TypeButtons expenseActive={ expenseActive } expenseOnPress={ expenseActivation } incomeOnPress={ incomeActivation } />
                        
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>New category</ThemedText>
                        <View style={ styles.elements }>
                            <NewCategory />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Categories</ThemedText>
                        <View style={ styles.elements }>
                            {
                                categories_selected.map((category) => (
                                    <CategoryElement key={ category.name } title={ category.name } type={ category.type } />
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

const styles = StyleSheet.create({
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
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: 10,
        overflow: 'hidden',
    },
});
