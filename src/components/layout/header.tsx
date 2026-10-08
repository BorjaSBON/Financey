import { Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';

import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import ReturnIcon from '@assets/return.svg';

interface Props {
    // Variables
    title: string;
}

export default function Header({ title }: Props) {
    // Theme
    const { colors } = useTheme();

    return (
        <View style={ styles.header }>
            <Pressable 
                style={({ pressed }) => [
                    styles.return,
                    pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
                ]} 
                onPress={ () => router.back() } 
            >
                <ReturnIcon style={ styles.icon } color={ colors.iconBackground } />
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
        marginStart: 5,
        marginVertical: 'auto',
    },

    return: {
        borderRadius: 30,
        padding: 2,
    },

    icon: {
        width: 25,
        height: 25,
        transform: [{scale: 0.75}]
    }
});