import { StyleSheet, Pressable } from 'react-native';

import { ThemedText } from '@ui/themed-text';
import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

interface Props {
    // Variables
    type: 'income' | 'expense';
    category: string;
    value: number;
    date: string;

    // Methods
    onPress?: () => void;
}

export default function ListElement({ type, category, value, date, onPress }: Props) {
    // Function to transform the values in readable text
    function ReadableNumber(value: number) {
        return value.toLocaleString('de-DE').replace(',', '\'');
    }

    // Color of the money depending on the type of data
    const valueColor = type=='income' ? styles.positive : styles.negative;

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.listElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <ThemedText style={ styles.category } weight='medium'>{ category }</ThemedText>
            <ThemedText style={ styles.value }>
                <ThemedText style={ valueColor } weight='light'>{ ReadableNumber(value) } </ThemedText>
                <ThemedText style={[ styles.unit, valueColor ]} weight='light'>€</ThemedText>
            </ThemedText>

            <ThemedText style={ styles.date } weight='light'>{ date }</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    listElement: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 0,
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: 3,
        paddingBottom: 6,
        paddingHorizontal: Values.paddingApp,
    },

    category: {
        fontSize: 13,
    },

    value: {
        fontSize: 12,
        marginTop: -2,
    },
    unit: {
        fontSize: 9,
    },

    positive: {
        color: Colors.positive,
    },
    negative: {
        color: Colors.negative,
    },

    date: {
        fontSize: 10,
        marginTop: -2,
    },
});
