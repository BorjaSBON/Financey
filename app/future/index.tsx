import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import { HelpIcon } from '@icons/help';

const UnderConstruction = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.sections }>
                    <ThemedText weight='medium' style={ styles.title }>Under Construction</ThemedText>

                    <View style={ styles.elements }>
                        <Pressable 
                            style={({ pressed }) => [
                                styles.element,
                                pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
                            ]}
                        >
                            <HelpIcon size={ 18 } backgroundColor={ colors.iconBackground } iconColor={colors.iconColor} />
                            <ThemedText style={ styles.elementText } weight='light'>This feature will be included in future updates</ThemedText>
                        </Pressable>
                    </View>

                    <View style={ styles.button }>
                        <ThemedButton label='Go back' type='default' onPress={ () => { router.back() } }/>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default UnderConstruction;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            top: Values.topNotHeader,
            width: '100%',
            paddingBottom: 100,
        },

        sections: {
            display: 'flex',
            flexDirection: 'column',
            rowGap: 30,
            paddingHorizontal: Values.paddingApp,
        },

        title: {
            fontSize: 24,
            textAlign: 'center',
            width: 200,
            marginHorizontal: 'auto'
        },

        elements: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
        },

        element: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            minHeight: 30,
            paddingVertical: 2,
            paddingHorizontal: 10,
            columnGap: 10,
        },

        elementText: {
            fontSize: 11,
        },

        actionIcon: {
            transform: [{ scale: 0.6 }]
        },

        button: {
            marginHorizontal: 'auto',
        },
    }
);