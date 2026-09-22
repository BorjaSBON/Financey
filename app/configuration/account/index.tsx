import { StyleSheet, View, ScrollView } from 'react-native';

import { Values } from '@constants/values';

import InformationElement from '@components/configuration/information-element';

import { useProfile } from '@/src/hooks/useProfile';

export default function AccountInformation() {
    // Get the profile
    const { profile } = useProfile();

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
        });
    };

    // Get the dates formatted
    const formattedCreationDate = profile?.creation_date ? formatDate(new Date(profile.creation_date)) + ' - ' + new Date(profile.creation_date).toLocaleTimeString('en-GB') : 'Month DD, YYYY - HH:MM:SS';
    const formattedLastActionDate = profile?.last_action_date ? formatDate(new Date(profile.last_action_date)) + ' - ' + new Date(profile.last_action_date).toLocaleTimeString('en-GB') : 'Month DD, YYYY - HH:MM:SS';

    return (
        <View style={ styles.container }>
            <ScrollView>
                <InformationElement title='Username' data={ profile?.username || 'Username' } />
                <InformationElement title='Creation date' data={ formattedCreationDate } />
                <InformationElement title='Number of data added' data={ profile?.data_added || '000' } />
                <InformationElement title='Number of data modified' data={ profile?.data_modified || '000' } />
                <InformationElement title='Number of data deleted' data={ profile?.data_deleted || '000' } />
                <InformationElement title='Last action' data={ formattedLastActionDate } />
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
