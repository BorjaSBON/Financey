import { useCallback, useEffect, useState } from 'react';

import { transactionsRepository } from '../db/repositories/transaction.repository';

import type {
    Transaction,
    CreateTransaction,
    UpdateTransaction,
    TransactionFilters
} from '../types/transaction';

export function useTransactions() {
    // Transactions information
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transaction, setTransaction] = useState<Transaction>();
    const [lastTransaction, setLastTransaction] = useState<Transaction | null>();

    // Loading and error states
    const [loadingTransactions, setLoading] = useState(true);
    const [errorTransactions, setError] = useState<Error | null>(null);

    // GET ALL TRANSACTIONS
    const getTransactions = useCallback(async (filters: TransactionFilters={}) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the transactions
            const data = await transactionsRepository.getAll(filters);
            setTransactions(data);

            // Return the transactions
            return data;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining transactions');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // GET TRANSACTION BY ID
    const getTransaction = useCallback(async (id: number) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the transactions
            const data = await transactionsRepository.getById(id);
            setTransaction(data);

            // Return the transaction
            return data;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining a transaction');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // CREATE
    const createTransaction = useCallback(async (data: CreateTransaction) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Create the transaction
            await transactionsRepository.create(data);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error creating a transaction');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, [getTransactions]);

    // MODIFY
    const modifyTransaction = useCallback(async (data: UpdateTransaction) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Modify a transaction
            await transactionsRepository.modify(data);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error modifying a transaction');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, [getTransactions]);

    // REMOVE A TRANSACTION
    const removeTransaction = useCallback(async (id: number) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Remove a transaction
            await transactionsRepository.remove(id);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error removing a transaction');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, [getTransactions]);

    // REMOVE ALL TRANSACTIONS
    const removeTransactions = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Remove all transactions
            await transactionsRepository.removeAll();
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error removing all transactions');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // REMOVE TRANSACTIONS BY CATEGORY
    const removeTransactionsByCategory = useCallback(async (categoryId: number) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Remove all transactions
            await transactionsRepository.removeByCategory(categoryId);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error removing all transactions');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // GET THE TOTAL INCOMES AND EXPENSES
    const getBalance = useCallback(async (from: string = '0000-01-01T00:00:00.000Z', to: string = '9999-12-31T23:59:59.999Z'): Promise<{ income: number, expense: number }> => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the incomes and expenses
            const { income, expense } = await transactionsRepository.getBalance(from, to);

            // Return the incomes and expeses
            return { income, expense }
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining the balance');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // GET THE LAST TRANSACTION
    const getLastTransaction = useCallback(async (): Promise<Transaction | null> => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the last transaction
            const data = await transactionsRepository.getLastTransaction();
            setLastTransaction(data);

            // Return the last transaction
            return data;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining the last transaction');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // GET THE AVAILABLE PERIODS
    const getAvailablePeriods = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the available periods
            const data = await transactionsRepository.getAvailablePeriods();

            // Group the periods
            const groupedMap = new Map<number, number[]>();

            for (const period of data) {
                const year = Number(period.year);
                const month = Number(period.month);

                if (!groupedMap.has(year)) {
                    groupedMap.set(year, []);
                }

                groupedMap.get(year)!.push(month);
            }

            const groupedPeriods: { year: number; months: number[]; }[] = Array.from(groupedMap, ([year, months]) => ({ year, months }));

            // Return the balance
            return groupedPeriods;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining the available periods');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // GET THE BALANCE OF A YEAR MONTHLY
    const getBalanceMonthly = useCallback(async (year: number) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the balance
            const data = await transactionsRepository.getBalanceMonthly(year);

            // Return the balance
            return data;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining the balance of a year monthly');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    // GET THE CATEGORIES AMOUNTS
    const getCategoriesAmount = useCallback(async (year: number, month: number, type: 'income' | 'expense') => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the categories amounts
            const data = await transactionsRepository.getCategoriesAmount(year, month, type);

            // Return the balance
            return data;
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error obtaining the categories amounts');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

    return {
        transactions,
        transaction,
        lastTransaction,

        loadingTransactions,
        errorTransactions,

        getTransactions,
        getTransaction,
        createTransaction,
        modifyTransaction,

        removeTransaction,
        removeTransactions,
        removeTransactionsByCategory,

        getBalance,
        getLastTransaction,
        getAvailablePeriods,
        getBalanceMonthly,
        getCategoriesAmount,
    };
}