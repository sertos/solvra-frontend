import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Marketplace from './components/Marketplace';
import Interaccion from './components/Interaccion';
import About from './components/About';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

// 1. Importas los tres nuevos componentes legales desde tu directorio actual
import Terminos from './components/terminos';
import Privacidad from './components/privacidad';
import Arrepentimiento from './components/arrepentimiento';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // O como manejes tu tema

  // 2. Creas un estado único para controlar qué modal legal está abierto
  // Puede ser: null, 'terminos', 'privacidad' o 'arrepentimiento'
  const [activeModal, setActiveModal] = useState<'terminos' | 'privacidad' | 'arrepentimiento' | null>(null);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Función auxiliar para renderizar el componente correcto dentro del modal
  const renderModalContent = () => {
    switch (activeModal) {
      case 'terminos': return <Terminos />;
      case 'privacidad': return <Privacidad />;
      case 'arrepentimiento': return <Arrepentimiento />;
      default: return null;
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white`}>
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Hero />
      <Solutions />
      <Marketplace />
      <Interaccion />
      <About />
      <ContactCTA />
      
      {/* 3. Le pasamos la función para abrir modales como Prop al Footer */}
      <Footer onOpenModal={(modalType: string | ((prevState: "terminos" | "privacidad" | "arrepentimiento" | null) => "terminos" | "privacidad" | "arrepentimiento" | null) | null) => setActiveModal(modalType)} />

      {/* ================= CONTENEDOR GLOBAL DE MODALES ================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          {/* Fondo del modal clickeable para cerrar */}
          <div className="absolute inset-0" onClick={() => setActiveModal(null)}></div>
          
          {/* Ventana contenedora con scroll interno */}
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10">
            
            {/* Botón flotante para cerrar */}
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:scale-105 transition-transform"
            >
              ✕
            </button>

            {/* Inyección dinámica del texto de la ley */}
            <div className="p-1">
              {renderModalContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;