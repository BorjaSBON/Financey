import { StyleSheet, Pressable, Platform } from 'react-native';

import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';

interface Props {
    // Variables
    title: string;
    data: string;

    // Methods
    onPress?: () => void;
}

export default function InformationElement({ title, data, onPress }: Props) {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.informationElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <ThemedText style={ styles.title } weight='regular'>{ title }</ThemedText>
            <ThemedText style={ styles.data } weight='light'>{ data }</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    informationElement: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 0,
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: 6,
        paddingBottom: 8,
        paddingHorizontal: Values.paddingElement,
    },

    title: {
        width: '100%',
        fontSize: 14,
    },

    data: {
        width: '100%',
        textAlign: Platform.OS == 'android' ? 'left' :'justify',
        fontSize: 12,
    },
});
