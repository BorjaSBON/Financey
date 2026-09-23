import { StyleSheet, View, ScrollView } from 'react-native';

import { Values } from '@constants/values';

import InformationElement from '@components/configuration/information-element';

import { useProfile } from '@/src/hooks/useProfile';

export default function AccountInformation() {
    // Get the profile
    const { profile } = useProfile();

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
    };

    // Get the dates formatted
    const formattedCreationDate = profile?.creation_date ? formatDate(new Date(profile.creation_date)) + ' - ' + new Date(profile.creation_date).toLocaleTimeString('en-GB') : 'Month DD, YYYY - HH:MM:SS';
    const formattedLastActionDate = profile?.last_action_date ? formatDate(new Date(profile.last_action_date)) + ' - ' + new Date(profile.last_action_date).toLocaleTimeString('en-GB') : 'Month DD, YYYY - HH:MM:SS';

    return (
        <View style={ styles.container }>
            <ScrollView>
                <InformationElement title='Username' data={ profile?.username || 'Username' } />
                <InformationElement title='Creation date' data={ formattedCreationDate } />
                <InformationElement title='Last action date' data={ formattedLastActionDate } />
                <InformationElement title='Last action' data={ profile?.last_action || 'Action name' } />
                <InformationElement title='Number of actions' data={ String(profile?.number_actions) || '000' } />
                <InformationElement title='Current number of transactions' data={ String(profile?.number_transactions) || '000' } />
                <InformationElement title='Number of transactions added' data={ String(profile?.number_transactions_added) || '000' } />
                <InformationElement title='Number of transactions modified' data={ String(profile?.number_transactions_modified) || '000' } />
                <InformationElement title='Number of transactions deleted' data={ String(profile?.number_transactions_deleted) || '000' } />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Values.topIfHeader,
        width: '100%',
        paddingBottom: 125
    },
});
