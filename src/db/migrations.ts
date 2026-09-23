import { dbPromise } from './database';

export async function initializeDatabase() {
    const db = await dbPromise;

    // DROP TABLE IF EXISTS categories;
    // DROP TABLE IF EXISTS profile;

    // INSERT INTO profile (username, creation_date, last_action_date, data_added, data_modified, data_deleted)
    // VALUES ('Borchax', '19/09/2026', '19/09/2026', 0, 0, 0);

    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            creation_date TEXT NOT NULL,
            last_action_date TEXT NOT NULL,
            last_action TEXT NOT NULL,
            number_actions INTEGER NOT NULL,
            number_transactions INTEGER NOT NULL,
            number_transactions_added INTEGER NOT NULL,
            number_transactions_modified INTEGER NOT NULL,
            number_transactions_deleted INTEGER NOT NULL,
            active INTEGER NOT NULL DEFAULT 1
        );

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
