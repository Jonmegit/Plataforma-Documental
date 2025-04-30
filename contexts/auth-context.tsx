"use client"

import type React from "react"

import { createContext, useEffect, useState } from "react"
import { loginUser, signupUser, getCurrentUser } from "@/lib/api"
import type { User } from "@/types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: any) => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  updateProfile: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken")
        if (token) {
          const userData = await getCurrentUser()
          setUser(userData)
        }
      } catch (error) {
        localStorage.removeItem("authToken")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const { authToken, user } = await loginUser(email, password)
    
    // Debugging: Log the response from loginUser
    console.log("Login response:", { authToken, user });

    localStorage.setItem("authToken", authToken)

    // Si el usuario no está incluido en la respuesta, obtenerlo desde /auth/me
    if (!user) {
      console.log("Fetching user data from /auth/me...");
      const userData = await getCurrentUser();
      setUser(userData);
      console.log("User state updated from /auth/me:", userData);
    } else {
      setUser(user);
      console.log("User state updated:", user);
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    const { authToken, user } = await signupUser(name, email, password)
    localStorage.setItem("authToken", authToken)
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    setUser(null)
  }

  const updateProfile = async (data: any) => {
    // Implementar actualización de perfil cuando la API lo soporte
    console.log("Actualizar perfil:", data)
    return Promise.resolve()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
