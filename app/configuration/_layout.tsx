import { Fragment } from 'react';
import { Slot, usePathname  } from 'expo-router';

import Header from '@components/layout/header';

const ConfigurationLayout = () => {
    const pathname = usePathname();

    const getTitle = () => {
        switch (pathname) {
            case '/configuration/account':
                return 'Information of the account';
            case '/configuration/application':
                return 'Information of the application';
            case '/configuration/data/categories':
                return 'Categories';
            case '/configuration/data/import':
                return 'Import data';
            default:
                return 'Configuration';
        }
    };

    return (
        <Fragment>
            <Header title={ getTitle() } />
            <Slot />
        </Fragment>
    );
};

export default ConfigurationLayout;