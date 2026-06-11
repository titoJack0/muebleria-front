import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import api from '../../services/api';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

// Paso 1: Email y Código Postal
interface Step1Data {
  email: string;
  postalCode: string;
}

// Paso 2: Datos del destinatario
interface RecipientData {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  number: string;
  department?: string;
  neighborhood?: string;
  city: string;
}

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<Step1Data>({ email: '', postalCode: '' });
  const [recipient, setRecipient] = useState<RecipientData>({
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    number: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      // Construir payload para el backend
        const payload = {
          email: step1.email,
          postal_code: step1.postalCode,
          recipient_name: recipient.firstName,
          recipient_last_name: recipient.lastName,
          phone: recipient.phone,
          street: recipient.street,
          number: recipient.number,
          apartment: recipient.department ?? '',
          neighborhood: recipient.neighborhood ?? '',
          city: recipient.city,
          shipping_address: `${recipient.street} ${recipient.number}${recipient.department ? ', ' + recipient.department : ''}, ${recipient.city}`,
          items: items.map(i => ({ product_id: i.product.id, quantity: i.quantity })),
        };
      const response = await api.post('/orders/guest', payload);
      const order = response.data.data;

      // Guardar el código de seguimiento en localStorage para consultas futuras
      const recentOrders = JSON.parse(localStorage.getItem('recent_orders') || '[]');
      if (!recentOrders.some((o: any) => o.code === order.tracking_code)) {
        recentOrders.unshift({
          code: order.tracking_code,
          date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
          total: order.total_amount,
        });
        localStorage.setItem('recent_orders', JSON.stringify(recentOrders.slice(0, 5))); // Guardar últimos 5 pedidos
      }

      clearCart();
      navigate(`/track?code=${order.tracking_code}`);
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Error al crear el pedido');
    } finally {
      setLoading(false);
    }
  };

  if (step === 1) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Iniciar compra</h2>

        <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
          <Input
            label="Correo electrónico"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={step1.email}
            onChange={e => setStep1({ ...step1, email: e.target.value })}
            required={true}
          />
          <Input
            label="Código postal"
            placeholder="Código postal"
            value={step1.postalCode}
            onChange={e => setStep1({ ...step1, postalCode: e.target.value })}
            required={true}
          />
          <Button type="submit" className="mt-4" size="lg">Continuar</Button>
        </form>
      </div>
    );
  }

  // Paso 2: datos del destinatario
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Datos del destinatario</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form
        onSubmit={e => {
          e.preventDefault();
          handlePayment();
        }}
      >
        <Input
          label="Nombre"
          placeholder="Juan"
          value={recipient.firstName}
          onChange={e => setRecipient({ ...recipient, firstName: e.target.value })}
          required={true}
        />
        <Input
          label="Apellido"
          placeholder="Pérez"
          value={recipient.lastName}
          onChange={e => setRecipient({ ...recipient, lastName: e.target.value })}
          required={true}
        />
        <Input
          label="Teléfono"
          placeholder="+54 9 11 1234-5678"
          value={recipient.phone}
          onChange={e => setRecipient({ ...recipient, phone: e.target.value })}
          required={true}
        />
        <Input
          label="Calle"
          placeholder="Av. Siempre Viva"
          value={recipient.street}
          onChange={e => setRecipient({ ...recipient, street: e.target.value })}
          required={true}
        />
        <Input
          label="Número"
          placeholder="123"
          value={recipient.number}
          onChange={e => setRecipient({ ...recipient, number: e.target.value })}
          required={true}
        />
        <Input
          label="Departamento (opcional)"
          placeholder="Piso 2, Dpto A"
          value={recipient.department ?? ''}
          onChange={e => setRecipient({ ...recipient, department: e.target.value })}
        />
        <Input
          label="Barrio (opcional)"
          placeholder="Palermo"
          value={recipient.neighborhood ?? ''}
          onChange={e => setRecipient({ ...recipient, neighborhood: e.target.value })}
        />
        <Input
          label="Ciudad"
          placeholder="Buenos Aires"
          value={recipient.city}
          onChange={e => setRecipient({ ...recipient, city: e.target.value })}
          required={true}
        />
        <Button type="submit" className="mt-4" size="lg" isLoading={loading} disabled={loading}>
          Confirmar compra
        </Button>
      </form>
    </div>
  );
};
