import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowRight, CheckCircle2, Truck, HeadphonesIcon, Layers } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import axios from 'axios';
import { OrderStatus } from '../../components/OrderStatus';
import { CvuDisplay } from '../../components/CvuDisplay';

const BACKEND_URL = 'http://127.0.0.1:8000';

export const Home: React.FC = () => {
  const { products, loading: isLoading } = useProducts(1, 6);
  const { addToCart } = useCart();
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  // Funciones dummy para simular el contacto y pedidos de prueba
  const handleCreateOrder = async () => {
    setLoadingOrder(true);
    try {
      const payload = {
        email: 'contacto@cliente.com',
        postal_code: '1234',
        recipient_name: 'Cliente',
        recipient_last_name: 'Premium',
        phone: '+54911000000',
        street: 'Av. Libertador',
        number: '1234',
        apartment: '1A',
        neighborhood: 'Recoleta',
        city: 'CABA',
        shipping_address: 'Av. Libertador 1234, Recoleta, CABA',
        items: [{ product_id: 1, quantity: 1 }],
      };
      const response = await axios.post(`${BACKEND_URL}/api/v1/orders/guest`, payload);
      setOrder(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingOrder(false);
      setShowConfirm(false);
    }
  };

  const benefits = [
    { icon: <CheckCircle2 className="h-8 w-8 text-accent" />, title: 'Calidad Certificada', text: 'Maderas seleccionadas bajo los más altos estándares de resistencia y estética.' },
    { icon: <Truck className="h-8 w-8 text-accent" />, title: 'Entrega Rápida', text: 'Logística optimizada para que tus materiales lleguen a tiempo y en perfectas condiciones.' },
    { icon: <HeadphonesIcon className="h-8 w-8 text-accent" />, title: 'Asesoramiento Técnico', text: 'Nuestro equipo de arquitectos y carpinteros te guía en cada paso de tu proyecto.' },
    { icon: <Layers className="h-8 w-8 text-accent" />, title: 'Amplio Stock', text: 'Disponibilidad inmediata en una amplia variedad de maderas nobles y cortes a medida.' },
  ];

  const projects = [
    "https://images.unsplash.com/photo-1600607688969-a5bfcd64bd15?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative flex h-[90vh] w-full items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          {/* Overlay oscuro usando el color primario con transparencia */}
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply z-10" />
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2500&auto=format&fit=crop"
            alt="Arquitectura en Madera Premium"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
              Tradición Maderera, <br />
              <span className="text-accent">Visión Contemporánea</span>
            </h1>
            <p className="mt-6 text-lg text-bgLight/90 md:text-xl font-light max-w-2xl">
              Proporcionamos madera de la más alta calidad para proyectos arquitectónicos exigentes. Solidez, elegancia y un compromiso inquebrantable con la excelencia.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/catalog">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-accent text-white hover:bg-accentHover">
                  Explorar Catálogo <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" onClick={() => window.scrollTo({ top: document.getElementById('contact')?.offsetTop, behavior: 'smooth' })}>
                Contactar Asesor
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SOBRE LA EMPRESA --- */}
      <section className="bg-bgLight py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <img 
                src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop" 
                alt="Madera y Arquitectura" 
                className="rounded-md shadow-premium object-cover aspect-[4/3] w-full"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">El Origen de la Excelencia</h2>
              <p className="text-textColor/80 text-lg mb-6 leading-relaxed">
                Durante más de tres décadas, hemos sido el puente entre la naturaleza y la arquitectura de vanguardia. Nuestra madera no es solo un material de construcción; es el alma de proyectos que trascienden el tiempo.
              </p>
              <p className="text-textColor/80 text-lg leading-relaxed mb-8">
                Combinamos procesos artesanales con tecnología de precisión para ofrecer soluciones en madera que satisfacen los estándares más rigurosos del diseño de interiores y la construcción de lujo.
              </p>
              <div className="flex gap-12 border-t border-primary/20 pt-8">
                <div>
                  <h4 className="text-4xl font-serif font-bold text-accent mb-2">+30</h4>
                  <p className="text-sm font-medium text-primary uppercase tracking-wider">Años de Historia</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif font-bold text-accent mb-2">10k</h4>
                  <p className="text-sm font-medium text-primary uppercase tracking-wider">Proyectos Premium</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- BENEFICIOS --- */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">Por qué elegirnos</h2>
            <p className="text-textColor/70 text-lg">Nos comprometemos a entregar valor estructural y estético incomparable en cada pieza de madera que sale de nuestras instalaciones.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card text-center"
              >
                <div className="inline-flex items-center justify-center p-4 bg-bgLight rounded-full mb-6">
                  {b.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mb-3">{b.title}</h3>
                <p className="text-textColor/70 text-sm leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CATALOGO PREVIEW --- */}
      <section className="bg-surface py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl font-bold text-primary mb-4">Materiales y Diseños</h2>
              <p className="text-textColor/70 text-lg">Desde tirantes estructurales y decks hasta maderas para muebles y revestimientos, descubre nuestra selección premium.</p>
            </div>
            <Link to="/catalog" className="mt-6 md:mt-0 inline-flex items-center gap-2 text-accent font-semibold hover:text-accentHover transition-colors">
              Ver Catálogo Completo <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
                const imageUrl = primaryImage ? `${BACKEND_URL}${primaryImage.url}` : null;
                return (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -8 }}
                    className="card p-0 overflow-hidden flex flex-col group cursor-pointer border-transparent hover:border-accent/30"
                  >
                    <div className="relative aspect-[4/3] bg-bgLight overflow-hidden">
                      {imageUrl ? (
                        <img src={imageUrl} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-primary/40 font-serif">Premium Timber</div>
                      )}
                      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-accent text-white border-none shadow-premium hover:bg-accentHover" onClick={(e) => { e.preventDefault(); addToCart(product, 1); }}>
                          Añadir al Presupuesto
                        </Button>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl font-bold text-primary group-hover:text-accent transition-colors">{product.name}</h3>
                        <span className="font-medium text-lg text-secondary">${product.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-textColor/60 mb-4">{product.wood_type} | {product.category?.name || 'Materiales'}</p>
                      <p className="text-sm text-textColor/80 line-clamp-2 mt-auto">{product.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* --- ORDER STATUS DEMO / QUICK ACTION --- */}
      {/* Esta sección muestra cómo queda el OrderStatus dentro del nuevo diseño. Se puede remover o condicionar si el usuario no tiene órdenes recientes. */}
      <section className="bg-white py-16 border-y border-border">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-serif text-2xl font-bold text-primary mb-6">¿Tienes un pedido en curso?</h2>
          {!order ? (
            <Button onClick={() => setShowConfirm(true)} disabled={loadingOrder} className="bg-primary hover:bg-primary/90 text-white">
              Simular Solicitud de Materiales
            </Button>
          ) : (
            <div className="glass-panel text-left max-w-2xl mx-auto border-accent/20">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 border-b border-border pb-2">Estado Actual del Pedido: #{order.tracking_code}</h3>
              <OrderStatus order={order} />
              {order.status === 'waiting_payment' && <div className="mt-4"><CvuDisplay /></div>}
            </div>
          )}

          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-primary/80 backdrop-blur-sm z-50 px-4">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-8 rounded-md shadow-premium max-w-md w-full">
                <h2 className="font-serif text-2xl font-bold text-primary mb-4">Confirmar Cotización</h2>
                <p className="text-textColor/80 mb-8">Nuestros asesores evaluarán el stock y prepararán una cotización formal para tu proyecto.</p>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" className="border-border text-primary hover:bg-bgLight" onClick={() => setShowConfirm(false)} disabled={loadingOrder}>Cancelar</Button>
                  <Button onClick={handleCreateOrder} disabled={loadingOrder} className="bg-accent text-white hover:bg-accentHover">Confirmar y Enviar</Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* --- PROYECTOS / GALERÍA --- */}
      <section className="bg-primary py-24 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-bgLight mb-4">Obras y Proyectos</h2>
            <p className="text-bgLight/70 text-lg max-w-2xl mx-auto">Nuestros materiales dan vida a espacios interiores, exteriores y estructuras arquitectónicas de primer nivel en todo el país.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((src, i) => (
              <motion.div key={i} whileHover={{ scale: 0.98 }} className="overflow-hidden rounded-sm relative aspect-video cursor-pointer group">
                <img src={src} alt="Proyecto Maderero" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-serif text-xl border-b border-accent pb-1">Ver Proyecto</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIOS --- */}
      <section className="bg-surface py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-primary text-center mb-16">Confianza Construida</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "La precisión de los cortes y la nobleza de la madera superaron nuestras expectativas estructurales. Un aliado fundamental para nuestro estudio.", author: "Arq. Martín S.", role: "Estudio MS" },
              { text: "Encontramos en ellos el socio ideal para revestimientos interiores premium. La atención de los asesores es impecable.", author: "Laura G.", role: "Diseñadora de Interiores" },
              { text: "Entrega a tiempo, calidad constante y un catálogo muy completo. Resolvieron todos los requerimientos de madera para la obra.", author: "Constructora Horizon", role: "Cliente Corporativo" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 border border-bgLight rounded-md shadow-sm relative">
                <div className="text-accent text-5xl font-serif absolute top-4 left-6 opacity-20">"</div>
                <p className="text-textColor/80 italic relative z-10 mb-6">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-primary">{t.author}</h4>
                  <p className="text-sm text-secondary">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FORMULARIO & MAPA --- */}
      <section id="contact" className="bg-white py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <h2 className="font-serif text-4xl font-bold text-primary mb-4">Hablemos de tu Proyecto</h2>
              <p className="text-textColor/70 mb-8">Nuestros especialistas están listos para asesorarte con los mejores materiales para tus requerimientos específicos.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Nombre Completo</label>
                    <input type="text" className="w-full border border-border rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-surface" placeholder="Ej: Arq. Juan Pérez" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Correo Electrónico</label>
                    <input type="email" className="w-full border border-border rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-surface" placeholder="juan@estudio.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Tipo de Proyecto</label>
                  <select className="w-full border border-border rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-surface text-textColor">
                    <option>Construcción / Estructura</option>
                    <option>Diseño de Interiores / Muebles</option>
                    <option>Exterior / Decks</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Detalles del Requerimiento</label>
                  <textarea rows={4} className="w-full border border-border rounded-sm px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-surface" placeholder="Menciona metros cúbicos, tipos de madera, o detalles específicos..." />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-4 text-lg">Solicitar Cotización Asesorada</Button>
              </form>
            </div>
            
            <div className="lg:w-1/2 bg-surface rounded-md p-2 border border-border h-[600px] flex items-center justify-center relative overflow-hidden">
              {/* Mapa Placeholder */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')] bg-cover opacity-20 grayscale mix-blend-multiply"></div>
              <div className="relative z-10 glass-panel max-w-sm text-center">
                <h3 className="font-serif text-2xl font-bold text-primary mb-2">Showroom & Depósito</h3>
                <p className="text-textColor/80 mb-4">Av. Forestal 4500, Polo Industrial Maderero, Buenos Aires, Argentina.</p>
                <p className="text-secondary font-medium">Lunes a Viernes: 08:00 - 17:00</p>
                <p className="text-secondary font-medium mb-6">Sábados: 09:00 - 13:00</p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">Ver en Google Maps</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER COMPLETO --- */}
      <footer className="bg-primary text-bgLight pt-20 pb-10 border-t-4 border-accent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="font-serif text-3xl font-bold text-white mb-6">Lumber<span className="text-accent">Premium</span></h3>
              <p className="text-bgLight/70 mb-6">La calidad de la madera define la durabilidad de tu obra. Somos tu aliado estratégico en materiales nobles.</p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full border border-bgLight/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors">In</a>
                <a href="#" className="h-10 w-10 rounded-full border border-bgLight/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors">Ig</a>
                <a href="#" className="h-10 w-10 rounded-full border border-bgLight/20 flex items-center justify-center hover:bg-accent hover:border-accent transition-colors">Fb</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-xl font-bold text-white mb-6">Catálogo</h4>
              <ul className="space-y-3 text-bgLight/70">
                <li><Link to="/catalog" className="hover:text-accent transition-colors">Tirantes Estructurales</Link></li>
                <li><Link to="/catalog" className="hover:text-accent transition-colors">Machimbres y Revestimientos</Link></li>
                <li><Link to="/catalog" className="hover:text-accent transition-colors">Decks y Exteriores</Link></li>
                <li><Link to="/catalog" className="hover:text-accent transition-colors">Maderas Duras</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl font-bold text-white mb-6">Empresa</h4>
              <ul className="space-y-3 text-bgLight/70">
                <li><a href="#" className="hover:text-accent transition-colors">Nuestra Historia</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Proyectos Destacados</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Sostenibilidad</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-xl font-bold text-white mb-6">Contáctanos</h4>
              <ul className="space-y-3 text-bgLight/70">
                <li className="flex gap-3"><span className="text-accent">T:</span> +54 9 11 4444-5555</li>
                <li className="flex gap-3"><span className="text-accent">E:</span> obras@lumberpremium.com</li>
                <li className="flex gap-3"><span className="text-accent">D:</span> Av. Forestal 4500, BA.</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-bgLight/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-bgLight/50">
            <p>&copy; {new Date().getFullYear()} LumberPremium. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-bgLight">Términos y Condiciones</a>
              <a href="#" className="hover:text-bgLight">Política de Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};