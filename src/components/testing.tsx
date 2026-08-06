import { StyleSheet, View, ScrollView } from 'react-native';

import { ThemedText } from './ui/themed-text';
import { ThemedButton } from './ui/themed-button';

import BalanceResume from './balance-resume';
import TypeButtons from './type-buttons';
import ListElement from './list-element';

export default function Testing() {
    return (
        <View style={ styles.testing }>
            <ThemedText style={ styles.welcome }>Welcome Borchax!</ThemedText>

            <BalanceResume incomes={ 12000.58 } expenses={ 5000.36 } squareEnable={ false } />
            <View style={ styles.listElements }>
                <ScrollView>
                    <ListElement type={ 'expense' } category={ 'Supermercado' } value={ 32.17 } date={ '06 / 08 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Comida fuera' } value={ 25.8 } date={ '05 / 08 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Farmacia' } value={ 60.5 } date={ '05 / 08 / 2026' } />
                    <ListElement type={ 'income' } category={ 'Nómina' } value={ 1000.25 } date={ '03 / 08 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Ocio' } value={ 15 } date={ '02 / 08 / 2026' } />
                    <ListElement type={ 'income' } category={ 'Otros' } value={ 170 } date={ '02 / 08 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Supermercado' } value={ 3.57 } date={ '01 / 07 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Supermercado' } value={ 21.99 } date={ '30 / 07 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Deporte' } value={ 42.99 } date={ '29 / 07 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Otros' } value={ 4.99 } date={ '24 / 07 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Otros' } value={ 4.99 } date={ '24 / 07 / 2026' } />
                    <ListElement type={ 'income' } category={ 'Comida fuera' } value={ 33 } date={ '23 / 07 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Luz' } value={ 16.32 } date={ '22 / 07 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Gas' } value={ 41.58 } date={ '19 / 07 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Wifi' } value={ 31 } date={ '19 / 07 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Agua' } value={ 14.16 } date={ '17 / 06 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Alquiler' } value={ 1129 } date={ '16 / 06 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Otros' } value={ 5.65 } date={ '16 / 06 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Supermercado' } value={ 0.6 } date={ '16 / 06 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Supermercado' } value={ 25.21 } date={ '15 / 06 / 2026' } />
                    <ListElement type={ 'expense' } category={ 'Transporte' } value={ 10.5 } date={ '15 / 06 / 2026' } />
                </ScrollView>
            </View>

            <TypeButtons/>
            <ThemedButton label='Delete' type='delete'/>
        </View>
    );
}

const styles = StyleSheet.create({
    testing: {
        width: '100%',
        alignItems: 'center',
    },

    welcome: {
        fontSize: 20,
    },

    listElements: {
        width: '100%',
        height: 350,
        marginTop: 20,
        marginBottom: 20,
    },
});
