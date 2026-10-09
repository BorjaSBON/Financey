import { dbPromise } from '../database';

import type {
    Category,
    CreateCategory,
    UpdateCategory,
} from '../../types/category';

function mapCategory(row: any): Category {
    return {
        id: row.id,
        name: row.name,
        type: row.type,
        profileId: row.profile_id,
    };
}

// Get all categories
export async function getAll(): Promise<Category[]> {
    const db = await dbPromise;

    const rows = await db.getAllAsync(`
        SELECT c.id AS id, c.name AS name, c.type AS type, c.profile_id AS profile_id
        FROM categories c
        INNER JOIN profiles p
            ON p.id = c.profile_id
        WHERE p.active = 1
        ORDER BY name ASC
    `);

    return rows.map(mapCategory);
}

// Get a category by ID
export async function getById(id: number): Promise<Category> {
    const db = await dbPromise;

    const row = await db.getFirstAsync(
        `
            SELECT *
            FROM categories
            WHERE id = ?
        `,
        id
    );

    return mapCategory(row);
}

// Create a new category
export async function create(category: CreateCategory): Promise<number> {
    try {
        const db = await dbPromise;

        // Get the active profile
        const profile = await db.getFirstAsync<{ id: number }>(
            `
                SELECT id
                FROM profiles
                WHERE active = 1
                LIMIT 1
            `
        );

        if (!profile) {
            throw new Error('There is no active profile');
        }

        // Check if the category name is unique for the active profile
        const existingCategory = await db.getFirstAsync<{ id: number }>(
            `
                SELECT id
                FROM categories
                WHERE profile_id = ?
                    AND name = ?
                    AND type = ?
                LIMIT 1
            `,
            profile.id,
            category.name,
            category.type
        );

        if (existingCategory) {
            throw new Error('The category name must be unique');
        }

        // Insert the category
        const result = await db.runAsync(
            `
                INSERT INTO categories (name, type, profile_id)
                VALUES (?, ?, ?)
            `,
            category.name,
            category.type,
            profile.id
        );

        return result.lastInsertRowId;
    } catch (err) {
        throw new Error('The category name must be unique');
    }
}

// Modify an existing category
export async function modify(category: UpdateCategory): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            UPDATE categories
            SET name = ?, type = ?
            WHERE id = ?
        `,
        category.name,
        category.type,
        category.id
    );
}

// Delete a category by ID
export async function removeAll(): Promise<void> {
    const db = await dbPromise;

    // Delete all categories for the active profile
    await db.runAsync(
        `
            DELETE FROM categories
            WHERE profile_id IN (
                SELECT id
                FROM profiles
                WHERE active = 1
                LIMIT 1
            )
        `,
    );
}

// Delete a category by ID
export async function remove(id: number): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            DELETE FROM categories
            WHERE id = ?
        `,
        id
    );
}

// Export the repository functions
export const categoriesRepository = {
    getAll,
    getById,
    create,
    modify,
    removeAll,
    remove,
};
