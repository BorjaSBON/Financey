import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { router, useNavigation } from 'expo-router';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedButton } from '@ui/themed-button';

import { AppIcon } from '@icons/app-icon';

import { AccountElement } from '@components/configuration/account-element';

import { useProfiles } from '@/src/hooks/useProfiles';
import { useCategories } from '@/src/hooks/useCategories';

const LoginScreen = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Router
    const navigation = useNavigation();
    
    useEffect(() => {
        if (navigation.canGoBack()) {
            router.dismissAll();
            router.replace('/login')
        }
    }, [navigation]);

    // Variables
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Database
    const { profiles, CreateProfile, loginById, loadingProfiles } = useProfiles();
    const { createCategory } = useCategories();
    
    // Validate username and create account
    const validateUsername = async () => {
        // Check if the username if filled
        if (username !== '') {
            setError(null);

            if (username.length > 15) {
                setError(languages['errorLimitUsername'])
                return;
            };

            try {
                // Create the profile
                await CreateProfile({ username: username });

                // Create the default categories
                await createCategory({ name: 'General', type: 'expense' });
                await createCategory({ name: 'General', type: 'income' });

                // Redirect
                router.push('/home');
            } catch (err) {
                setError(languages['errorUsernameUnique']);
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

                <View style={ styles.image }>
                    <AppIcon size={ 75 }/>
                </View>
                

                <ThemedText weight='light' style={ styles.description }>{ languages['quesionWelcome'] }</ThemedText>
            </View>

            <View style={ styles.input }>
                <ThemedInput placeholder={ languages['username'] } type='text' value={ username } onChange={ setUsername } />
                { error && <ThemedText weight='extraLight' style={ styles.error }>{ error }</ThemedText> }
            </View>

            <View style={ styles.button }>
                <ThemedButton label={ languages['enter'] } type='default' onPress={ validateUsername } />
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
            marginHorizontal: 'auto',
            borderRadius: 100,
            overflow: 'hidden',
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