import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <header 
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden text-neutral-900"
      style={{ backgroundColor: '#faf8f5' }} // El elegante fondo crema de TasteSkill
    >
      {/* Trama de fondo ultra sutil */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {/* Badge superior Naranja */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xl font-medium tracking-wide mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            Desarrollo Acelerado por IA →
          </div>

          {/* H1 con la palabra FUTURO animada y vibrante */}
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-display font-bold leading-[1.08] tracking-tight text-[#0a0a0a] mb-8">
            Creamos el software
            <br />
            que resuelve el{" "}
            
            {/* 🔥 AQUÍ VOLVIÓ EL DISEÑO DINÁMICO: Gradiente fluido adaptado a la nueva paleta */}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-bg">
              futuro
            </span>
            <br />
            de tu negocio.
          </h1>

          {/* Párrafo en Gris Neutro */}
          <p className="text-lg lg:text-xl text-[#525252] max-w-2xl mb-12 leading-relaxed font-normal">
            Impulsamos la eficiencia operativa mediante aplicaciones SaaS listas para usar y soluciones tecnológicas a medida potenciadas con Inteligencia Artificial.
          </p>

          {/* Botones Estilo TasteSkill */}
          <div className="flex flex-wrap gap-4 items-center">
            
            {/* CTA Primario: Negro Sólido Premium */}
            <motion.a 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#solutions" 
              className="px-6 py-3.5 bg-[#0a0a0a] text-white font-medium rounded-xl text-center flex items-center justify-center gap-2 shadow-xl shadow-black/10 hover:bg-neutral-900 transition-all text-sm"
            >
              Ver Soluciones a Medida <ArrowRight size={16} />
            </motion.a>

            {/* CTA Secundario: Blanco Puro Minimalista */}
            <motion.a 
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#apps" 
              className="px-6 py-3.5 bg-white border border-neutral-200 text-[#0a0a0a] font-medium rounded-xl text-center flex items-center justify-center gap-2 shadow-md shadow-neutral-200/50 hover:bg-neutral-50 transition-all text-sm"
            >
              Explorar Solvra Apps
            </motion.a>

          </div>
        </motion.div>
      </div>

      {/* Línea divisoria inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200/60"></div>
    </header>
  );
};

export default Hero;