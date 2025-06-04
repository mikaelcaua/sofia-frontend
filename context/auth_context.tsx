'use client';

import { AuthContextInterface } from '@/interfaces/auth_context_interface';
import { UserInteface } from '@/interfaces/user_interface';
import AuthService from '@/services/auth_service';
import { createContext, useState, ReactNode } from 'react';

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInteface | null>(null);
  const authService: AuthService = new AuthService();

  const login = async (email: string, password: string) => {
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
