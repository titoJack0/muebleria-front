import React from 'react';
import { Link } from 'react-router-dom';

export const NavbarPremium: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-white font-serif text-xl">Maderas Nativas</Link>
        <div className="flex items-center gap-4">
          <Link to="/catalog" className="nav-link">Catálogo</Link>
          <Link to="/projects" className="nav-link">Proyectos</Link>
          <Link to="/contact" className="nav-link">Contacto</Link>
          <Link to="/track" className="nav-link">Rastrea tu pedido</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPremium;
