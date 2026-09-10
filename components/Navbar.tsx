import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

// ================= COMPONENTE DE ENLACE CON EFECTO 3D TILT SUTIL =================
interface MenuLinkProps {
  name: string;
  href: string;
}

const MenuLink3D: React.FC<MenuLinkProps> = ({ name, href }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Calibración ultra sutil (solo 8 grados máximos de inclinación) para que sea elegante en elementos chicos
  const rotateX = useTransform(mouseY, [-60, 60], [8, -8]);
  const rotateY = useTransform(mouseX, [-60, 60], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const currentX = e.clientX - rect.left - width / 2;
    const currentY = e.clientY - rect.top - height / 2;
    
    mouseX.set(currentX);
    mouseY.set(currentY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="perspective-[400px]">
      <motion.a
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative px-5 py-2 text-base font-semibold text-neutral-700 hover:text-[#0a0a0a] rounded-full flex items-center justify-center border border-transparent hover:border-neutral-200/60 hover:bg-white hover:shadow-md hover:shadow-neutral-200/40 transition-colors duration-200 group"
      >
        {/* Efecto Parallax en el texto: flota 15px por encima del fondo gris de la navbar */}
        <span style={{ transform: 'translateZ(15px)' }} className="relative z-10 pointer-events-none">
          {name}
        </span>
      </motion.a>
    </div>
  );
};


// ================= CONTENEDOR PRINCIPAL NAVBAR =================
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMobileClick = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const menuLinks = [
    { name: 'Solvra Apps', href: '#apps' },
    { name: 'Solvra Solutions', href: '#solutions' },
    { name: 'Co-Creación', href: '#co-creacion' },
    { name: 'Nosotros', href: '#nosotros' },
  ];

  return (
    <nav className="fixed w-full z-50 border-b border-neutral-200/80 bg-[#faf8f5]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        
        {/* Logo Solvra Agrandado */}
        <a href="#" className="flex items-center gap-1 group">
          {/* Agrandamos el contenedor de w-10 h-10 a w-12 h-12 */}
          <div className="w-18 h-18 bg-[#0a0a0a]/5 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden rounded-full">
            <img src="/logo2.png" alt="Solvra Logo" className="w-full h-full object-contain" />
          </div>
          {/* Agrandamos la tipografía de text-3xl a text-4xl */}
          <span className="font-display font-bold text-4xl tracking-tight text-[#0a0a0a]">
            Solvra
          </span>
        </a>

        {/* 💻 Menú Desktop con las opciones interactivas 3D individuales */}
        <div className="hidden md:flex items-center gap-3 relative">
          
          {menuLinks.map((link, idx) => (
            <MenuLink3D key={idx} name={link.name} href={link.href} />
          ))}
          
          {/* Botón de Acción Principal (También con sutil elevación en hover) */}
          <motion.a 
            whileHover={{ y: -1.5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#contacto" 
            className="ml-6 px-6 py-3 bg-[#0a0a0a] text-white font-bold text-normal rounded-full hover:bg-neutral-900 transition-all shadow-lg shadow-black/5 flex items-center gap-1.5 group/btn"
          >
            Hablar con Solvra
            <ArrowUpRight size={16} className="text-neutral-400 group-hover/btn:text-white transition-colors" />
          </motion.a>
        </div>

        {/* Controles Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-[#0a0a0a] p-2 rounded-full hover:bg-neutral-900/5" aria-label="Menu">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 w-full bg-[#faf8f5] border-b border-neutral-200/80 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-2 py-6 px-6">
              {menuLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href} 
                  onClick={handleMobileClick} 
                  className="text-lg font-bold py-3 px-4 rounded-xl hover:bg-neutral-900/5 transition-colors text-neutral-800"
                >
                  {link.name}
                </a>
              ))}
              
              <a 
                href="#contacto" 
                onClick={handleMobileClick} 
                className="w-full text-center mt-4 px-5 py-3.5 bg-[#0a0a0a] text-white font-bold rounded-xl shadow-lg"
              >
                Hablar con Solvra
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;