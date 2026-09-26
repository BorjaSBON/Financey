import { View, StyleSheet, Pressable } from 'react-native';

import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';

import Filter from '@assets/filter.svg';
import Add from '@assets/add.svg';

interface TransactionProps {
    // Variables
    type: 'income' | 'expense';
    category: string;
    value: number;
    date: string;

    // Methods
    onPress?: () => void;
}

interface NewTransactionProp {
    // Methods
    onPress?: () => void;
}

export function TransactionElement({ type, category, value, date, onPress }: TransactionProps) {
    // Function to transform the values in readable text
    function ReadableNumber(value: number) {
        return (value / 100).toLocaleString('de-DE').replace(',', '\'');
    }

    // Get the formatted date
    const dateFormatted = new Date(date).toLocaleDateString('en-GB');

    // Color of the money depending on the type of data
    const valueColor = type=='income' ? styles.positive : styles.negative;

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.transactionElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <View style={ styles.transactionHeader }>
                <ThemedText style={ styles.category } weight='light'>{ category }</ThemedText>
                <ThemedText style={[ styles.value, valueColor ]} weight='medium'>
                    { ReadableNumber(value) }
                    <ThemedText style={[ styles.unit, valueColor ]} weight='light'> €</ThemedText>
                </ThemedText>
            </View>
            
            <ThemedText style={ styles.date } weight='light'>{ dateFormatted }</ThemedText>
        </Pressable>
    );
}

export function NewTransaction({ onPress }: NewTransactionProp) {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.actionElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <Add style={ styles.actionIcon } />
            <ThemedText style={ styles.title } weight='light'>Add new transaction</ThemedText>
        </Pressable>
    );
}

export function FilterTransactions({ onPress }: NewTransactionProp) {
    return (
        <Pressable 
            style={({ pressed }) => [
                styles.actionElement,
                pressed ? { backgroundColor: Colors.hoverElement } : { backgroundColor: 'transparent' },
            ]}
            onPress={ onPress }
        >
            <Filter style={ styles.actionIcon } />
            <ThemedText style={ styles.title } weight='light'>Filter</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    transactionElement: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 0,
        alignItems: 'flex-start',
        width: '100%',
        minHeight: 36,
        paddingVertical: 6,
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
        backgroundColor: Colors.backgroundSecondary,
        marginTop: 2,
    },

    letter: {
        margin: 'auto',
        fontSize: 14,
    },

    title: {
        fontSize: 14,
    },

    transactionHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    category: {
        fontSize: 14,
    },

    value: {
        fontSize: 13,
        marginTop: -2,
        height: '100%',
        textAlignVertical: 'bottom',
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
        fontSize: 11,
        color: Colors.inputTextUnselected,
    },

    actionIcon: {
        transform: [{ scale: 0.75 }]
    },
});
