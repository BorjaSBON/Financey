import { useCallback, useEffect, useState } from 'react';

import { profilesRepository } from '../db/repositories/profile.respository';

import type { LastActionProfile, Profile, UsernameProfile } from '../types/profile';

export function useProfiles() {
    // Profiles information
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);

    // Loading and error states
    const [loadingProfiles, setLoading] = useState(true);
    const [errorProfiles, setError] = useState<Error | null>(null);

    // GET ALL PROFILES
    const getProfiles = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get all the profiles
            const data = await profilesRepository.getAll();
            setProfiles(data);

            // Return the profiles
            return data;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining profiles');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // GET ACTIVE PROFILE
    const getProfile = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the profile
            const data = await profilesRepository.get();
            setProfile(data);

            // Return the profile
            return data;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining a profile');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // GET PROFILE BY ID
    const getProfileById = useCallback(async (id: number) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the profile by ID
            const data = await profilesRepository.getById(id);

            // Return the profile
            return data;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining a profile');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // CREATE
    const UsernameProfile = useCallback(async (data: UsernameProfile) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Create the profile
            await profilesRepository.create(data);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error creating a profile');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // MODIFY LAST ACTION
    // MODIFY
    const modifyProfileLastAction = useCallback(async (data: LastActionProfile) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Modify the last action
            await profilesRepository.modifyLastAction(data);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error modifying last action');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // MODIFY USERNAME
    const modifyProfileUsername = useCallback(async (data: UsernameProfile) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Modify the username
            await profilesRepository.modifyUsername(data);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error modifying username');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // MODIFY DATA ADDED
    const modifyProfileDataAdded = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Modify the data added
            await profilesRepository.modifyDataAdded();
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error modifying added data');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // MODIFY DATA MODIFIED
    const modifyProfileDataModified = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Modify the data modified
            await profilesRepository.modifyDataModified();
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error modifying modified data');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // MODIFY DATA DELETED
    const modifyProfileDataDeleted = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Modify the data deleted
            await profilesRepository.modifyDataDeleted();
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error modifying deleted data');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // REMOVE
    const removeProfile = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Remove the profile
            await profilesRepository.remove();
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error removing a profile');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // LOGIN
    const loginById = useCallback(async (id:number) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Login
            await profilesRepository.loginById(id);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error login a profile');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // LOGOUT
    const logout = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Logout
            await profilesRepository.logout();
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error logout a profile');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    useEffect(() => {
        getProfile();
    }, [getProfile]);

    return {
        profiles,
        profile,

        loadingProfiles,
        errorProfiles,

        getProfiles,
        getProfile,
        UsernameProfile,

        modifyProfileLastAction,
        modifyProfileUsername,
        modifyProfileDataAdded,
        modifyProfileDataModified,
        modifyProfileDataDeleted,
        
        removeProfile,
        loginById,
        logout,
    };
}
