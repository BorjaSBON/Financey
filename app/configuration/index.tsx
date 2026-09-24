import { useState } from 'react';
import { ScrollView, StyleSheet, View  } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';

import ConfElement from '@components/configuration/conf-element';
import DeleteAccount from '@components/configuration/delete_account';
import ChangeUsername from '@components/configuration/change-username';

const ConfigurationScreen = () => {
    // Variables
    const [deleteAccount, setDeleteAccount] = useState(false);
    const [changeUsername, setChangeUsername] = useState(false);

    // Functions popups
    const activeDeleteAccount = () => {
        setDeleteAccount(prev => !prev);
        setChangeUsername(false);
    }
    
    const activeChangeUsername = () => {
        setChangeUsername(prev => !prev);
        setDeleteAccount(false);
    }

    // Export data
    const exportData = async () => {
        console.log('Exporting document');
    };

    

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
                            <ConfElement title='Change username' iconDisplay={ false } onPress={ activeChangeUsername } />
                            <ConfElement title='Delete account' colorText={ Colors.negative } iconDisplay={ false } onPress={ activeDeleteAccount } />
                        </View>
                    </View>
                    
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Application</ThemedText>
                        <View style={ styles.elements }>
                            <ConfElement title='Information of the app' onPress={ () => router.push('/configuration/application') } />
                            <ConfElement title='Reset application' colorText={ Colors.negative } iconDisplay={ false } onPress={ activeDeleteAccount } />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <DeleteAccount active={ deleteAccount } cancelAction={ activeDeleteAccount } />
            <ChangeUsername active={ changeUsername } cancelAction={ activeChangeUsername } />
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