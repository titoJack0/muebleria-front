import React from 'react';
import NavbarPremium from '../components/ui/NavbarPremium';
import HeroPremium from '../components/ui/HeroPremium';

export const HomePremium: React.FC = () => {
  return (
    <div>
      <NavbarPremium />
      <HeroPremium />

      <main className="container mx-auto px-6 py-16">
        {/* Sobre la empresa */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-semibold">Nuestra Historia</h2>
          <p className="mt-4 text-lg">Con décadas de tradición maderera, combinamos técnicas artesanales con procesos modernos para ofrecer maderas de la más alta calidad. Atendemos proyectos desde diseño interior hasta grandes obras constructivas.</p>
        </section>

        {/* Catálogo simple */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-semibold">Catálogo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {['Tablas', 'Tirantes', 'Machimbres', 'Decks', 'Muebles', 'Maderas de construcción'].map((c) => (
              <div key={c} className="card">
                <h3 className="font-medium text-primary">{c}</h3>
                <p className="mt-2 text-sm text-earth">Descripción breve sobre {c} y sus usos en proyectos premium.</p>
                <div className="mt-4">
                  <button className="btn-primary">Ver productos</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Beneficios */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-semibold">Beneficios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[
              { t: 'Calidad certificada' },
              { t: 'Entrega rápida' },
              { t: 'Asesoramiento técnico' },
              { t: 'Amplio stock' },
            ].map((b) => (
              <div key={b.t} className="card text-center">
                <h4 className="font-medium text-primary">{b.t}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Proyectos realizados (placeholder) */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-semibold">Proyectos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {new Array(8).fill(0).map((_, i) => (
              <div key={i} className="rounded-md overflow-hidden shadow-soft">
                <img src={`/images/projects/project-${i % 4 + 1}.jpg`} alt={`Proyecto ${i + 1}`} className="w-full h-44 object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Testimonios */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-semibold">Testimonios</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {[1, 2].map((i) => (
              <div key={i} className="card">
                <p className="italic">"Excelente calidad y atención personalizada. Recomiendo para proyectos de diseño."</p>
                <p className="mt-3 font-medium">Cliente {i}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-semibold">Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <form className="card">
              <label className="block text-sm font-medium">Nombre</label>
              <input className="mt-2 w-full p-2 border rounded-md" />

              <label className="block text-sm font-medium mt-4">Email</label>
              <input className="mt-2 w-full p-2 border rounded-md" />

              <label className="block text-sm font-medium mt-4">Mensaje</label>
              <textarea className="mt-2 w-full p-2 border rounded-md" />

              <div className="mt-4">
                <button className="btn-primary">Enviar</button>
              </div>
            </form>

            <div className="card">
              <h4 className="font-medium text-primary">Ubicación</h4>
              <p className="mt-2 text-sm text-earth">Av. Falsa 123, Ciudad</p>
              <div className="mt-4 rounded-md overflow-hidden">
                <img src="/images/map-placeholder.jpg" alt="Mapa" className="w-full h-44 object-cover" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white mt-16">
        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-serif text-lg">Maderas Nativas</h4>
            <p className="mt-2 text-sm">Calidad y tradición para proyectos premium.</p>
          </div>
          <div>
            <h4 className="font-medium">Enlaces</h4>
            <ul className="mt-2 space-y-2">
              <li><a className="text-accent" href="#">Catálogo</a></li>
              <li><a className="text-accent" href="#">Proyectos</a></li>
              <li><a className="text-accent" href="#">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium">Contacto</h4>
            <p className="mt-2 text-sm">info@maderasnativas.example</p>
            <p className="mt-1 text-sm">+54 9 11 1234 5678</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePremium;
