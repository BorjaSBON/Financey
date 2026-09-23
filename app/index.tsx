import { ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';

import { useProfile } from '@/src/hooks/useProfile';

const App = () => {
    // Get the profiles and loading state
    const { profiles, loading } = useProfile();

    // If loading, return an empty view
    if (loading) {
        return <ActivityIndicator />;
    }

    // If there are no profiles, redirect to the login page
    if (profiles.some(profile => profile.active === 1)) {
        return <Redirect href='/home' />;
    }

    // If there are profiles, redirect to the home page
    return <Redirect href='/home/login' />;
};

export default App;