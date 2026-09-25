import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedButton } from '@ui/themed-button';
import { AccountElement } from '@components/configuration/account-element';

import { useProfiles } from '@/src/hooks/useProfiles';

const LoginScreen = () => {
    // Set the username
    const [username, setUsername] = useState('');

    // Get the function to create a profile and the error state
    const { profiles, createProfile, loginById, error } = useProfiles();
    
    // Validate username and create account
    const validateUsername = async () => {
        // Create the profile
        await createProfile({
            'username': username, 
            'creation_date': new Date().toISOString(),
        });
        
        // If there is no error, navigate to the home screen
        if (!error) {
            router.push('/home');
        }
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.presentation }>
                <ThemedText weight='medium' style={ styles.title }>Financey</ThemedText>
                <View style={ styles.image } />
                <ThemedText weight='light' style={ styles.description }>
                    What would you like us to call you?
                </ThemedText>
            </View>

            <View style={ styles.input }>
                <ThemedInput placeholder='Username' type='text' value={ username } onChange={ setUsername } />
            </View>

            <View style={ styles.button }>
                <ThemedButton label='Enter' type='default' onPress={ validateUsername } />
            </View>

            <View style={[ styles.accounts, { height: Math.min(profiles.length * 50, 175)} ]}>
                <FlatList
                    data={ profiles }
                    keyExtractor={ (profile) => profile.id.toString() }
                    renderItem={({ item }) => <AccountElement username={ item?.username || 'Username' } last_action_date={ item?.last_action_date || 'DD/MM/YYYY' } active={ item?.active || 0 } onPress={ async () => {
                        await loginById(item.id);
                        router.push('/');
                    } } />}
                />
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 25,
        marginHorizontal: 'auto',
        marginVertical: 'auto',
    },

    presentation: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
        paddingHorizontal: 50,
        margin: 'auto',
    },

    title: {
        fontSize: 30,
        textAlign: 'center',
    },

    image: {
        width: 75,
        height: 75,
        borderRadius: 50,
        backgroundColor: Colors.backgroundSecondary,
        margin: 'auto',
    },

    description: {
        fontSize: 13,
        textAlign: 'center',
    },

    input: {
        marginHorizontal: 50,
    },

    button: {
        marginHorizontal: 'auto',
    },

    accounts: {
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: 10,
        overflow: 'hidden',
        maxHeight: 175,
        marginBottom: 50,
    }
});