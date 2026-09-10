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