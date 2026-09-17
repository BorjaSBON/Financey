import { useCallback, useEffect, useState } from 'react';

import { categoriesRepository } from '../db/repositories/category.respository';

import type {
    Category,
    CreateCategory,
    UpdateCategory,
} from '../types/category';

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Get the categories
            const data = await categoriesRepository.getAll();
            setCategories(data);

            // Return the categories
            return data;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error obteniendo categorías');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return {
        categories,

        loading,
        error,

        getCategories,
    };
}
