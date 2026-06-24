import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, RotateCcw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';

const BACKEND_URL = 'http://127.0.0.1:8000'; //[cite: 1]

const WOOD_TYPES = [
  { label: 'Roble', value: 'Oak' }, //[cite: 1]
  { label: 'Nogal', value: 'Walnut' }, //[cite: 1]
  { label: 'Pino', value: 'Pine' }, //[cite: 1]
  { label: 'Caoba', value: 'Mahogany' }, //[cite: 1]
  { label: 'Cedro', value: 'Cedar' } //[cite: 1]
];

const translateCategoryName = (name: string) => { //[cite: 1]
  const translations: Record<string, string> = { //[cite: 1]
    'Tables': 'Mesas', //[cite: 1]
    'Chairs': 'Sillas', //[cite: 1]
    'Beds': 'Camas', //[cite: 1]
  };
  return translations[name] || name; //[cite: 1]
};

const translateWoodType = (type?: string) => { //[cite: 1]
  if (!type) return ''; //[cite: 1]
  const translations: Record<string, string> = { //[cite: 1]
    'Oak': 'Roble', //[cite: 1]
    'Walnut': 'Nogal', //[cite: 1]
    'Pine': 'Pino', //[cite: 1]
    'Mahogany': 'Caoba', //[cite: 1]
    'Cedar': 'Cedro', //[cite: 1]
  };
  return translations[type] || type; //[cite: 1]
};

