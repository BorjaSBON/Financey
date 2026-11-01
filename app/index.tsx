import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useProfiles } from '@/src/hooks/useProfiles';
import { Profile } from '@/src/types/profile';

const App = () => {
    // Database
    const { getProfile } = useProfiles();

    const [profile, setProfile] = useState<Profile | null>(null);
    const [initializing, setInitializing] = useState(true);

    // Wait to the profile to be loaded
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const activeProfile = await getProfile();
                setProfile(activeProfile);
            } catch (error) {
                console.error('Error loading profile:', error);
            } finally {
                setInitializing(false);
            }
        };

        loadProfile();
    }, [getProfile]);

    // Check if the profiles are loaded
    if (initializing) {
        return <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}><ActivityIndicator /></SafeAreaView>;
    }

    return profile ? <Redirect href='/home' /> : <Redirect href='/login' />;
};

export default App;