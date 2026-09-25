import { useCallback, useEffect, useState } from 'react';

import { transactionsRepository } from '../db/repositories/transaction.repository';

import type {
    Transaction,
    CreateTransaction,
    UpdateTransaction,
} from '../types/transaction';

export function useTransactions() {
    // Transactions information
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [transaction, setTransaction] = useState<Transaction>();

    // Loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // GET ALL TRANSACTIONS
    const getTransactions = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Get the transactions
            const data = await transactionsRepository.getAll();
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

    // REMOVE
    const removeTransaction = useCallback(async (id: number) => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Remove a transaction
            await transactionsRepository.remove(id);
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error removin a transaction');
            setError(error);
            throw error;
        } finally {
            // Reset loading state
            setLoading(false);
        }
    }, [getTransactions]);

    // ELIMINAR
    const removeTransactions = useCallback(async () => {
        try {
            // Set loading and error states
            setLoading(true);
            setError(null);

            // Remove all transactions
            await transactionsRepository.removeAll();
        } catch (err) {
            // Error handling
            const error = err instanceof Error ? err : new Error('Error eliminando la transacción');
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

        loading,
        error,

        getTransactions,
        getTransaction,
        createTransaction,
        modifyTransaction,
        removeTransaction,
        removeTransactions
    };
}