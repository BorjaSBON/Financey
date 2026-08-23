import { StyleSheet, View } from 'react-native';

import { ThemedButton } from '@ui/themed-button';

interface Props {
    // Variables
    expenseActive?: boolean,

    // Methods
    expenseOnPress?: () => void;
    expenseOnLongPress?: () => void;

    incomeOnPress?: () => void;
    incomeOnLongPress?: () => void;
}

export default function TypeButtons({ expenseActive, expenseOnPress, expenseOnLongPress, incomeOnPress, incomeOnLongPress }: Props) {
    return (
        <View style={ styles.typeButtons }>
            <ThemedButton label='Expense' type={ expenseActive ? 'default' : 'clear' } onPress={ expenseOnPress } onLongPress={ expenseOnLongPress } />
            <ThemedButton label='Income' type={ !expenseActive ? 'default' : 'clear' } onPress={ incomeOnPress } onLongPress={ incomeOnLongPress } />
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