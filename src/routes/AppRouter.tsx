import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Importación de vistas
import { Home } from '../views/public/Home';
import { Catalog } from '../views/public/Catalog';
import { Login } from '../views/auth/Login';
import { Checkout } from '../views/public/Checkout';
import { ProductDetail } from '../views/public/ProductDetail';
import { OrderTracking } from '../views/public/OrderTracking';
import { Register } from '../views/auth/Register';
import { CustomerDashboard } from '../views/customer/Dashboard';
import { AdminDashboard } from '../views/admin/Dashboard';
import { Inventory } from '../views/admin/Inventory';
import { OrderManagement } from '../views/admin/OrderManagement';
import { DeliveryView } from '../views/delivery/DeliveryView';
import HomePremium from '../views/HomePremium';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePremium />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/track" element={<OrderTracking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />

          
          {/* Cliente */}
          <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
            <Route path="/dashboard" element={<CustomerDashboard />} />
          </Route>
        </Route>

        {/* Rutas con Admin Layout */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'employee', 'delivery']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/inventory" element={<Inventory />} />
            <Route path="/admin/orders" element={<OrderManagement />} />
            <Route path="/delivery" element={<DeliveryView />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
