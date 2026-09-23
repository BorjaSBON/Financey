import { StyleSheet, Pressable, Platform, View } from 'react-native';

import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';

interface Props {
    // Variables
    username: string;
    last_action_date: string;
    active: number;

    // Methods
    onPress?: () => void;
}

interface NewAccountProp {
    // Methods
    onPress?: () => void;
}

export const stringToPastelColor = (username: string) => {
    let hash = 0;

    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
        hash |= 0;
    }

    const hue = Math.abs(hash) % 360;
    const saturation = 60;
    const lightness = 80;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export function AccountElement({ username, last_action_date, active, onPress }: Props) {
    const activeText = active === 1 ? <ThemedText style={ styles.active } weight='light'>(Active)</ThemedText> : '';
    const dateFormatted = new Date(last_action_date).toLocaleDateString('en-GB');

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.accountElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <View style={[ styles.icon, {backgroundColor: stringToPastelColor(username)} ]}>
                <ThemedText style={ styles.letter } weight='medium'>{ username[0].toUpperCase() }</ThemedText>
            </View>
            <View style={ styles.information }>
                <ThemedText style={ styles.username } weight='regular'>{ username } { activeText }</ThemedText>
                <ThemedText style={ styles.date } weight='light'>Last action: { dateFormatted }</ThemedText>
            </View>
        </Pressable>
    );
}

export function NewAccount({ onPress }: NewAccountProp) {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.accountElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <View style={ styles.icon }>
                <ThemedText style={ styles.letter } weight='medium'>+</ThemedText>
            </View>
            <ThemedText style={ styles.title } weight='regular'>New account</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    accountElement: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 15,
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: 5,
        paddingBottom: 7,
        paddingHorizontal: Values.paddingApp,
    },

    icon: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginVertical: 'auto'
    },

    letter: {
        margin: 'auto',
        fontSize: 16,
    },

    information: {
        display: 'flex',
        flexDirection: 'column',
    },

    title: {
        width: '100%',
        fontSize: 15,
        marginVertical: 'auto',
    },

    username: {
        width: '100%',
        fontSize: 15,
    },

    active: {
        fontSize: 12,
    },

    date: {
        width: '100%',
        textAlign: Platform.OS == 'android' ? 'left' :'justify',
        fontSize: 12,
    },
});
