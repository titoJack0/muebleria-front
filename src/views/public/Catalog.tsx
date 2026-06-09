import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';

const BACKEND_URL = 'http://127.0.0.1:8000';

const WOOD_TYPES = [
  { label: 'Roble', value: 'Oak' },
  { label: 'Nogal', value: 'Walnut' },
  { label: 'Pino', value: 'Pine' },
  { label: 'Caoba', value: 'Mahogany' },
  { label: 'Cedro', value: 'Cedar' }
];

const translateCategoryName = (name: string) => {
  const translations: Record<string, string> = {
    'Tables': 'Mesas',
    'Chairs': 'Sillas',
    'Beds': 'Camas',
  };
  return translations[name] || name;
};

const translateWoodType = (type?: string) => {
  if (!type) return '';
  const translations: Record<string, string> = {
    'Oak': 'Roble',
    'Walnut': 'Nogal',
    'Pine': 'Pino',
    'Mahogany': 'Caoba',
    'Cedar': 'Cedro',
  };
  return translations[type] || type;
};

export const Catalog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedWood, setSelectedWood] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { categories, loading: catLoading } = useCategories();
  const { products, loading: prodLoading, total } = useProducts(
    page,
    15,
    selectedCategory,
    selectedWood,
    selectedStatus,
    minPrice,
    maxPrice,
    search
  );

  const { addToCart } = useCart();
  const isLoading = catLoading || prodLoading;
  const totalPages = Math.ceil(total / 15);

  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory(undefined);
    setSelectedWood(undefined);
    setSelectedStatus(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header del Catálogo */}
      <div className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-bold text-wood-dark md:text-5xl">Nuestra Colección</h1>
        <p className="mt-4 text-earth">Explore nuestra gama de muebles de madera premium de la más alta calidad.</p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Barra Lateral de Filtros */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 rounded-sm border border-wood/10 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between border-b border-wood/10 pb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-wood" />
                <h2 className="font-serif text-lg font-semibold text-wood-dark">Filtros</h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-8 px-2 text-xs gap-1 text-earth hover:text-wood-dark"
                title="Limpiar filtros"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Limpiar
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Búsqueda */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-wood-dark">Buscar</h3>
                <div className="relative">
                  <Input
                    placeholder="Buscar productos..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-earth/50" />
                </div>
              </div>

              {/* Categorías */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-wood-dark">Categoría</h3>
                <select
                  className="w-full rounded border border-wood/20 bg-white p-2 text-sm focus:border-wood focus:outline-none"
                  value={selectedCategory ?? ''}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value || undefined);
                    setPage(1);
                  }}
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {translateCategoryName(cat.name)}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Tipo de Madera */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-wood-dark">Tipo de Madera</h3>
                <select
                  className="w-full rounded border border-wood/20 bg-white p-2 text-sm focus:border-wood focus:outline-none"
                  value={selectedWood ?? ''}
                  onChange={(e) => {
                    setSelectedWood(e.target.value || undefined);
                    setPage(1);
                  }}
                >
                  <option value="">Todos los tipos</option>
                  {WOOD_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rango de Precio */}
              <div>
                <h3 className="mb-3 text-sm font-medium text-wood-dark">Precio</h3>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Mín"
                    value={minPrice ?? ''}
                    onChange={(e) => {
                      setMinPrice(e.target.value ? Number(e.target.value) : undefined);
                      setPage(1);
                    }}
                    className="w-1/2"
                  />
                  <Input
                    type="number"
                    placeholder="Máx"
                    value={maxPrice ?? ''}
                    onChange={(e) => {
                      setMaxPrice(e.target.value ? Number(e.target.value) : undefined);
                      setPage(1);
                    }}
                    className="w-1/2"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Rejilla de Productos */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 animate-pulse rounded-sm bg-wood/5"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white border border-wood/10 rounded-sm">
              <p className="text-earth text-lg">No se encontraron productos con los filtros seleccionados.</p>
              <Button onClick={handleClearFilters} className="mt-4 bg-gold text-deepBlack hover:bg-gold/80">
                Limpiar Filtros
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => {
                  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
                  const imageUrl = primaryImage ? `${BACKEND_URL}${primaryImage.url}` : null;
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex flex-col rounded-sm border border-wood/10 bg-white p-4 shadow-sm transition-all hover:shadow-lg"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-offWhite">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-earth/50 text-sm">
                            Sin Imagen
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex flex-1 flex-col">
                        <h3 className="font-serif text-lg font-semibold text-wood-dark group-hover:text-gold transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-earth">{translateWoodType(product.wood_type)}</p>
                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <span className="text-lg font-medium text-wood">${product.price.toFixed(2)}</span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => addToCart(product, 1)}
                          >
                            Añadir al Carrito
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" /> Anterior
                  </Button>
                  <span className="text-sm font-medium text-wood-dark">
                    Página {page} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    className="gap-1"
                  >
                    Siguiente <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
