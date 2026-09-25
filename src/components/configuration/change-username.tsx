import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedButton } from '@ui/themed-button';

import { useProfiles } from '@/src/hooks/useProfiles';

interface Props {
    // Variables
    active?: boolean;

    // Methods
    cancelAction?: () => void;
}

export default function ChangeUsername({ active=false, cancelAction }: Props) {
    // Database
    const { profile, modifyProfileUsername, loading, error } = useProfiles();

    // New username
    const [username, setUsername] = useState(profile?.username || '');

    // If loading, return an empty view
    useEffect(() => {
        if (!loading) {
            setUsername(profile?.username || '');
        }
    }, [loading, profile?.username]);

    // Function to modify the username
    const modifyUsername = async () => {
        await modifyProfileUsername({'username': username, 'last_action_date': new Date().toISOString()});

        if (error) {
            console.error(error);
        }

        router.push('/');
    }

    return (
        <View style={[ 
            styles.popup,
            active ? { display: 'flex' } : { display: 'none' }
        ]}>
            <ThemedText style={ styles.message } weight='light'>New username</ThemedText>
            <ThemedInput value={ username } placeholder='New username' type='text' onChange={ setUsername } />

            <View style={ styles.buttons }>
                <ThemedButton label='Change' type='default' onPress={ modifyUsername } />
                <ThemedButton label='Cancel' type='default' onPress={ cancelAction } />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    popup: {
        position: 'absolute',
        bottom: 90,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 15,
        width: '100%',
        paddingTop: 25,
        paddingBottom: 35,
        paddingHorizontal: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 2,
        backgroundColor: Colors.backgroundPrimary,
        
        shadowColor: Colors.shadow,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    message: {
        textAlign: 'center',
    },

    buttons: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 7,
        marginHorizontal: 'auto',
    },
});
