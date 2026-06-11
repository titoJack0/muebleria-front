import React from 'react';

interface Order {
  status: string;
  // Additional fields can be added as needed
}

interface Props {
  order?: Order | null;
}

export const ORDER_STATUS_MESSAGES: Record<string, string> = {
  revisando_solicitud: 'Estamos revisando tu pedido, nos pondremos en contacto contigo para continuar.',
  waiting_payment: 'Tu pedido está aprobado. Por favor realiza el depósito al CVU indicado.',
  payment_confirmed: '¡Pago recibido! Estamos procesando tu pedido.',
  pending: 'Pedido registrado y pendiente de ser aceptado.',
  preparing: 'Estamos preparando tu pedido para su envío.',
  in_transit: 'Tu pedido está en camino. Pronto llegará a su destino.',
  delivered: 'Pedido entregado al destinatario.',
  cancelled: 'Pedido cancelado. Si crees que esto es un error, contacta soporte.',
  completed: 'Pedido finalizado. Gracias por tu compra.',
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  revisando_solicitud: 'Revisando solicitud',
  waiting_payment: 'Esperando pago',
  payment_confirmed: 'Pago confirmado',
  pending: 'Pendiente',
  preparing: 'Preparando',
  in_transit: 'En camino',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  completed: 'Completado',
};

export const OrderStatus: React.FC<Props> = ({ order }) => {
  const status = order?.status;
  const text = status ? (ORDER_STATUS_MESSAGES[status] ?? status) : 'No hay información de estado.';

  return (
    <div>
      <p className="order-status-text" style={{ margin: '1rem 0' }}>{text}</p>

      <details className="mt-2 text-sm text-earth">
        <summary className="font-medium cursor-pointer">Ver todos los estados posibles</summary>
        <ul className="mt-3 space-y-2">
          {Object.keys(ORDER_STATUS_MESSAGES).map((s) => (
            <li key={s} className="flex flex-col md:flex-row md:items-baseline md:gap-3">
              <span style={{ minWidth: 170 }} className="inline-block font-medium text-wood-dark">{ORDER_STATUS_LABELS[s] ?? s}</span>
              <span className="text-earth">{ORDER_STATUS_MESSAGES[s]}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default OrderStatus;
