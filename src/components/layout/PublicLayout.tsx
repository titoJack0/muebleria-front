import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Drawer } from './Drawer';

// Layout para las rutas públicas y de cliente
export const PublicLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-offWhite">
      <Navbar />
      <Drawer />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
