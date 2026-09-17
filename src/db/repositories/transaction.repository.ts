import { dbPromise } from '../database';

import type {
    Transaction,
    CreateTransaction,
    UpdateTransaction,
} from '../../types/transaction';

function mapTransaction(row: any): Transaction {
    return {
        id: row.id,
        type: row.type,
        amount: row.amount,
        categoryId: row.category_id,
        categoryName: row.category_name,
        date: row.date,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

// Get all transactions
export async function getAll(): Promise<Transaction[]> {
    const db = await dbPromise;

    const rows = await db.getAllAsync(`
        SELECT
            t.id,
            t.type,
            t.amount,
            t.category_id,
            c.name AS category_name,
            t.date,
            t.created_at,
            t.updated_at
        FROM transactions t
        INNER JOIN categories c
            ON c.id = t.category_id
        ORDER BY t.date DESC, t.id DESC
    `);

    console.log(rows);

    return rows.map((row: any) => ({
        id: row.id,
        type: row.type,
        amount: row.amount,
        categoryId: row.category_id,
        categoryName: row.category_name,
        date: row.date,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    }));
}

// Get a transaction by ID
export async function getById(id: number): Promise<Transaction | null> {
    const db = await dbPromise;

    const row = await db.getFirstAsync(
        `
            SELECT *
            FROM transactions
            WHERE id = ?
        `,
        id
    );

    return row ? mapTransaction(row) : null;
}

// Create a new transaction
export async function create(transaction: CreateTransaction): Promise<number> {
    const db = await dbPromise;

    const now = new Date().toISOString();

    const result = await db.runAsync(
        `
            INSERT INTO transactions (
                type,
                amount,
                category_id,
                date,
                created_at,
                updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `,
        transaction.type,
        transaction.amount,
        transaction.categoryId,
        transaction.date,
        now,
        now
    );

    return result.lastInsertRowId;
}

// Modify a transaction by ID
export async function modify(id: number, transaction: UpdateTransaction): Promise<void> {
    const db = await dbPromise;

    const now = new Date().toISOString();

    await db.runAsync(
        `
            UPDATE transactions
            SET
                type = ?,
                amount = ?,
                category_id = ?,
                date = ?,
                updated_at = ?
            WHERE id = ?
        `,
        transaction.type,
        transaction.amount,
        transaction.categoryId,
        transaction.date,
        now,
        id
    );
}

// Delete a transaction by ID
export async function remove(id: number): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            DELETE FROM transactions
            WHERE id = ?
        `,
        id
    );
}

// Get the balance for a given date range
export async function getBalance(from: string, to: string): Promise<number> {
    const db = await dbPromise;

    const row = await db.getFirstAsync<{ balance: number }>(
        `
            SELECT
                COALESCE(
                    SUM(
                        CASE
                            WHEN type = 'income' THEN amount
                            WHEN type = 'expense' THEN -amount
                        END
                    ),
                    0
                ) AS balance
            FROM transactions
            WHERE date >= ?
                AND date <= ?
        `,
        from,
        to
    );

    return row?.balance ?? 0;
}

// Export the repository functions
export const transactionsRepository = {
    getAll,
    getBalance,
    create,
    modify,
    remove,
};
