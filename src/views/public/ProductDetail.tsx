import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';
import api from '../../services/api';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product details from API based on slug
  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await api.get(`/products/${slug}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/catalog" className="mb-8 inline-flex items-center gap-2 text-sm text-wood hover:text-gold transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Galería de Imágenes */}
        <div className="flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square w-full overflow-hidden rounded-sm bg-wood/5 border border-wood/10 flex items-center justify-center text-earth"
          >
            Main Product Image
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square w-full cursor-pointer overflow-hidden rounded-sm bg-wood/5 border border-wood/10 flex items-center justify-center text-xs text-earth hover:border-gold transition-colors">
                Thumb {i}
              </div>
            ))}
          </div>
        </div>

        {/* Detalles del Producto */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="font-serif text-4xl font-bold text-wood-dark sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-medium text-wood">${product.price.toFixed(2)}</p>

            <div className="mt-8 border-t border-wood/10 pt-8">
              <p className="text-base leading-relaxed text-earth">{product.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-wood/10 pt-8">
              <div>
                <h3 className="text-sm font-semibold text-wood-dark">Wood Type</h3>
                <p className="mt-1 text-earth">{product.wood_type}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-wood-dark">Dimensions</h3>
                <p className="mt-1 text-earth">{product.dimensions}</p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-wood/10 pt-8">
              <div className="flex items-center rounded-sm border border-wood/30 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-wood hover:bg-wood/5"
                >
                  -
                </button>
                <span className="px-4 text-wood-dark font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 text-wood hover:bg-wood/5"
                >
                  +
                </button>
              </div>
              
              <Button 
                size="lg" 
                className="flex-1 text-lg"
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-wood">
              <Check className="h-5 w-5 text-olive" />
              {product.stock > 0 ? `${product.stock} in stock - Ready to ship` : 'Out of stock'}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
