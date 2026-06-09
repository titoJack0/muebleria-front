import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Vista del panel de cliente (Customer Dashboard)
export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();

  // Simulación de historial de pedidos
  const mockOrders = [
    { id: 101, tracking_code: 'AB12CD34', status: 'in_transit', total: 850, date: '2023-10-25' },
    { id: 102, tracking_code: 'XY98ZU76', status: 'delivered', total: 150, date: '2023-09-12' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-5 w-5 text-olive" />;
      case 'in_transit': return <Package className="h-5 w-5 text-gold" />;
      default: return <Clock className="h-5 w-5 text-earth" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Podría mostrar un toast notification aquí
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-wood-dark">Welcome back, {user?.name}</h1>
        <p className="mt-2 text-earth">Manage your orders and account settings.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Historial de Pedidos */}
        <div className="lg:col-span-2">
          <h2 className="mb-6 font-serif text-xl font-semibold text-wood-dark">Order History</h2>
          
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-between rounded-sm border border-wood/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-earth">Order #{order.id}</span>
                    <span className="text-sm text-earth">•</span>
                    <span className="text-sm text-earth">{order.date}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <button 
                      onClick={() => copyToClipboard(order.tracking_code)}
                      className="font-mono text-lg font-medium tracking-wider text-wood-dark hover:text-gold transition-colors"
                      title="Click to copy tracking code"
                    >
                      {order.tracking_code}
                    </button>
                  </div>
                  <p className="mt-2 text-lg font-bold text-wood">${order.total.toFixed(2)}</p>
                </div>
                
                <div className="mt-4 flex items-center gap-2 sm:mt-0">
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-medium capitalize text-wood-dark">
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detalles de la Cuenta */}
        <div>
          <h2 className="mb-6 font-serif text-xl font-semibold text-wood-dark">Account Details</h2>
          <div className="rounded-sm border border-wood/10 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <span className="block text-sm text-earth">Name</span>
                <span className="font-medium text-wood-dark">{user?.name}</span>
              </div>
              <div>
                <span className="block text-sm text-earth">Email</span>
                <span className="font-medium text-wood-dark">{user?.email}</span>
              </div>
              <button className="mt-4 text-sm font-medium text-wood hover:text-gold transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
