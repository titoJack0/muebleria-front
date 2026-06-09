import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Truck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../ui/Button';

// Barra lateral de navegación para Administradores y Empleados
export const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, roles: ['admin', 'employee'] },
    { name: 'Inventory', path: '/admin/inventory', icon: Package, roles: ['admin', 'employee'] },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag, roles: ['admin', 'employee'] },
    // Delivery view es solo para repartidores, pero en caso de que admin quiera ver su vista:
    { name: 'Deliveries', path: '/delivery', icon: Truck, roles: ['delivery'] },
  ];

  const filteredItems = navItems.filter((item) => user && item.roles.includes(user.role));

  return (
    <aside className="hidden w-64 flex-col border-r border-wood/20 bg-white md:flex">
      <div className="flex h-16 items-center px-6 border-b border-wood/10">
        <span className="font-serif text-lg font-bold text-wood-dark">Admin Panel</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {filteredItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-3 rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-wood text-offWhite"
                  : "text-earth hover:bg-wood/10 hover:text-wood-dark"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
