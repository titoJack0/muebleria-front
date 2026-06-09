import { useState, useEffect } from 'react';
import api from '../services/api';

export type Category = {
  id: number;
  name: string;
  slug: string;
  description?: string;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/categories')
      .then((res) => {
        // API may return { data: [] } or direct array
        const data = res.data?.data ?? res.data;
        setCategories(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
};
