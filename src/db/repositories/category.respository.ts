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
export async function getById(id: number): Promise<Category | null> {
    const db = await dbPromise;

    const row = await db.getFirstAsync(
        `
            SELECT *
            FROM categories
            WHERE id = ?
        `,
        id
    );

    return row ? mapCategory(row) : null;
}

// Create a new category
export async function create(category: CreateCategory): Promise<number> {
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
}

// Modify an existing category
export async function modify(id: number, category: UpdateCategory): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            UPDATE categories
            SET name = ?
            WHERE id = ?
        `,
        category.name,
        id
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
