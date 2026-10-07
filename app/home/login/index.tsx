import { useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedButton } from '@ui/themed-button';

import { AccountElement } from '@components/configuration/account-element';

import { useProfiles } from '@/src/hooks/useProfiles';
import { useCategories } from '@/src/hooks/useCategories';

const LoginScreen = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Variables
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Database
    const { profiles, UsernameProfile, loginById, loadingProfiles } = useProfiles();
    const { createCategory } = useCategories();
    
    // Validate username and create account
    const validateUsername = async () => {
        // Check if the username if filled
        if (username !== '') {
            setError(null);

            if (username.length > 15) {
                setError('The user must be less than 15 characters')
                return;
            };

            try {
                // Create the profile
                await UsernameProfile({ 'username': username });

                // Create the default categories
                await createCategory({ name: 'General', type: 'expense' });
                await createCategory({ name: 'General', type: 'income' });

                // Redirect
                router.push('/home');
            } catch (err) {
                setError('The username must be unique');
            }
        }
    }

    // Check if the profiles is loaded
    if (loadingProfiles) {
        return <ActivityIndicator />;
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
                { error && <ThemedText weight='extraLight' style={ styles.error }>{ error }</ThemedText> }
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
                        router.replace('/');
                    } } />}
                />
            </View>
        </View>
    );
};

export default LoginScreen;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
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
            backgroundColor: '#D9D9D980',
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
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
            maxHeight: 175,
            marginBottom: 50,
        },
        
        error: {
            textAlign: 'center',
            fontSize: 12,
            marginTop: 5,
            color: colors.negative,
        },
    }
);