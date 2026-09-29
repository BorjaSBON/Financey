import { StyleSheet, Pressable } from 'react-native';

import { Values } from '@constants/values';

import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';

import Logo from '@assets/more.svg';


interface Props {
    // Variables
    title: string;
    colorText?: string;
    iconDisplay?: boolean;

    // Methods
    onPress?: () => void;
}

export default function ConfElement({ title, colorText='', iconDisplay=true, onPress }: Props) {
    // Theme
    const { colors } = useTheme();

    if (colorText === '') colorText = colors.fontPrimary;

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.informationElement,
                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <ThemedText style={[ styles.title, { color:colorText } ]} weight='light'>{ title }</ThemedText>
            <Logo style={[ styles.icon, iconDisplay ? { display: 'flex'} : { display: 'none'} ]} color={ colors.iconBackground } />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    informationElement: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 8,
        paddingHorizontal: Values.paddingElement,
    },

    title: {
        fontSize: 14,
    },

    icon: {
        transform: [{ rotate: '-90deg' }, { scale: 0.9 }],
    },
});
