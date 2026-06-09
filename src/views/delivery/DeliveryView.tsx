import React from 'react';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

// Vista del Repartidor - Optimizada para dispositivos móviles
export const DeliveryView: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-offWhite p-4 pb-24">
      <header className="mb-6 pt-4 text-center">
        <h1 className="font-serif text-2xl font-bold text-wood-dark">My Deliveries</h1>
        <p className="text-sm text-earth">Today's assigned routes</p>
      </header>

      <div className="flex flex-col gap-4">
        {/* Tarjeta de Pedido Asignado */}
        <div className="rounded-xl border border-wood/10 bg-white p-5 shadow-lg">
          <div className="mb-4 flex items-center justify-between border-b border-wood/10 pb-4">
            <div>
              <span className="block text-xs font-medium uppercase tracking-wider text-earth">Order #101</span>
              <span className="font-serif text-lg font-bold text-wood-dark">John Doe</span>
            </div>
            <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
              Ready
            </span>
          </div>

          <div className="mb-6 flex gap-3 text-earth">
            <MapPin className="h-5 w-5 flex-shrink-0 text-wood" />
            <p className="text-sm leading-relaxed">
              123 Luxury Ave, Design District<br />
              City, State 12345
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="w-full gap-2 bg-wood hover:bg-wood-light" size="lg">
              <Navigation className="h-5 w-5" /> Start Journey
            </Button>
            <Button className="w-full gap-2" variant="outline" size="lg">
              <CheckCircle className="h-5 w-5" /> Mark Delivered
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
