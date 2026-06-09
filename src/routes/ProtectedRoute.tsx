import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

// Componente para proteger rutas según la autenticación y el rol del usuario
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-offWhite">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-wood border-t-transparent"></div>
      </div>
    );
  }

  // Si no hay token o usuario, redirige al login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Si se requieren roles específicos y el usuario no tiene permiso, redirige según el rol
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'customer') return <Navigate to="/dashboard" replace />;
    if (user.role === 'admin' || user.role === 'employee') return <Navigate to="/admin" replace />;
    if (user.role === 'delivery') return <Navigate to="/delivery" replace />;
    return <Navigate to="/" replace />;
  }

  // Si tiene permiso, renderiza las rutas hijas
  return <Outlet />;
};
