import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

// Barra de navegación principal, con efecto de scroll y soporte para usuarios autenticados
export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { items, toggleCart } = useCart();
  const navigate = useNavigate();

  // Hook para detectar el scroll y cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-offWhite/90 shadow-sm backdrop-blur-md' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto flex h-11 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group">
          {/* CONTENEDOR DEL LOGO: Forzamos un tamaño grande (h-16 w-16 = 64px) */}
          {/* Al poner h-16 y w-16 fijas, el SVG se ve sí o sí, sin importar cómo esté exportado */}
          <div className="flex items-center justify-center h-16 w-28 shrink-0">
            <img
              src="/logo.svg"
              alt="Maderas Nativas"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* TEXTO DE LA MARCA Y ESLOGAN AL LADO */}
          <div className="flex flex-col justify-center">
            <span className="font-serif text-2xl font-bold text-wood-dark tracking-wide leading-none group-hover:text-gold transition-colors">
              Maderas Nativas
            </span>
            <span className="text-xs text-earth mt-1.5 font-medium tracking-normal italic">
              Calidad para la construcción
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/catalog" className="text-sm font-medium text-wood hover:text-gold transition-colors">Catalog</Link>
          <Link to="/track" className="text-sm font-medium text-wood hover:text-gold transition-colors">Track Order</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Cart Toggle */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-wood hover:text-gold transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-wood text-[10px] font-bold text-offWhite"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* User Menu */}
          {user ? (
            <div className="hidden items-center gap-4 md:flex">
              <Link
                to={user.role === 'customer' ? '/dashboard' : '/admin'}
                className="flex items-center gap-2 text-sm font-medium text-wood hover:text-gold transition-colors"
              >
                <UserIcon className="h-4 w-4" />
                <span>{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-wood hover:text-red-500 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden text-sm font-medium text-wood hover:text-gold transition-colors md:block"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="p-2 text-wood md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
