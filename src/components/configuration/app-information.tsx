import { Platform, Linking } from 'react-native';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as Application from 'expo-application';

import InformationElement from '@components/configuration/information-element';

export default function AppInformation() {
    const appVersion = Application.nativeApplicationVersion;
    const buildVersion = Application.nativeBuildVersion;
    const os = Platform.OS;
    const url = 'https://github.com/BorjaSBON/Financey';

    return (
        <View style={ styles.appInformation }>
            <ScrollView>
                <InformationElement title='Application name' data='Financey' />
                <InformationElement title='Version' data={ 'v' + String(appVersion) + ' (' + String(buildVersion) + ')' } />
                <InformationElement title='Operating system' data={ os.charAt(0).toUpperCase() + os.slice(1) } />
                <InformationElement title='Creator' data='Borja Sanz de Bremond' />
                <InformationElement title='Team' data='Hobbit Holes' />
                <InformationElement title='Description' data='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' />
                <InformationElement title='Security' data='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' />
                <InformationElement title='Respository' data={ url } onPress={ () => {Linking.openURL(url);} } />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    appInformation: {
        flex: 1,
        top: 100,
        width: '100%',
        paddingBottom: 125
    },
});
