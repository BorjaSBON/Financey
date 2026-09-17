export type TransactionType = 'income' | 'expense';

export type Transaction = {
    id: number;
    type: TransactionType;
    amount: number;
    categoryId: number;
    categoryName: string;
    date: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateTransaction = {
    type: TransactionType;
    amount: number;
    categoryId: number;
    date: string;
};

export type UpdateTransaction = {
    type: TransactionType;
    amount: number;
    categoryId: number;
    date: string;
};
