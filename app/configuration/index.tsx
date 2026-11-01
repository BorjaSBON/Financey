import { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePreventRemove, useRouter } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';

import ConfElement from '@components/configuration/conf-element';
import { ConfThemeSelect, ConfLanguageSelect, ConfCurrencySelect } from '@components/configuration/conf-element-select';
import ModifyElement from '@components/common/modify-element';
import DeleteElement from '@components/common/delete-element';

import { useProfiles } from '@/src/hooks/useProfiles';
import { useTransactions } from '@/src/hooks/useTransactions';
import { useCategories } from '@/src/hooks/useCategories';

import { resetDatabase } from '@/src/db/resetDatabase';

const ConfigurationScreen = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Change the router previous page
    const router = useRouter();
    const [preventRemoval, setPreventRemoval] = useState(true);

    const disablePrevention = usePreventRemove(
        preventRemoval,
        () => {
            setPreventRemoval(false);
            disablePrevention();
            router.replace('/home');
        }
    );

    // Database
    const { profile, modifyProfileUsername, removeProfile, loadingProfiles } = useProfiles();
    const { removeTransactions } = useTransactions();
    const { removeAllCategories } = useCategories();

    // Variables
    const [changeUsernamePopup, setChangeUsernamePopup] = useState(false);
    const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);
    const [resetAppPopup, setResetAppPopup] = useState(false);
    const [username, setUsername] = useState('');
    const [error, setError] = useState<string | null>(null);

    // CHANGE USERNAME ACTION
    // Get the username
    useEffect(() => {
        if (profile) {
            setUsername(profile.username);
        }
    }, [profile]);
    
    // Button action
    const changeUsernameAction = async () => {
        // Check if the username if filled
        if (username === '') {
            return;
        }

        setError(null);

        if (username.length > 15) {
            setError(languages['errorLimitUsername']);
            return;
        }

        try {
            await modifyProfileUsername({ username: username });
            router.push('/');
        } catch (error) {
            setError(languages['errorUsernameUnique']);
        }
    };

    // DELETE ACCOUNT ACTION
    const deleteAccountAction = async () => {
        // Remove transactions
        await removeTransactions();

        // Remove categories
        await removeAllCategories();

        // Remove profile
        await removeProfile();

        // Redirect
        router.push('/');
    };

    // RESET APP ACTION
    const resetAppAction = async () => {
        // Reset database
        await resetDatabase();

        // Reset local preferences
        await AsyncStorage.removeItem('@theme_preference');
        await AsyncStorage.removeItem('@currency_preference');
        await AsyncStorage.removeItem('@language_preference');

        // Reset navigation
        router.replace('/');
    };

    // Check if the profile is loaded
    if (loadingProfiles) {
        return <ActivityIndicator />;
    }

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <View style={ styles.container }>
                <ScrollView>
                    <View style={ styles.sections }>
                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='medium'>{ languages['general'] }</ThemedText>
                            <View style={ styles.elements }>
                                <ConfThemeSelect />
                                <ConfLanguageSelect />
                            </View>
                        </View>

                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='medium'>{ languages['data'] }</ThemedText>
                            <View style={ styles.elements }>
                                <ConfCurrencySelect />
                                <ConfElement title={ languages['categories'] } onPress={ () => router.push('/configuration/data/categories') } />
                                <ConfElement title={ languages['importData'] } onPress={ () => router.push({pathname: '/future', params: { information01: languages['futureImportInfo1'], information02: languages['futureImportInfo2'] }}) } />
                                <ConfElement title={ languages['exportData'] } onPress={ () => router.push({pathname: '/future', params: { information01: languages['futureExportInfo'] }}) } />
                            </View>
                        </View>
                        
                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='medium'>{ languages['account'] }</ThemedText>
                            <View style={ styles.elements }>
                                <ConfElement title={ languages['informationAccount'] } onPress={ () => router.push('/configuration/account/information') } />
                                <ConfElement title={ languages['changeAccount'] } onPress={ () => router.push('/configuration/account/change_account') } />
                                <ConfElement title={ languages['changeUsername'] } iconDisplay={ false } onPress={ () => { setChangeUsernamePopup(prev => !prev); }} />
                                <ConfElement title={ languages['deleteAccount'] } colorText={ colors.negative } iconDisplay={ false } onPress={ () => { setDeleteAccountPopup(prev => !prev); }} />
                            </View>
                        </View>
                        
                        <View style={ styles.section }>
                            <ThemedText style={ styles.title } weight='medium'>{ languages['app'] }</ThemedText>
                            <View style={ styles.elements }>
                                <ConfElement title={ languages['informationApp'] } onPress={ () => router.push('/configuration/application') } />
                                <ConfElement title={ languages['resetApp'] } colorText={ colors.negative } iconDisplay={ false } onPress={ () => { setResetAppPopup(prev => !prev); }} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            
            <ModifyElement active={ changeUsernamePopup } title={ languages['changeUsername'] } value={ username } placeholder={ languages['newUsername'] } error={ error } modifyAction={ changeUsernameAction } cancelAction={ () => { setChangeUsernamePopup(prev => !prev); }} onChange={ setUsername } />
            <DeleteElement active={ deleteAccountPopup } title={ languages['deleteAccountTitle'] } titleButton='delete' deleteAction={ deleteAccountAction } cancelAction={ () => { setDeleteAccountPopup(prev => !prev); }} />
            <DeleteElement active={ resetAppPopup } title={ languages['resetAppTitle'] } titleButton='reset' deleteAction={ resetAppAction } cancelAction={ () => { setResetAppPopup(prev => !prev); }} />
        </View>
    );
};

export default ConfigurationScreen;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            position: 'relative',
            flex: 1,
            width: '100%',
        },

        sections: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 15,
            paddingHorizontal: Values.paddingApp,
        },

        section: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: Values.rowGapSection,
        },

        title: {
            fontSize: 13,
        },

        elements: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 8,
            overflow: 'hidden',
        },
    }
);