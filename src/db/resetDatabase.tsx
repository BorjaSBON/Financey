import { dbPromise } from './database';

export async function resetDatabase(): Promise<void> {
    const db = await dbPromise;

    await db.withTransactionAsync(async () => {
        await db.runAsync('DELETE FROM transactions');
        await db.runAsync('DELETE FROM categories');
        await db.runAsync('DELETE FROM profiles');
    });
}