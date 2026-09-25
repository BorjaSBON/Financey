export type Profile = {
    id: number;
    username: string;
    creation_date: string;
    last_action_date: string;
    last_action: string;
    number_actions: number;
    number_transactions: number;
    number_transactions_added: number;
    number_transactions_modified: number;
    number_transactions_deleted: number;
    active: number;
};

export type UsernameProfile = {
    username: string;
};
