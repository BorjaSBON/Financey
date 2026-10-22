import { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';

import { ListIcon } from '@icons/list';
import { ChartsIcon } from '@icons/charts';
import { AddIcon } from '@icons/add';
import { CategoriesIcon } from '@icons/categories';
import { ConfIcon } from '@icons/conf';

import BalanceResume from '@components/data/balance-resume';
import CategoriesPieChart from '@components/data/charts/categories-pie-chart';
import { TransactionElement  } from '@components/data/list-element';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useProfiles } from '@/src/hooks/useProfiles';

const HomeScreen = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Database
    const { lastTransaction, getLastTransaction, loadingTransactions } = useTransactions();
    const { profile, loadingProfiles } = useProfiles();

    // Current date
    const date = new Date();

    // Last action variables
    const [ lastActionDate, setLastActionDate ] = useState(languages['dateEmpty']);

    // Last transaction variables
    const [ idLastTransaction, setIdLastTransaction ] = useState(0);
    const [ typeLastTransaction, setTypeLastTransaction ] = useState('expense');
    const [ categoryLastTransaction, setCategoryLastTransaction ] = useState('General');
    const [ amountLastTransaction, setAmountLastTransaction ] = useState(0);
    const [ dateLastTransaction, setDateLastTransaction ] = useState(new Date());

    useEffect(() => {
        if (profile) {
            const formatDate = (date: string) => {
                return (new Date(date)).toLocaleDateString(languages['dateFormat'], { month: 'long', day: '2-digit', year: 'numeric' }) + ' - ' + new Date(date).toLocaleTimeString(languages['dateFormat']);
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

    // Routes
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.canGoBack()) {
            router.dismissAll();
        }
    }, [navigation]);

    // Check if the profile is loaded
    if (loadingTransactions || loadingProfiles) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.sections }>
                    <ThemedText weight='light' style={ styles.welcome }>
                        { languages['welcome'] } <ThemedText weight='regular'>{ profile?.username || 'username' }</ThemedText>!
                    </ThemedText>
                    
                    <BalanceResume />

                    <View style={ styles.sectionDoble }>
                        <View style={ styles.sectionHalf }>
                            <ThemedText style={ styles.title } weight='regular'>
                                { languages['resume'] }
                                <ThemedText style={ styles.subtitle } weight='light'> ({ date.toLocaleString(languages['dateFormat'], { month: 'long' }) })</ThemedText>
                            </ThemedText>
                            <CategoriesPieChart year={ date.getUTCFullYear() } month={ date.getUTCMonth() + 1 } />
                        </View>

                        {/* <View style={ styles.sectionHalf }>
                            <ThemedText style={ styles.title } weight='regular'>{ languages['evolution'] }</ThemedText>
                            <View style={ styles.evolution }>

                            </View>
                        </View> */}
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>{ languages['actions'] }</ThemedText>
                        <View style={ styles.actionElements }>
                            <Pressable onPress={ () => router.push('/data/charts') }>
                                <ChartsIcon backgroundColor={ colors.iconBackground } iconColor={colors.iconColor} />
                            </Pressable>

                            <Pressable onPress={ () => router.push('/data/list') }>
                                <ListIcon backgroundColor={ colors.iconBackground } iconColor={colors.iconColor} />
                            </Pressable>

                            <Pressable onPress={ () => router.push('/data/add') }>
                                <AddIcon backgroundColor={ colors.iconColor } iconColor={colors.iconBackground} />
                            </Pressable>

                            <Pressable onPress={ () => router.push('/configuration/data/categories') }>
                                <CategoriesIcon backgroundColor={ colors.iconBackground } iconColor={colors.iconColor} />
                            </Pressable>

                            <Pressable onPress={ () => router.push('/configuration') }>
                                <ConfIcon backgroundColor={ colors.iconBackground } iconColor={colors.iconColor} />
                            </Pressable>
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>{ languages['lastTransaction'] }</ThemedText>
                        <View style={ styles.elements }>
                            { lastTransaction == null ? <View style={ styles.emptyElement } /> :
                                <TransactionElement type={ typeLastTransaction } category={ categoryLastTransaction } value={ amountLastTransaction } date={ String(dateLastTransaction) } onPress={ () => { router.push({
                                    pathname: '/data/modify/[id]',
                                    params: {
                                        id: idLastTransaction.toString(),
                                    },
                                })} } />
                            }
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>{ languages['lastAction'] }</ThemedText>
                        <View style={ styles.lastActionElement }>
                            <ThemedText style={ styles.name } weight='light'>{ profile?.last_action || 'name' in languages ? languages[profile?.last_action as keyof typeof languages] : languages['name']}</ThemedText>
                            <ThemedText style={ styles.date } weight='light'>{ lastActionDate }</ThemedText>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
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

        sectionDoble: {
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: Values.paddingApp,
            columnGap: '5%',
        },

        sectionHalf: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 8,
            width: '47.5%',
            marginHorizontal: 'auto',
        },

        title: {
            fontSize: 13,
        },

        subtitle: {
            fontSize: 11,
            textTransform: 'capitalize',
        },

        elements: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
        },

        actionElements: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingHorizontal: Values.paddingElement,
            alignItems: 'center',
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
            height: 50,
        },

        lastActionElement: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
            paddingHorizontal: Values.paddingElement,
            paddingVertical: 6,
        },

        emptyElement: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            height: 50,
        },

        welcome: {
            textAlign: 'center',
            fontSize: 16,
            paddingHorizontal: 15,
        },

        buttons: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: 5,
            marginTop: 25,
        },

        actionIcon: {
            transform: [{ scale: 1 }],
        },

        name: {
            fontSize: 14,
        },

        date: {
            fontSize: 11,
            color: colors.fontSecondary,
        },

        evolution: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            width: '100%',
            height: 147,
        },
    }
);