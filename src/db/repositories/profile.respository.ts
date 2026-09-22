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
        active: row.active,
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

// Get the active profile
export async function get(): Promise<Profile | null> {
    const db = await dbPromise;

    const rows = await db.getAllAsync(`
        SELECT *
        FROM profile
        WHERE active = 1
    `);

    if (rows.length > 1) {
        await db.runAsync(
            `
                UPDATE profile
                SET active = 0
                WHERE active = 1 AND id != (SELECT id FROM profile WHERE active = 1 ORDER BY id ASC LIMIT 1)
            `,
        );
    }

    return rows[0] ? mapProfile(rows[0]) : null;
}

// Get a profile by ID
export async function getById(id: number): Promise<Profile | null> {
    const db = await dbPromise;

    const row = await db.getFirstAsync(`
        SELECT *
        FROM profile
        WHERE id = ?
    `, id);

    return row ? mapProfile(row) : null;
}

// Create a new profile
export async function create(profile: CreateProfile): Promise<number> {
    const db = await dbPromise;

    const result = await db.runAsync(
        `
            INSERT INTO profile (username, creation_date, last_action_date, data_added, data_modified, data_deleted, active)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        profile.username,
        profile.creation_date,
        profile.creation_date,
        0,
        0,
        0,
        1
    );

    return result.lastInsertRowId;
}

// Modify the username for a profile by ID
export async function modifyUsername(data: UpdateProfileUsername): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            UPDATE profile
            SET username = ?, last_action_date = ?
            WHERE active = 1
            ORDER BY id ASC
            LIMIT 1
        `,
        data.username,
        data.last_action_date,
    );
}

// Modify the data added for a profile by ID
export async function modifyDataAdded(data: UpdateProfileDataAdded): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            UPDATE profile
            SET data_added = ?, last_action_date = ?
            WHERE active = 1
            ORDER BY id ASC
            LIMIT 1
        `,
        data.data_added,
        data.last_action_date,
    );
}

// Modify the data modified for a profile by ID
export async function modifyDataModified(data: UpdateProfileDataModified): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            UPDATE profile
            SET data_modified = ?, last_action_date = ?
            WHERE active = 1
            ORDER BY id ASC
            LIMIT 1
        `,
        data.data_modified,
        data.last_action_date,
    );
}

// Modify the data deleted for a profile by ID
export async function modifyDataDeleted(data: UpdateProfileDataDeleted): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            UPDATE profile
            SET data_deleted = ?, last_action_date = ?
            WHERE active = 1
            ORDER BY id ASC
            LIMIT 1
        `,
        data.data_deleted,
        data.last_action_date,
    );
}

// Delete a profile by ID
export async function remove(): Promise<void> {
    const db = await dbPromise;

    await db.runAsync(
        `
            DELETE FROM profile
            WHERE active = 1
            ORDER BY id ASC
            LIMIT 1
        `,
    );
}

// Export the repository functions
export const profilesRepository = {
    getAll,
    get,
    getById,

    create,

    modifyUsername,
    modifyDataAdded,
    modifyDataModified,
    modifyDataDeleted,

    remove,
};
