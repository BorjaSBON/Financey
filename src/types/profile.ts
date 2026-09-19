export type Profile = {
    id: number;
    username: string;
    creation_date: string;
    last_action_date: string;
    data_added: string;
    data_modified: string;
    data_deleted: string;
};

export type CreateProfile = {
    username: string;
    creation_date: string;
};

export type UpdateProfileUsername = {
    username: string;
    last_action_date: string;
};

export type UpdateProfileDataAdded = {
    last_action_date: string;
    data_added: string;
};

export type UpdateProfileDataModified = {
    last_action_date: string;
    data_modified: string;
};

export type UpdateProfileDataDeleted = {
    last_action_date: string;
    data_deleted: string;
};
