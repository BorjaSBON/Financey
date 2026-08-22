import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';
import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';

import Logo from '@assets/return.svg';

interface Props {
    // Variables
    title: string;
}

export default function Header({ title }: Props) {
    return (
        <View style={ styles.header }>
            <Pressable 
                style={({ pressed }) => [
                    styles.return,
                    pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
                ]} 
                onPress={ () => router.back() } 
            >
                <Logo style={ styles.icon } />
            </Pressable>
            <ThemedText style={ styles.title }>{ title }</ThemedText>
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
        paddingHorizontal: Values.paddingApp,
    },

    title: {
        fontSize: 17,
        marginStart: 10,
        marginVertical: 'auto',
    },

    return: {
        borderRadius: 30,
        padding: 2,
    },

    icon: {
        width: 25,
        height: 25,
        marginTop: 3,
        transform: [{scale: 0.75}]
    }
});