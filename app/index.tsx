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

    return profile ? <Redirect href='/home' /> : <Redirect href='/home/login' />;
};

export default App;