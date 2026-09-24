import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';
import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';

import { AccountElement, NewAccount } from '@components/configuration/account-element';

import { useProfile } from '@/src/hooks/useProfile';

const AccountInformation = () => {
    // Get the profiles
    const { profiles, profile, loginById, logout, loading } = useProfile();

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.sections }>
                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>New account</ThemedText>
                        <View style={ styles.elements }>
                            <NewAccount onPress={ async () => {
                                await logout();
                                router.push('/');
                            } } />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Active account</ThemedText>
                        <View style={ styles.elements }>
                            <AccountElement username={ profile?.username || 'Username' } last_action_date={ profile?.last_action_date || 'DD/MM/YYYY' } active={ profile?.active || 0 } />
                        </View>
                    </View>

                    <View style={ styles.section }>
                        <ThemedText style={ styles.title } weight='regular'>Accounts</ThemedText>
                        <View style={ styles.elements }>
                            {
                                profiles.map((profile) => ( 
                                    profile.active === 1 || 
                                    <AccountElement key={profile.id.toString() } username={ profile?.username || 'Username' } last_action_date={ profile?.last_action_date || 'DD/MM/YYYY' } active={ profile?.active || 0 } onPress={ async () => {
                                        await logout();
                                        await loginById(profile.id);
                                        router.push('/');
                                    } } />
                                )) 
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default AccountInformation;

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
