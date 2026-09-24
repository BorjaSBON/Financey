import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Values } from '@constants/values';
import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import Input from '@components/common/input';

const Categories = () => {
    // File selection
    const [selectFile, setSelectFile] = useState('');

    return (
        <View style={ styles.container }>
            <ScrollView>
                <Input name='Category' type='text' value={ selectFile } placeholder='Select file' onChangeText={ setSelectFile } />
                <View style={ styles.import }>
                    <ThemedButton label='Import' type='default' />
                </View>
            </ScrollView>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: Values.topIfHeader,
        width: '100%',
        marginTop: 10,
    },
        
    import: {
        marginTop: 25,
        marginHorizontal: 'auto',
    },
});
