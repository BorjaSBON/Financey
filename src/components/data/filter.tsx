import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedSelectInput } from '@ui/themed-select-input';

import Input from '@components/common/input';

import { Colors } from '@constants/colors';
import { Values } from '@constants/values';

export default function Filter() {
    const [selectValue, setSelectValue] = useState('date_new');
    const dropDownList = [
        {
            label: 'Date (New to Old)',
            value: 'date_new',
        },
        {
            label: 'Date (Old to New)',
            value: 'date_old',
        },
        {
            label: 'Amount (Higher to Lower)',
            value: 'amount_higher',
        },
        {
            label: 'Amount (Lower to Higher)',
            value: 'amount_lower',
        },
    ]

    return (
        <View style={ styles.filter }>
            <View style={ styles.input }>
                <ThemedText style={ styles.title } weight='regular'>Order by</ThemedText>
                <ThemedSelectInput data={ dropDownList } value={ selectValue } onSelect={(item) => { setSelectValue(item.value); }} />
            </View>

            <View style={ styles.input }>
                <ThemedText style={ styles.title } weight='regular'>Type</ThemedText>
                <ThemedInput type='text' placeholder='Type' value='' />
            </View>
            
            <View style={ styles.input }>
                <ThemedText style={ styles.title } weight='regular'>Category</ThemedText>
                <ThemedInput type='text' placeholder='Category' value='' />
            </View>

            <View style={ styles.input }>
                <ThemedText style={ styles.title } weight='regular'>Amount</ThemedText>
                <View style={ styles.pairButtons }>
                    <ThemedInput type='number' placeholder='000.0' value='' />
                    <ThemedInput type='number' placeholder='000.0' value='' />
                </View>
            </View>

            <View style={ styles.input }>
                <ThemedText style={ styles.title } weight='regular'>Date</ThemedText>
                <View style={ styles.pairButtons }>
                    <ThemedInput type='date' placeholder='DD/MM/YYYY' value='' />
                    <ThemedInput type='date' placeholder='DD/MM/YYYY' value='' />
                </View>
            </View>
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

    input: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 6,
        paddingHorizontal: Values.paddingApp,
        width: '100%',
    },

    title: {
        fontSize: 15,
    },

    pairButtons: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 8,
        position: 'relative',
        width: '49%',
    },
});
