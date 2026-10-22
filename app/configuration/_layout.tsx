import { View } from 'react-native';
import { Slot, usePathname } from 'expo-router';

import { useTheme } from '@theme/useTheme';
import { useLanguage } from '@language/useLanguage';

import Header from '@components/layout/header';

const ConfigurationLayout = () => {
    // Theme
    const { colors } = useTheme();

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
        <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
            <Header title={ getTitle() } />
            <Slot />
        </View>
    );
};

export default ConfigurationLayout;