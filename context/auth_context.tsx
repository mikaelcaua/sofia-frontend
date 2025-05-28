'use client'

import AuthContextInterface from '@/interfaces/auth_context_interface'
import User from '@/interfaces/user_interface'
import AuthService from '@/services/auth_service'
import { createContext, useContext, useState, ReactNode } from 'react'

const AuthContext = createContext<AuthContextInterface | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const authService: AuthService = new AuthService()

    const login = (email: string, password: string) => {
        try {
            const userData = authService.login(email, password)
            setUser(userData)
            return true
        } catch (error) {
            return false
        }
    }

    const logout = () => {
        setUser(null)
    }

    const isAuthenticated = !!user

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
