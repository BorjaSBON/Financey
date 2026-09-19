import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import { useTransactions } from '@/src/hooks/useTransactions';

interface Props {
    // Variables
    active?: boolean;

    // Methods
    cancelAction?: () => void;
}

export default function ResetAccount({ active=false, cancelAction }: Props) {
    // Database
    const { deleteTransactions } = useTransactions();
    
    // Reset account
    const resetAccountAction = async () => {
        await deleteTransactions();
        router.push('/');
    }

    return (
        <View style={[ 
            styles.popup,
            active ? { display: 'flex' } : { display: 'none' }
        ]}>
            <ThemedText style={ styles.message } weight='light'>Are you sure you want to reset the account?</ThemedText>

            <View style={ styles.buttons }>
                <ThemedButton label='Reset' type='delete' onPress={ resetAccountAction } />
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
