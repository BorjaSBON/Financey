import { useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';

import TypeButtons from '@components/data/type-buttons';
import { CategoryElement, NewCategory } from '@components/configuration/category-element';

import { useCategories } from '@/src/hooks/useCategories';

const Categories = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Database
    const { categories, loadingCategories } = useCategories();

    // Active type
    const [expenseActive, setExpenseActive] = useState(true);
    let categories_selected = categories.filter(item => item.type === (expenseActive ? 'expense' : 'income'));
    
    return (
        <View style={ styles.container }>
            <View style={ styles.sections }>
                <TypeButtons expenseActive={ expenseActive } expenseOnPress={ () => { setExpenseActive(true); } } incomeOnPress={ () => { setExpenseActive(false); } } />
                    
                <View style={ styles.section }>
                    <ThemedText style={ styles.title } weight='medium'>{ languages['newCategory'] }</ThemedText>
                    <View style={ styles.elements }>
                        <NewCategory onPress={ () => { router.push('/configuration/data/categories/add') } } />
                    </View>
                </View>

                <View style={[ styles.section, styles.transactionsSection ]}>
                    <ThemedText style={ styles.title } weight='medium'>{ languages['categories'] }</ThemedText>
                    <View style={ styles.elementsScroll }>
                        {   loadingCategories ? 
                            <ActivityIndicator /> : 
                            <FlatList
                                data={ categories_selected }
                                keyExtractor={ (item) => item.id.toString() }
                                renderItem={({ item }) => {
                                    return (<CategoryElement key={ item.name } title={ item.name } type={ item.type } onPress={ () => {
                                        router.push({
                                            pathname: '/configuration/data/categories/modify/[id]',
                                            params: { id: item.id.toString() },
                                        })
                                    }} />)
                                }}
                            />
                        }
                    </View>
                </View>
            </View>
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
            paddingBottom: 125,
        },
            
        sections: {
            flex: 1,
            flexDirection: 'column',
            rowGap: 15,
            paddingHorizontal: Values.paddingApp,
        },

        section: {
            flexDirection: 'column',
            rowGap: Values.rowGapSection,
        },

        transactionsSection: {
            flex: 1,
            minHeight: 0,
        },

        title: {
            fontSize: 13,
        },

        elements: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
        },

        elementsScroll: {
            flex: 1,
            minHeight: 0,
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
        },
    }
);
