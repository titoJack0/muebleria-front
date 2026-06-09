import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicLayout } from '../components/layout/PublicLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Importación de vistas públicas
import { Home } from '../views/public/Home';
import { Catalog } from '../views/public/Catalog';
import { Login } from '../views/auth/Login';
import { Checkout } from '../views/public/Checkout';


// Componentes temporales
const ProductDetail = () => <div className="p-8">Product Detail</div>;
const OrderTracking = () => <div className="p-8">Order Tracking</div>;
const Register = () => <div className="p-8">Register</div>;
const CustomerDashboard = () => <div className="p-8">Customer Dashboard</div>;
const AdminDashboard = () => <div className="p-8">Admin Dashboard</div>;
const Inventory = () => <div className="p-8">Inventory</div>;
const OrderManagement = () => <div className="p-8">Order Management</div>;
const DeliveryView = () => <div className="p-8">Delivery View</div>;

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas con Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
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