// =========================================================================
// TARJETA ESTRELLA: EFECTO POKÉMON HOLOGRÁFICO PREMIUM (Simey Style)
// =========================================================================
const StarProductCard: React.FC<{ product: any; addToCart: any }> = ({ product, addToCart }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calcular posición porcentual del mouse
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;

    // Calcular rotación 3D (Invirtiendo los ejes como en el CodePen)
    const rotateY = ((x / rect.width) - 0.5) * 25; // Rotación max 12.5deg
    const rotateX = ((y / rect.height) - 0.5) * -25; // Rotación max -12.5deg

    // Inyectar variables CSS directamente para máxima fluidez a 60fps
    cardRef.current.style.setProperty('--px', `${px}%`);
    cardRef.current.style.setProperty('--py', `${py}%`);
    cardRef.current.style.setProperty('--rx', `${rotateX}deg`);
    cardRef.current.style.setProperty('--ry', `${rotateY}deg`);
    cardRef.current.style.setProperty('--card-opacity', '1');
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    // Volver a estado de reposo suavemente
    cardRef.current.style.setProperty('--rx', '0deg');
    cardRef.current.style.setProperty('--ry', '0deg');
    cardRef.current.style.setProperty('--card-opacity', '0');
    cardRef.current.style.setProperty('--px', '50%');
    cardRef.current.style.setProperty('--py', '50%');
  };

  const primaryImage = product.images?.find((img: any) => img.is_primary) || product.images?.[0]; //[cite: 1]
  const imageUrl = primaryImage ? `${BACKEND_URL}${primaryImage.url}` : null; //[cite: 1]

  return (
    <div className="w-full" style={{ perspective: '1500px' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-premium-primary text-white rounded-3xl p-6 border border-white/10 cursor-pointer group will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(var(--ry, 0deg)) rotateX(var(--rx, 0deg))',
          transition: 'transform 0.1s ease-out', // Transición rápida para el movimiento
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px rgba(209,141,108,calc(var(--card-opacity, 0) * 0.3))'
        }}
      >
        {/* ========================================================
            1. CAPA DE DESTELLO DIRECCIONAL (GLARE)
            Crea la luz blanca que sigue al puntero
            ======================================================== */}
        <div
          className="absolute inset-0 z-20 rounded-3xl pointer-events-none mix-blend-overlay"
          style={{
            opacity: 'var(--card-opacity, 0)',
            transition: 'opacity 0.4s ease-out',
            backgroundImage: `radial-gradient(
              farthest-corner circle at var(--px, 50%) var(--py, 50%),
              rgba(255, 255, 255, 0.8) 0%,
              rgba(255, 255, 255, 0.4) 30%,
              transparent 70%
            )`
          }}
        />

        {/* ========================================================
            2. CAPA HOLOGRÁFICA Y SPARKLES (EFECTO LOCAL)
            ======================================================== */}
        <div
          className="absolute inset-0 z-30 rounded-3xl pointer-events-none mix-blend-color-dodge"
          style={{
            opacity: 'calc(var(--card-opacity, 0) * 0.85)',
            transition: 'opacity 0.4s ease-out',
            backgroundBlendMode: 'overlay',
            backgroundImage: `
              url("/images/sparkles.gif"),  /* <-- RUTA LOCAL ACTUALIZADA */
              linear-gradient(
                125deg,
                transparent 15%,
                rgba(209, 141, 108, 0.5) 30%,  /* Terracota/Cobre (Acento) */
                rgba(210, 192, 169, 0.4) 45%,  /* Arena/Oro (Light) */
                rgba(164, 124, 92, 0.5) 60%,   /* Madera cálida */
                transparent 80%
              )
            `,
            backgroundPosition: '50% 50%, 50% 50%, calc(var(--px, 50%) * 2.5) calc(var(--py, 50%) * 2.5)',
            backgroundSize: '160%, 140%, 300% 300%',
            filter: 'brightness(1.1) contrast(1.1)'
          }}
        />

        {/* ========================================================
            3. CONTENIDO DE LA TARJETA EN 3D
            ======================================================== */}
        <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>

          {/* Marco Interior */}
          <div className="absolute -inset-3 border border-premium-accent/20 rounded-2xl pointer-events-none group-hover:border-premium-accent/60 transition-colors duration-500" />

          {/* Contenedor de Imagen */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5 border border-white/10 mb-6 shadow-inner group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-shadow duration-300">
            {imageUrl ? ( //[cite: 1]
              <img
                src={imageUrl} //[cite: 1]
                alt={product.name} //[cite: 1]
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">Sin Imagen</div> //[cite: 1]
            )}

            {/* Etiqueta Flotante */}
            <span
              className="absolute top-3 right-3 bg-gradient-to-r from-premium-accent to-[#b87556] text-white font-serif text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-lg border border-white/30 flex items-center gap-1.5"
              style={{ transform: 'translateZ(20px)' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white fill-white" /> Colección Premium
            </span>
          </div>

          {/* Textos y Botón Elevados */}
          <div style={{ transform: 'translateZ(30px)' }}>
            <span className="text-premium-light/90 font-bold tracking-widest uppercase text-[10px]">
              {translateWoodType(product.wood_type) || 'Madera Selecta'} {/*[cite: 1] */}
            </span>
            <h3 className="font-serif text-2xl font-bold text-white tracking-wide mt-1.5 truncate drop-shadow-md">
              {product.name} {/*[cite: 1] */}
            </h3>

            <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
              <span className="text-2xl font-bold text-premium-light font-sans tracking-tight drop-shadow-md">
                ${product.price.toFixed(2)} {/*[cite: 1] */}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1); //[cite: 1]
                }}
                className="px-5 py-2.5 bg-premium-accent text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(209,141,108,0.3)] group-hover:shadow-[0_0_25px_rgba(209,141,108,0.7)] group-hover:-translate-y-0.5"
              >
                Añadir a Obra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// =========================================================================
// VISTA PRINCIPAL DEL CATÁLOGO
// =========================================================================
export const Catalog: React.FC = () => {
  const [search, setSearch] = useState(''); //[cite: 1]
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined); //[cite: 1]
  const [selectedWood, setSelectedWood] = useState<string | undefined>(undefined); //[cite: 1]
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>(undefined); //[cite: 1]
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>(''); //[cite: 1]
  const [page, setPage] = useState(1); //[cite: 1]

  const { categories, loading: catLoading } = useCategories(); //[cite: 1]

  let minPrice: number | undefined = undefined; //[cite: 1]
  let maxPrice: number | undefined = undefined; //[cite: 1]
  if (selectedPriceRange === 'low') { maxPrice = 50000; }
  else if (selectedPriceRange === 'mid') { minPrice = 50000; maxPrice = 150000; }
  else if (selectedPriceRange === 'high') { minPrice = 150000; }

  const { products, loading: prodLoading, total } = useProducts( //[cite: 1]
    page, //[cite: 1]
    15, //[cite: 1]
    selectedCategory, //[cite: 1]
    selectedWood, //[cite: 1]
    selectedStatus, //[cite: 1]
    minPrice, //[cite: 1]
    maxPrice, //[cite: 1]
    search //[cite: 1]
  );

  const { addToCart } = useCart(); //[cite: 1]
  const isLoading = catLoading || prodLoading; //[cite: 1]
  const totalPages = Math.ceil(total / 15); //[cite: 1]

  const handleClearFilters = () => { //[cite: 1]
    setSearch(''); //[cite: 1]
    setSelectedCategory(undefined); //[cite: 1]
    setSelectedWood(undefined); //[cite: 1]
    setSelectedStatus(undefined); //[cite: 1]
    setSelectedPriceRange(''); //[cite: 1]
    setPage(1); //[cite: 1]
  };

  // Filtrado de productos estrella (Si implementaste el is_featured en el back usa p.is_featured, si no, usa slice)
  const starProducts = products ? products.filter((p: any) => p.is_featured).slice(0, 3) : [];
  // Si aún no implementaste el backend, cambia la línea anterior por: const starProducts = products ? products.slice(0, 3) : [];

  return (
    <div className="container mx-auto px-4 py-28 sm:px-6 lg:px-8 antialiased font-sans text-premium-text">

      <div className="mb-20 text-center">
        <span className="text-premium-accent font-bold tracking-widest uppercase text-xs block mb-3">Catálogo Técnico</span>
        <h1 className="font-serif text-4xl font-bold text-premium-primary md:text-6xl tracking-tight leading-tight">Nuestra Colección</h1>
        <p className="mt-5 text-premium-text/70 font-light max-w-xl mx-auto text-base leading-relaxed">Materiales nobles seleccionados meticulosamente para proyectos de alta exigencia arquitectónica.</p>
      </div>

      {/* SECCIÓN ESTRELLA */}
      {!search && !selectedCategory && !selectedWood && !selectedPriceRange && starProducts.length > 0 && (
        <div className="mb-28">
          <div className="flex items-center gap-3.5 mb-10 border-b border-premium-light/30 pb-5">
            <Sparkles className="w-6 h-6 text-premium-accent fill-premium-accent" />
            <h2 className="font-serif text-3xl font-bold text-premium-primary tracking-tight">Selección Exclusiva</h2>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {starProducts.map((product) => (
              <StarProductCard key={`star-${product.id}`} product={product} addToCart={addToCart} /> //[cite: 1]
            ))}
          </div>
        </div>
      )}

      {/* Catálogo y Filtros */}
      <div className="flex flex-col gap-12 lg:flex-row items-start">
        <aside className="w-full lg:w-80 flex-shrink-0 sticky top-28 z-30">
          <div className="rounded-3xl border border-premium-light/40 bg-white p-7 shadow-soft">
            <div className="mb-7 flex items-center justify-between border-b border-premium-light/20 pb-5">
              <div className="flex items-center gap-2.5">
                <Filter className="h-4 w-4 text-premium-primary" />
                <h3 className="font-serif text-xl font-bold text-premium-primary">Filtros</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters} //[cite: 1]
                className="h-8 px-3 text-xs font-semibold gap-1 text-premium-text/60 hover:text-premium-accent rounded-full"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Limpiar
              </Button>
            </div>

            <div className="space-y-7">
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-premium-primary/80">Búsqueda Técnica</h4>
                <div className="relative">
                  <Input
                    placeholder="Buscar madera o mueble..."
                    className="pl-10 h-12 text-sm rounded-xl border-premium-light focus:border-premium-accent placeholder:text-premium-text/40"
                    value={search} //[cite: 1]
                    onChange={(e) => {
                      setSearch(e.target.value); //[cite: 1]
                      setPage(1); //[cite: 1]
                    }}
                  />
                  <Search className="absolute left-3.5 top-4 h-4 w-4 text-premium-text/40" />
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-premium-primary/80">Categoría</h4>
                <select
                  className="w-full rounded-xl h-12 border border-premium-light bg-white px-4 text-sm focus:border-premium-accent focus:outline-none transition-colors appearance-none text-premium-text/80 cursor-pointer"
                  value={selectedCategory ?? ''} //[cite: 1]
                  onChange={(e) => {
                    setSelectedCategory(e.target.value || undefined); //[cite: 1]
                    setPage(1); //[cite: 1]
                  }}
                >
                  <option value="">Todas las líneas</option>
                  {categories.map((cat) => ( //[cite: 1]
                    <option key={cat.id} value={cat.slug}>
                      {translateCategoryName(cat.name)} {/*[cite: 1] */}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-premium-primary/80">Variedad Botánica</h4>
                <select
                  className="w-full rounded-xl h-12 border border-premium-light bg-white px-4 text-sm focus:border-premium-accent focus:outline-none transition-colors appearance-none text-premium-text/80 cursor-pointer"
                  value={selectedWood ?? ''} //[cite: 1]
                  onChange={(e) => {
                    setSelectedWood(e.target.value || undefined); //[cite: 1]
                    setPage(1); //[cite: 1]
                  }}
                >
                  <option value="">Todas las maderas</option>
                  {WOOD_TYPES.map((type) => ( //[cite: 1]
                    <option key={type.value} value={type.value}>
                      {type.label} {/*[cite: 1] */}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-premium-primary/80">Escala de Precios</h4>
                <select
                  className="w-full rounded-xl h-12 border border-premium-light bg-white px-4 text-sm focus:border-premium-accent focus:outline-none transition-colors appearance-none text-premium-text/80 cursor-pointer"
                  value={selectedPriceRange} //[cite: 1]
                  onChange={(e) => {
                    setSelectedPriceRange(e.target.value); //[cite: 1]
                    setPage(1); //[cite: 1]
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

        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-9 border-b border-premium-light/20 pb-5">
            <h2 className="font-serif text-3xl font-bold text-premium-primary tracking-tight">
              {search || selectedCategory || selectedWood || selectedPriceRange ? 'Resultados de Búsqueda' : 'Catálogo General'}
            </h2>
            <span className="text-xs bg-premium-light/20 text-premium-primary font-bold px-3 py-1 rounded-full ml-1">
              {total} piezas {/*[cite: 1] */}
            </span>
          </div>

          {isLoading ? ( //[cite: 1]
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-96 animate-pulse rounded-3xl bg-premium-light/10"></div> //[cite: 1]
              ))}
            </div>
          ) : products.length === 0 ? ( //[cite: 1]
            <div className="text-center py-28 bg-white border border-premium-light/30 rounded-3xl shadow-soft">
              <p className="text-premium-text/70 font-light text-xl">No se hallaron materiales bajo los criterios indicados.</p>
              <Button onClick={handleClearFilters} className="mt-6 bg-premium-accent hover:bg-premium-hover text-white rounded-xl font-bold px-7 h-12">
                Restaurar Catálogo
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => { //[cite: 1]
                  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0]; //[cite: 1]
                  const imageUrl = primaryImage ? `${BACKEND_URL}${primaryImage.url}` : null; //[cite: 1]
                  return (
                    <motion.div
                      key={product.id} //[cite: 1]
                      initial={{ opacity: 0, y: 15 }} //[cite: 1]
                      animate={{ opacity: 1, y: 0 }} //[cite: 1]
                      className="group flex flex-col rounded-3xl border border-premium-light/30 bg-white p-5 shadow-soft transition-all duration-300 hover:shadow-premium hover:-translate-y-1"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-premium-light/5 border border-premium-light/10">
                        {imageUrl ? ( //[cite: 1]
                          <img
                            src={imageUrl} //[cite: 1]
                            alt={product.name} //[cite: 1]
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-premium-text/30 text-xs">
                            Sin Imagen
                          </div>
                        )}
                      </div>
                      <div className="mt-6 flex flex-1 flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-premium-accent">
                          {translateWoodType(product.wood_type) || 'Madera Estándar'} {/*[cite: 1] */}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-premium-primary mt-1 group-hover:text-premium-accent transition-colors truncate">
                          {product.name} {/*[cite: 1] */}
                        </h3>
                        <div className="mt-auto pt-6 flex items-center justify-between border-t border-premium-light/10 gap-3">
                          <span className="text-xl font-bold text-premium-primary font-sans tracking-tight">${product.price.toFixed(2)}</span> {/*[cite: 1] */}
                          <button
                            onClick={() => addToCart(product, 1)} //[cite: 1]
                            className="px-4 py-2 border border-premium-light hover:border-premium-accent hover:bg-premium-accent text-premium-primary hover:text-white text-xs font-semibold rounded-lg transition-all duration-200"
                          >
                            Añadir
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {totalPages > 1 && ( //[cite: 1]
                <div className="mt-16 flex justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1} //[cite: 1]
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))} //[cite: 1]
                    className="gap-1 border-premium-light hover:bg-premium-light/20 rounded-full h-10 px-5 text-premium-primary"
                  >
                    <ChevronLeft className="h-4 w-4" /> Anterior //[cite: 1]
                  </Button>
                  <span className="text-sm font-semibold text-premium-primary">
                    Página {page} de {totalPages} {/*[cite: 1] */}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === totalPages} //[cite: 1]
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} //[cite: 1]
                    className="gap-1 border-premium-light hover:bg-premium-light/20 rounded-full h-10 px-5 text-premium-primary"
                  >
                    Siguiente <ChevronRight className="h-4 w-4" /> //[cite: 1]
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