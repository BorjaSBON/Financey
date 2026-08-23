import { StyleSheet, Pressable, View } from 'react-native';

import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';

import Logo from '@assets/trash.svg';

interface Props {
    // Variables
    title: string;

    // Methods
    onPress?: () => void;
}

export default function CategoryElement({ title, onPress }: Props) {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.informationElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <View style={ styles.name }>
                <View style={ styles.color } />
                <ThemedText style={ styles.title } weight='light'>{ title }</ThemedText>
            </View>
            <Logo style={ styles.icon } />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    informationElement: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 7,
        paddingHorizontal: 40,
    },

    name: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'flex-start',
    },

    color: {
        width: 10,
        height: 10,
        borderRadius: 2,
        backgroundColor: Colors.negative,
        marginTop: 7,
    },

    title: {
        fontSize: 15,
    },
    
    icon: {
        transform: [{ scale: 1.15 }],
        marginTop: 4,
    },
});
