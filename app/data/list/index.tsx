import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';
import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';

import BalanceResume from '@components/data/balance-resume';
import { TransactionElement, NewTransaction, FilterTransactions } from '@components/data/list-element';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useProfiles } from '@/src/hooks/useProfiles';

const DataList = () => {
    // Change the router previous page
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (event) => {
            event.preventDefault();
            router.push('/');
        });

        return unsubscribe;
    }, [navigation]);

    // Database
    const { transactions, getBalance, loading } = useTransactions();
    const { profile } = useProfiles();
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        if (!profile) {
            return;
        }

        const loadBalance = async () => {
            const balance = await getBalance(profile.id);

            setIncome(balance.income);
            setExpense(balance.expense);
        };

        loadBalance();
    }, [profile, getBalance]);

    // Check if the transactions are laoded
    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <BalanceResume incomes={ income } expenses={ expense } squareEnable={ false } />

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
                        <FlatList
                            data={ transactions }
                            keyExtractor={ (item) => item.id.toString() }
                            renderItem={({ item }) => <TransactionElement type={ item.type } category={ item.categoryName } value={ item.amount } date={ item.date } onPress={ () =>
                                router.push({
                                    pathname: '/data/modify/[id]',
                                    params: {
                                        id: item.id.toString(),
                                    },
                                })
                            } />}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DataList;

const styles = StyleSheet.create({
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
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: 10,
        overflow: 'hidden',
    },

    elementsScroll: {
        flex: 1,
        minHeight: 0,
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: 10,
        overflow: 'hidden',
    },
});
