import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ui/themed-text';

export default function BalanceResume() {
    const balanceValue = 14500.37;
    let balanceColor = styles.balanceNegative;
    if (balanceValue >= 0) {
        balanceColor = styles.balancePositive;
    }

    return (
        <View style={ styles.balanceResume }>
            <View style={ styles.block }>
                <ThemedText style={ styles.title }>Balance</ThemedText>
                <ThemedText style={ styles.data }>
                    <ThemedText style={ balanceColor }>{ balanceValue }</ThemedText>
                    <ThemedText style={[ styles.currency, balanceColor ]}> €</ThemedText>
                </ThemedText>
            </View>

            <View style={ styles.block }>
                <ThemedText style={ styles.title }>Income</ThemedText>
                <ThemedText style={ styles.data }>
                    <ThemedText>000'0</ThemedText>
                    <ThemedText style={ styles.currency }> €</ThemedText>
                </ThemedText>
            </View>

            <View style={ styles.block }>
                <ThemedText style={ styles.title }>Expenses</ThemedText>
                <ThemedText style={ styles.data }>
                    <ThemedText>000'0</ThemedText>
                    <ThemedText style={ styles.currency }> €</ThemedText>
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
        width: '100%'
    },

    block: {
        width: '33%',
    },

    title: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center'
    },

    data: {
        fontSize: 13,
        width: '100%',
        textAlign: 'center'
    },

    currency: {
        fontSize: 11,
    },

    balancePositive: {
        color: '#AED136',
        fontWeight: 'bold'
    },

    balanceNegative: {
        color: '#F15A29',
        fontWeight: 'bold'
    }
});