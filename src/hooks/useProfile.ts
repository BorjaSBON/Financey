import { useCallback, useEffect, useState } from 'react';

import { profilesRepository } from '../db/repositories/profile.respository';

import type {
    Profile,
    CreateProfile,
    UpdateProfileUsername,
    UpdateProfileDataAdded,
    UpdateProfileDataModified,
    UpdateProfileDataDeleted
} from '../types/profile';

export function useProfile() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // CONSULTAR TODAS
    const getProfiles = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Get the profile
            const data = await profilesRepository.getAll();
            setProfiles(data);

            // Return the profile
            return data;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error obteniendo perfiles');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // GET PROFILE BY ID
    const getProfileById = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);

            // Get the profile by ID
            const data = await profilesRepository.getById(id);
            setProfile(data);

            return data;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error obteniendo perfil');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // CREATE
    const createProfile = useCallback(async (data: CreateProfile) => {
        try {
            setLoading(true);
            setError(null);

            // Create the profile
            const id = await profilesRepository.create(data);

            // Return the ID of the created profile
            return id;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error creando perfil');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // MODIFICAR USERNAME
    const modifyProfileUsername = useCallback(async (id: number, data: UpdateProfileUsername) => {
        try {
            setLoading(true);
            setError(null);

        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error modificando nombre de usuario');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // MODIFICAR DATA ADDED
    const modifyProfileDataAdded = useCallback(async (id: number, data: UpdateProfileDataAdded) => {
        try {
            setLoading(true);
            setError(null);

        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error modificando datos agregados');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // MODIFICAR DATA MODIFIED
    const modifyProfileDataModified = useCallback(async (id: number, data: UpdateProfileDataModified) => {
        try {
            setLoading(true);
            setError(null);

        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error modificando datos modificados');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // MODIFICAR DATA DELETED
    const modifyProfileDataDeleted = useCallback(async (id: number, data: UpdateProfileDataDeleted) => {
        try {
            setLoading(true);
            setError(null);

        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error modificando datos eliminados');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // REMOVE
    const removeProfile = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);

        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error eliminando perfil');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    useEffect(() => {
        getProfileById(profile?.id || 1);
    }, [getProfileById]);

    return {
        profiles,
        profile,

        loading,
        error,

        getProfiles,
        getProfileById,
        createProfile,
        modifyProfileUsername,
        modifyProfileDataAdded,
        modifyProfileDataModified,
        modifyProfileDataDeleted,
        removeProfile
    };
}
