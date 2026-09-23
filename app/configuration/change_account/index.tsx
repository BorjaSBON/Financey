import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';

import { AccountElement, NewAccount } from '@components/configuration/account-element';

import { useProfile } from '@/src/hooks/useProfile';

const AccountInformation = () => {
    // Get the profiles
    const { profiles, loginById, logout, loading } = useProfile();

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <NewAccount onPress={ async () => {
                await logout();
                router.push('/');
            } } />
            <FlatList
                data={ profiles }
                keyExtractor={ (profile) => profile.id.toString() }
                renderItem={({ item }) => <AccountElement username={ item?.username || 'Username' } last_action_date={ item?.last_action_date || 'DD/MM/YYYY' } active={ item?.active || 0 } onPress={ async () => {
                    await logout();
                    await loginById(item.id);
                    router.push('/');
                } } />}
            />
        </View>
    );
}

export default AccountInformation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Values.topIfHeader,
        width: '100%',
        paddingBottom: 125
    },
});
