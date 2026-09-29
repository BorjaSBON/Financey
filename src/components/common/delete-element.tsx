import { StyleSheet, View } from 'react-native';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

interface Props {
    // Variables
    active?: boolean;
    title?: string;
    titleButton?: string;

    // Methods
    deleteAction?: () => void;
    cancelAction?: () => void;
}

export default function DeleteElement({ active=false, title='', titleButton='Delete', deleteAction, cancelAction }: Props) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={[ 
            styles.popup,
            active ? { display: 'flex' } : { display: 'none' }
        ]}>
            <ThemedText style={ styles.message } weight='light'>{ title }</ThemedText>

            <View style={ styles.buttons }>
                <ThemedButton label={ titleButton } type='delete' onPress={ deleteAction } />
                <ThemedButton label='Cancel' type='default' onPress={ cancelAction } />
            </View>
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
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
            backgroundColor: colors.backgroundSecondary,
            
            shadowColor: colors.popupShadow,
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
    }
);
