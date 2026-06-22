import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-premium-primary text-white border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">

          {/* Columna 1: Marca y Eslogan */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="h-10 w-10 bg-white/5 rounded-lg p-1 flex items-center justify-center border border-white/10">
                <img src="/logo.svg" alt="Logo" className="h-full w-full object-contain" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wide">Maderas Nativas</span>
            </div>
            <p className="text-sm text-premium-light/70 italic max-w-sm mx-auto md:mx-0">
              "Calidad para la construcción"<br />
              Soluciones forestales premium para la arquitectura y el diseño contemporáneo.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-sm font-semibold text-premium-accent uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2.5 text-sm text-premium-light/80">
              <li>
                <Link to="/catalog" className="hover:text-premium-accent transition-colors flex items-center justify-center md:justify-start gap-1 group">
                  Explorar Catálogo <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-premium-accent transition-colors flex items-center justify-center md:justify-start gap-1 group">
                  Rastreo de Pedidos <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información Comercial Breve */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-sm font-semibold text-premium-accent uppercase tracking-wider">Contacto Técnico</h4>
            <ul className="space-y-3 text-sm text-premium-light/80">
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <MapPin className="w-4 h-4 text-premium-accent shrink-0" />
                <span>Misiones, Argentina</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <Phone className="w-4 h-4 text-premium-accent shrink-0" />
                <span>+54 9 376 412-3456</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2.5">
                <Mail className="w-4 h-4 text-premium-accent shrink-0" />
                <span>presupuestos@maderasnativas.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Barra Inferior de Derechos y Créditos */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-premium-light/50">
          <p>&copy; {new Date().getFullYear()} Maderas Nativas. Todos los derechos reservados.</p>

          {/* Tu Firma Personalizada Premium */}
          <div className="flex items-center gap-1.5 text-sm text-premium-light/60 bg-white/5 px-4 py-1.5 rounded-full border border-white/5 hover:border-premium-accent/20 transition-colors">
            <span>Hecho con</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <span>por</span>
            <a
              href="https://github.com/titojack0" // Reemplaza por tu portafolio o GitHub real
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-premium-accent hover:text-premium-hover transition-colors underline decoration-premium-accent/30 underline-offset-2"
            >
              MrJack
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};