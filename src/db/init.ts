import { dbPromise } from './database';
import { initializeDatabase } from './migrations';

export async function initializeAppDatabase() {
    await dbPromise;
    await initializeDatabase();
}
