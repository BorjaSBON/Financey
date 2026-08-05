import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ui/themed-text';
import { Colors } from '../constants/colors';

interface Props {
    incomes: number,
    expenses: number,
    squareEnable?: boolean,
}

export default function BalanceResume({ incomes, expenses, squareEnable=false }: Props) {
    // Function to transform the values in readable text
    function ReadableNumber(value: number) {
        return value.toLocaleString('de-DE').replace(',', '\'');
    }

    // Calculate the balance
    const balance = Number((incomes - expenses).toFixed(2));
    const balanceColor = balance >= 0 ? styles.positive : styles.negative;

    return (
        <View style={ styles.balanceResume }>
            <View style={ styles.block }>
                <ThemedText style={ styles.title } weight='regular'>Balance</ThemedText>
                <ThemedText style={ styles.data } numberOfLines={ 1 } adjustsFontSizeToFit>
                    <ThemedText style={ balanceColor } weight='light'>{ ReadableNumber(balance) }</ThemedText>
                    <ThemedText style={[ styles.currency, balanceColor ]} weight='light'> €</ThemedText>
                </ThemedText>
            </View>

            <View style={ styles.block }>
                <View style= { styles.titleRow }>
                    { squareEnable === true && <View style={[ styles.square, styles.incomes ]} /> }
                    <ThemedText style={ styles.title } weight='regular'>Incomes</ThemedText>
                </View>
                <ThemedText style={ styles.data } numberOfLines={ 1 } adjustsFontSizeToFit>
                    <ThemedText  weight='light'>{ ReadableNumber(incomes) }</ThemedText>
                    <ThemedText style={ styles.currency }  weight='light'> €</ThemedText>
                </ThemedText>
            </View>

            <View style={ styles.block }>
                <View style= { styles.titleRow }>
                    { squareEnable === true && <View style={[ styles.square, styles.expenses ]} /> }
                    <ThemedText style={ styles.title } weight='regular'>Expenses</ThemedText>
                </View>
                <ThemedText style={ styles.data } numberOfLines={ 1 } adjustsFontSizeToFit>
                    <ThemedText weight='light'>{ ReadableNumber(expenses) }</ThemedText>
                    <ThemedText style={ styles.currency } weight='light'> €</ThemedText>
                </ThemedText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    balanceResume: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    block: {
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
        fontSize: 15,
        textAlign: 'center',
    },

    data: {
        fontSize: 13,
        width: '100%',
        textAlign: 'center',
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