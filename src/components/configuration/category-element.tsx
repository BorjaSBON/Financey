import { StyleSheet, Pressable, View } from 'react-native';

import { Values } from '@constants/values';

import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

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
    // Theme
    const { colors } = useTheme();

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.categoryElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <View style={ styles.name }>
                <View style={[ styles.color, type === 'expense' ? { backgroundColor: colors.negative } : { backgroundColor: colors.positive } ]} />
                <ThemedText style={ styles.title } weight='light'>{ title }</ThemedText>
            </View>
        </Pressable>
    );
}

export function NewCategory({ onPress }: NewCategoryProp) {
    // Theme
    const { colors } = useTheme();
    
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.actionElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <Add style={ styles.actionIcon } color={ colors.iconBackground } />
            <ThemedText style={ styles.title } weight='light'>Add new category</ThemedText>
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
        margin: 'auto',
    },

    title: {
        fontSize: 14,
    },

    actionIcon: {
        transform: [{ scale: 0.6 }]
    },
});
