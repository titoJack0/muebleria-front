import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { items, toggleCart } = useCart();
  const navigate = useNavigate();

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
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 bg-premium-primary text-white ${isScrolled ? 'shadow-premium py-2 bg-premium-primary/95 backdrop-blur-md' : 'py-4'
          }`}
      >
        <div className="container mx-auto flex min-h-[5rem] items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo y Marca */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="flex items-center justify-center h-16 w-16 shrink-0 bg-white/5 rounded-xl p-1 border border-white/10 transition-colors group-hover:border-premium-accent/40">
              <img
                src="/logo.svg"
                alt="Maderas Nativas"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center hidden sm:flex">
              <span className="font-serif text-2xl font-bold text-white tracking-wide leading-none transition-colors group-hover:text-premium-accent">
                Maderas Nativas
              </span>
              <span className="text-xs text-premium-light/70 mt-1.5 font-medium tracking-normal italic">
                Calidad para la construcción
              </span>
            </div>
          </Link>

          {/* Navegación de Escritorio */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/catalog" className="text-sm font-medium text-white/90 hover:text-premium-accent transition-colors duration-200">
              Catálogo
            </Link>
            <Link to="/track" className="text-sm font-medium text-white/90 hover:text-premium-accent transition-colors duration-200">
              Seguir Pedido
            </Link>
          </nav>

          {/* Acciones del Usuario */}
          <div className="flex items-center gap-4">
            {/* Carrito de Compras */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-white/90 hover:text-premium-accent transition-colors duration-200"
              aria-label="Carrito"
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-premium-accent text-[10px] font-bold text-white"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Menú de Autenticación */}
            {user ? (
              <div className="hidden items-center gap-5 md:flex border-l border-white/10 pl-5">
                <Link
                  to={user.role === 'customer' ? '/dashboard' : '/admin'}
                  className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-premium-accent transition-colors duration-200"
                >
                  <UserIcon className="h-4 w-4 text-premium-accent" />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white/70 hover:text-red-400 transition-colors duration-200"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden text-sm font-medium text-white/90 hover:text-premium-accent transition-colors duration-200 md:block border-l border-white/10 pl-5"
              >
                Iniciar Sesión
              </Link>
            )}

            {/* Hamburguesa Móvil */}
            <button
              className="p-2 text-white/90 hover:text-premium-accent md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú Desplegable Móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[5.5rem] left-0 w-full bg-premium-primary text-white shadow-xl z-40 md:hidden border-t border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">
              <Link to="/catalog" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium hover:text-premium-accent py-1">Catálogo</Link>
              <Link to="/track" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium hover:text-premium-accent py-1">Seguir Pedido</Link>
              <hr className="border-white/10 my-1" />
              {user ? (
                <>
                  <Link to={user.role === 'customer' ? '/dashboard' : '/admin'} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-premium-accent" /> Mi Perfil ({user.name})
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-base font-medium text-red-400 text-left py-1">Cerrar Sesión</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-premium-accent py-1">Iniciar Sesión</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};