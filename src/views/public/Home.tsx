import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Clock, PhoneCall, Package, CheckCircle, MapPin, Mail, Phone, Truck, Search } from 'lucide-react'; // Importamos 'Search' para el botón de rastreo
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  // Animación de aparición suave
  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="w-full overflow-hidden font-sans text-premium-text antialiased">

      {/* 1. HERO PRINCIPAL CON TIPOGRAFÍA REFINADA Y TRES BOTONES */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        {/* Fondo con imagen premium */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
            alt="Arquitectura Premium Maderas Nativas"
            className="w-full h-full object-cover select-none"
          />
          {/* Capas de Overlay para profundidad y contraste de lectura */}
          <div className="absolute inset-0 bg-premium-primary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-premium-primary via-premium-primary/30 to-transparent"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 mt-24">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">

            {/* TÍTULO HERO: Ajustado con un interlineado compacto (leading-tight) y letras más unidas (tracking-tight) */}
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Diseño, Resistencia <br />
              <span className="text-premium-accent italic font-normal block mt-1 tracking-normal">
                Calidad para la construcción.
              </span>
            </h1>

            {/* BAJADA: Tipografía estilizada, más ligera y espaciada para máxima elegancia */}
            <p className="text-lg md:text-xl text-premium-light/90 mb-12 font-light max-w-2xl leading-relaxed tracking-wide">
              En <strong className="text-white font-medium">Maderas Nativas</strong> fusionamos la fuerza inalterable de la naturaleza con la precisión técnica que las obras modernas exigen.
            </p>

            {/* BOTONES DE ACCIÓN: Agregamos el botón de seguimiento con ícono de lupa */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-start items-stretch sm:items-center">
              {/* Botón Principal: Catálogo */}
              <Link
                to="/catalog"
                className="px-7 py-4 bg-premium-accent hover:bg-premium-hover text-white text-sm font-semibold uppercase tracking-wider rounded-md transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                Explorar Catálogo <ArrowRight className="w-4 h-4" />
              </Link>

              {/* NUEVO BOTÓN: Rastrear Pedido */}
              <Link
                to="/track"
                className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold uppercase tracking-wider rounded-md border border-white/20 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-premium-accent" /> Rastrear Pedido
              </Link>

              {/* Botón Secundario: Contacto */}
              <a
                href="#contacto"
                className="px-7 py-4 bg-transparent text-premium-light hover:text-white text-sm font-medium tracking-wide transition-colors duration-300 flex items-center justify-center underline underline-offset-4 decoration-premium-accent/40 hover:decoration-white"
              >
                Contactar Asesor
              </a>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. SOBRE LA EMPRESA */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-premium-light/20 rounded-full z-0"></div>
                <img
                  src="https://images.unsplash.com/photo-1542621323-8bb97e596d19?auto=format&fit=crop&q=80"
                  alt="Experiencia Maderera"
                  className="rounded-2xl shadow-premium relative z-10 w-full h-[480px] object-cover"
                />
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/2">
              {/* Subtítulos pequeños: Siempre en mayúsculas, negrita y con interletrado ancho (tracking-widest) */}
              <span className="text-premium-accent font-bold tracking-widest uppercase text-xs block mb-3">Nuestra Esencia</span>
              <h2 className="font-serif text-4xl md:text-5xl text-premium-primary font-bold tracking-tight leading-tight mb-6">
                Tradición maderera con visión moderna
              </h2>
              <p className="text-premium-text/80 text-base leading-relaxed tracking-wide mb-8 font-light">
                Con más de 30 años en la industria, hemos evolucionado para satisfacer los más altos estándares de la arquitectura moderna. Seleccionamos, procesamos y entregamos maderas nobles garantizando su comportamiento estructural y estético a lo largo del tiempo.
              </p>
              <ul className="space-y-4">
                {['Trazabilidad y respeto por la naturaleza', 'Control de humedad estricto', 'Asesoría técnica para profesionales'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-premium-primary font-medium text-sm tracking-wide">
                    <CheckCircle className="w-4 h-4 text-premium-accent shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CATÁLOGO DE PRODUCTOS */}
      <section className="py-28 bg-premium-light/10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-premium-accent font-bold tracking-widest uppercase text-xs block mb-3">Producción</span>
            <h2 className="font-serif text-4xl text-premium-primary font-bold tracking-tight mb-4">Líneas de Producto Premium</h2>
            <p className="text-premium-text/70 font-light tracking-wide text-base">Materiales seleccionados meticulosamente para cada etapa de tu obra o proyecto decorativo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Tablas Seleccionadas', img: 'https://images.unsplash.com/photo-1546414578-8386c9135a4b?auto=format&fit=crop&q=80' },
              { title: 'Tirantes Estructurales', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80' },
              { title: 'Machimbres', img: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80' },
              { title: 'Decks & Exteriores', img: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80' },
              { title: 'Muebles de Diseño', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80' },
              { title: 'Madera para Construcción', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80' },
            ].map((cat, idx) => (
              <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="group cursor-pointer">
                <div className="relative h-72 rounded-2xl overflow-hidden mb-2 shadow-soft">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-premium-primary/90 via-premium-primary/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300"></div>
                  <h3 className="absolute bottom-6 left-6 font-serif text-2xl text-white font-semibold tracking-wide">{cat.title}</h3>
                  <div className="absolute bottom-6 right-6 w-10 h-10 bg-premium-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BENEFICIOS */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, title: 'Calidad Certificada', desc: 'Clasificación rigurosa de cada pieza para garantizar su resistencia estructural.' },
              { icon: Truck, title: 'Entrega Eficiente', desc: 'Logística especializada para que el material llegue impecable a tu obra.' },
              { icon: PhoneCall, title: 'Asesoría Técnica', desc: 'Acompañamiento profesional desde el cálculo hasta el montaje en obra.' },
              { icon: Package, title: 'Stock Permanente', desc: 'Gran volumen de almacenamiento listo para proyectos de gran escala.' },
            ].map((benefit, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-premium-light/15 flex items-center justify-center mb-6 group-hover:bg-premium-accent transition-colors duration-300">
                  <benefit.icon className="w-7 h-7 text-premium-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-premium-primary tracking-tight mb-2">{benefit.title}</h3>
                <p className="text-premium-text/70 font-light leading-relaxed text-sm px-3 tracking-wide">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROYECTOS REALIZADOS */}
      <section className="py-28 bg-premium-primary text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <span className="text-premium-accent font-bold tracking-widest uppercase text-xs block mb-3">Portfolio</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">Proyectos Realizados</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group h-[400px] md:h-[580px] shadow-premium">
              <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd64bd04?auto=format&fit=crop&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" alt="Proyecto Destacado" />
              <div className="absolute inset-0 bg-premium-primary/40 group-hover:bg-premium-primary/20 transition-colors duration-300"></div>
              <div className="absolute bottom-8 left-8 z-10">
                <h3 className="font-serif text-3xl font-bold tracking-wide">Casa de Campo V&A</h3>
                <p className="text-premium-light mt-1.5 text-sm font-light tracking-wider">Revestimientos y Estructura en madera nativa estacionada</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden relative group h-[280px] shadow-md">
              <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Proyecto Interior" />
            </div>
            <div className="rounded-2xl overflow-hidden relative group h-[280px] shadow-md">
              <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Proyecto Mobiliario" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIOS */}
      <section className="py-28 bg-premium-light/15">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-premium-primary font-bold text-center tracking-tight mb-20">Lo que dicen los profesionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { text: "La estabilidad técnica de los tirantes superó nuestras expectativas. Tiempos de entrega impecables en obra.", author: "Arq. Martín Gómez", rol: "Estudio MG" },
              { text: "Encontramos en Maderas Nativas el aliado idóneo para nuestros diseños residenciales de alta gama.", author: "Laura Di Santi", rol: "Diseñadora de Interiores" },
              { text: "El nivel de estacionamiento y control de humedad de los decks es difícil de hallar en el mercado actual.", author: "Ing. Carlos Ruiz", rol: "Constructora CR" },
            ].map((t, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl shadow-soft hover:shadow-premium transition-shadow duration-300 relative">
                <div className="text-6xl text-premium-light/50 absolute top-5 left-6 font-serif select-none">"</div>
                <p className="text-premium-text/90 leading-relaxed relative z-10 mb-8 italic text-sm tracking-wide font-light">"{t.text}"</p>
                <div className="border-t border-premium-light/20 pt-4">
                  <h4 className="font-bold text-premium-primary text-sm tracking-tight">{t.author}</h4>
                  <span className="text-xs text-premium-accent font-semibold tracking-wider uppercase mt-0.5 block">{t.rol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 & 8. FORMULARIO DE CONTACTO Y UBICACIÓN */}
      <section id="contacto" className="py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 bg-white rounded-3xl overflow-hidden shadow-premium border border-premium-light/20">

            {/* Formulario */}
            <div className="lg:w-1/2 p-12 md:p-16">
              <h2 className="font-serif text-4xl text-premium-primary font-bold tracking-tight mb-3">Iniciemos tu proyecto</h2>
              <p className="text-premium-text/70 mb-10 text-sm font-light tracking-wide">Nuestro equipo de asesores técnicos está listo para presupuestar y optimizar tu pedido.</p>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" placeholder="Nombre completo" className="w-full bg-premium-light/10 border border-premium-light/30 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-premium-accent transition-colors placeholder:text-premium-text/40" />
                  <input type="text" placeholder="Estudio / Empresa" className="w-full bg-premium-light/10 border border-premium-light/30 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-premium-accent transition-colors placeholder:text-premium-text/40" />
                </div>
                <input type="email" placeholder="Correo electrónico" className="w-full bg-premium-light/10 border border-premium-light/30 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-premium-accent transition-colors placeholder:text-premium-text/40" />
                <textarea rows={4} placeholder="Detalles del material, escuadrías o proyecto..." className="w-full bg-premium-light/10 border border-premium-light/30 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-premium-accent transition-colors resize-none placeholder:text-premium-text/40"></textarea>
                <button type="submit" className="w-full bg-premium-primary hover:bg-premium-accent text-white rounded-lg px-4 py-4 font-bold text-xs tracking-widest uppercase transition-colors duration-300 shadow-md">
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Info y Mapa */}
            <div className="lg:w-1/2 bg-premium-primary text-white p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-premium-accent rounded-full opacity-10 blur-3xl"></div>

              <div>
                <h3 className="font-serif text-3xl font-bold tracking-wide mb-8">Nuestra Planta</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-premium-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-premium-light text-sm tracking-tight">Sede Central y Despacho</h4>
                      <p className="text-white/80 mt-1 text-sm leading-relaxed font-light tracking-wide">Ruta Industrial Maderera, Km 8.5<br />Provincia de Misiones, Argentina</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-light tracking-wide">
                    <Phone className="w-4 h-4 text-premium-accent shrink-0" />
                    <p className="text-white/80">+54 9 376 412-3456</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-light tracking-wide">
                    <Mail className="w-4 h-4 text-premium-accent shrink-0" />
                    <p className="text-white/80">presupuestos@maderasnativas.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 h-44 bg-white/10 rounded-xl overflow-hidden border border-white/10 relative group cursor-pointer">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover mix-blend-overlay opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="px-5 py-2.5 bg-premium-primary/95 text-[11px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm border border-white/10 shadow-lg transition-transform group-hover:scale-105">Ver Ubicación en Mapa</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};