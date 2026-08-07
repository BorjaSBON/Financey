import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { Values } from '@constants/values';

interface Props {
    // Variables
    title: string;
    value?: string;
    placeholder?: string;

    type?: 'text' | 'select' | 'number' | 'date';
}

export default function Input({ title, value='', placeholder='', type='text' }: Props) {
    return (
        <View style={ styles.input }>
            <ThemedText style={ styles.title } weight='regular'>{ title }</ThemedText>
            <ThemedInput placeholder={ placeholder } type={ type } value={ value } />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 6,
        paddingStart: Values.paddingApp,
        paddingEnd: Values.paddingApp,
        
    },

    title: {
        fontSize: 15,
    },
});
