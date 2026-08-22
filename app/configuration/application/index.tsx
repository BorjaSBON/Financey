import { Platform, Linking } from 'react-native';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as Application from 'expo-application';

import { Values } from '@constants/values';

import InformationElement from '@components/configuration/information-element';

export default function AppInformation() {
    const appVersion = Application.nativeApplicationVersion;
    const buildVersion = Application.nativeBuildVersion;
    const os = Platform.OS;
    const urlCreator = 'https://www.borjasbon.com';
    const urlRepository = 'https://github.com/BorjaSBON/Financey';

    return (
        <View style={ styles.container }>
            <ScrollView>
                <InformationElement title='Application name' data='Financey' />
                <InformationElement title='Version' data={ 'v' + String(appVersion) + ' (' + String(buildVersion) + ')' } />
                <InformationElement title='Operating system' data={ os.charAt(0).toUpperCase() + os.slice(1) } />
                <InformationElement title='Creator' data='Borja Sanz de Bremond' onPress={ () => {Linking.openURL(urlCreator);} } />
                <InformationElement title='Team' data='Hobbit Holes' />
                <InformationElement title='Description' data='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' />
                <InformationElement title='Security' data='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' />
                <InformationElement title='Respository' data={ urlRepository } onPress={ () => {Linking.openURL(urlRepository);} } />
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
