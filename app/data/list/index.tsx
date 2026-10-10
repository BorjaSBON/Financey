import { useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import BalanceResume from '@components/data/balance-resume';
import { TransactionElement, NewTransaction, FilterTransactions, TransactionHeader } from '@components/data/list-element';

import { useTransactions } from '@/src/hooks/useTransactions';

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
    const { transactions, loadingTransactions } = useTransactions();

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

    return (
        <View style={ styles.container }>
            <BalanceResume squareEnable={ false } />

            <View style={ styles.sections }>
                <View style={ styles.section }>
                    <ThemedText style={ styles.title } weight='regular'>New transaction</ThemedText>
                    <View style={ styles.elements }>
                        <NewTransaction onPress={ () => { router.push('/data/add') }} />
                    </View>
                </View>

                <View style={ styles.section }>
                    <ThemedText style={ styles.title } weight='regular'>Filter</ThemedText>
                    <View style={ styles.elements }>
                        <FilterTransactions />
                    </View>
                </View>
                
                <View style={[ styles.section, styles.transactionsSection ]}>
                    <ThemedText style={ styles.title } weight='regular'>Transactions</ThemedText>
                    <View style={ styles.elementsScroll }>
                        {
                            loadingTransactions ? 
                                <ActivityIndicator/> :
                                <FlatList
                                    data={ addMonthHeaders(transactions) }
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
