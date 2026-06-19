import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import api from '../../services/api';
import { ORDER_STATUS_LABELS, ORDER_STATUS_MESSAGES } from '../../components/OrderStatus';
import { CvuDisplay } from '../../components/CvuDisplay';
import { Search, Package, CheckCircle, Truck, Clock, AlertTriangle, MapPin, List, UploadCloud, Loader2 } from 'lucide-react';

// Vista de Rastreo Público de Pedidos
export const OrderTracking: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trackingCode, setTrackingCode] = useState(searchParams.get('code') || '');
  const [isSearching, setIsSearching] = useState(false);
  const [order, setOrder] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<{ cvu: string; alias: string; holder_name: string } | null>(null);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);

  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  const handleReceiptUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingReceipt(true);
    const formData = new FormData();
    formData.append('receipt', file);

    try {
      await api.post(`/orders/track/${order.tracking_code}/receipt`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Comprobante subido exitosamente.');
      // Refrescamos el pedido para que desaparezca el botón de subir o muestre el mensaje de éxito
      const response = await api.get(`/orders/track/${order.tracking_code}`);
      setOrder(response.data.data);
    } catch (err) {
      console.error(err);
      alert('Error al subir el comprobante. Verifica que sea una imagen (JPG/PNG) menor a 5MB.');
    } finally {
      setUploadingReceipt(false);
    }
  };

  const fetchOrderStatus = async (code: string) => {
    if (!code || code.length !== 8) return;
    setIsSearching(true);
    setError(null);
    try {
      const response = await api.get(`/orders/track/${code}`);
      setOrder(response.data.data);
    } catch (err: any) {
      console.error(err);
      setOrder(null);
      setError(
        err?.response?.data?.message ||
        'No se pudo encontrar ningún pedido con el código de seguimiento ingresado. Por favor, verifica el código e intenta nuevamente.'
      );
    } finally {
      setIsSearching(false);
    }
  };
  /*
    useEffect(() => {
      const saved = localStorage.getItem('recent_orders');
      
      if (saved) {
        setRecentOrders(JSON.parse(saved));
      }
    }, []);
  */
  useEffect(() => {
    if (order && order.status === 'waiting_payment') {
      api.get('/payment-settings')
        .then(res => setPaymentSettings(res.data))
        .catch(err => console.error("Error cargando datos de transferencia:", err));
    } else {
      setPaymentSettings(null);
    }
  }, [order]);

  useEffect(() => {
    const codeFromUrl = searchParams.get('code');
    if (codeFromUrl && codeFromUrl.length === 8) {
      const upperCode = codeFromUrl.toUpperCase();
      setTrackingCode(upperCode);
      fetchOrderStatus(upperCode);
    } else {
      setOrder(null);
      setError(null);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.length !== 8) return;
    setSearchParams({ code: trackingCode.toUpperCase() });
  };

  // Orden lógica para la barra de seguimiento — incluye todos los estados del backend
  // (si deseas otro orden, ajústalo aquí)
  const ALL_STATUS_ORDER = [
    'revisando_solicitud',
    'waiting_payment',
    'payment_confirmed',
    'pending',
    'preparing',
    'in_transit',
    'delivered',
    'completed',
    'cancelled',
  ];

  const statusIconMap: Record<string, any> = {
    revisando_solicitud: Clock,
    waiting_payment: AlertTriangle,
    payment_confirmed: CheckCircle,
    pending: Clock,
    preparing: Package,
    in_transit: Truck,
    delivered: CheckCircle,
    completed: CheckCircle,
    cancelled: AlertTriangle,
  };

  const steps = ALL_STATUS_ORDER.map((id) => ({
    id,
    label: ORDER_STATUS_LABELS[id] ?? id,
    icon: statusIconMap[id] ?? Clock,
  }));

  const getStepIndex = (status: string) => steps.findIndex(s => s.id === status);
  const currentStepIndex = order ? getStepIndex(order.status) : -1;
  const currentStatusMessage = order ? (ORDER_STATUS_MESSAGES[order.status] ?? null) : null;

  return (
    <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif text-4xl font-bold text-wood-dark">Sigue tu Pedido</h1>
        <p className="mt-4 text-earth">Ingresa tu código de seguimiento de 8 caracteres para ver el estado de envío de tus muebles.</p>

        <form onSubmit={handleSearch} className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row max-w-2xl mx-auto">
          <Input
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
            placeholder="Ej. AB12CD34"
            maxLength={8}
            className="h-14 text-center text-xl tracking-widest sm:text-left"
          />
          <Button
            type="submit"
            size="lg"
            className="h-14 w-full sm:w-auto shrink-0"
            disabled={trackingCode.length !== 8 || isSearching}
            isLoading={isSearching}
          >
            <Search className="mr-2 h-5 w-5" /> Buscar
          </Button>
        </form>

        {recentOrders.length > 0 && !order && (
          <div className="mt-8 text-left max-w-2xl mx-auto rounded-sm border border-wood/10 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-wood-dark mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" /> Pedidos recientes guardados:
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {recentOrders.map((ro) => (
                <button
                  key={ro.code}
                  onClick={() => setSearchParams({ code: ro.code })}
                  className="px-3.5 py-1.5 text-sm bg-offWhite border border-wood/10 hover:border-gold hover:text-gold rounded-sm transition-all flex items-center gap-2"
                >
                  <span className="font-mono font-bold tracking-wider">{ro.code}</span>
                  <span className="text-earth/60 text-xs">({ro.date})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 mx-auto max-w-2xl flex items-start gap-3 rounded-sm border border-red-200 bg-red-50 p-4 text-left text-red-800"
          >
            <AlertTriangle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
            <div>
              <p className="font-semibold">Código no encontrado</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </motion.div>
        )}

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 rounded-sm border border-wood/10 bg-white p-8 shadow-lg text-center"
          >
            <h2 className="mb-8 font-serif text-2xl font-semibold text-wood-dark">Pedido: {order.tracking_code}</h2>

            <div className="relative flex flex-col gap-6 max-w-md mx-auto text-left mt-8 mb-8">
              {/* Línea vertical de fondo */}
              <div className="absolute left-6 top-4 bottom-4 -z-10 w-1 bg-wood/10"></div>

              {/* Línea vertical activa */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${currentStepIndex >= 0 ? (currentStepIndex / (steps.length - 1)) * 100 : 0}%` }}
                className="absolute left-6 top-4 -z-10 w-1 bg-gold origin-top"
              />

              {steps.map((step, index) => {
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                // Opcional: Si el pedido está cancelado, ocultamos los pasos "felices" posteriores para no confundir
                if (order.status === 'cancelled' && index > currentStepIndex) return null;

                return (
                  <div key={step.id} className="flex items-center gap-6 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 bg-white transition-colors ${isActive ? 'border-gold text-gold' : 'border-wood/20 text-earth/50'
                        } ${isCurrent ? 'ring-4 ring-gold/20 shadow-md' : ''}`}
                    >
                      <step.icon className="h-5 w-5" />
                    </motion.div>

                    <div className="flex flex-col flex-1">
                      <span className={`text-base sm:text-lg font-bold ${isActive ? 'text-wood-dark' : 'text-earth/50'}`}>
                        {step.label}
                      </span>

                      {/* Si es el paso actual, mostramos el mensaje detallado */}
                      {isCurrent && (
                        <div className="flex flex-col gap-2 mt-1">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-sm text-earth leading-relaxed bg-offWhite p-3 rounded-sm border border-wood/10 block"
                          >
                            {ORDER_STATUS_MESSAGES[step.id]}
                          </motion.span>

                          {/* INYECCIÓN DINÁMICA: Si el paso actual es waiting_payment y ya cargaron los datos, mostramos el CVU */}
                          {step.id === 'waiting_payment' && paymentSettings && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                              <CvuDisplay
                                cvu={paymentSettings.cvu}
                                alias={paymentSettings.alias}
                                holderName={paymentSettings.holder_name}
                              />
                              {/* ZONA DE SUBIDA DE COMPROBANTE */}
                              <div className="mt-4 p-4 border border-wood/20 border-dashed rounded-sm bg-offWhite/50">
                                <p className="text-sm text-wood-dark font-medium mb-2">Adjuntar Comprobante de Pago</p>

                                {order.receipt_url && (
                                  <p className="text-xs text-green-600 mb-3 font-medium">
                                    ✓ Ya has subido un comprobante. Subir otro reemplazará el actual.
                                  </p>
                                )}

                                <label className="flex items-center justify-center w-full p-3 border border-wood/30 bg-white cursor-pointer hover:bg-wood/5 transition-colors rounded-sm text-sm text-earth">
                                  {uploadingReceipt ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Subiendo...</>
                                  ) : (
                                    <><UploadCloud className="w-4 h-4 mr-2" /> {order.receipt_url ? 'Cambiar Imagen' : 'Seleccionar Imagen'}</>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleReceiptUpload}
                                    disabled={uploadingReceipt}
                                  />
                                </label>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-wood/10 pt-10 mt-10 text-left">
              {/* Columna Izquierda: Información de Envío */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-wood-dark flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gold" /> Detalles de Envío
                </h3>
                <div className="rounded-sm bg-offWhite p-4 space-y-3 text-sm text-earth">
                  <p><strong className="text-wood-dark">Dirección de entrega:</strong><br />{order.shipping_address}</p>
                  <p>
                    <strong className="text-wood-dark">Fecha del pedido:</strong><br />
                    {new Date(order.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p>
                    <strong className="text-wood-dark">Estado actual:</strong><br />
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold/10 text-gold-dark">
                      {steps[currentStepIndex]?.label || order.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Columna Derecha: Detalle de Productos */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-wood-dark flex items-center gap-2">
                  <List className="h-5 w-5 text-gold" /> Productos en tu Pedido
                </h3>
                <div className="rounded-sm border border-wood/10 bg-white p-4 space-y-3 overflow-y-auto" style={{ maxHeight: 260 }}>
                  {order.items && order.items.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center text-sm border-b border-wood/5 pb-2 last:border-0 last:pb-0">
                      <div className="pr-4">
                        <p className="font-medium text-wood-dark">{item.product_name}</p>
                        <p className="text-xs text-earth">Cant: {item.quantity} x ${item.price.toFixed(2)}</p>
                      </div>
                      <span className="font-semibold text-wood-dark shrink-0">${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 font-bold text-base border-t border-wood/10 text-wood-dark">
                    <span>Total del Pedido</span>
                    <span>${order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
