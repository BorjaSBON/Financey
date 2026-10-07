export type TransactionType = 'income' | 'expense';

export type Category = {
    id: number;
    name: string;
    type: TransactionType;
    profileId: number;
};

export type CreateCategory = {
    name: string;
    type: TransactionType;
};

export type UpdateCategory = {
    id: number;
    name: string;
    type: TransactionType;
};
