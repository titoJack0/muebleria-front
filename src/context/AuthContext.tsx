import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string | null, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de Autenticación para manejar el estado global del usuario logueado
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hook para verificar si hay una sesión activa o token al recargar la página y obtener los datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Intentar obtener el usuario
        const response = await api.get('/user');
        setUser(response.data);
      } catch (error) {
        // No autenticado o token inválido
        console.debug('No authenticated user on mount', error);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []); // se ejecuta una vez al montar

  // Función para iniciar sesión y guardar credenciales (token opcional, ya que podemos usar cookies de sesión)
  const login = (newToken: string | null, userData: User) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem('token');
      setToken(null);
    }
    setUser(userData);
  };

  // Función para cerrar sesión y limpiar el estado global
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    // Intenta hacer logout en backend si es necesario
    try {
      api.post('/logout').catch(() => {});
    } catch (e) {}
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
