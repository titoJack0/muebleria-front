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
    <div className="text-left w-full">
      <div className="flex items-center gap-3 mb-6 bg-surface p-4 rounded-md border border-border">
        <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
        <p className="font-serif text-xl text-primary font-medium">{text}</p>
      </div>

      <details className="mt-4 text-sm text-textColor/80 bg-white border border-border rounded-md group">
        <summary className="font-medium cursor-pointer p-4 hover:bg-surface transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md list-none flex justify-between items-center">
          Ver seguimiento detallado de estados
          <span className="text-accent group-open:rotate-180 transition-transform duration-300">▼</span>
        </summary>
        <ul className="p-4 pt-0 space-y-4 border-t border-border mt-2">
          {Object.keys(ORDER_STATUS_MESSAGES).map((s) => (
            <li key={s} className="flex flex-col md:flex-row md:items-baseline md:gap-4 relative pl-4 border-l-2 border-border/50">
              <span className={`absolute left-[-5px] top-2 h-2 w-2 rounded-full ${status === s ? 'bg-accent ring-4 ring-accent/20' : 'bg-border'}`} />
              <span style={{ minWidth: 160 }} className={`inline-block font-medium ${status === s ? 'text-accent' : 'text-primary'}`}>
                {ORDER_STATUS_LABELS[s] ?? s}
              </span>
              <span className={`leading-relaxed ${status === s ? 'text-textColor font-medium' : 'text-textColor/70'}`}>
                {ORDER_STATUS_MESSAGES[s]}
              </span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default OrderStatus;
