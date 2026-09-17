import { dbPromise } from './database';

type Category = {
    name: string;
    type: string;
};

export async function seedDatabase() {
    // Get the database connection
    const db = await dbPromise;
    
    // Get the categories from the JSON file
    const categories:Category[] = require('@/docs/categories.json');

    for (const category of categories) {
        await db.runAsync(
            `
                INSERT OR IGNORE INTO categories (name, type)
                VALUES (?, ?)
            `,
            category.name,
            category.type
        );
    }
}