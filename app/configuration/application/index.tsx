import { Platform, Linking } from 'react-native';
import { StyleSheet, View, ScrollView } from 'react-native';
import * as Application from 'expo-application';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';

import InformationElement from '@components/configuration/information-element';

export default function AppInformation() {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Data of the system
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
                        <ThemedText style={ styles.title } weight='regular'>{ languages['system'] }</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title={ languages['applicationName'] } data='Financey' />
                            <InformationElement title={ languages['version'] } data={ 'v' + String(appVersion) } />
                            <InformationElement title={ languages['os'] } data={ os.charAt(0).toUpperCase() + os.slice(1) } />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>{ languages['developers'] }</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title={ languages['creator'] } data='Borja Sanz de Bremond' onPress={ () => {Linking.openURL(urlCreator);} } />
                            <InformationElement title={ languages['team'] } data='Hobbit Holes' />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>{ languages['additionalInformation'] }</ThemedText>
                        <View style={ styles.elements }>
                            <InformationElement title={ languages['description'] } data={ languages['descriptionText'] } />
                            <InformationElement title={ languages['security'] } data={ languages['securityText'] } />
                            <InformationElement title={ languages['repository'] } data={ urlRepository } onPress={ () => {Linking.openURL(urlRepository);} } />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
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
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
        },
    }
);
