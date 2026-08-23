import { StyleSheet, View, FlatList } from 'react-native';

import { Values } from '@constants/values';

import BalanceResume from '@components/data/balance-resume';
import ListElement from '@components/data/list-element';

type Item = {
    type: 'expense' | 'income';
    category: string;
    value: number;
    date: string;
}

const DataList = () => {
    const items: Item[] = [
        { type: 'expense', category: 'Juegos', value: 12.75, date: '31 / 07 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '30 / 07 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '29 / 07 / 2026' },
        { type: 'income', category: 'Nómina', value: 12.75, date: '28 / 07 / 2026' },
        { type: 'expense', category: 'Otros', value: 12.75, date: '27 / 07 / 2026' },
        { type: 'expense', category: 'Deporte', value: 12.75, date: '26 / 07 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '25 / 07 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '24 / 07 / 2026' },
        { type: 'expense', category: 'Ropa', value: 12.75, date: '23 / 07 / 2026' },
        { type: 'expense', category: 'Gas', value: 12.75, date: '22 / 07 / 2026' },
        { type: 'expense', category: 'Luz', value: 12.75, date: '21 / 07 / 2026' },
        { type: 'expense', category: 'Wifi', value: 12.75, date: '20 / 07 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '19 / 07 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '18 / 07 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '17 / 07 / 2026' },
        { type: 'expense', category: 'Otros', value: 12.75, date: '16 / 07 / 2026' },
        { type: 'expense', category: 'Agua', value: 12.75, date: '15 / 07 / 2026' },
        { type: 'expense', category: 'Transporte', value: 12.75, date: '14 / 07 / 2026' },
        { type: 'income', category: 'Otros', value: 12.75, date: '13 / 07 / 2026' },
        { type: 'income', category: 'Otros', value: 12.75, date: '12 / 07 / 2026' },
        { type: 'expense', category: 'Electrónica', value: 12.75, date: '11 / 07 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '10 / 07 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '09 / 07 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '08 / 07 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '07 / 07 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '06 / 07 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '05 / 07 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '04 / 07 / 2026' },
        { type: 'expense', category: 'Ropa', value: 12.75, date: '03 / 07 / 2026' },
        { type: 'expense', category: 'Alquiler', value: 12.75, date: '02 / 07 / 2026' },
        { type: 'expense', category: 'Ropa', value: 12.75, date: '01 / 07 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '30 / 06 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '29 / 06 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '28 / 06 / 2026' },
        { type: 'income', category: 'Otros', value: 12.75, date: '27 / 06 / 2026' },
        { type: 'expense', category: 'Deporte', value: 12.75, date: '26 / 06 / 2026' },
        { type: 'expense', category: 'Otros', value: 12.75, date: '25 / 06 / 2026' },
        { type: 'expense', category: 'Otros', value: 12.75, date: '24 / 06 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '23 / 06 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '22 / 06 / 2026' },
        { type: 'expense', category: 'Luz', value: 12.75, date: '21 / 06 / 2026' },
        { type: 'expense', category: 'Wifi', value: 12.75, date: '20 / 06 / 2026' },
        { type: 'expense', category: 'Farmacia', value: 12.75, date: '19 / 06 / 2026' },
        { type: 'expense', category: 'Electrónica', value: 12.75, date: '18 / 06 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '17 / 06 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '16 / 06 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '15 / 06 / 2026' },
        { type: 'expense', category: 'Transporte', value: 12.75, date: '14 / 06 / 2026' },
        { type: 'expense', category: 'Comida', value: 12.75, date: '13 / 06 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '12 / 06 / 2026' },
        { type: 'income', category: 'Nómina', value: 12.75, date: '11 / 06 / 2026' },
        { type: 'expense', category: 'Ocio', value: 12.75, date: '10 / 06 / 2026' },
        { type: 'expense', category: 'Servicios', value: 12.75, date: '09 / 06 / 2026' },
    ];

    return (
        <View style={ styles.container }>
            <BalanceResume incomes={ 12000.58 } expenses={ 5000.36 } squareEnable={ false } />

            <View style={ styles.listElements }>
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.category + String(item.value) + item.date}
                    renderItem={({ item }) => <ListElement type={ item.type } category={ item.category } value={ item.value } date={ item.date } />}
                />
            </View>
        </View>
    );
};

export default DataList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Values.topNotHeader,
        width: '100%',
        paddingBottom: 125
    },

    listElements: {
        marginTop: 15,
        paddingBottom: 50,
    },
});
