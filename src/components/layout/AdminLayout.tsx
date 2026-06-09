import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

// Layout para el panel de administración
export const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-offWhite">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        {/* Barra superior simple para el admin */}
        <header className="flex h-16 items-center justify-between border-b border-wood/20 bg-white px-6">
          <h1 className="font-serif text-xl font-bold text-wood-dark">Dashboard</h1>
          <button className="text-sm font-medium text-wood hover:text-gold">Logout</button>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
