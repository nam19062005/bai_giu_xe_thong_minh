import { createContext, useContext, useState, ReactNode } from "react";
import authService, { User } from "../../services/authService";

export type UserRole = "student" | "lecturer" | "staff" | "admin" | "guest";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginSSO: (email: string) => Promise<void>;
  loginGuest: (name: string, phone: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
    } catch (err: any) {
      const errorMessage = err.message || "Lỗi kết nối đến máy chủ";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const loginSSO = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await authService.loginSSO(email);
      setUser(userData);
    } catch (err: any) {
      const errorMessage = err.message || "Lỗi kết nối SSO";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const loginGuest = async (name: string, phone: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const userData = await authService.registerGuest(name, phone);
      setUser(userData);
    } catch (err: any) {
      const errorMessage = err.message || "Lỗi đăng ký khách vãng lai";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, loginSSO, loginGuest, logout, isLoading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
