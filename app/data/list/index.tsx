import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';
import { ThemedSelectInput } from '@ui/themed-select-input';

import BalanceResume from '@components/data/balance-resume';
import Filter from '@components/data/filter';
import { TransactionElement, NewTransaction, TransactionHeader, FilterTransactions, DisplayTransactions } from '@components/data/list-element';

import { useTransactions } from '@/src/hooks/useTransactions';
import { TransactionFilters } from '@/src/types/transaction';
import { useCategories } from '@/src/hooks/useCategories';

const DataList = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Change the router previous page
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (event) => {
            event.preventDefault();
            router.push('/home');
        });

        return unsubscribe;
    }, [navigation]);

    // Database
    const { transactions, getTransactions, loadingTransactions } = useTransactions();
    const { categories } = useCategories();

    // Filters
    const [displayFilter, setDisplayFilter] = useState<boolean>(false);

    const [type, setType] = useState<'income' | 'expense' | ''>('');
    const [categoryId, setCategoryId] = useState('');
    const [orderBy, setOrderBy] = useState<'date' | 'amount'>('date');
    const [order, setOrder] = useState('date_new');

    // Filters content
    const dropDownListType = [
        { label: 'All', value: '' },
        { label: 'Income', value: 'income' },
        { label: 'Expense', value: 'expense' },
    ];

    const dropDownListOrder = [
        { label: 'Date (New to Old)', value: 'date_new' },
        { label: 'Date (Old to New)', value: 'date_old' },
        { label: 'Amount (Higher to Lower)', value: 'amount_higher' },
        { label: 'Amount (Lower to Higher)', value: 'amount_lower' },
    ];

    let categories_selected = categories;
    if (type != '') categories_selected = categories.filter(item => item.type === (type == 'expense' ? 'expense' : 'income'));
    let dropDownListCategory = categories_selected.map((item) => {
        return {
            label: item.name,
            value: String(item.id),
        };
    });

    // Function to add headers to the transactions
    const addMonthHeaders = (transactionsRaw: any[]) => {
        const result = [];
        let previousMonth = null;

        for (const transaction of transactionsRaw) {
            const date = new Date(transaction.date);

            const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

            if (monthKey !== previousMonth) {
                result.push({
                    type: 'header',
                    id: `month-${monthKey}`,
                    title: date.toLocaleDateString('en-GB', {
                        month: 'long',
                        year: 'numeric',
                    }),
                });

                previousMonth = monthKey;
            }

            result.push(transaction);
        }

        return result;
    };

    useEffect(() => {
        const loadTransactions = async () => {
            let parameters:TransactionFilters = {};

            // Order by
            if (order === 'date_new') {
                parameters.orderBy = 'date';
                parameters.order = 'DESC';
                setOrderBy('date');
            } else if (order === 'date_old') {
                parameters.orderBy = 'date';
                parameters.order = 'ASC';
                setOrderBy('date');
            } else if (order === 'amount_higher') {
                parameters.orderBy = 'amount';
                parameters.order = 'DESC';
                setOrderBy('amount');
            } else if (order === 'amount_lower') {
                parameters.orderBy = 'amount';
                parameters.order = 'ASC';
                setOrderBy('amount');
            }

            // Type
            if (type !== '') parameters.type = type;

            // Category
            if (categoryId !== '') parameters.categoryId = Number(categoryId);

            // Amount

            // Date

            await getTransactions(parameters);
        };

        loadTransactions();
    }, [type, categoryId, order]);

    return (
        <View style={ styles.container }>
            <BalanceResume squareEnable={ false } />

            { displayFilter === false ? 
                <View style={ styles.sections }>
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Filter</ThemedText>
                        <View style={ styles.elements }>
                            <FilterTransactions onPress={ ()=>{ setDisplayFilter(true); }} />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>New transaction</ThemedText>
                        <View style={ styles.elements }>
                            <NewTransaction onPress={ () => { router.push('/data/add') }} />
                        </View>
                    </View>
                    
                    <View style={[ styles.section, styles.transactionsSection ]}>
                        <ThemedText style={ styles.title } weight='regular'>Transactions</ThemedText>
                        <View style={ styles.elementsScroll }>
                            {   loadingTransactions ? 
                                <ActivityIndicator/> :
                                <FlatList
                                    data={ orderBy == 'date' ? addMonthHeaders(transactions) : transactions }
                                    keyExtractor={ (item) => item.id.toString() }
                                    renderItem={({ item }) => {
                                        if (item.type === 'header') {
                                            return (<TransactionHeader title={ item.title } />);
                                        }

                                        return (<TransactionElement type={ item.type } category={ item.categoryName } value={ item.amount } date={ item.date } onPress={ () =>
                                            router.push({
                                                pathname: '/data/modify/[id]',
                                                params: {
                                                    id: item.id.toString(),
                                                },
                                            })
                                        } />);
                                    }}
                                />
                            }
                        </View>
                    </View>
                </View>
                :
                <View>
                    <View style={ styles.sections }>
                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='regular'>Transactions</ThemedText>
                            <View style={ styles.elements }>
                                <DisplayTransactions onPress={ ()=>{ setDisplayFilter(false); } } />
                            </View>
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='regular'>Order by</ThemedText>
                            <ThemedSelectInput data={ dropDownListOrder } value={ order } onSelect={ (item) => { setOrder(item.value); } } />
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='regular'>Type</ThemedText>
                            <ThemedSelectInput data={ dropDownListType } value={ type } onSelect={ (item) => { 
                                setType(item.value as "" | "income" | "expense");
                                setCategoryId('');
                            }} />
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='regular'>Category</ThemedText>
                            <ThemedSelectInput data={ dropDownListCategory } value={ categoryId } maxHeight={ 200 } onSelect={ (item) => { setCategoryId(item.value); } } />
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='regular'>
                                Amount
                                <ThemedText style={ styles.subtitle } weight='light'> (Min to Max)</ThemedText>
                            </ThemedText>
                            
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='regular'>
                                Date
                                <ThemedText style={ styles.subtitle } weight='light'> (Start to End)</ThemedText>
                            </ThemedText>
                            
                        </View>
                    </View>
                </View>
            }
            {/* <Filter /> */}
        </View>
    );
};

export default DataList;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            top: Values.topNotHeader,
            width: '100%',
            flexDirection: 'column',
            rowGap: 15,
            paddingBottom: 100,
        },

        sections: {
            flex: 1,
            flexDirection: 'column',
            rowGap: 15,
            paddingHorizontal: Values.paddingApp,
        },

        section: {
            flexDirection: 'column',
            rowGap: 8,
        },

        transactionsSection: {
            flex: 1,
            minHeight: 0,
        },

        title: {
            fontSize: 13,
        },

        subtitle: {
            fontSize: 11,
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
