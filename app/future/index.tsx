import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import { ThemedText } from '@ui/themed-text';
import { ThemedButton } from '@ui/themed-button';

import { HelpIcon } from '@icons/help';

const UnderConstruction = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    const { information01 } = useLocalSearchParams<{ information01: string }>();
    const { information02 } = useLocalSearchParams<{ information02: string }>();

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={ styles.sections }>
                    <ThemedText weight='semiBold' style={ styles.title }>{ languages['futureTitle'] }</ThemedText>

                    <View style={ styles.elements }>
                        <View style={ styles.element }>
                            <Pressable 
                                style={({ pressed }) => [
                                    styles.pressable,
                                    pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
                                ]}
                            >
                                <HelpIcon size={ 18 } backgroundColor={ colors.iconBackground } iconColor={colors.iconColor} />
                                <ThemedText style={ styles.elementText } weight='regular'>{ languages['futureInformation'] }</ThemedText>
                            </Pressable>
                        </View>

                        { information01 && 
                            <View style={ styles.element }>
                                <Pressable 
                                    style={({ pressed }) => [
                                        styles.pressable,
                                        pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
                                    ]}
                                >
                                    <HelpIcon size={ 18 } backgroundColor={ colors.iconBackground } iconColor={colors.iconColor} />
                                    <ThemedText style={ styles.elementText } weight='regular'>{ information01 }</ThemedText>
                                </Pressable>
                            </View>
                        }

                        { information02 && 
                            <View style={ styles.element }>
                                <Pressable 
                                    style={({ pressed }) => [
                                        styles.pressable,
                                        pressed ? { backgroundColor: colors.hoverElement } : { backgroundColor: 'transparent' },
                                    ]}
                                >
                                    <HelpIcon size={ 18 } backgroundColor={ colors.iconBackground } iconColor={colors.iconColor} />
                                    <ThemedText style={ styles.elementText } weight='regular'>{ information02 }</ThemedText>
                                </Pressable>
                            </View>
                        }
                    </View>

                    <View style={ styles.button }>
                        <ThemedButton label={ languages['goBack'] } type='default' onPress={ () => { router.back() } }/>
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
            display: 'flex',
            flexDirection: 'column',
            rowGap: 10,
        },

        element: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 10,
            overflow: 'hidden',
        },

        pressable: {
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