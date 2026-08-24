import { StyleSheet, View } from 'react-native';

import { Values } from '@constants/values';

import { ThemedText } from '@ui/themed-text';

const DataCharts = () => {
    return (
        <View style={ styles.container }>
            <ThemedText>Charts</ThemedText>
        </View>
    );
};

export default DataCharts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Values.topNotHeader,
        width: '100%',
        paddingBottom: 125,
    },
});
