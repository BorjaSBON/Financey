import { dbPromise } from '../database';

import type {
    Transaction,
    CreateTransaction,
    UpdateTransaction,
    TransactionFilters,
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
export async function getAll(filters: TransactionFilters={}): Promise<Transaction[]> {
    const db = await dbPromise;

    const { 
        type, 
        categoryId, 
        orderBy = 'date', 
        order = 'DESC', 
        amountMin, 
        amountMax, 
        dateMin, 
        dateMax
    } = filters;

    let query = `
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
    `;

    const params: (string | number)[] = [];

    // Filter by type
    if (type) {
        query += ` AND t.type = ?`;
        params.push(type);
    }

    // Filter by category
    if (categoryId) {
        query += ` AND t.category_id = ?`;
        params.push(categoryId);
    }

    // Filter by amounts
    if (amountMin) {
        query += ` AND t.amount >= ?`;
        params.push(amountMin);
    }

    if (amountMax) {
        query += ` AND t.amount <= ?`;
        params.push(amountMax);
    }

    // Filter by dates
    if (dateMin) {
        query += ` AND t.date >= ?`;
        params.push(dateMin);
    }

    if (dateMax) {
        query += ` AND t.date <= ?`;
        params.push(dateMax);
    }

    // Order type
    const orderColumns = {
        date: 't.date',
        amount: 't.amount',
    };

    const column = orderColumns[orderBy];
    const direction = order === 'ASC' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${column} ${direction}`;

    // Order
    if (orderBy === 'date') {
        query += ', t.id DESC';
    } else {
        query += ', t.date DESC, t.id DESC';
    }

    const rows = await db.getAllAsync(query, ...params);

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
                LIMIT 1
            )
        `,
    );
}

// Delete all transactions
export async function removeByCategory(categoryId: number): Promise<number> {
    const db = await dbPromise;

    const transactionCount = await db.getFirstAsync<{ count: number }>(
        `
            SELECT COUNT(*) as count
            FROM transactions
            WHERE category_id = ?
        `,
        categoryId
    );

    await db.runAsync(
        `
            DELETE FROM transactions
            WHERE profile_id IN (
                SELECT id
                FROM profiles
                WHERE active = 1
                LIMIT 1
            ) AND category_id = ?
        `,
        categoryId
    );

    return transactionCount?.count ?? 0;
}

// Get the balance for a given date range
export async function getBalance(from: string='0000-01-01T00:00:00.000Z', to: string='9999-12-31T23:59:59.999Z'): Promise<{ income: number, expense: number }> {
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
            WHERE profile_id IN (
                SELECT id
                FROM profiles
                WHERE active = 1
                LIMIT 1
            ) AND date >= ? AND date < ?
        `,
        from,
        to
    );

    return {
        income: row?.income ?? 0,
        expense: row?.expense ?? 0,
    };
}

// Get the last transaction
export async function getLastTransaction(): Promise<Transaction | null> {
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
            INNER JOIN profiles p
                ON p.id = t.profile_id
            WHERE p.active = 1
            ORDER BY t.date DESC
        `,
    );

    if (row != null) {
        return mapTransaction(row);
    }

    return null;
}

// Get the available period
export async function getAvailablePeriods() {
    const db = await dbPromise;

    // Get the periods
    return db.getAllAsync<{ year: number; month: number; }>(
        `
            SELECT
                strftime('%Y', date) AS year,
                strftime('%m', date) AS month,
                COUNT(*) AS total
            FROM transactions
            WHERE date IS NOT NULL AND profile_id IN (
                SELECT id
                FROM profiles
                WHERE active = 1
                LIMIT 1
            )
            GROUP BY
                strftime('%Y', date),
                strftime('%m', date)
            ORDER BY
                year DESC,
                month DESC;
        `,
    );
}

// Get the balance of a year monthly
export async function getBalanceMonthly(year: number) {
    const db = await dbPromise;

    // Dates
    const startDate = `${year}-01-01`;
    const endDate = `${year + 1}-01-01`;

    // Get the transactions
    return db.getAllAsync<{ month: number; income: number; expense: number; }>(
        `
            WITH RECURSIVE months(month) AS (
                SELECT 1
                UNION ALL
                SELECT month + 1
                FROM months
                WHERE month < 12
            ),
            monthly_totals AS (
                SELECT
                    CAST(strftime('%m', date) AS INTEGER) AS month,
                    SUM(CASE
                        WHEN type = 'income' THEN amount
                        ELSE 0
                    END) AS income,
                    SUM(CASE
                        WHEN type = 'expense' THEN amount
                        ELSE 0
                    END) AS expense
                FROM transactions
                WHERE date >= ? 
                    AND date < ? 
                    AND profile_id IN (
                        SELECT id
                        FROM profiles
                        WHERE active = 1
                        LIMIT 1
                    )
                GROUP BY strftime('%m', date)
            )
            SELECT
                months.month AS month,
                COALESCE(monthly_totals.income, 0) AS income,
                COALESCE(monthly_totals.expense, 0) AS expense
            FROM months
            LEFT JOIN monthly_totals
                ON months.month = monthly_totals.month
            ORDER BY months.month ASC;
        `,
        startDate,
        endDate
    );
}

// Get the categories amounts
export async function getCategoriesAmount(year: number, month: number, type: 'income' | 'expense') {
    const db = await dbPromise;

    // Dates
    const startDate = `${year}-${String(month).padStart(2, '0')}-01T00:00:00.000Z`;
    const endDate = new Date(Date.UTC(year, month, 1)).toISOString();

    // Get the amounts
    return db.getAllAsync<{ category: string; amount: number }>(
        `
            SELECT
                c.name AS category,
                SUM(t.amount) AS amount
            FROM transactions t
            INNER JOIN categories c
                ON t.category_id = c.id
            WHERE
                t.date >= ?
                AND t.date < ?
                AND t.type = ?
                AND t.profile_id IN (
                    SELECT id
                    FROM profiles
                    WHERE active = 1
                    LIMIT 1
                )
            GROUP BY
                c.id,
                c.name
            HAVING SUM(t.amount) <> 0
            ORDER BY amount DESC;
        `,
        startDate,
        endDate,
        type,
    );
}

// Export the repository functions
export const transactionsRepository = {
    getAll,
    getById,
    create,
    modify,

    remove,
    removeAll,
    removeByCategory,

    getBalance,
    getLastTransaction,
    getAvailablePeriods,
    getBalanceMonthly,
    getCategoriesAmount,
};
