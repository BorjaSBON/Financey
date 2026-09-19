import { StyleSheet, View, ScrollView } from 'react-native';

import { Values } from '@constants/values';

import InformationElement from '@components/configuration/information-element';

import { useProfile } from '@/src/hooks/useProfile';

export default function AccountInformation() {
    const { profile } = useProfile();

    return (
        <View style={ styles.container }>
            <ScrollView>
                <InformationElement title='Username' data={ profile?.username || 'Username' } />
                <InformationElement title='Creation date' data={ profile?.creation_date || 'Month DD, YYYY' } />
                <InformationElement title='Number of data added' data={ profile?.data_added || '000' } />
                <InformationElement title='Number of data modified' data={ profile?.data_modified || '000' } />
                <InformationElement title='Number of data deleted' data={ profile?.data_deleted || '000' } />
                <InformationElement title='Last action' data={ profile?.last_action_date || 'Month DD, YYYY - HH:MM' } />
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
