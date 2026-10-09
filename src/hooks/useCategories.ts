import { useCallback, useEffect, useState } from 'react';

import { categoriesRepository } from '../db/repositories/category.respository';

import type {
    Category,
    CreateCategory,
    UpdateCategory,
} from '../types/category';

export function useCategories() {
    // Categories information
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<Category>();

    // Loading and error states
    const [loadingCategories, setLoading] = useState(true);
    const [errorCategories, setError] = useState<Error | null>(null);

    // GET ALL CATEGORIES
    const getCategories = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the categories
            const data = await categoriesRepository.getAll();
            setCategories(data);

            // Return the categories
            return data;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obteniendo categorías');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // GET TRANSACTION BY ID
    const getCategory = useCallback(async (id: number) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the categories
            const data = await categoriesRepository.getById(id);
            setCategory(data);

            // Return the category
            return data;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining a category');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // CREATE
    const createCategory = useCallback(async (data: CreateCategory) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Create the category
            await categoriesRepository.create(data);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error creating a category');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, [getCategories]);

    // MODIFY
    const modifyCategory = useCallback(async (data: UpdateCategory) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Modify the category
            await categoriesRepository.modify(data);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error modifying a category');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, [getCategories]);

    // REMOVE ALL
    const removeAllCategories = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Remove all categories
            await categoriesRepository.removeAll();
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error removing all categories');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, [getCategories]);

    // REMOVE
    const removeCategory = useCallback(async (id: number) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Remove the category
            await categoriesRepository.remove(id);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error removing a category');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, [getCategories]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return {
        categories,
        category,

        loadingCategories,
        errorCategories,

        getCategories,
        getCategory,
        createCategory,
        modifyCategory,
        removeAllCategories,
        removeCategory
    };
}
