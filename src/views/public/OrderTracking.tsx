import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, CheckCircle, Truck, Clock } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

// Vista de Rastreo Público de Pedidos
export const OrderTracking: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.length !== 8) return;
    
    setIsSearching(true);
    // Simular llamada a API
    setTimeout(() => {
      setOrderStatus('in_transit');
      setIsSearching(false);
    }, 1500);
  };

  const steps = [
    { id: 'pending', label: 'Pending', icon: Clock },
    { id: 'preparing', label: 'Preparing', icon: Package },
    { id: 'in_transit', label: 'In Transit', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const getStepIndex = (status: string) => steps.findIndex(s => s.id === status);
  const currentStepIndex = orderStatus ? getStepIndex(orderStatus) : -1;

  return (
    <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold text-wood-dark">Track Your Order</h1>
        <p className="mt-4 text-earth">Enter your 8-digit tracking code to see the status of your luxury furniture delivery.</p>

        <form onSubmit={handleSearch} className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row">
          <Input 
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
            placeholder="e.g. AB12CD34"
            maxLength={8}
            className="h-14 text-center text-xl tracking-widest sm:text-left"
          />
          <Button 
            type="submit" 
            size="lg" 
            className="h-14 w-full sm:w-auto"
            disabled={trackingCode.length !== 8 || isSearching}
            isLoading={isSearching}
          >
            <Search className="mr-2 h-5 w-5" /> Track
          </Button>
        </form>

        {orderStatus && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 rounded-sm border border-wood/10 bg-white p-8 shadow-lg"
          >
            <h2 className="mb-8 font-serif text-2xl font-semibold text-wood-dark">Order Status: {trackingCode}</h2>
            
            <div className="relative flex justify-between">
              {/* Barra de progreso de fondo */}
              <div className="absolute left-0 top-1/2 -z-10 h-1 w-full -translate-y-1/2 bg-wood/10"></div>
              
              {/* Barra de progreso activa */}
              <motion.div 
                initial={{ w: 0 }}
                animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                className="absolute left-0 top-1/2 -z-10 h-1 -translate-y-1/2 bg-gold"
              />

              {steps.map((step, index) => {
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-4 bg-white transition-colors ${
                        isActive ? 'border-gold text-gold' : 'border-wood/20 text-earth/50'
                      } ${isCurrent ? 'ring-4 ring-gold/20' : ''}`}
                    >
                      <step.icon className="h-5 w-5" />
                    </motion.div>
                    <span className={`mt-3 text-sm font-medium ${isActive ? 'text-wood-dark' : 'text-earth/50'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
