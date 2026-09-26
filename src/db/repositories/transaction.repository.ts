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
        profileId: row.profile_id,
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

    const rows = await db.getAllAsync(
        `
            SELECT
                t.id,
                t.type,
                t.amount,
                t.profile_id,
                t.category_id,
                c.name AS category_name,
                t.date,
                t.created_at,
                t.updated_at
            FROM transactions t
            INNER JOIN categories c
                ON c.id = t.category_id
            INNER JOIN profiles p
                ON p.id = t.profile_id
            WHERE p.active = 1
            ORDER BY t.date DESC, t.id DESC
        `,
    );

    return rows.map(mapTransaction);
}

// Get a transaction by ID
export async function getById(id: number): Promise<Transaction> {
    const db = await dbPromise;

    const row = await db.getFirstAsync(
        `
            SELECT
                t.id,
                t.type,
                t.amount,
                t.profile_id,
                t.category_id,
                c.name AS category_name,
                t.date,
                t.created_at,
                t.updated_at
            FROM transactions t
            INNER JOIN categories c
                ON c.id = t.category_id
            WHERE t.id = ?
        `,
        id
    );

    return mapTransaction(row);
}

// Create a new transaction
export async function create(transaction: CreateTransaction): Promise<number> {
    const db = await dbPromise;

    // Get the date of the action
    const now = new Date().toISOString();

    const result = await db.runAsync(
        `
            INSERT INTO transactions (
                type,
                amount,
                profile_id,
                category_id,
                date,
                created_at,
                updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        transaction.type,
        transaction.amount,
        transaction.profileId,
        transaction.categoryId,
        transaction.date,
        now,
        now
    );

    return result.lastInsertRowId;
}

// Modify a transaction by ID
export async function modify(transaction: UpdateTransaction): Promise<void> {
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
        transaction.id,
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

// Delete all transactions
export async function removeAll(): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            DELETE FROM transactions
            WHERE profile_id IN (
                SELECT id
                FROM profiles
                WHERE active = 1
            )
        `,
    );
}

// Get the balance for a given date range
export async function getBalance(profileId: number, from: string = '0000-01-01T00:00:00.000Z', to: string = '9999-12-31T23:59:59.999Z'): Promise<{ income: number, expense: number }> {
    const db = await dbPromise;

    const row = await db.getFirstAsync<{ income: number; expense: number; }>(
        `
            SELECT
                COALESCE(
                    SUM(
                        CASE
                            WHEN type = 'income' THEN amount
                            ELSE 0
                        END
                    ),
                    0
                ) AS income,

                COALESCE(
                    SUM(
                        CASE
                            WHEN type = 'expense' THEN amount
                            ELSE 0
                        END
                    ),
                    0
                ) AS expense

            FROM transactions
            WHERE profile_id = ?
                AND date >= ?
                AND date <= ?
        `,
        profileId,
        from,
        to
    );

    return {
        income: row?.income ?? 0,
        expense: row?.expense ?? 0,
    };
}

// Export the repository functions
export const transactionsRepository = {
    getAll,
    getById,
    create,
    modify,
    remove,
    removeAll,

    getBalance,
};
