import { StyleSheet, View } from 'react-native';

import { Colors } from '@constants/colors';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedButton } from '@ui/themed-button';

interface Props {
    // Variables
    active?: boolean;
    title?: string;
    value?: string;
    placeholder?: string;

    // Methods
    modifyAction?: () => void;
    cancelAction?: () => void;
    onChange?: (value:string) => void;
}

export default function ModifyElement({ active=false, title='Modify element', value='', placeholder='Element name', modifyAction, cancelAction, onChange }: Props) {
    return (
        <View style={[ 
            styles.popup,
            active ? { display: 'flex' } : { display: 'none' }
        ]}>
            <ThemedText style={ styles.message } weight='light'>{ title }</ThemedText>
            <ThemedInput value={ value } placeholder={ placeholder } type='text' onChange={ onChange } />

            <View style={ styles.buttons }>
                <ThemedButton label='Change' type='default' onPress={ modifyAction } />
                <ThemedButton label='Cancel' type='default' onPress={ cancelAction } />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    popup: {
        position: 'absolute',
        bottom: 90,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 15,
        width: '100%',
        paddingTop: 25,
        paddingBottom: 35,
        paddingHorizontal: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 2,
        backgroundColor: Colors.backgroundPrimary,
        
        shadowColor: Colors.shadow,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    message: {
        textAlign: 'center',
    },

    buttons: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 7,
        marginHorizontal: 'auto',
    },
});
