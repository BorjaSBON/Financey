// services/budgetAlerts.ts
import { sendLocalNotification } from '@services/notifications';
import { dbPromise } from '@db/database';

type Level = 'none' | 'warning' | 'exceeded';
const WARNING_THRESHOLD = 0.9;

export function getLevel(spent: number, budget: number): Level {
    if (spent >= budget) return 'exceeded';
    if (spent >= budget * WARNING_THRESHOLD) return 'warning';

    return 'none';
}

export async function checkBudgetAfterTransaction(categoryId: number, exceededLocale: {title: string, message: string}, warningLocale: {title: string, message: string}) {
    const db = await dbPromise;

    const month = new Date().toISOString().slice(0, 7);

    const cat = await db.getFirstAsync<{ name: string; budget: number | null }>(
        `
            SELECT name, budget 
            FROM categories 
            WHERE id = ?
        `,
        [categoryId],
    );

    if (!cat?.budget) return;

    const row = await db.getFirstAsync<{ total: number }>(
        `
            SELECT COALESCE(SUM(amount), 0) AS total
            FROM transactions
            WHERE category_id = ? AND type = 'expense'
            AND strftime('%Y-%m', date) = ?
        `,
        [categoryId, month],
    );

    const spent = row?.total ?? 0;
    const level = getLevel(spent, cat.budget);

    // Check if there are notifications related to the category expired
    if (level === 'none') {
        const expiredCategories = await db.getFirstAsync(
            `
                SELECT 1 FROM budget_alerts 
                WHERE category_id = ? 
                    AND month = ?
            `,
            [categoryId, month],
        );

        if (expiredCategories) {
            await db.runAsync(
                `
                    DELETE FROM budget_alerts
                    WHERE category_id = ? 
                        AND month = ?
                `,
                [categoryId, month],
            );
        }
        
        return;
    }

    // Omit duplicate notifications
    const already = await db.getFirstAsync(
        `
            SELECT 1 FROM budget_alerts 
            WHERE category_id = ? 
                AND month = ? 
                AND level = ?
        `,
        [categoryId, month, level],
    );
    if (already) return;

    await db.runAsync(
        `
            INSERT INTO budget_alerts (category_id, month, level) VALUES (?, ?, ?)
        `,
        [categoryId, month, level],
    );

    if (level === 'exceeded') {
        await sendLocalNotification(
            exceededLocale.title,
            `${cat.name}: ${exceededLocale.message}`,
        );
    } else {
        const pct = Math.round((spent / cat.budget) * 100);
        await sendLocalNotification(
            warningLocale.title,
            `${cat.name}: ${warningLocale.message} (${pct}%)`,
        );
    }
}