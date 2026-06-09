import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

// Panel lateral deslizable (Drawer) para mostrar el carrito de compras
export const Drawer: React.FC = () => {
  const { items, isOpen, toggleCart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart(); // Cierra el drawer
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay (Fondo oscuro) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-50 bg-deepBlack/50 backdrop-blur-sm"
          />

          {/* Panel Lateral */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-offWhite shadow-2xl"
          >
            {/* Header del Drawer */}
            <div className="flex items-center justify-between border-b border-wood/20 p-4 sm:p-6">
              <h2 className="font-serif text-2xl font-bold text-wood-dark">Tu Carrito</h2>
              <button
                onClick={toggleCart}
                className="rounded-full p-2 text-wood transition-colors hover:bg-wood/10"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Lista de Productos */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-earth">
                  <ShoppingBag className="h-12 w-12 mb-4 text-wood/30" />
                  <p>Tu carrito está vacío.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      {/* Imagen simulada del producto */}
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-white border border-wood/10">
                        {item.product.image_url ? (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-wood/5 text-xs text-wood">Sin Imagen</div>
                        )}
                      </div>

                      {/* Detalles del Producto */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-medium text-wood-dark">{item.product.name}</h3>
                          <p className="text-sm text-earth">${item.product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-sm border border-wood/20">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 text-wood hover:bg-wood/10"
                            >
                              -
                            </button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-wood hover:bg-wood/10"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer del Drawer (Total y Checkout) */}
            {items.length > 0 && (
              <div className="border-t border-wood/20 bg-white p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between text-lg font-bold text-wood-dark">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full text-lg" size="lg" onClick={handleCheckout}>
                  Iniciar compra
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
