import { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';
import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';

import List from '@assets/list.svg';
import Charts from '@assets/charts.svg';
import Add from '@assets/add.svg';
import Configuration from '@assets/configuration.svg';

import BalanceResume from '@components/data/balance-resume';
import { TransactionElement  } from '@components/data/list-element';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useProfiles } from '@/src/hooks/useProfiles';

const HomeScreen = () => {
    // Database
    const { lastTransaction, getLastTransaction, loadingTransactions } = useTransactions();
    const { profile, loadingProfiles } = useProfiles();

    // Last action variables
    const [ lastActionDate, setLastActionDate ] = useState('Month DD, YYYY - HH:MM:SS');

    // Last transaction variables
    const [ idLastTransaction, setIdLastTransaction ] = useState(0);
    const [ typeLastTransaction, setTypeLastTransaction ] = useState('expense');
    const [ categoryLastTransaction, setCategoryLastTransaction ] = useState('General');
    const [ amountLastTransaction, setAmountLastTransaction ] = useState(0);
    const [ dateLastTransaction, setDateLastTransaction ] = useState(new Date());

    useEffect(() => {
        if (profile) {
            const formatDate = (date: string) => {
                return (new Date(date)).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }) + ' - ' + new Date(date).toLocaleTimeString('en-GB');
            };

            setLastActionDate(formatDate(profile.last_action_date));

            const loadTransaction = async () => {
                const transaction = await getLastTransaction();
                
                if (transaction) {
                    setIdLastTransaction(transaction.id);
                    setTypeLastTransaction(transaction.type);
                    setCategoryLastTransaction(transaction.categoryName);
                    setAmountLastTransaction(transaction.amount);
                    setDateLastTransaction(new Date(transaction.date));
                }
            };

            loadTransaction();
        }
    }, [profile]);

    // Check if the profile is loaded
    if (loadingTransactions || loadingProfiles) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.sections }>
                    <ThemedText weight='light' style={ styles.welcome }>
                        Welcome <ThemedText weight='regular'>{ profile?.username || 'username' }</ThemedText>!
                    </ThemedText>
                    
                    <BalanceResume />

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Actions</ThemedText>
                        <View style={ styles.actionElements }>
                            <Charts style={ styles.actionIcon } onPress={ () => router.push('/data/charts') } />
                            <List style={ styles.actionIcon } onPress={ () => router.push('/data/list') } />
                            <Add style={ styles.actionIcon } onPress={ () => router.push('/data/add') } />
                            <Configuration style={ styles.actionIcon } onPress={ () => router.push('/configuration') } />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Last action</ThemedText>
                        <View style={ styles.lastActionElement }>
                            <ThemedText style={ styles.name } weight='light'>{ profile?.last_action || 'Action name' }</ThemedText>
                            <ThemedText style={ styles.date } weight='light'>{ lastActionDate }</ThemedText>
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Last transaction</ThemedText>
                        <View style={ styles.elements }>
                            {
                                lastTransaction == null ? <View style={ styles.emptyElement } />:
                                    <TransactionElement type={ typeLastTransaction } category={ categoryLastTransaction } value={ amountLastTransaction } date={ String(dateLastTransaction) } onPress={ () => { router.push({
                                        pathname: '/data/modify/[id]',
                                        params: {
                                            id: idLastTransaction.toString(),
                                        },
                                    })} } />
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Values.topNotHeader,
        width: '100%',
    },

    sections: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 15,
        paddingBottom: 125,
    },

    section: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: Values.paddingApp,
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

    actionElements: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 20,
        justifyContent: 'center',
        paddingHorizontal: Values.paddingElement,
        alignItems: 'center',
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: 10,
        overflow: 'hidden',
        height: 50,
    },

    lastActionElement: {
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: 10,
        overflow: 'hidden',
        paddingHorizontal: Values.paddingElement,
        paddingVertical: 6,
    },

    emptyElement: {
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: 10,
        height: 50,
    },

    welcome: {
        textAlign: 'center',
        fontSize: 16,
    },

    buttons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 5,
        marginTop: 25,
    },

    actionIcon: {
        transform: [{ scale: 0.9 }],
    },

    name: {
        fontSize: 14,
    },

    date: {
        fontSize: 11,
        color: Colors.inputTextUnselected,
    },
});