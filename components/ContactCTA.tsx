import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CodeSquare, LayoutTemplate } from 'lucide-react';

const ContactCTA: React.FC = () => {
  return (
    <section 
      id="contacto" 
      className="py-24 relative overflow-hidden border-t border-neutral-200/60 text-neutral-900"
      style={{ backgroundColor: '#fff7ed' }} // 🟠 Naranja ultra clarito premium (Mismo tono de la píldora)
    >
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* ENCABEZADO ESTILO PREMIUM LIGHT (TIRADO A LA IZQUIERDA) */}
        <div className="text-left w-full mb-16">
          {/* Píldora Premium Grande forzada a la izquierda */}
          <div className="flex justify-start mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-orange-200 text-orange-600 text-xl font-medium tracking-wide shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              Contacto Corporativo →
            </div>
          </div>

          {/* Título en formato H2 con tipografía y tamaño tirado a la izquierda */}
          <h2 className="text-left text-3xl lg:text-6xl font-display font-bold tracking-tight text-[#0a0a0a] mb-6 max-w-4xl">
            Llevemos tu negocio a la velocidad correcta.
          </h2>

          {/* Subtítulo con el tamaño y letra exactos del Hero */}
          <p className="text-lg lg:text-xl text-[#525252] max-w-3xl leading-relaxed font-normal">
            Ya sea que necesites automatizar un proceso crítico mediante un proyecto a medida o implementar licencias corporativas de nuestras aplicaciones, estamos listos para resolverlo.
          </p>
        </div>

        {/* Grid de Conversión Dual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Camino 1: Solvra Solutions */}
          <motion.a
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            href="https://wa.me/5491160214719?text=Hola%20Solvra!%20Me%20interesa%20agendar%20una%20call%20técnica%20para%20un%20proyecto%20a%20medida%20o%20automatización."
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-[#0a0a0a] text-white rounded-2xl border border-neutral-900 flex flex-col items-start gap-4 group shadow-xl shadow-black/5 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <CodeSquare size={24} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">Soluciones a Medida</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Analizamos tu operación, diseñamos la solución adecuada e implementamos tecnología que genere resultados medibles y pueda evolucionar junto a tu negocio.
              </p>
            </div>
            <div className="mt-auto pt-8 flex items-center gap-2 text-orange-500 font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
              Agendar reunión <ArrowRight size={18} />
            </div>
          </motion.a>

          {/* Camino 2: Solvra Apps (Licencias/Volumen) */}
          <motion.a
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.99 }}
            href="https://wa.me/5491160214719?text=Hola%20Solvra!%20Me%20interesa%20solicitar%20una%20cotización%20por%20volumen%20o%20licencias%20corporativas%20de%20sus%20apps."
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 bg-white border border-neutral-200 text-[#0a0a0a] rounded-2xl flex flex-col items-start gap-4 group shadow-md hover:shadow-xl hover:border-neutral-300 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-neutral-50 border border-neutral-200 rounded-xl flex items-center justify-center">
              <LayoutTemplate size={24} className="text-[#0a0a0a]" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-[#0a0a0a]">Aplicaciones Empresariales</h3>
              <p className="text-[#525252] text-sm leading-relaxed">
                Implementamos aplicaciones del ecosistema Solvra listas para utilizar, con configuración, capacitación y soporte para equipos de cualquier tamaño.
              </p>
            </div>
            <div className="mt-auto pt-8 flex items-center gap-2 text-[#0a0a0a] font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
              Solicitar Cotización <ArrowRight size={18} />
            </div>
          </motion.a>

        </div>
      </div>

      {/* Línea divisoria inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200/60"></div>
    </section>
  );
};

export default ContactCTA;