import { StyleSheet, View, ScrollView } from 'react-native';

import InformationElement from '@components/configuration/information-element';

export default function AccountInformation() {
    return (
        <View style={ styles.container }>
            <ScrollView>
                <InformationElement title='Username' data='Borchax' />
                <InformationElement title='Creation date' data='Month DD, YYYY' />
                <InformationElement title='Number of data added' data='000' />
                <InformationElement title='Number of data modified' data='000' />
                <InformationElement title='Number of data deleted' data='000' />
                <InformationElement title='Last action' data='Month DD, YYYY - HH:MM' />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 100,
        width: '100%',
        paddingBottom: 125
    },
});
