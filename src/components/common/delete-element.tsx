import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

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

export default function DeleteElement({ active=false, title='', titleButton='delete', deleteAction, cancelAction }: Props) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);
    
    // Traductions
    const { languages } = useLanguage();

    // Calculate the position of the container
    const [containerHeight, setContainerHeight] = useState(0);

    return (
        <View style={[ 
            styles.popup,
            active ? { display: 'flex' } : { display: 'none' },
            { bottom: (containerHeight - 60) / 2 }
        ]} onLayout={(event) => { setContainerHeight(event.nativeEvent.layout.height); }}>
            <ThemedText style={ styles.message } weight='light'>{ title }</ThemedText>

            <View style={ styles.buttons }>
                <ThemedButton label={ titleButton in languages ? languages[titleButton as keyof typeof languages] : languages['name']} type='delete' onPress={ deleteAction } />
                <ThemedButton label={ languages['cancel'] } type='default' onPress={ cancelAction } />
            </View>
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        popup: {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 15,
            width: '100%',
            paddingTop: 25,
            paddingBottom: 55,
            paddingHorizontal: 30,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 2,
            backgroundColor: colors.backgroundSecondary,
            
            shadowColor: colors.popupShadow,
            shadowOffset: {
                width: 5,
                height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },

        message: {
            textAlign: 'center',
            fontSize: 12,
        },

        buttons: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 10,
            marginHorizontal: 'auto',
        },
    }
);
