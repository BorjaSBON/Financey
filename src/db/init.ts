import { dbPromise } from './database';
import { initializeDatabase } from './migrations';
import { seedDatabase } from './seed';

export async function initializeAppDatabase() {
    await dbPromise;
    await initializeDatabase();
    await seedDatabase();
}
