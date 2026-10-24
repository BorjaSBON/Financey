import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedSelectInput } from '@ui/themed-select-input';
import { ThemedDateInput } from '@ui/themed-date-input';

import BalanceResume from '@components/data/balance-resume';
import { TransactionElement, NewTransaction, TransactionHeader, FilterTransactions, DisplayTransactions } from '@components/data/list-element';

import { useTransactions } from '@/src/hooks/useTransactions';
import { TransactionFilters } from '@/src/types/transaction';
import { useCategories } from '@/src/hooks/useCategories';

const DataList = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

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
    const [amountMin, setAmountMin] = useState('');
    const [amountMax, setAmountMax] = useState('');
    const [dateMin, setDateMin] = useState<Date | null>(null);
    const [dateMax, setDateMax] = useState<Date | null>(null);

    // Filters content
    const dropDownListType = [
        { label: languages['all'], value: '' },
        { label: languages['incomes'], value: 'income' },
        { label: languages['expenses'], value: 'expense' },
    ];

    const dropDownListOrder = [
        { label: languages['dateNewer'], value: 'date_new' },
        { label: languages['dateOlder'], value: 'date_old' },
        { label: languages['amountHigher'], value: 'amount_higher' },
        { label: languages['amountLower'], value: 'amount_lower' },
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
                    title: date.toLocaleDateString(languages['dateFormat'], {
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
            if (amountMin !== '') {
                if (!isNaN(Number(amountMin.replace(',', '.')))) {
                    parameters.amountMin = Math.round(Number(amountMin.replace(',', '.')) * 100);
                }
            }

            if (amountMax !== '') {
                if (!isNaN(Number(amountMax.replace(',', '.')))) {
                    parameters.amountMax = Math.round(Number(amountMax.replace(',', '.')) * 100);
                }
            }

            // Date
            if (dateMin) parameters.dateMin = dateMin.toISOString();
            if (dateMax) parameters.dateMax = dateMax.toISOString();

            // Get the transactions
            await getTransactions(parameters);
        };

        loadTransactions();
    }, [type, categoryId, order, amountMin, amountMax, dateMin, dateMax]);

    return (
        <View style={ styles.container }>
            <BalanceResume squareEnable={ false } />

            { displayFilter === false ? 
                <View style={ styles.sections }>
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='medium'>{ languages['filter'] }</ThemedText>
                        <View style={ styles.elements }>
                            <FilterTransactions onPress={ ()=>{ setDisplayFilter(true); }} />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='medium'>{ languages['newTransaction'] }</ThemedText>
                        <View style={ styles.elements }>
                            <NewTransaction onPress={ () => { router.push('/data/add') }} />
                        </View>
                    </View>
                    
                    <View style={[ styles.section, styles.transactionsSection ]}>
                        <ThemedText style={ styles.title } weight='medium'>{ languages['transactions'] }</ThemedText>
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
                                                params: { id: item.id.toString() },
                                            })
                                        } />);
                                    }}
                                />
                            }
                        </View>
                    </View>
                </View>
                :
                <ScrollView>
                    <View style={ styles.sections }>
                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='medium'>{ languages['transactions'] }</ThemedText>
                            <View style={ styles.elements }>
                                <DisplayTransactions onPress={ ()=>{ setDisplayFilter(false); } } />
                            </View>
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='medium'>{ languages['orderBy'] }</ThemedText>
                            <ThemedSelectInput data={ dropDownListOrder } value={ order } onSelect={ (item) => { setOrder(item.value); } } />
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='medium'>{ languages['type'] }</ThemedText>
                            <ThemedSelectInput data={ dropDownListType } value={ type } onSelect={ (item) => { 
                                setType(item.value as "" | "income" | "expense");
                                setCategoryId('');
                            }} />
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='medium'>{ languages['category'] }</ThemedText>
                            <ThemedSelectInput data={ dropDownListCategory } value={ categoryId } maxHeight={ 200 } onSelect={ (item) => { setCategoryId(item.value); } } />
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='medium'>
                                { languages['amount'] }
                                <ThemedText style={ styles.subtitle } weight='regular'> ({ languages['minMax'] })</ThemedText>
                            </ThemedText>
                            <View style={ styles.pairButtons }>
                                <ThemedInput type='decimal' placeholder={ '0.000' } value={ amountMin } onChange={ setAmountMin } />
                                <ThemedInput type='decimal' placeholder={ '0.000' } value={ amountMax } onChange={ setAmountMax } />
                            </View>
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='medium'>
                                { languages['dates'] }
                                <ThemedText style={ styles.subtitle } weight='regular'> ({ languages['startEnd'] })</ThemedText>
                            </ThemedText>
                            <View style={ styles.pairButtons }>
                                <ThemedDateInput value={ dateMin } onChange={ setDateMin } />
                                <ThemedDateInput value={ dateMax } minimumDate={ dateMin } onChange={ setDateMax } />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            }
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
            rowGap: Values.rowGapSection,
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

        pairButtons: {
            display: 'flex',
            flexDirection: 'row',
            columnGap: '8%',
            width: '48%',
        },
    }
);
