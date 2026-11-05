export type TransactionType = 'income' | 'expense';

export type Category = {
    id: number;
    name: string;
    type: TransactionType;
    budget: number | null;
    profileId: number;
};

export type CreateCategory = {
    name: string;
    type: TransactionType;
    budget: number | null;
};

export type UpdateCategory = {
    id: number;
    name: string;
    type: TransactionType;
    budget: number | null;
};
