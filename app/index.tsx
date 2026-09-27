import { ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';

import { useProfiles } from '@/src/hooks/useProfiles';

const App = () => {
    // Database
    const { profile, loadingProfiles } = useProfiles();

    // Check if the profiles are loaded
    if (loadingProfiles) {
        return <ActivityIndicator />;
    }

    // If there are no profiles, redirect to the login page
    if (profile) {
        return <Redirect href='/home' />;
    }

    // If there are profiles, redirect to the home page
    return <Redirect href='/home/login' />;
};

export default App;