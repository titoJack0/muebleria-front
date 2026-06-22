import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, RotateCcw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
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

// COMPONENTE: Tarjeta de Producto Estrella Estilo Pokémon 3D con Brillo Holográfico
const StarProductCard: React.FC<{ product: any; addToCart: any }> = ({ product, addToCart }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineX, setShineX] = useState(50);
  const [shineY, setShineY] = useState(50);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;

    // Calcular inclinación 3D basándose en la posición del puntero
    const rX = -(y - box.height / 2) / (box.height / 12);
    const rY = (x - box.width / 2) / (box.width / 12);

    setRotateX(rX);
    setRotateY(rY);

    // Coordenadas dinámicas para el reflejo/brillo
    setShineX((x / box.width) * 100);
    setShineY((y / box.height) * 100);
    setOpacity(0.65);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setOpacity(0);
  };

  const primaryImage = product.images?.find((img: any) => img.is_primary) || product.images?.[0];
  const imageUrl = primaryImage ? `${BACKEND_URL}${primaryImage.url}` : null;

  return (
    <div className="w-full select-none" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative bg-premium-primary text-white rounded-2xl p-5 shadow-premium border border-white/10 overflow-hidden cursor-pointer group"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Capa Holográfica de Brillo y Destello */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-300 z-20"
          style={{
            opacity: opacity,
            background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.45) 0%, rgba(209,141,108,0.25) 35%, transparent 70%), linear-gradient(${shineX + shineY}deg, transparent 20%, rgba(210,142,116,0.2) 50%, transparent 80%)`,
          }}
        />

        {/* Marco de Línea Dorada Premium */}
        <div className="absolute inset-2 border border-premium-accent/30 rounded-xl pointer-events-none z-10 group-hover:border-premium-accent/70 transition-colors duration-300" />

        {/* Contenedor de la Imagen Flotante */}
        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5 border border-white/10 mb-5 z-10 shadow-inner"
          style={{ transform: 'translateZ(30px)' }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">Sin Imagen</div>
          )}

          <span className="absolute top-3 right-3 bg-premium-accent text-white font-serif text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md border border-white/20 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-white fill-white" /> Destacado
          </span>
        </div>

        {/* Textos y Acciones Flotantes en Capa Superior */}
        <div className="z-10 relative" style={{ transform: 'translateZ(45px)' }}>
          <span className="text-premium-accent font-bold tracking-widest uppercase text-[10px]">
            {translateWoodType(product.wood_type) || 'Madera de Ingeniería'}
          </span>
          <h3 className="font-serif text-xl font-bold text-white tracking-wide mt-1 truncate">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
            <span className="text-xl font-bold text-premium-light font-sans">${product.price.toFixed(2)}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="px-4 py-2 bg-premium-accent hover:bg-premium-hover text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors duration-200 shadow-md"
            >
              Añadir
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Catalog: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedWood, setSelectedWood] = useState<string | undefined>(undefined);
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [page, setPage] = useState(1);

  const { categories, loading: catLoading } = useCategories();

  // Mapeo dinámico simple para rangos de precio limpios
  let minPrice: number | undefined = undefined;
  let maxPrice: number | undefined = undefined;
  if (selectedPriceRange === 'low') { maxPrice = 50000; }
  else if (selectedPriceRange === 'mid') { minPrice = 50000; maxPrice = 150000; }
  else if (selectedPriceRange === 'high') { minPrice = 150000; }

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
    setSelectedPriceRange('');
    setPage(1);
  };

  // Tomamos los primeros 3 productos de la lista general como los "Productos Estrella"
  const starProducts = products ? products.filter(p => p.is_featured) : [];

  return (
    <div className="container mx-auto px-4 py-28 sm:px-6 lg:px-8 antialiased font-sans text-premium-text">

      {/* Encabezado Principal */}
      <div className="mb-16 text-center">
        <span className="text-premium-accent font-bold tracking-widest uppercase text-xs block mb-3">Catálogo Técnico</span>
        <h1 className="font-serif text-4xl font-bold text-premium-primary md:text-5xl tracking-tight">Nuestra Colección</h1>
        <p className="mt-4 text-premium-text/70 font-light max-w-xl mx-auto text-base">Materiales nobles seleccionados y estacionados bajo los más estrictos controles de calidad estructural.</p>
      </div>

      {/* SECCIÓN NUEVA: PRODUCTOS ESTRELLA (Se muestra al inicio si no hay búsqueda activa) */}
      {!search && !selectedCategory && !selectedWood && !selectedPriceRange && starProducts.length > 0 && (
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8 border-b border-premium-light/30 pb-4">
            <Sparkles className="w-5 h-5 text-premium-accent fill-premium-accent" />
            <h2 className="font-serif text-2xl font-bold text-premium-primary tracking-tight">Productos Estrella</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {starProducts.map((product) => (
              <StarProductCard key={`star-${product.id}`} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}

      {/* Contenido Divisional: Filtros + Listado */}
      <div className="flex flex-col gap-10 lg:flex-row items-start">

        {/* Filtros Premium */}
        <aside className="w-full lg:w-72 flex-shrink-0 sticky top-28 z-30">
          <div className="rounded-2xl border border-premium-light/40 bg-white p-6 shadow-soft">
            <div className="mb-6 flex items-center justify-between border-b border-premium-light/20 pb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-premium-primary" />
                <h3 className="font-serif text-lg font-bold text-premium-primary">Filtros</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-8 px-2.5 text-xs font-semibold gap-1 text-premium-text/60 hover:text-premium-accent"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Limpiar
              </Button>
            </div>

            <div className="space-y-6">
              {/* Búsqueda */}
              <div>
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-premium-primary">Búsqueda</h4>
                <div className="relative">
                  <Input
                    placeholder="Buscar madera o mueble..."
                    className="pl-9 h-11 text-sm rounded-lg"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                  <Search className="absolute left-3 top-3.5 h-4 w-4 text-premium-text/40" />
                </div>
              </div>

              {/* Categorías */}
              <div>
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-premium-primary">Categoría</h4>
                <select
                  className="w-full rounded-lg border border-premium-light bg-white p-3 text-sm focus:border-premium-accent focus:outline-none transition-colors"
                  value={selectedCategory ?? ''}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value || undefined);
                    setPage(1);
                  }}
                >
                  <option value="">Todas las líneas</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {translateCategoryName(cat.name)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de Madera */}
              <div>
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-premium-primary">Variedad Botánica</h4>
                <select
                  className="w-full rounded-lg border border-premium-light bg-white p-3 text-sm focus:border-premium-accent focus:outline-none transition-colors"
                  value={selectedWood ?? ''}
                  onChange={(e) => {
                    setSelectedWood(e.target.value || undefined);
                    setPage(1);
                  }}
                >
                  <option value="">Todas las maderas</option>
                  {WOOD_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rangos de Precio Preconfigurados */}
              <div>
                <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-premium-primary">Escala de Precios</h4>
                <select
                  className="w-full rounded-lg border border-premium-light bg-white p-3 text-sm focus:border-premium-accent focus:outline-none transition-colors"
                  value={selectedPriceRange}
                  onChange={(e) => {
                    setSelectedPriceRange(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Todos los valores</option>
                  <option value="low">Hasta $50,000</option>
                  <option value="mid">$50,000 a $150,000</option>
                  <option value="high">Más de $150,000</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* Listado de Productos Estándar */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-8 border-b border-premium-light/20 pb-4">
            <h2 className="font-serif text-2xl font-bold text-premium-primary tracking-tight">
              {search || selectedCategory || selectedWood || selectedPriceRange ? 'Resultados de Búsqueda' : 'Colección Completa'}
            </h2>
            <span className="text-xs bg-premium-light/20 text-premium-primary font-bold px-2 py-0.5 rounded-md ml-1">
              {total} piezas
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-premium-light/10"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-white border border-premium-light/30 rounded-2xl shadow-soft">
              <p className="text-premium-text/70 font-light text-lg">No se hallaron materiales bajo los criterios indicados.</p>
              <Button onClick={handleClearFilters} className="mt-5 bg-premium-accent hover:bg-premium-hover text-white rounded-md font-bold px-6">
                Restaurar Catálogo
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
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex flex-col rounded-2xl border border-premium-light/30 bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-premium"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-premium-light/5">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-premium-text/30 text-xs">
                            Sin Imagen Técnico
                          </div>
                        )}
                      </div>
                      <div className="mt-5 flex flex-1 flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-premium-accent">
                          {translateWoodType(product.wood_type) || 'Madera Clasificada'}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-premium-primary mt-0.5 group-hover:text-premium-accent transition-colors truncate">
                          {product.name}
                        </h3>
                        <div className="mt-auto pt-5 flex items-center justify-between border-t border-premium-light/10">
                          <span className="text-lg font-bold text-premium-primary">${product.price.toFixed(2)}</span>
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="px-4 py-2 border border-premium-light hover:border-premium-accent hover:bg-premium-accent text-premium-primary hover:text-white text-xs font-semibold rounded-md transition-all duration-200"
                          >
                            Añadir
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="gap-1 border-premium-light hover:bg-premium-light/10 rounded-md"
                  >
                    <ChevronLeft className="h-4 w-4" /> Anterior
                  </Button>
                  <span className="text-sm font-semibold text-premium-primary">
                    Página {page} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    className="gap-1 border-premium-light hover:bg-premium-light/10 rounded-md"
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