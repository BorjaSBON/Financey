import { dbPromise } from '../database';

import type {
    Profile,
    CreateProfile,
    UpdateProfileUsername,
    UpdateProfileDataAdded,
    UpdateProfileDataModified,
    UpdateProfileDataDeleted
} from '../../types/profile';

function mapProfile(row: any): Profile {
    return {
        id: row.id,
        username: row.username,
        creation_date: row.creation_date,
        last_action_date: row.last_action_date,
        data_added: row.data_added,
        data_modified: row.data_modified,
        data_deleted: row.data_deleted,
    };
}

// Get all profiles
export async function getAll(): Promise<Profile[]> {
    const db = await dbPromise;

    const rows = await db.getAllAsync(`
        SELECT *
        FROM profile
        ORDER BY username ASC
    `);

    return rows.map(mapProfile);
}

// Get a profile by ID
export async function getById(id: number): Promise<Profile | null> {
    const db = await dbPromise;

    const row = await db.getFirstAsync(
        `
            SELECT *
            FROM profile
            WHERE id = ?
        `,
        id
    );

    return row ? mapProfile(row) : null;
}

// Create a new profile
export async function create(profile: CreateProfile): Promise<number> {
    const db = await dbPromise;

    const result = await db.runAsync(
        `
            INSERT INTO profile (username, creation_date, last_action_date, data_added, data_modified, data_deleted)
            VALUES (?, ?, ?, ?, ?, ?)
        `,
        profile.username,
        profile.creation_date,
        profile.creation_date,
        0,
        0,
        0
    );

    return result.lastInsertRowId;
}

// Modify the username for a profile by ID
export async function modifyUsername(id: number, data: UpdateProfileUsername): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            UPDATE profile
            SET username = ?, last_action_date = ?
            WHERE id = ?
        `,
        data.username,
        data.last_action_date,
        id
    );
}

// Modify the data added for a profile by ID
export async function modifyDataAdded(id: number, data: UpdateProfileDataAdded): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            UPDATE profile
            SET data_added = ?, last_action_date = ?
            WHERE id = ?
        `,
        data.data_added,
        data.last_action_date,
        id
    );
}

// Modify the data modified for a profile by ID
export async function modifyDataModified(id: number, data: UpdateProfileDataModified): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            UPDATE profile
            SET data_modified = ?, last_action_date = ?
            WHERE id = ?
        `,
        data.data_modified,
        data.last_action_date,
        id
    );
}

// Modify the data deleted for a profile by ID
export async function modifyDataDeleted(id: number, data: UpdateProfileDataDeleted): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            UPDATE profile
            SET data_deleted = ?, last_action_date = ?
            WHERE id = ?
        `,
        data.data_deleted,
        data.last_action_date,
        id
    );
}

// Delete a profile by ID
export async function remove(id: number): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            DELETE FROM profile
            WHERE id = ?
        `,
        id
    );
}

// Export the repository functions
export const profilesRepository = {
    getAll,
    getById,
    create,
    modifyUsername,
    modifyDataAdded,
    modifyDataModified,
    modifyDataDeleted,
    remove,
};
