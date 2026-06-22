import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const HeroPremium: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-primary">
      {/* Fondo e Imagen */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          /* He puesto una imagen de alta calidad de Unsplash por defecto. 
             Luego puedes cambiarla por "/images/hero-wood.jpg" */
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500&auto=format&fit=crop"
          alt="Maderas Premium"
          className="w-full h-full object-cover"
        />
        {/* Overlay elegante con gradiente usando tu color primary (#042c33) */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/95 z-10"></div>
      </div>

      <div className="max-w-3xl text-center">
        {/* Título Principal */}
        <h1 className="font-serif text-5xl font-bold text-wood-dark sm:text-6xl lg:text-7xl">
          Maderas Nativas
        </h1>
        {/* Nuevo Eslogan */}
        <p className="mt-6 text-xl text-earth leading-relaxed max-w-2xl mx-auto">
          Calidad para la construcción
        </p>
      </div>

      {/* Contenido Principal */}
      <div className="container relative z-20 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-accent uppercase tracking-[0.3em] text-xs md:text-sm font-semibold mb-6 drop-shadow-md">
            Maderas Nativas
          </h2>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-8 drop-shadow-lg">
            Diseño atemporal <br />
            <span className="text-bgLight italic font-light">en cada detalle.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md">
            Maderas nativas seleccionadas para proyectos arquitectónicos y de interiorismo que buscan la excelencia y distinción.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/catalog" className="group flex items-center justify-center gap-3 bg-accent text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-accentHover transition-all shadow-lg hover:shadow-accent/30 rounded-sm w-full sm:w-auto">
              Explorar Catálogo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            {/* Puedes apuntar este botón a la sección de contacto o a otra vista */}
            <Link to="/track" className="group flex items-center justify-center gap-3 bg-transparent border border-white/30 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-white/10 transition-all rounded-sm w-full sm:w-auto">
              Rastrear Pedido
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Indicador de Scroll Animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-bgLight/70"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] mb-2">Descubrir</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroPremium;