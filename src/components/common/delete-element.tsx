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

    return (
        <View style={[ 
            styles.container,
            active ? { display: 'flex' } : { display: 'none' },
        ]}>
            <View style={ styles.popup }>
                <ThemedText style={ styles.message } weight='regular'>{ title }</ThemedText>

                <View style={ styles.buttons }>
                    <ThemedButton label={ titleButton in languages ? languages[titleButton as keyof typeof languages] : languages['name']} type='delete' onPress={ deleteAction } />
                    <ThemedButton label={ languages['cancel'] } type='default' onPress={ cancelAction } />
                </View>
            </View>
        </View>
    );
}

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: colors.popupBackground,
        },

        popup: {
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 20,
            width: '100%',
            paddingTop: 25,
            paddingBottom: 55,
            paddingHorizontal: 30,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            elevation: 10,
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
            fontSize: 13,
        },

        buttons: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 10,
            marginHorizontal: 'auto',
        },
    }
);
