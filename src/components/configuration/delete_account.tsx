import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import { useTransactions } from '@/src/hooks/useTransactions';
import { useCategories } from '@/src/hooks/useCategories';
import { useProfiles } from '@/src/hooks/useProfiles';

interface Props {
    // Variables
    active?: boolean;

    // Methods
    cancelAction?: () => void;
}

export default function DeleteAccount({ active=false, cancelAction }: Props) {
    // Database
    const { deleteTransactions } = useTransactions();
    const { removeProfile } = useProfiles();
    
    // Delete account
    const deleteAccountAction = async () => {
        await deleteTransactions();
        await removeProfile();
        router.push('/');
    }

    return (
        <View style={[ 
            styles.popup,
            active ? { display: 'flex' } : { display: 'none' }
        ]}>
            <ThemedText style={ styles.message } weight='light'>Are you sure you want to delete the account? All the information will be permanently lost</ThemedText>

            <View style={ styles.buttons }>
                <ThemedButton label='Delete' type='delete' onPress={ deleteAccountAction } />
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
