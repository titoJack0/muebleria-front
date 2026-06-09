import React from 'react';
import { Truck } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Vista de Gestión de Pedidos para Administradores
export const OrderManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-wood-dark">Order Management</h1>
        <p className="text-earth">Process and assign incoming orders.</p>
      </div>

      <div className="overflow-hidden rounded-sm border border-wood/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-earth">
          <thead className="bg-offWhite font-serif text-wood-dark">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Assign Delivery</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-wood/10">
            <tr>
              <td className="px-6 py-4 font-medium text-wood-dark">#101</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">Oct 25, 2023</td>
              <td className="px-6 py-4">$850.00</td>
              <td className="px-6 py-4">
                <select className="rounded-sm border border-wood/20 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-wood">
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <select className="rounded-sm border border-wood/20 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-wood">
                    <option value="">Unassigned</option>
                    <option value="3">Mike (Delivery)</option>
                  </select>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full">
                    <Truck className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
