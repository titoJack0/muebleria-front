export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'employee' | 'delivery';
}

// 1. Agrega esta nueva interfaz para representar el objeto de cada imagen
export interface ProductImage {
  id: number;
  url: string;
  is_primary: boolean;
}

// 2. Modifica la categoría si es que vas a tipar el objeto completo que viene del backend
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  dimensions: string;
  wood_type: string;
  status: 'active' | 'draft';
  // 3. CAMBIO AQUÍ: Cambia string[] por el array de objetos ProductImage
  images: ProductImage[];
  // Opcional: Tu backend también devuelve el objeto category completo, por si lo necesitas:
  category?: Category;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: number;
  tracking_code: string;
  status: 'pending' | 'preparing' | 'in_transit' | 'delivered' | 'rejected';
  shipping_address: string;
  total: number;
  items: OrderItem[];
  created_at: string;
}