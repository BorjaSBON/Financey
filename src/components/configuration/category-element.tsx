import { StyleSheet, Pressable, View } from 'react-native';

import { Values } from '@constants/values';
import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';

import Logo from '@assets/trash.svg';
import Add from '@assets/add.svg';

interface CategoryProps {
    // Variables
    title: string;
    type: string;

    // Methods
    onPress?: () => void;
}

interface NewCategoryProp {
    // Methods
    onPress?: () => void;
}

export function CategoryElement({ title, type, onPress }: CategoryProps) {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.categoryElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <View style={ styles.name }>
                <View style={[ styles.color, type === 'expense' ? { backgroundColor: Colors.negative } : { backgroundColor: Colors.positive } ]} />
                <ThemedText style={ styles.title } weight='light'>{ title }</ThemedText>
            </View>
            <Logo style={ styles.trashIcon } />
        </Pressable>
    );
}

export function NewCategory({ onPress }: NewCategoryProp) {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.actionElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <Add style={ styles.actionIcon } />
            <ThemedText style={ styles.title } weight='light'>Create new category</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    categoryElement: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        minHeight: 32,
        paddingVertical: 8,
        paddingHorizontal: Values.paddingElement,
    },

    actionElement: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        minHeight: 30,
        paddingVertical: 2,
        paddingHorizontal: 10,
        columnGap: 5,
    },
    
    icon: {
        width: 20,
        height: 20,
        borderRadius: 50,
        marginVertical: 'auto',
        backgroundColor: Colors.backgroundSecondary,
    },

    letter: {
        margin: 'auto',
        fontSize: 14,
    },

    name: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'flex-start',
        verticalAlign: 'auto',
    },

    color: {
        width: 10,
        height: 10,
        borderRadius: 2,
        marginTop: 7,
    },

    title: {
        fontSize: 14,
    },
    
    trashIcon: {
        transform: [{ scale: 1.1 }],
        marginTop: 4,
    },

    actionIcon: {
        transform: [{ scale: 0.75 }]
    },
});
