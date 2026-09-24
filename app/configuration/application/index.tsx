import { Platform, Linking } from 'react-native';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as Application from 'expo-application';

import { Values } from '@constants/values';
import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';

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
                <View style={ styles.sections }>
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>System</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title='Application name' data='Financey' />
                            <InformationElement title='Version' data={ 'v' + String(appVersion) + ' (' + String(buildVersion) + ')' } />
                            <InformationElement title='Operating system' data={ os.charAt(0).toUpperCase() + os.slice(1) } />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Developers</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title='Creator' data='Borja Sanz de Bremond' onPress={ () => {Linking.openURL(urlCreator);} } />
                            <InformationElement title='Team' data='Hobbit Holes' />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Additional information</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title='Description' data='Application that allows you to view your day-to-day income and expenditure clearly and simply. Thanks to the charts and statistics generated from the information collected, you will gain a clearer understanding of how your money is being spent.' />
                            <InformationElement title='Security' data='None of the data collected can be viewed or processed by external parties, as this app has no internet connection and there is no intention to extract the data for analysis.' />
                            <InformationElement title='Repository' data={ urlRepository } onPress={ () => {Linking.openURL(urlRepository);} } />
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
