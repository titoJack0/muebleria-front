import React from 'react';

export const HeroPremium: React.FC = () => {
  return (
    <header className="w-full bg-primary text-white">
      <div className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Maderas Premium para Proyectos Excepcionales</h1>
          <p className="mt-4 text-lg text-primary/80 text-white">Calidad, durabilidad y diseño en cada veta. Suministramos maderas y soluciones constructivas para obras y espacios de alto nivel.</p>

          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <button className="btn-primary hero-cta-primary">Solicitar Cotización</button>
            <button className="btn-secondary hero-cta-secondary">Ver Catálogo</button>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="rounded-md overflow-hidden shadow-soft">
            <img src="/images/hero-wood.jpg" alt="Maderas premium" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-primary/40" aria-hidden />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroPremium;
