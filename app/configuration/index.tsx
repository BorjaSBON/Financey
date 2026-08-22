import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';

import ConfElement from '@components/configuration/conf-element';

const ConfigurationScreen = () => {
  return (
    <View style={ styles.container }>
        <View style={ styles.divider } />

        <View style={ styles.section}>
            <ThemedText style={ styles.sectionTitle }>General</ThemedText>
            <View style={ styles.smallDivider } />

            <ConfElement title='Theme' />
            <ConfElement title='Language' />
        </View>

        <View style={ styles.divider } />

        <View style={ styles.section}>
            <ThemedText style={ styles.sectionTitle }>Data</ThemedText>
            <View style={ styles.smallDivider } />

            <ConfElement title='Currency' />
            <ConfElement title='Categories' />
            <ConfElement title='Import data' />
            <ConfElement title='Export data' />
        </View>

        <View style={ styles.divider } />

        <View style={ styles.section}>
            <ThemedText style={ styles.sectionTitle }>Account</ThemedText>
            <View style={ styles.smallDivider } />

            <ConfElement title='Information of the account' onPress={ () => router.push('/configuration/account') } />
            <ConfElement title='Change username' />
            <ConfElement title='Reset account' />
        </View>

        <View style={ styles.divider } />

        <View style={ styles.section}>
            <ThemedText style={ styles.sectionTitle }>Application</ThemedText>
            <View style={ styles.smallDivider } />

            <ConfElement title='Information of the app' onPress={ () => router.push('/configuration/application') } />
        </View>

        <View style={ styles.divider } />
    </View>
  );
};

export default ConfigurationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Values.topIfHeader,
        width: '100%',
        paddingBottom: 125
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