import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  isOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Proveedor del Carrito de Compras para manejar el estado global
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isOpen, setIsOpen] = useState(false);

  // Hook para sincronizar el estado del carrito con el localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Función para añadir un producto al carrito o incrementar su cantidad
  const addToCart = (product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true); // Abre el drawer al añadir un producto
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Función para actualizar la cantidad de un producto específico
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Función para vaciar completamente el carrito
  const clearCart = () => setItems([]);

  // Alterna la visibilidad del panel lateral del carrito
  const toggleCart = () => setIsOpen((prev) => !prev);

  // Calcula el total sumando el precio por la cantidad de cada item
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, isOpen, toggleCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para consumir el carrito de compras
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
