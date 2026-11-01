import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import Input from '@components/common/input';

const Categories = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // File selection
    const [selectFile, setSelectFile] = useState('');

    return (
        <View style={{ height: '100%', width: '100%' }}>
            <View style={ styles.container }>
                <ScrollView>
                    <Input name='Category' type='text' value={ selectFile } placeholder='Select file' onChangeText={ setSelectFile } />
                    <View style={ styles.import }>
                        <ThemedButton label='Import' type='default' />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Categories;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
        },
            
        import: {
            marginTop: 25,
            marginHorizontal: 'auto',
        },
    }
);
