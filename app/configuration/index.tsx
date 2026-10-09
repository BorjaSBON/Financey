import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import ConfElement from '@components/configuration/conf-element';
import { ConfElementSelect, ConfCurrencySelect } from '@components/configuration/conf-element-select';
import ModifyElement from '@components/common/modify-element';
import DeleteElement from '@components/common/delete-element';

import { useProfiles } from '@/src/hooks/useProfiles';
import { useTransactions } from '@/src/hooks/useTransactions';
import { useCategories } from '@/src/hooks/useCategories';

const ConfigurationScreen = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

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
    const { profile, modifyProfileUsername, removeProfile, loadingProfiles } = useProfiles();
    const { removeTransactions } = useTransactions();
    const { removeAllCategories } = useCategories();

    // Variables
    const [changeUsernamePopup, setChangeUsernamePopup] = useState(false);
    const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);
    const [resetAppPopup, setResetAppPopup] = useState(false);
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Popups logic
    const activeChangeUsernamePopup = () => {
        setChangeUsernamePopup(prev => !prev);
        setDeleteAccountPopup(false);
        setResetAppPopup(false);
        setUsername(profile?.username || '');
    }
    
    const activeDeleteAccountPopup = () => {
        setDeleteAccountPopup(prev => !prev);
        setChangeUsernamePopup(false);
        setResetAppPopup(false);
    }
    
    const activeResetAppPopup = () => {
        setResetAppPopup(prev => !prev);
        setChangeUsernamePopup(false);
        setDeleteAccountPopup(false);
    }

    // Export data
    const exportData = async () => {
        console.log('Exporting document');
    };

    // CHANGE USERNAME ACTION
    // Get the username
    useEffect(() => {
        if (profile) {
            setUsername(profile.username);
        }
    }, [profile]);
    
    // Button action
    const changeUsernameAction = async () => {
        // Check if the username if filled
        if (username === '') {
            return;
        }

        setError(null);

        if (username.length > 15) {
            setError('The username must be less than 15 characters');
            return;
        }

        try {
            await modifyProfileUsername({ username });
            router.push('/');
        } catch (error) {
            setError('The username must be unique');
        }
    };

    // DELETE ACCOUNT ACTION
    const deleteAccountTitle = 'Are you sure you want to delete the account? All the information will be permanently lost';
    const deleteAccountAction = async () => {
        // Remove transactions
        await removeTransactions();

        // Remove categories
        await removeAllCategories();

        // Remove profile
        await removeProfile();

        // Redirect
        router.push('/');
    };

    // RESET APP ACTION
    const resetAppTitle = 'Are you sure you want to reset the application? All the information will be lost'
    const resetAppAction = async () => {
        console.log('Reset app');
    };

    // Check if the profile is loaded
    if (loadingProfiles) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.sections }>
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>General</ThemedText>
                        <View style={ styles.elements }>
                            <ConfElementSelect title='Theme' />
                            <ConfElementSelect title='Language' />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Data</ThemedText>
                        <View style={ styles.elements }>
                            <ConfCurrencySelect />
                            <ConfElement title='Categories' onPress={ () => router.push('/configuration/data/categories') } />
                            <ConfElement title='Import data' onPress={ () => router.push('/configuration/data/import_data') } />
                            <ConfElement title='Export data' iconDisplay={ false } onPress={ exportData } />
                        </View>
                    </View>
                    
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Account</ThemedText>
                        <View style={ styles.elements }>
                            <ConfElement title='Information of the account' onPress={ () => router.push('/configuration/account/information') } />
                            <ConfElement title='Change account' onPress={ () => router.push('/configuration/account/change_account') } />
                            <ConfElement title='Change username' iconDisplay={ false } onPress={ activeChangeUsernamePopup } />
                            <ConfElement title='Delete account' colorText={ colors.negative } iconDisplay={ false } onPress={ activeDeleteAccountPopup } />
                        </View>
                    </View>
                    
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Application</ThemedText>
                        <View style={ styles.elements }>
                            <ConfElement title='Information of the app' onPress={ () => router.push('/configuration/application') } />
                            <ConfElement title='Reset application' colorText={ colors.negative } iconDisplay={ false } onPress={ activeResetAppPopup } />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <ModifyElement active={ changeUsernamePopup } title='New username' value={ username } placeholder='New username' error={ error } modifyAction={ changeUsernameAction } cancelAction={ activeChangeUsernamePopup } onChange={ setUsername } />
            <DeleteElement active={ deleteAccountPopup } title={ deleteAccountTitle } titleButton='Delete' deleteAction={ deleteAccountAction } cancelAction={ activeDeleteAccountPopup } />
            <DeleteElement active={ resetAppPopup } title={ resetAppTitle } titleButton='Reset' deleteAction={ resetAppAction } cancelAction={ activeResetAppPopup } />
        </View>
    );
};

export default ConfigurationScreen;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            position: 'relative',
            flex: 1,
            top: Values.topIfHeader,
            width: '100%',
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
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 8,
            overflow: 'hidden',
        },
    }
);