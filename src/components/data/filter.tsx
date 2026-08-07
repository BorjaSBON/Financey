import { StyleSheet, View } from 'react-native';

import Input from '@components/common/input';

import { Colors } from '@constants/colors';

export default function Filter() {
    return (
        <View style={ styles.filter }>
            <Input title='Order by' type='select' value='Date (New to Old)' />
            <Input title='Type' placeholder='Type' type='text' />
            <Input title='Category' placeholder='Category' type='text' />
            <Input title='Amount' placeholder='000.0' type='number' />
            <Input title='Date' placeholder='DD / MM / YYYY' type='date' />
        </View>
    );
}

const styles = StyleSheet.create({
    filter: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 15,
        top: 100,
        width: '100%',
        paddingTop: 25,
        paddingBottom: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 2,
        
        shadowColor: Colors.shadow,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});
