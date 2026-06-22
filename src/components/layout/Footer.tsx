import React from 'react';
import { Heart } from 'lucide-react';

// Pie de página de la aplicación pública
export const Footer: React.FC = () => {
  return (
    <footer className="bg-deepBlack py-12 text-offWhite">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <span className="font-serif text-2xl font-bold tracking-tight text-white">
            Timber<span className="text-gold">&</span>Furniture
          </span>
          <p className="mt-4 text-sm text-earth">
            Crafting luxury and comfort for your living spaces.
            Premium quality wood, timeless designs.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-gold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-earth">
            <li><a href="/catalog" className="hover:text-white transition-colors">Catalog</a></li>
            <li><a href="/track" className="hover:text-white transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-gold">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-earth">
            <li>info@timberfurniture.com</li>
            <li>+1 (555) 123-4567</li>
            <li>123 Luxury Ave, Design District</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-12 border-t border-earth/20 px-4 pt-8 text-center text-sm text-earth sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} Maderas Nativas. All rights reserved.
        <div className="mt-4 flex items-center justify-center gap-1.5 text-sm text-earth">
          <span>Hecho con</span>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span>por</span>
          <a
            href="https://tu-link-aqui.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-gold hover:underline transition-colors"
          >
            MrJack
          </a>
        </div>
      </div>
    </footer>
  );
};
