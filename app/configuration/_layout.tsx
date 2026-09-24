import { View } from 'react-native';
import { Slot, usePathname  } from 'expo-router';

import { Colors } from '@constants/colors';

import Header from '@components/layout/header';

const ConfigurationLayout = () => {
    const pathname = usePathname();

    const getTitle = () => {
        switch (pathname) {
            case '/configuration/account/information':
                return 'Information of the account';
            case '/configuration/account/change_account':
                return 'Change account';
            case '/configuration/application':
                return 'Information of the application';
            case '/configuration/data/categories':
                return 'Categories';
            case '/configuration/data/import_data':
                return 'Import data';
            default:
                return 'Configuration';
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <Header title={ getTitle() } />
            <Slot />
        </View>
    );
};

export default ConfigurationLayout;