import { useState } from 'react';
import { ScrollView, StyleSheet, View  } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';

import ConfElement from '@components/configuration/conf-element';
import ResetAccount from '@components/configuration/reset_account';
import ChangeUsername from '@components/configuration/change-username';

const ConfigurationScreen = () => {
    // Variables
    const [resetAccount, setResetAccount] = useState(false);
    const [changeUsername, setChangeUsername] = useState(false);

    // Functions
    const activeResetAccount = () => {
        setResetAccount(prev => !prev);
        setChangeUsername(false);
    }
    
    const activeChangeUsername = () => {
        setChangeUsername(prev => !prev);
        setResetAccount(false);
    }

    // Export data
    const exportData = async () => {
        console.log('Exporting document');
    };

    return (
        <View style={ styles.container }>
            <View style={ styles.sections }>
                <ScrollView>
                    <View style={ styles.divider } />

                    <View style={ styles.section}>
                        <ThemedText style={ styles.sectionTitle }>General</ThemedText>
                        <View style={ styles.smallDivider } />

                        <ConfElement title='Theme' iconDisplay={ false } />
                        <ConfElement title='Language' iconDisplay={ false } />
                    </View>

                    <View style={ styles.divider } />

                    <View style={ styles.section}>
                        <ThemedText style={ styles.sectionTitle }>Data</ThemedText>
                        <View style={ styles.smallDivider } />

                        <ConfElement title='Currency' iconDisplay={ false } />
                        <ConfElement title='Categories' onPress={ () => router.push('/configuration/data/categories') } />
                        <ConfElement title='Import data' />
                        <ConfElement title='Export data' iconDisplay={ false } onPress={ exportData } />
                    </View>

                    <View style={ styles.divider } />

                    <View style={ styles.section}>
                        <ThemedText style={ styles.sectionTitle }>Account</ThemedText>
                        <View style={ styles.smallDivider } />

                        <ConfElement title='Information of the account' onPress={ () => router.push('/configuration/account') } />
                        <ConfElement title='Change username' iconDisplay={ false } onPress={ activeChangeUsername } />
                        <ConfElement title='Reset account' colorText={ Colors.negative } iconDisplay={ false } onPress={ activeResetAccount } />
                    </View>

                    <View style={ styles.divider } />

                    <View style={ styles.section}>
                        <ThemedText style={ styles.sectionTitle }>Application</ThemedText>
                        <View style={ styles.smallDivider } />

                        <ConfElement title='Information of the app' onPress={ () => router.push('/configuration/application') } />
                    </View>

                    <View style={ styles.divider } />
                </ScrollView>
            </View>

            <ResetAccount active={ resetAccount } cancelAction={ activeResetAccount } />
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
        paddingBottom: 125
    },

    sections: {
        flex: 1,
        paddingBottom: 25,
    },

    section: {
        display: 'flex',
        flexDirection: 'column',
    },

    sectionTitle: {
        paddingHorizontal: Values.paddingApp,
        fontSize: 16,
        paddingVertical: 5,
        backgroundColor: Colors.hoverElement,
    },

    divider: {
        height: 2,
        backgroundColor: Colors.divider,
    },

    smallDivider: {
        height: 0.5,
        backgroundColor: Colors.divider,
    },
});