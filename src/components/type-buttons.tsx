import { StyleSheet, View } from 'react-native';

import { ThemedButton } from './ui/themed-button';

export default function TypeButtons() {
    return (
        <View style={ styles.typeButtons }>
            <ThemedButton label='Expense' type='default'/>
            <ThemedButton label='Income' type='clear'/>
        </View>
    );
}

const styles = StyleSheet.create({
    typeButtons: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 20,
        paddingTop: 5,
        paddingBottom: 5,
    },
});