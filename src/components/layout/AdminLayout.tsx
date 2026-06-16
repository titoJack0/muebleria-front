import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Home, PackagePlus, Bell } from 'lucide-react';
import { Button } from '../ui/Button';

// Layout para el panel de administración
export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determinar el título basado en la ruta actual
  const getTitle = () => {
    if (location.pathname.includes('/inventory')) return 'Inventario';
    if (location.pathname.includes('/orders')) return 'Gestión de Pedidos';
    if (location.pathname.includes('/delivery')) return 'Entregas';
    return 'Panel Principal';
  };

  return (
    <div className="flex min-h-screen bg-offWhite">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {/* Cabecera Privada con Acciones */}
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-wood/20 bg-white px-8 shadow-sm">
          <div>
            <h1 className="font-serif text-2xl font-bold text-wood-dark">{getTitle()}</h1>
            <p className="text-sm text-earth">Bienvenido, {user?.name || 'Administrador'}</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Acciones Rápidas */}
            <div className="hidden md:flex items-center gap-2 border-r border-wood/20 pr-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="gap-2 text-earth hover:text-wood-dark" title="Ir a la Tienda">
                  <Home className="h-4 w-4" />
                  Tienda
                </Button>
              </Link>
              {user?.role !== 'delivery' && (
                <Link to="/admin/inventory">
                  <Button variant="ghost" size="sm" className="gap-2 text-earth hover:text-wood-dark" title="Nuevo Producto">
                    <PackagePlus className="h-4 w-4" />
                    Nuevo
                  </Button>
                </Link>
              )}
              <Link to="/admin/orders">
                <Button variant="ghost" size="sm" className="gap-2 text-earth hover:text-wood-dark" title="Notificaciones">
                  <Bell className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Logout */}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>

        {/* Pie de Página Privado */}
        <footer className="border-t border-wood/20 bg-white p-6 text-center text-sm text-earth">
          <p>&copy; {new Date().getFullYear()} Timber & Furniture Store. Panel de Administración Privado.</p>
          <p className="mt-1 text-xs opacity-70">Sistema reservado para uso interno. Rol actual: <span className="font-semibold uppercase">{user?.role}</span></p>
        </footer>
      </div>
    </div>
  );
};
