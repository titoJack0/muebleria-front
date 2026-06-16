import React, { useCallback, useEffect, useState } from 'react';
import { Edit2, RefreshCw, ChevronLeft, ChevronRight, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';
import { ORDER_STATUS_LABELS } from '../../components/OrderStatus';
import { Button } from '../../components/ui/Button';

interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  tracking_code: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  created_at: string;
  recipient_name?: string;
  user?: { id: number; name: string; email?: string } | null;
  items?: OrderItem[];
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Orden de los tabs - pending primero
const TABS = [
  'pending',
  'revisando_solicitud',
  'waiting_payment',
  'payment_confirmed',
  'preparing',
  'in_transit',
  'delivered',
  'completed',
  'cancelled',
] as const;

// Colores de badge por estado
const STATUS_COLORS: Record<string, string> = {
  pending:               'bg-yellow-100 text-yellow-800',
  revisando_solicitud:   'bg-purple-100 text-purple-800',
  waiting_payment:       'bg-orange-100 text-orange-800',
  payment_confirmed:     'bg-blue-100 text-blue-800',
  preparing:             'bg-indigo-100 text-indigo-800',
  in_transit:            'bg-sky-100 text-sky-800',
  delivered:             'bg-green-100 text-green-800',
  completed:             'bg-teal-100 text-teal-800',
  cancelled:             'bg-red-100 text-red-800',
};

export const OrderManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('pending');

  // Caché de datos por tab: { [status]: { orders, meta, loaded } }
  const [cache, setCache] = useState<Record<string, { orders: Order[]; meta: PaginationMeta | null; page: number; loaded: boolean }>>({});
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal edición
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>('');
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const currentCache = cache[activeTab];
  const orders = currentCache?.orders ?? [];
  const meta = currentCache?.meta ?? null;

  const fetchStatusCounts = useCallback(async () => {
    try {
      const res = await api.get('/admin/orders/stats/counts');
      setStatusCounts(res.data);
    } catch (e) {
      console.error('Error fetching status counts', e);
    }
  }, []);

  const fetchTab = useCallback(async (status: string, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/admin/orders', { params: { status, page } });
      const data: Order[] = res.data.data ?? [];
      const m: PaginationMeta = res.data.meta ?? null;
      setCache(prev => ({
        ...prev,
        [status]: { orders: data, meta: m, page, loaded: true },
      }));
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Error al obtener pedidos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar pending y conteos al montar
  useEffect(() => {
    fetchStatusCounts();
    fetchTab('pending', 1);
  }, [fetchTab, fetchStatusCounts]);

  // Cargar tab si no está en caché todavía
  const handleTabChange = (status: string) => {
    setActiveTab(status);
    if (!cache[status]?.loaded) {
      fetchTab(status, 1);
    }
  };

  const handlePageChange = (page: number) => {
    fetchTab(activeTab, page);
  };

  const openEdit = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setUpdateError(null);
  };

  const closeEdit = () => {
    setSelectedOrder(null);
    setNewStatus('');
    setUpdateError(null);
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder || !newStatus) return;
    setUpdating(true);
    setUpdateError(null);
    try {
      const res = await api.patch(`/admin/orders/${selectedOrder.id}/status`, { status: newStatus });
      const updated: Order = res.data.data ?? res.data;
      
      // Invalidar cachés afectados (el tab actual y el nuevo status)
      setCache(prev => {
        const next = { ...prev };
        
        // Si el estado cambió, lo removemos del tab actual
        if (updated.status !== activeTab) {
          if (next[activeTab]) {
            next[activeTab] = {
              ...next[activeTab],
              orders: next[activeTab].orders.filter(o => o.id !== updated.id),
            };
          }
          // Invalidar el tab del nuevo status para que se recargue
          if (next[updated.status]) {
            next[updated.status] = { ...next[updated.status], loaded: false };
          }
        } else {
          // Si es el mismo, solo actualizamos el item
          if (next[activeTab]) {
            next[activeTab] = {
              ...next[activeTab],
              orders: next[activeTab].orders.map(o => o.id === updated.id ? updated : o),
            };
          }
        }
        return next;
      });

      // Refrescar conteos totales de estados
      fetchStatusCounts();
      closeEdit();
    } catch (e: any) {
      setUpdateError(e?.response?.data?.message || 'Error al actualizar el estado.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-wood-dark">Gestión de Pedidos</h1>
          <p className="text-sm text-earth mt-1">Ordenados del más reciente al más antiguo</p>
        </div>
        <Button
          onClick={() => {
            fetchStatusCounts();
            fetchTab(activeTab, currentCache?.page ?? 1);
          }}
          variant="outline"
          className="gap-2 border-wood/30"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-md px-4 py-3 text-sm">{error}</div>
      )}

      {/* Tabs */}
      <div className="border-b border-wood/20 overflow-x-auto">
        <nav className="flex gap-1 min-w-max">
          {TABS.map(status => {
            const isActive = activeTab === status;
            const count = statusCounts[status];
            return (
              <button
                key={status}
                onClick={() => handleTabChange(status)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-wood-dark border-b-2 border-wood'
                    : 'text-earth hover:text-wood-dark hover:bg-wood/5'
                }`}
              >
                {ORDER_STATUS_LABELS[status] ?? status}
                {count !== undefined && (
                  <span className={`ml-2 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                    isActive ? 'bg-wood text-white' : 'bg-offWhite text-earth'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenido del tab */}
      <div className="min-h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-wood/50" />
            <span className="ml-3 text-earth">Cargando pedidos...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-earth">
            <p className="text-lg font-medium">No hay pedidos en este estado</p>
            <p className="text-sm mt-1 opacity-70">Cuando haya pedidos con estado "{ORDER_STATUS_LABELS[activeTab]}" aparecerán aquí.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-start justify-between rounded-sm bg-white border border-wood/10 p-5 shadow-sm hover:border-wood/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <span className="font-mono text-xs text-earth">#{order.tracking_code}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[order.status] ?? 'bg-gray-100 text-gray-700'}`}>
                        {ORDER_STATUS_LABELS[order.status] ?? order.status}
                      </span>
                      <span className="text-xs text-earth/70">{new Date(order.created_at).toLocaleString('es-AR')}</span>
                    </div>
                    <p className="font-medium text-wood-dark mt-1">{order.user?.name ?? order.recipient_name ?? 'Cliente invitado'}</p>
                    <p className="text-sm text-earth mt-0.5 truncate max-w-md">{order.shipping_address}</p>
                    <p className="text-sm font-semibold text-wood-dark mt-2">
                      Total: <span className="text-gold">${Number(order.total_amount).toFixed(2)}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => openEdit(order)}
                    className="ml-4 flex-shrink-0 p-2 rounded-sm text-earth hover:text-wood hover:bg-offWhite transition-colors"
                    title="Editar pedido"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Paginación */}
      {meta && meta.last_page > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-wood/10">
          <p className="text-sm text-earth">
            Página {meta.current_page} de {meta.last_page} — {meta.total} pedidos en total
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-wood/30"
              disabled={meta.current_page <= 1 || loading}
              onClick={() => handlePageChange(meta.current_page - 1)}
            >
              <ChevronLeft className="h-4 w-4" /> Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-wood/30"
              disabled={meta.current_page >= meta.last_page || loading}
              onClick={() => handlePageChange(meta.current_page + 1)}
            >
              Siguiente <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Modal edición */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEdit}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 w-full max-w-2xl rounded-sm bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5 border-b border-wood/10 pb-4">
                <div>
                  <h2 className="font-serif text-xl font-bold text-wood-dark">Pedido #{selectedOrder.tracking_code}</h2>
                  <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[selectedOrder.status] ?? ''}`}>
                    Estado actual: {ORDER_STATUS_LABELS[selectedOrder.status] ?? selectedOrder.status}
                  </span>
                </div>
                <button onClick={closeEdit} className="text-earth hover:text-wood-dark p-1 rounded hover:bg-offWhite">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2 text-sm text-earth">
                  <p><span className="font-medium text-wood-dark">Cliente:</span> {selectedOrder.user?.name ?? selectedOrder.recipient_name ?? 'Invitado'}</p>
                  <p><span className="font-medium text-wood-dark">Dirección:</span> {selectedOrder.shipping_address}</p>
                  <p><span className="font-medium text-wood-dark">Fecha:</span> {new Date(selectedOrder.created_at).toLocaleString('es-AR')}</p>
                  <p className="font-semibold text-base text-wood-dark mt-3">
                    Total: <span className="text-gold">${Number(selectedOrder.total_amount).toFixed(2)}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-wood-dark mb-2">Cambiar estado a:</label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value)}
                    className="w-full p-2.5 border border-wood/30 rounded-sm bg-offWhite text-wood-dark focus:outline-none focus:ring-2 focus:ring-wood/30"
                  >
                    {TABS.map(s => (
                      <option key={s} value={s}>{ORDER_STATUS_LABELS[s] ?? s}</option>
                    ))}
                  </select>

                  {updateError && (
                    <p className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{updateError}</p>
                  )}

                  <div className="mt-4 flex gap-3 justify-end">
                    <Button variant="ghost" onClick={closeEdit} disabled={updating}>Cancelar</Button>
                    <Button onClick={handleStatusUpdate} disabled={updating || newStatus === selectedOrder.status}>
                      {updating ? (
                        <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Guardando...</span>
                      ) : 'Guardar cambio'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Items del pedido */}
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="border-t border-wood/10 pt-4">
                  <h3 className="font-medium text-wood-dark mb-3">Productos del pedido</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map(it => (
                      <div key={it.id} className="flex items-center justify-between text-sm py-2 border-b border-wood/10 last:border-0">
                        <div>
                          <p className="font-medium text-wood-dark">{it.product_name}</p>
                          <p className="text-xs text-earth">Cant: {it.quantity} × ${Number(it.price).toFixed(2)}</p>
                        </div>
                        <span className="font-semibold text-wood-dark">${(it.quantity * it.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderManagement;
