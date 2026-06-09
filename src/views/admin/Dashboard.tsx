import React from 'react';
import { DollarSign, Package, ShoppingCart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Vista del Dashboard de Administración con KPIs y Gráficos
export const AdminDashboard: React.FC = () => {
  // Datos simulados para el gráfico
  const data = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-wood-dark">Overview</h1>
        <p className="text-earth">Store performance metrics and KPIs.</p>
      </div>

      {/* Tarjetas de KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-sm border border-wood/10 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wood/10 text-wood">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-earth">Total Revenue</p>
              <h3 className="font-serif text-2xl font-bold text-wood-dark">$45,231.89</h3>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-wood/10 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-earth">Pending Orders</p>
              <h3 className="font-serif text-2xl font-bold text-wood-dark">12</h3>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-wood/10 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-olive/10 text-olive">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-earth">Active Products</p>
              <h3 className="font-serif text-2xl font-bold text-wood-dark">145</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Ingresos */}
      <div className="rounded-sm border border-wood/10 bg-white p-6 shadow-sm">
        <h3 className="mb-6 font-serif text-lg font-semibold text-wood-dark">Revenue Over Time</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A3728" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#4A3728" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#8C7B6D" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#8C7B6D" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <Tooltip 
                contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#4A3728' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#4A3728" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
