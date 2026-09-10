import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Monitor, Workflow, Cpu, Code } from 'lucide-react';

// ================= COMPONENTE DE TARJETA 3D INTERACTIVA PASTEL =================
interface PremiumCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  bgColor: string;      
  glowColor: string;    
  borderColor: string;  
}

const SolutionCard: React.FC<PremiumCardProps> = ({ title, description, icon, features, bgColor, glowColor, borderColor }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [12, -12]);
  const rotateY = useTransform(mouseX, [-150, 150], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
    <div 
      className="perspective-[1000px] h-full" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', backgroundColor: bgColor }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`h-full border border-neutral-200/60 rounded-2xl p-8 shadow-sm transition-all duration-300 relative overflow-hidden flex flex-col justify-between group ${borderColor}`}
      >
        {/* Aura de Brillo Pastel Dinámica */}
        <div className={`absolute -inset-px bg-gradient-to-br ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl blur-md`} />
        
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
          style={{
            boxShadow:
              "0 0 80px rgba(255,255,255,0.06), 0 0 120px rgba(255,255,255,0.03)"
          }}
        />

        {/* Contenido flotante 3D */}
        <div style={{ transform: 'translateZ(40px)' }} className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-white/90 border border-neutral-200/80 text-[#0a0a0a] flex items-center justify-center mb-6 shadow-sm">
              {icon}
            </div>

            <h3 className="text-2xl font-bold text-[#0a0a0a] mb-4 tracking-tight">{title}</h3>
            <p className="text-base text-[#525252] leading-relaxed mb-8">{description}</p>
          </div>

          <ul className="space-y-3 border-t border-neutral-900/5 pt-6 mt-auto">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm font-medium text-[#525252]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/40 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

// ================= CONTENEDOR PRINCIPAL (SOLVRA SOLUTIONS) =================
const Soluciones: React.FC = () => {
 const solucionesData = [
  {
    title: "Reducimos tiempos de implementación",
    description:
      "Utilizamos aplicaciones, componentes y soluciones reutilizables para acelerar proyectos sin comenzar desde cero. Menos tiempo de desarrollo significa resultados más rápidos para tu negocio.",

    icon: <Monitor size={22} />,

    features: [
      "Implementación acelerada",
      "Menor costo inicial",
      "Menor riesgo de proyecto"
    ],

    bgColor: "#ffffff",
    glowColor: "from-[#ff7a00]/10 to-transparent",
    borderColor: "hover:border-orange-300 hover:shadow-orange-500/5"
  },

  {
    title: "Eliminamos trabajo manual",
    description:
      "Automatizamos procesos repetitivos e integramos sistemas para que la información fluya automáticamente entre tus herramientas y equipos.",

    icon: <Workflow size={22} />,

    features: [
      "Menos errores operativos",
      "Mayor productividad",
      "Procesos escalables"
    ],

    bgColor: "#ffffff",
    glowColor: "from-[#ff7a00]/10 to-transparent",
    borderColor: "hover:border-orange-300 hover:shadow-orange-500/5"
  },

  {
    title: "Incorporamos IA útil",
    description:
      "Aplicamos inteligencia artificial donde realmente genera valor: atención al cliente, análisis de información, documentación, soporte y automatización inteligente.",

    icon: <Cpu size={22} />,

    features: [
      "Asistentes inteligentes",
      "Procesamiento automático",
      "Mejor toma de decisiones"
    ],

    bgColor: "#ffffff",
    glowColor: "from-[#ff7a00]/10 to-transparent",
    borderColor: "hover:border-orange-300 hover:shadow-orange-500/5"
  },

  {
    title: "Construimos soluciones que evolucionan",
    description:
      "Cada implementación puede crecer mediante nuevas funcionalidades, integraciones y aplicaciones del ecosistema Solvra, acompañando la evolución de tu empresa.",

    icon: <Code size={22} />,

    features: [
      "Escalabilidad real",
      "Integración continua",
      "Crecimiento sostenible"
    ],

    bgColor: "#ffffff",
    glowColor: "from-[#ff7a00]/10 to-transparent",
    borderColor: "hover:border-orange-300 hover:shadow-orange-500/5"
  }
];

  return (
    <section 
      id="solutions" 
      className="py-24 lg:py-32 overflow-hidden border-b border-orange-100 scroll-mt-20" style={{ backgroundColor: "#fff7ed" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(255,122,0,0.08), transparent 45%)"
        }}
      />

      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,0,0.08), transparent 70%)"
        }}
      />


      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="max-w-3xl mb-16 lg:mb-24 pt-0">
          
          {/* 🍊 Píldora subida con margen negativo (-mt-12) */}
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xl font-medium tracking-wide mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            Solvra Solutions →
          </div>

          <h2 className="text-3xl lg:text-6xl font-display font-bold tracking-tight text-black mb-6">
            Tecnología diseñada para generar resultados.
          </h2>
          <p className="text-xl text-black/70 leading-relaxed">
             Combinamos aplicaciones reutilizables, automatización, inteligencia artificial y desarrollo personalizado para ayudar a empresas y profesionales a reducir costos, acelerar procesos y escalar sus operaciones.
          </p>
        </div>

        {/* Grillado simétrico */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {solucionesData.map((solucion, index) => (
            <SolutionCard 
              key={index}
              title={solucion.title}
              description={solucion.description}
              icon={solucion.icon}
              features={solucion.features}
              bgColor={solucion.bgColor}
              glowColor={solucion.glowColor}
              borderColor={solucion.borderColor}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 border-t border-neutral-200 pt-12">

        <div>
          <div className="text-4xl font-bold text-orange-400">
            IA
          </div>
          <div className="text-black/70">
            Integrada desde el diseño
          </div>
        </div>

        <div>
          <div className="text-4xl font-bold text-orange-400">
            SaaS
          </div>
          <div className="text-black/70">
            Aplicaciones reutilizables
          </div>
        </div>

        <div>
          <div className="text-4xl font-bold text-orange-400">
            Agile
          </div>
          <div className="text-black/70">
            Implementación acelerada
          </div>
        </div>

        <div>
          <div className="text-4xl font-bold text-orange-400">
            ∞
          </div>
          <div className="text-black/70">
            Ecosistema escalable
          </div>
        </div>

      </div>

      </div>

      <div className="max-w-6xl mx-auto text-center mt-34">
        <p className="text-3xl lg:text-5xl font-bold tracking-tight text-orange-400"> Transformamos problemas operativos en ventajas competitivas.</p>
        <p className="text-xl text-black/70 mt-6"> Aplicaciones reutilizables, automatización e inteligencia artificial para acelerar la evolución digital de tu empresa.</p>
      </div>

    </section>
  );
};

export default Soluciones;