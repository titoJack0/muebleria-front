import React from 'react';
import { Link } from 'react-router-dom';
import HeroPremium from '../components/ui/HeroPremium';

export const HomePremium: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      <HeroPremium />

      {/* Sección 1: Nuestra Esencia (Diseño de pantalla dividida) */}
      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            {/* Imagen con diseño asimétrico elegante */}
            <div className="aspect-[4/5] bg-sand rounded-tl-[120px] rounded-br-[120px] overflow-hidden shadow-2xl relative">
              <img
                src="/images/story-wood.jpg"
                alt="Trabajo en madera"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none"></div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-accent font-semibold">Nuestra Esencia</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary leading-tight">
              Artesanía y Nobleza <br /> en cada Veta.
            </h3>
            <p className="text-lg text-text/80 leading-relaxed font-light">
              Seleccionamos meticulosamente las mejores maderas nativas para dar vida a proyectos únicos.
              Nuestra pasión radica en respetar la naturaleza del material, combinando técnicas tradicionales
              con diseño contemporáneo para crear piezas que trascienden el tiempo.
            </p>
            <div className="pt-6">
              <Link to="/catalog" className="group inline-flex items-center gap-3 text-primary font-medium hover:text-accent transition-colors">
                <span className="border-b border-primary group-hover:border-accent transition-colors pb-1">Descubrir nuestra historia</span>
                <span className="transform group-hover:translate-x-2 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: Colecciones (Tarjetas limpias con fondo arena) */}
      <section className="bg-sand py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.2em] text-earth font-semibold mb-3">Catálogo Exclusivo</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-primary">Nuestras Colecciones</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: 'Maderas Nativas', desc: 'Roble, Nogal y Lenga para proyectos exigentes.', img: 'cat-1.jpg' },
              { title: 'Revestimientos', desc: 'Machimbres y decks que transforman los espacios.', img: 'cat-2.jpg' },
              { title: 'Mobiliario de Autor', desc: 'Mesas y sillas con un diseño atemporal.', img: 'cat-3.jpg' }
            ].map((item, index) => (
              <Link to="/catalog" key={index} className="group cursor-pointer block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6 shadow-md">
                  <img
                    src={`/images/${item.img}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  {/* Filtro oscuro que aparece al hacer hover */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
                </div>
                <h4 className="text-xl font-serif text-primary mb-2 group-hover:text-accent transition-colors">{item.title}</h4>
                <p className="text-text/70 text-sm font-light">{item.desc}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/catalog" className="inline-block px-10 py-4 bg-primary text-background text-sm tracking-wide uppercase hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl rounded-sm">
              Explorar Catálogo Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Sección 3: Valores Diferenciales (Minimalista) */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-earth/20">
          {[
            { title: 'Selección Rigurosa', desc: 'Cada pieza de madera es inspeccionada para garantizar calidad y veteado perfecto.' },
            { title: 'Diseño Sustentable', desc: 'Trabajamos con proveedores que respetan los ciclos naturales de reforestación.' },
            { title: 'Asesoría Experta', desc: 'Te acompañamos en cada etapa, desde la elección del material hasta el acabado final.' }
          ].map((val, i) => (
            <div key={i} className="pt-8 md:pt-0 md:px-8 first:pt-0">
              <div className="w-12 h-12 mx-auto border border-accent/50 rounded-full flex items-center justify-center mb-6 bg-sand/30">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
              </div>
              <h4 className="text-lg font-serif text-primary mb-3">{val.title}</h4>
              <p className="text-text/60 text-sm leading-relaxed font-light">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección 4: Call to Action (Bloque Oscuro) */}
      <section className="bg-primary text-background py-24">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">¿Tienes un proyecto en mente?</h2>
          <p className="text-sand/80 text-lg mb-10 font-light">
            Nuestros especialistas están listos para materializar tus ideas con las mejores maderas del mercado.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/catalog" className="px-8 py-4 bg-accent text-white text-sm tracking-wide uppercase font-medium hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20 rounded-sm">
              Ver Productos
            </Link>
            <Link to="/track" className="px-8 py-4 bg-transparent border border-sand/50 text-sand text-sm tracking-wide uppercase font-medium hover:bg-sand/10 transition-colors rounded-sm">
              Rastrear Pedido
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePremium;