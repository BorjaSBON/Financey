import { StyleSheet, View } from 'react-native';

import { useLanguage } from '@language/useLanguage';

import { ThemedButton } from '@ui/themed-button';

interface Props {
    // Variables
    resumeActive?: boolean,

    // Methods
    resumeOnPress?: () => void;
    resumeOnLongPress?: () => void;

    evolutionOnPress?: () => void;
    evolutionOnLongPress?: () => void;
}

export default function ChartsTypeButtons({ resumeActive, resumeOnPress, resumeOnLongPress, evolutionOnPress, evolutionOnLongPress }: Props) {
    // Traductions
    const { languages } = useLanguage();

    return (
        <View style={ styles.typeButtons }>
            <ThemedButton label={ languages['resume'] } type={ resumeActive ? 'default' : 'clear' } onPress={ resumeOnPress } onLongPress={ resumeOnLongPress } />
            <ThemedButton label={ languages['evolution'] } type={ !resumeActive ? 'default' : 'clear' } onPress={ evolutionOnPress } onLongPress={ evolutionOnLongPress } />
        </View>
    );
}

const styles = StyleSheet.create({
    typeButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20,
        marginHorizontal: 'auto',
        paddingVertical: 5,
    },
});