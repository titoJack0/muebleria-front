import { useState, useEffect } from 'react';
import api from '../services/api';

export type Image = { id: number; url: string; is_primary: boolean };
export type Category = { id: number; name: string; slug: string };
export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  dimensions?: string;
  wood_type?: string;
  status: string;
  category: Category;
  images: Image[];
};

export const useProducts = (
  page = 1,
  perPage = 15,
  category?: string,
  woodType?: string,
  status?: string,
  minPrice?: number,
  maxPrice?: number,
  search?: string,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const qp = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
    });
    if (category) qp.append('category', category);
    if (woodType) qp.append('wood_type', woodType);
    if (status) qp.append('status', status);
    if (minPrice !== undefined) qp.append('min_price', String(minPrice));
    if (maxPrice !== undefined) qp.append('max_price', String(maxPrice));
    if (search) qp.append('search', search);
    api
      .get(`/products?${qp.toString()}`)
      .then((res) => {
        setProducts(res.data.data);
        setTotal(res.data.meta?.total ?? 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, perPage, category, woodType, status, minPrice, maxPrice, search]);
  return { products, loading, total };
};
