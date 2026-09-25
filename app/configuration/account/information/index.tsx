import { StyleSheet, View, ScrollView } from 'react-native';

import { Values } from '@constants/values';
import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';

import InformationElement from '@components/configuration/information-element';

import { useProfiles } from '@/src/hooks/useProfiles';

export default function AccountInformation() {
    // Get the profile
    const { profile } = useProfiles();

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
    };

    // Get the dates formatted
    const formattedCreationDate = profile?.creation_date ? formatDate(new Date(profile.creation_date)) + ' - ' + new Date(profile.creation_date).toLocaleTimeString('en-GB') : 'Month DD, YYYY - HH:MM:SS';
    const formattedLastActionDate = profile?.last_action_date ? formatDate(new Date(profile.last_action_date)) + ' - ' + new Date(profile.last_action_date).toLocaleTimeString('en-GB') : 'Month DD, YYYY - HH:MM:SS';

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.sections }>
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Profile</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title='Username' data={ profile?.username || 'Username' } />
                            <InformationElement title='Creation date' data={ formattedCreationDate } />
                        </View>
                    </View>
                    
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Actions</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title='Last action date' data={ formattedLastActionDate } />
                            <InformationElement title='Last action' data={ profile?.last_action || 'Action name' } />
                            <InformationElement title='Number of actions' data={ String(profile?.number_actions) || '000' } />
                        </View>
                    </View>
                    
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Transactions</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title='Current number of transactions' data={ String(profile?.number_transactions) || '000' } />
                            <InformationElement title='Number of transactions added' data={ String(profile?.number_transactions_added) || '000' } />
                            <InformationElement title='Number of transactions modified' data={ String(profile?.number_transactions_modified) || '000' } />
                            <InformationElement title='Number of transactions deleted' data={ String(profile?.number_transactions_deleted) || '000' } />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Values.topIfHeader,
        width: '100%',
        paddingTop: 5,
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
        borderRadius: 10,
        overflow: 'hidden',
    },
});
