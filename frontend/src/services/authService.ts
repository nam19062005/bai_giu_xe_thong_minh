/**
 * Authentication service for user login/logout operations
 */

import apiClient from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "student" | "lecturer" | "staff" | "admin" | "guest";
  student_id?: string;
  balance?: number;
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

class AuthService {
  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<User> {
    const response = await apiClient.post<User>("/users/login", {
      email,
      password,
    });
    return response;
  }

  /**
   * Login with SSO (email only)
   */
  async loginSSO(email: string): Promise<User> {
    const response = await apiClient.post<User>("/users/login", {
      email,
    });
    return response;
  }

  /**
   * Get current user profile
   */
  async getProfile(userId: string): Promise<User> {
    const response = await apiClient.get<User>(`/users/${userId}`);
    return response;
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: Partial<User>): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${userId}`, data);
    return response;
  }

  /**
   * Register new user
   */
  async register(userData: Partial<User>): Promise<User> {
    const response = await apiClient.post<User>("/users", userData);
    return response;
  }

  /**
   * Register guest user
   */
  async registerGuest(name: string, phone: string): Promise<User> {
    const response = await apiClient.post<User>("/users", {
      name,
      email: phone, // Use phone as email for guest
      role: "guest",
      phone,
    });
    return response;
  }
}

export default new AuthService();
