import { dbPromise } from './database';

export async function initializeDatabase() {
    const db = await dbPromise;

    // DROP TABLE IF EXISTS categories;

    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            type TEXT NOT NULL CHECK (type IN ('income', 'expense'))
        );

        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
            amount INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,

            FOREIGN KEY (category_id)
                REFERENCES categories(id)
        );

        CREATE INDEX IF NOT EXISTS idx_transactions_date
            ON transactions(date);

        CREATE INDEX IF NOT EXISTS idx_transactions_category
            ON transactions(category_id);

        CREATE INDEX IF NOT EXISTS idx_transactions_type
            ON transactions(type);
    `);

    const columns = await db.getAllAsync<{
        name: string;
    }>(`PRAGMA table_info(categories)`);

    const hasType = columns.some(
        (column) => column.name === 'type'
    );

    if (!hasType) {
        await db.execAsync(`
            ALTER TABLE categories
            ADD COLUMN type TEXT NOT NULL DEFAULT 'expense';
        `);
    }
}
