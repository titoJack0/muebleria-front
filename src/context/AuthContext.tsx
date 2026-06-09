import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de Autenticación para manejar el estado global del usuario logueado
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hook para verificar si hay un token guardado al recargar la página y obtener los datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await api.get('/user');
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data", error);
          logout();
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [token]);

  // Función para iniciar sesión y guardar credenciales
  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  // Función para cerrar sesión y limpiar el estado global
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder fácilmente al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
