import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';

// URL base de tu backend para las imágenes (ajústala si es diferente)
const BACKEND_URL = 'http://127.0.0.1:8000';

export const Home: React.FC = () => {
  const { products, loading: isLoading } = useProducts(1, 9);
  const { addToCart } = useCart();
  const featured = products.slice(0, 3);

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">Cargando...</div>
      )}
      {!isLoading && (
        <div className="flex flex-col">
          {/* Hero Section */}
          <section className="relative flex h-[85vh] w-full items-center justify-center overflow-hidden bg-wood-dark">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-deepBlack/80 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=2500&auto=format&fit=crop"
                alt="Luxury Interior"
                className="h-full w-full object-cover opacity-60"
              />
            </div>

            <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-2xl"
              >
                <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
                  Eleva Tu <br />
                  <span className="text-gold">Espacio Vital</span>
                </h1>
                <p className="mt-6 text-lg text-offWhite/80 md:text-xl">
                  Descubre nuestra exclusiva colección de muebles de madera artesanales.
                  Diseñados para la elegancia, construidos para generaciones.
                </p>
                <div className="mt-10 flex gap-4">
                  <Link to="/catalog">
                    <Input placeholder="Buscar productos..." className="pl-9" />
                    <Button size="lg" className="gap-2 bg-gold text-deepBlack hover:bg-gold/80">
                      Ver Colección <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Featured Products Section */}
          <section className="bg-offWhite py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12 flex items-end justify-between">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-wood-dark md:text-4xl">
                    Piezas Destacadas
                  </h2>
                  <p className="mt-2 text-earth">Nuestros diseños más populares y exquisitos.</p>
                </div>
                <Link to="/catalog" className="hidden text-wood hover:text-gold md:block font-medium">
                  Ver Todos los Productos
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((product) => {
                  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
                  const imageUrl = primaryImage ? `${BACKEND_URL}${primaryImage.url}` : null;
                  return (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -10 }}
                      className="group cursor-pointer rounded-sm bg-white p-4 shadow-sm transition-shadow hover:shadow-xl border border-wood/5"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-sm bg-wood/5">
                        <Button 
                           size="sm" 
                           variant="outline"
                           onClick={() => addToCart(product, 1)}
                         >
                           Añadir al Carrito
                         </Button>
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-earth/50 text-sm">
                            Imagen no disponible
                          </div>
                        )}
                      </div>
                      <div className="mt-6">
                        <h3 className="font-serif text-xl font-semibold text-wood-dark group-hover:text-gold transition-colors">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-earth">{product.wood_type}</p>
                        <p className="mt-3 text-lg font-medium text-wood">${product.price.toFixed(2)}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};