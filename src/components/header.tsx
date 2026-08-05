import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from './ui/themed-text';

import Logo from '../../assets/svg/return.svg';

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