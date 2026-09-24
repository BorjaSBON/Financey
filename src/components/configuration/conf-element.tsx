import { StyleSheet, Pressable } from 'react-native';

import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

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

export default function ConfElement({ title, colorText=Colors.fontPrimary, iconDisplay=true, onPress }: Props) {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.informationElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <ThemedText style={[ styles.title, { color:colorText } ]} weight='light'>{ title }</ThemedText>
            <Logo style={[ styles.icon, iconDisplay ? { display: 'flex'} : { display: 'none'} ]} />
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
