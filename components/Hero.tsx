import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <header 
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden text-neutral-900 flex items-center min-h-[90vh]"
      style={{ backgroundColor: '#faf8f5' }} // El elegante fondo crema
    >
      {/* Trama de fondo ultra sutil */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

      {/* Contenedor principal con Flexbox para 2 columnas */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* COLUMNA IZQUIERDA: Textos y CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2"
        >
          {/* Badge superior Naranja */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-sm md:text-base font-medium tracking-wide mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            Desarrollo Acelerado por IA →
          </div>

          {/* H1 con la palabra FUTURO animada y vibrante */}
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.08] tracking-tight text-[#0a0a0a] mb-6">
            Creamos el software
            <br />
            que resuelve el{" "}
            
            {/* 🔥 Diseño dinámico: Gradiente fluido */}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-bg">
              futuro
            </span>
            <br />
            de tu negocio.
          </h1>

          {/* Párrafo en Gris Neutro */}
          <p className="text-lg text-[#525252] max-w-xl mb-10 leading-relaxed font-normal">
            Impulsamos la eficiencia operativa mediante aplicaciones SaaS listas para usar y soluciones tecnológicas a medida potenciadas con Inteligencia Artificial.
          </p>

          {/* Botones */}
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

        {/* COLUMNA DERECHA: Video Institucional */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Ligero retraso para un efecto en cascada
          className="w-full lg:w-1/2"
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/5 border border-neutral-200/80 bg-neutral-100">
            {/* REEMPLAZA "VIDEO_ID" POR EL ID REAL DE TU VIDEO (Ej: dQw4w9WgXcQ) */}
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/NhuhhdGN17Q?autoplay=0&rel=0&showinfo=0"
              title="Video Institucional Solvra"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

      </div>

      {/* Línea divisoria inferior */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200/60"></div>
    </header>
  );
};

export default Hero;
