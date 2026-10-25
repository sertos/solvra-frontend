import React from 'react';

// Declaramos explícitamente la propiedad que va a recibir desde App.tsx
interface FooterProps {
  onOpenModal: (type: 'terminos' | 'privacidad' | 'arrepentimiento') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-4">
        
        {/* Copyright y Eslogan */}
        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>© {new Date().getFullYear()} Solvra.</span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-800">•</span>
          <span>La tecnología cambia, la confianza no.</span>
        </p>

        {/* Datos Comerciales */}
        <div className="text-[11px] text-slate-400 dark:text-slate-500 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-medium mt-1">
          <span>Solvra Solutions</span>
          <span className="hidden sm:inline text-slate-200 dark:text-slate-800">|</span>
          <span>CUIT/CUIL: 20-23620641-7</span>
          <span className="hidden sm:inline text-slate-200 dark:text-slate-800">|</span>
          <a href="mailto:educacion@vocaccion.com.ar" className="hover:text-primary transition-colors underline underline-offset-2">
            sergiot@solvra.com.ar
          </a>
          <span className="hidden sm:inline text-slate-200 dark:text-slate-800">|</span>
          <span className="font-mono text-[10px]">Buenos Aires, Argentina</span>
        </div>

        {/* Redes Sociales */}
        <div className="flex justify-center items-center gap-5 mt-2">
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/company/solvrasolutions/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-[#0a66c2] transition-colors"
            aria-label="LinkedIn de Solvra"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
            </svg>
          </a>
          
          {/* YouTube */}
          <a 
            href="https://www.youtube.com/@SolvraSolutionsIA" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-[#ff0000] transition-colors"
            aria-label="Canal de YouTube de Solvra"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" />
            </svg>
          </a>
        </div>

        {/* Disparadores de los Modales Legales */}
        <div className="mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-slate-400 dark:text-slate-500">
          <button onClick={() => onOpenModal('terminos')} className="hover:text-primary transition-colors underline cursor-pointer bg-transparent border-none">
            Términos de Uso
          </button>
          <button onClick={() => onOpenModal('privacidad')} className="hover:text-primary transition-colors underline cursor-pointer bg-transparent border-none">
            Política de Privacidad
          </button>
          <button onClick={() => onOpenModal('arrepentimiento')} className="hover:text-amber-500 transition-colors font-bold text-amber-600 dark:text-amber-500 underline cursor-pointer bg-transparent border-none">
            Botón de Arrepentimiento
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
