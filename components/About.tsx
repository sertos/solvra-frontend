import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, CheckCircle2, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section 
      id="nosotros" 
      className="py-24 lg:py-32 border-t border-neutral-200/60 relative overflow-hidden scroll-mt-24 text-neutral-900"
      style={{ backgroundColor: '#faf8f5' }}
    >
      {/* Trama de fondo ultra sutil idéntica al Hero */}
      <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0"></div>

      {/* 🟢 ESTELA VERDE FLUIDA Y ALEATORIA DE FONDO */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 mix-blend-multiply opacity-[0.04] blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,1) 0%, rgba(52,211,153,0.5) 50%, transparent 100%)',
        }}
        animate={{
          x: [0, 200, -150, 300, -100, 0],
          y: [0, -100, 250, -150, 200, 0],
          scale: [1, 1.15, 0.9, 1.2, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* ENCABEZADO ESTILO PREMIUM LIGHT (TIRADO A LA IZQUIERDA) */}
        <div className="text-left w-full mb-20">
          {/* Píldora Premium Grande forzada a la izquierda */}
          <div className="flex justify-start mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xl font-medium tracking-wide shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              Conocé a Solvra →
            </div>
          </div>

          {/* Título en formato H2 con tipografía y tamaño tirado a la izquierda */}
          <h2 className="text-left text-3xl lg:text-6xl font-display font-bold tracking-tight text-[#0a0a0a] mb-6 max-w-4xl">
            Filosofía pragmática para la era digital.
          </h2>

          {/* Subtítulo con el tamaño y letra exactos del Hero */}
          <p className="text-lg lg:text-xl text-[#525252] max-w-3xl leading-relaxed font-normal">
            Nacimos con una premisa simple pero radical: el software no debe ser una capa más de complejidad burocrática, sino la herramienta definitiva que resuelva problemas operativos reales.
          </p>
        </div>

       {/* RECUADROS DE MISIÓN Y VISIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          
          {/* Caja: Nuestra Misión */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-8 bg-white rounded-2xl border border-neutral-200/60 shadow-sm hover:bg-[#fff7ed] hover:border-orange-200/80 transition-colors duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-center mb-4">
              <Target size={22} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">Nuestra Misión</h3>
            <p className="text-base text-[#525252] leading-relaxed">
              Diseñar, empaquetar e implementar software hiper-optimizado que elimine la fricción operativa en las organizaciones. Transformamos flujos de trabajo lentos en arquitecturas automatizadas, rentables y escalables.
            </p>
          </motion.div>

          {/* Caja: Nuestra Visión */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-8 bg-white rounded-2xl border border-neutral-200/60 shadow-sm hover:bg-[#fff7ed] hover:border-orange-200/80 transition-colors duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center justify-center mb-4">
              <Eye size={22} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#0a0a0a]">Nuestra Visión</h3>
            <p className="text-base text-[#525252] leading-relaxed">
              Consolidarnos como el partner tecnológico estratégico de referencia para empresas que buscan automatización real, soluciones a medida basadas en Inteligencia Artificial y aplicaciones eficientes que cuidan sus costos de infraestructura.
            </p>
          </motion.div>
          
        </div>

        {/* EL ROSTRO DETRÁS DE SOLVRA (Founder-Led Brand) */}
        <div className="max-w-4xl mx-auto bg-white border border-neutral-200/60 rounded-2xl p-8 md:p-12 shadow-xl shadow-neutral-200/20 hover:bg-[#fff7ed] hover:border-orange-200/80 transition-colors duration-300">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            
            {/* Foto de perfil / Avatar del Fundador */}
            <div className="w-32 h-32 md:w-40 md:h-40 border border-neutral-200 rounded-2xl shrink-0 overflow-hidden shadow-md relative group bg-neutral-50">
              <img src="/1749243777100.jpg" alt="Fundador de Solvra" className="w-full h-full object-cover" />
            </div>

            {/* Reseña Profesional */}
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-2xl font-bold text-[#0a0a0a]">Sergio Miguel Toscano</h4>
                  <p className="text-sm text-orange-600 font-semibold tracking-wide uppercase mt-0.5">CEO & Fundador</p>
                </div>
                
                {/* Enlace a LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/sergio-toscano-9171605/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-[#0a0a0a] transition-colors self-center md:self-start border border-neutral-200 px-3 py-1.5 rounded-xl bg-white shadow-sm"
                >
                  <Globe size={14} /> Perfil Profesional
                </a>
              </div>

              <p className="text-[#525252] text-base leading-relaxed mb-6">
                Como especialista en optimización de costos, administración de activos tecnológicos y magíster en administración de negocios (MBA), entendí que las empresas no necesitan más sistemas genéricos; necesitan soluciones que protejan su rentabilidad operativa. 
                <br /><br />
                Fundé Solvra con el objetivo de fusionar la visión estratégica de negocios con la ingeniería de software moderna (React, Cloud Architecture, Agentic AI), ofreciendo una garantía única en el mercado: soluciones diseñadas con mentalidad corporativa, ejecutadas con máxima agilidad técnica y sin la burocracia de las grandes agencias tradicionales.
              </p>

              {/* Puntos Fuertes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base font-medium text-neutral-700">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 size={16} className="text-orange-500 shrink-0" /> Comunicación directa sin intermediarios.
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 size={16} className="text-orange-500 shrink-0" /> Código modular y arquitectura escalable.
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 size={16} className="text-orange-500 shrink-0" /> Foco absoluto en la optimización de costos.
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 size={16} className="text-orange-500 shrink-0" /> Experiencia estratégica B2B avalada por MBA.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Línea divisoria inferior coincidente con el Header */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200/60"></div>
    </section>
  );
};

export default About;