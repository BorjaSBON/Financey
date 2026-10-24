import { StyleSheet, View } from 'react-native';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';
import { ThemedInput } from '@ui/themed-input';
import { ThemedButton } from '@ui/themed-button';

interface Props {
    // Variables
    active?: boolean;
    title?: string;
    titleButton?: string;
    value?: string;
    placeholder?: string;
    error?: string | null;

    // Methods
    modifyAction?: () => void;
    cancelAction?: () => void;
    onChange?: (value:string) => void;
}

export default function ModifyElement({ active=false, title='Modify element', titleButton='change', value='', placeholder='Element name', error, modifyAction, cancelAction, onChange }: Props) {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    return (
        <View style={[ 
            styles.container,
            active ? { display: 'flex' } : { display: 'none' }
        ]}>
            <View style={ styles.popup }>
                <ThemedText style={ styles.message } weight='regular'>{ title }</ThemedText>
                <ThemedInput value={ value } placeholder={ placeholder } type='text' onChange={ onChange } />
                { error && <ThemedText weight='light' style={ styles.error }>{ error }</ThemedText> }

                <View style={ styles.buttons }>
                    <ThemedButton label={ titleButton in languages ? languages[titleButton as keyof typeof languages] : languages['name']} type='default' onPress={ modifyAction } />
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
            rowGap: 10,
            marginHorizontal: 'auto',
            paddingTop: 5,
        },
        
        error: {
            textAlign: 'center',
            fontSize: 12,
            color: colors.negative,
        },
    }
);
