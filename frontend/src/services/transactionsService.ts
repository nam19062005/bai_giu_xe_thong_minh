/**
 * Transactions service for handling parking transactions
 */

import apiClient from "./api";

export interface Transaction {
  id: string;
  user_id: string;
  parking_spot_id: string;
  entry_id: string;
  amount: number;
  status: "pending" | "completed" | "failed" | "cancelled";
  payment_method?: string;
  created_at?: string;
  updated_at?: string;
}

class TransactionsService {
  /**
   * Get all transactions
   */
  async getAll(): Promise<Transaction[]> {
    const response = await apiClient.get<Transaction[]>("/transactions");
    return response;
  }

  /**
   * Get transaction by ID
   */
  async getById(id: string): Promise<Transaction> {
    const response = await apiClient.get<Transaction>(`/transactions/${id}`);
    return response;
  }

  /**
   * Create new transaction
   */
  async create(data: Partial<Transaction>): Promise<Transaction> {
    const response = await apiClient.post<Transaction>("/transactions", data);
    return response;
  }

  /**
   * Update transaction
   */
  async update(id: string, data: Partial<Transaction>): Promise<Transaction> {
    const response = await apiClient.patch<Transaction>(
      `/transactions/${id}`,
      data,
    );
    return response;
  }

  /**
   * Delete transaction
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/transactions/${id}`);
  }

  /**
   * Get user transactions
   */
  async getUserTransactions(userId: string): Promise<Transaction[]> {
    const transactions = await this.getAll();
    return transactions.filter((t) => t.user_id === userId);
  }
}

export default new TransactionsService();
