import { useCallback, useEffect, useState } from 'react';

import { transactionsRepository } from '../db/repositories/transaction.repository';

import type {
    Transaction,
    CreateTransaction,
    UpdateTransaction,
} from '../types/transaction';

export function useTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // CONSULTAR TODAS
    const getTransactions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // Get the transactions
            const data = await transactionsRepository.getAll();
            setTransactions(data);

            // Return the transactions
            return data;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Error obteniendo transacciones');
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    // CREAR
    const createTransaction = useCallback(async (data: CreateTransaction) => {
        try {
            setLoading(true);
            setError(null);

            const id =
            await transactionsRepository.create(data);

            // Actualizamos el listado
            await getTransactions();

            return id;
        } catch (err) {
            const error =
            err instanceof Error
                ? err
                : new Error('Error creando la transacción');

            setError(error);

            throw error;
        } finally {
            setLoading(false);
        }
    }, [getTransactions]);

    // MODIFICAR
    const modifyTransaction = useCallback(async (id: number, data: UpdateTransaction) => {
        try {
            setLoading(true);
            setError(null);

            await transactionsRepository.modify(
            id,
            data
            );

            // Actualizamos el listado
            await getTransactions();
        } catch (err) {
            const error =
            err instanceof Error
                ? err
                : new Error('Error modificando la transacción');

            setError(error);

            throw error;
        } finally {
            setLoading(false);
        }
    }, [getTransactions]);

    // ELIMINAR
    const deleteTransaction = useCallback(async (id: number) => {
        try {
            setLoading(true);
            setError(null);

            await transactionsRepository.remove(id);

            // Actualizamos el listado
            await getTransactions();
        } catch (err) {
            const error =
            err instanceof Error
                ? err
                : new Error('Error eliminando la transacción');

            setError(error);

            throw error;
        } finally {
            setLoading(false);
        }
    }, [getTransactions]);

    useEffect(() => {
        getTransactions();
    }, [getTransactions]);

    return {
        transactions,

        loading,
        error,

        getTransactions,
        createTransaction,
        modifyTransaction,
        deleteTransaction,
    };
}