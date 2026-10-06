import { View } from 'react-native';
import { Slot, usePathname } from 'expo-router';

import { useTheme } from '@theme/useTheme';

import Header from '@components/layout/header';

const ConfigurationLayout = () => {
    // Theme
    const { colors } = useTheme();

    // Navigation
    const pathname = usePathname();

    const getTitle = () => {
        if (/^\/configuration\/data\/categories\/\d+$/.test(pathname)) {
            return 'Modify category';
        }

        switch (pathname) {
            case '/configuration/account/information':
                return 'Information of the account';
            case '/configuration/account/change_account':
                return 'Change account';
            case '/configuration/application':
                return 'Information of the application';
            case '/configuration/data/categories':
                return 'Categories';
            case '/configuration/data/categories/create':
                return 'Create category';
            case '/configuration/data/import_data':
                return 'Import data';
            default:
                return 'Configuration';
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