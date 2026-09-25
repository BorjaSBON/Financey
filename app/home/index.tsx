import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import { useProfiles } from '@/src/hooks/useProfiles';

const HomeScreen = () => {
    // Get the profile and loading state
    const { profile, loading } = useProfiles();

    // Check if the profile is loaded
    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <ThemedText weight='light' style={ styles.welcome }>
                Welcome <ThemedText weight='regular'>{ profile?.username || 'username' }</ThemedText>!
            </ThemedText>
            
            <View style={ styles.buttons}>
                <ThemedButton label='Configuration' type='default' onPress={ () => router.push('/configuration') } />
                <ThemedButton label='Add' type='default' onPress={ () => router.push('/data/add') } />
                <ThemedButton label='List' type='default' onPress={ () => router.push('/data/list') } />
                <ThemedButton label='Charts' type='default' onPress={ () => router.push('/data/charts') } />
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 'auto',
        marginTop: 75,
    },

    welcome: {
        textAlign: 'center',
    },

    buttons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 5,
        marginTop: 25,
    },
});