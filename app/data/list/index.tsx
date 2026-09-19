import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';

import BalanceResume from '@components/data/balance-resume';
import ListElement from '@components/data/list-element';
import { useTransactions } from '@/src/hooks/useTransactions';

type Item = {
    type: 'expense' | 'income';
    category: string;
    value: number;
    date: string;
}

const DataList = () => {
    const { transactions, loading } = useTransactions();

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View style={ styles.container }>
            <BalanceResume incomes={ 12000.58 } expenses={ 5000.36 } squareEnable={ false } />

            <View style={ styles.listElements }>
                <FlatList
                    data={ transactions }
                    keyExtractor={ (item) => item.id.toString() }
                    renderItem={({ item }) => <ListElement type={ item.type } category={ item.categoryName } value={ item.amount } date={ item.date } onPress={ () =>
                        router.push({
                            pathname: '/data/modify/[id]',
                            params: {
                                id: '1',
                            },
                        })
                    } />}
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
