import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@ui/themed-text';
import { Values } from '@constants/values';

import Logo from '@assets/return.svg';

export default function Header() {
    return (
        <View style={ styles.header }>
            <Logo style={ styles.return } />
            <ThemedText style={ styles.title }>Current page</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 50,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        paddingStart: Values.paddingApp,
        paddingEnd: Values.paddingApp,
    },

    title: {
        fontSize: 20,
        marginStart: 10
    },

    return: {
        width: 25,
        height: 25,
        marginTop: 3
    }
});