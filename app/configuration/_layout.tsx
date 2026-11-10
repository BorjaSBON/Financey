import { View, StyleSheet } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Values } from '@constants/values';

import { ThemeColors } from '@theme/colors';
import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import Header from '@components/layout/header';

import '@language/locales/calendar-locale';

const ConfigurationLayout = () => {
    // Theme
    const { colors } = useTheme();
    const styles = createStyles(colors);

    // Traductions
    const { languages } = useLanguage();

    // Navigation
    const pathname = usePathname();

    const getTitle = () => {
        if (/^\/configuration\/data\/categories\/modify\/\d+$/.test(pathname)) {
            return languages['modifyCategory'];
        }

        switch (pathname) {
            case '/configuration/account/information':
                return languages['informationAccount'];
            case '/configuration/account/change_account':
                return languages['changeAccount'];
            case '/configuration/application':
                return languages['informationApp'];
            case '/configuration/data/categories':
                return languages['categories'];
            case '/configuration/data/categories/add':
                return languages['addCategory'];
            case '/configuration/data/import_data':
                return languages['importData'];
            case '/configuration/data/export_data':
                return languages['exportData'];
            default:
                return languages['configuration'];
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
            <View style={ styles.container }>
                <Header title={ getTitle() } />

                <View style={ styles.slot }>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: { backgroundColor: 'transparent', padding: 0, margin: 0 },
                            animation: 'fade',
                            gestureEnabled: true,
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ConfigurationLayout;

const createStyles = (colors: ThemeColors) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.backgroundPrimary,
            top: Values.topHeader,
            paddingBottom: Values.paddingBottom,
        },

        slot: {
            flex: 1,
            top: 40,
        },
    }
);