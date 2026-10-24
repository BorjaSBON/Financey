import { StyleSheet, Pressable, Platform, View } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';

import { AddIcon } from '@icons/add';

interface AccountProps {
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

export function AccountElement({ username, last_action_date, active, onPress }: AccountProps) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Data
    const activeText = active === 1 ? <ThemedText style={ styles.active } weight='light'>({ languages['active'] })</ThemedText> : '';
    const dateFormatted = new Date(last_action_date).toLocaleDateString(languages['dateFormat']);

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.accountElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <View style={[ styles.icon, {backgroundColor: stringToPastelColor(username)} ]}>
                <ThemedText style={ styles.letter } weight='semiBold'>{ username[0].toUpperCase() }</ThemedText>
            </View>
            <View style={ styles.information }>
                <ThemedText style={ styles.username } weight='regular'>{ username } { activeText }</ThemedText>
                <ThemedText style={ styles.date } weight='light'>
                    { languages['lastAction'] }: 
                    <ThemedText style={ styles.dateValue } weight='light'> { dateFormatted.replaceAll('/', ' / ') }</ThemedText>
                </ThemedText>
            </View>
        </Pressable>
    );
}

export function NewAccount({ onPress }: NewAccountProp) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.accountElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <View style={ styles.actionIcon }>
                <AddIcon backgroundColor={ colors.iconColor } iconColor={ colors.iconBackground } />
            </View>
            <ThemedText style={ styles.title } weight='regular'>{ languages['createNewAccount'] }</ThemedText>
        </Pressable>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        accountElement: {
            display: 'flex',
            flexDirection: 'row',
            columnGap: 15,
            width: '100%',
            minHeight: 50,
            alignItems: 'center',
            paddingVertical: 'auto',
            paddingHorizontal: Values.paddingElement,
        },

        icon: {
            width: 30,
            height: 30,
            borderRadius: 50,
            marginVertical: 'auto',
        },

        letter: {
            margin: 'auto',
            fontSize: 16,
            color: colors.mainColor,
        },

        information: {
            display: 'flex',
            flexDirection: 'column',
        },

        title: {
            fontSize: 14,
            marginVertical: 'auto',
        },

        username: {
            width: '100%',
            fontSize: 14,
        },

        active: {
            fontSize: 12,
        },

        date: {
            width: '100%',
            textAlign: Platform.OS == 'android' ? 'left' :'justify',
            fontSize: 12,
            color: colors.fontSecondary,
        },

        dateValue: {
            color: colors.fontSecondary,
            letterSpacing: 0,
        },

        actionIcon: {
            marginVertical: 'auto',
        },
    }
);
