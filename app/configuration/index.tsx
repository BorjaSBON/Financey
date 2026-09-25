import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';

import ConfElement from '@components/configuration/conf-element';
import ModifyElement from '@components/common/modify-element';
import DeleteElement from '@components/common/delete-element';

import { useProfiles } from '@/src/hooks/useProfiles';
import { useTransactions } from '@/src/hooks/useTransactions';

const ConfigurationScreen = () => {
    // Database
    const { profile, modifyProfileUsername, removeProfile, loading, error } = useProfiles();
    const { removeTransactions } = useTransactions();

    // Variables
    const [changeUsernamePopup, setChangeUsernamePopup] = useState(false);
    const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);
    const [resetAppPopup, setResetAppPopup] = useState(false);
    const [username, setUsername] = useState('');

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
        if (!profile) {
            return;
        }

        setUsername(profile.username)
    }, [profile]);
    
    // Button action
    const changeUsernameAction = async () => {
        // Check if the username if filled
        if (username !== '') {
            // Modify username
            await modifyProfileUsername({ username: username });

            // Error while modifying the username
            if (error) {
                console.error(error);
            }

            // Redirect
            router.push('/');
        }
    };

    // DELETE ACCOUNT ACTION
    const deleteAccountTitle = 'Are you sure you want to delete the account? All the information will be permanently lost';
    const deleteAccountAction = async () => {
        // Remove transactions
        await removeTransactions();

        // Remove categories
        // TODO

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
    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.sections }>
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>General</ThemedText>
                        <View style={ styles.elements }>
                            <ConfElement title='Theme' iconDisplay={ false } />
                            <ConfElement title='Language' iconDisplay={ false } />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Data</ThemedText>
                        <View style={ styles.elements }>
                            <ConfElement title='Currency' iconDisplay={ false } />
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
                            <ConfElement title='Delete account' colorText={ Colors.negative } iconDisplay={ false } onPress={ activeDeleteAccountPopup } />
                        </View>
                    </View>
                    
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Application</ThemedText>
                        <View style={ styles.elements }>
                            <ConfElement title='Information of the app' onPress={ () => router.push('/configuration/application') } />
                            <ConfElement title='Reset application' colorText={ Colors.negative } iconDisplay={ false } onPress={ activeResetAppPopup } />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <ModifyElement active={ changeUsernamePopup } title='New username' value={ username } placeholder='New username' modifyAction={ changeUsernameAction } cancelAction={ activeChangeUsernamePopup } onChange={ setUsername } />
            <DeleteElement active={ deleteAccountPopup } title={ deleteAccountTitle } titleButton='Delete' deleteAction={ deleteAccountAction } cancelAction={ activeDeleteAccountPopup } />
            <DeleteElement active={ resetAppPopup } title={ resetAppTitle } titleButton='Reset' deleteAction={ resetAppAction } cancelAction={ activeResetAppPopup } />
        </View>
    );
};

export default ConfigurationScreen;

const styles = StyleSheet.create({
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
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: 8,
        overflow: 'hidden',
    },
});