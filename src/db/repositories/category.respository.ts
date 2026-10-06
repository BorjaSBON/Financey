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
    };
}

// Get all categories
export async function getAll(): Promise<Category[]> {
    const db = await dbPromise;

    const rows = await db.getAllAsync(`
        SELECT *
        FROM categories
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

        const result = await db.runAsync(
            `
                INSERT INTO categories (name, type)
                VALUES (?, ?)
            `,
            category.name,
            category.type
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
    remove,
};
