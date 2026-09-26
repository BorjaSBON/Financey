import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@ui/themed-text';
import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

interface Props {
    incomes: number,
    expenses: number,
    squareEnable?: boolean,
}

export default function BalanceResume({ incomes, expenses, squareEnable=false }: Props) {
    // Function to transform the values in readable text
    function ReadableNumber(value: number) {
        return (value / 100).toLocaleString('de-DE').replace(',', '\'');
    }

    // Calculate the balance
    const balance = Number((incomes - expenses).toFixed(2));
    const balanceColor = balance >= 0 ? styles.positive : styles.negative;

    return (
        <View style={ styles.container }>
            <View style={ styles.sections }>
                <View style={ styles.section }>
                    <View style= { styles.titleRow }>
                        { squareEnable === true && <View style={[ styles.square, styles.incomes ]} /> }
                        <ThemedText style={ styles.title } weight='regular'>Incomes</ThemedText>
                    </View>
                    <ThemedText style={ styles.data } weight='light' numberOfLines={ 1 } adjustsFontSizeToFit>
                        { ReadableNumber(incomes) }
                        <ThemedText style={ styles.currency }  weight='light'> €</ThemedText>
                    </ThemedText>
                </View>

                <View style={ styles.section }>
                    <ThemedText style={ styles.title } weight='regular'>Balance</ThemedText>
                    <ThemedText style={[ styles.data, balanceColor ]} weight='regular' numberOfLines={ 1 } adjustsFontSizeToFit>
                        { ReadableNumber(balance) }
                        <ThemedText style={[ styles.currency, balanceColor ]} weight='light'> €</ThemedText>
                    </ThemedText>
                </View>

                <View style={ styles.section }>
                    <View style= { styles.titleRow }>
                        { squareEnable === true && <View style={[ styles.square, styles.expenses ]} /> }
                        <ThemedText style={ styles.title } weight='regular'>Expenses</ThemedText>
                    </View>
                    <ThemedText style={ styles.data } weight='light' numberOfLines={ 1 } adjustsFontSizeToFit>
                        { ReadableNumber(expenses) }
                        <ThemedText style={ styles.currency } weight='light'> €</ThemedText>
                    </ThemedText>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: Values.paddingApp,
    },

    sections: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 3,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 10,
        overflow: 'hidden',
    },

    section: {
        width: '33%',
    },

    titleRow: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 7,
        justifyContent: 'center',
        width: '100%',
    },

    title: {
        fontSize: 14,
        textAlign: 'center',
    },

    data: {
        fontSize: 12,
        textAlign: 'center',
        height: 17,
        verticalAlign: 'bottom',
    },

    currency: {
        fontSize: 9,
    },

    positive: {
        color: Colors.positive,
    },
    negative: {
        color: Colors.negative,
    },

    square: {
        width: 10,
        height: 10,
        borderRadius: 3,
        alignSelf: 'center',
    },

    incomes: {
        backgroundColor: Colors.positive,
    },
    expenses: {
        backgroundColor: Colors.negative,
    },
});