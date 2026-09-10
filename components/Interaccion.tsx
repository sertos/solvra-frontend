import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, CheckCircle2, Users, Lightbulb, MessageSquare, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

type UpcomingApp = {
  id: string;
  name: string;
  description: string;
  secondaryDescription: string;
  category: string;
  status: 'Idea' | 'En evaluación' | 'En desarrollo' | 'Próximamente';
  interestedCount: number;
};

// Próximas Apps iniciales con 2 párrafos explicativos por card
const initialUpcomingApps: UpcomingApp[] = [
  {
    id: 'whatsapp-billing',
    name: 'Facturación Rápida por WhatsApp',
    description: 'Un bot que recibe capturas de transferencias o pedidos por chat, procesa los datos con IA y emite la factura electrónica en segundos.',
    secondaryDescription: 'Se integra directamente con tu sistema de gestión y AFIP/comprobantes para que no pierdas tiempo cargando datos a mano al cerrar una venta.',
    category: 'Ventas y Finanzas',
    status: 'En desarrollo',
    interestedCount: 10,
  },
  {
    id: 'ia-pdf-audit',
    name: 'Auditor Inteligente de Contratos PDF',
    description: 'Subí tus contratos y presupuestos. La IA los analiza comparándolos con tus reglas de negocio y te alerta sobre cláusulas de riesgo.',
    secondaryDescription: 'Detecta inconsistencias legales, fechas límite de renovación automática y penalizaciones ocultas antes de que firmes cualquier acuerdo.',
    category: 'Ingeniería de Datos',
    status: 'Idea',
    interestedCount: 5,
  },
  {
    id: 'ai-lead-scraper',
    name: 'Extractor Automatizado de Leads B2B',
    description: 'Buscá en Google Maps o LinkedIn empresas de un sector específico y extraé emails, teléfonos e información de contacto validada.',
    secondaryDescription: 'Construye listas de prospectos altamente cualificadas en minutos, listas para exportar a tu CRM o iniciar campañas outbound.',
    category: 'Marketing y Ventas',
    status: 'Próximamente',
    interestedCount: 12,
  },
  {
    id: 'notion-crm-sync',
    name: 'Sincronizador CRM & Notion',
    description: 'Centralizá automáticamente las consultas de clientes e interacciones en tus bases de datos de Notion sin teclear manualmente.',
    secondaryDescription: 'Mantiene tus tableros Kanban actualizados en tiempo real sincronizando emails, mensajes e hitos del embudo comercial.',
    category: 'Administración y Finanzas',
    status: 'En evaluación',
    interestedCount: 8,
  },
  {
    id: 'auto-inventory-ai',
    name: 'Control de Stock Predictivo',
    description: 'Algoritmo que predice faltantes de inventario según histórico de ventas y envía alertas automáticas a proveedores.',
    secondaryDescription: 'Evita quiebres de stock optimizando el capital de trabajo e identificando patrones estacionales en tu demanda.',
    category: 'Ingeniería de Datos',
    status: 'Idea',
    interestedCount: 15,
  }
];

// --- COMPONENTE CARRUSEL 3D "TIME MACHINE" (FRONTAL BLANCA / TRASERAS NARANJA OSCURECIÉNDOSE) ---

const TimeMachineCarousel = ({
  apps,
  votedApps,
  onVote,
  getStatusStyle
}: {
  apps: UpcomingApp[];
  votedApps: string[];
  onVote: (id: string) => void;
  getStatusStyle: (status: UpcomingApp['status']) => string;
}) => {
  const displayApps = apps.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      setActiveIndex((prev) => Math.min(prev + 1, displayApps.length - 1));
    } else if (e.deltaY < 0) {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  // Helper para asignar tonalidades de naranja que se VAN ACLARANDO hacia el fondo
  const getCardTheme = (absOffset: number) => {
    switch (absOffset) {
      case 0: // 1ra (Frontal): Blanca
        return {
          cardBg: 'bg-white border-neutral-200 shadow-[0_25px_60px_rgba(0,0,0,0.08),0_10px_25px_rgba(255,140,0,0.05)] ring-1 ring-neutral-200/50',
          titleColor: 'text-neutral-950 font-extrabold',
          descColor: 'text-neutral-700',
          secondaryDescColor: 'text-neutral-500',
          footerBorder: 'border-neutral-100',
          metaColor: 'text-neutral-500',
          btnBg: 'bg-neutral-950 text-white hover:bg-neutral-900',
          btnArrow: 'text-orange-400',
          userBadge: 'text-neutral-600 bg-neutral-100/90 border-neutral-200/80'
        };
      case 1: // 2da Card: Naranja Vivo e Intenso
        return {
          cardBg: 'bg-orange-300 border-orange-200 text-orange-950 shadow-lg hover:bg-orange-300/90',
          titleColor: 'text-white font-extrabold',
          descColor: 'text-orange-50',
          secondaryDescColor: 'text-orange-100/80',
          footerBorder: 'border-orange-400/60',
          metaColor: 'text-orange-100',
          btnBg: 'bg-orange-600/90 text-white border border-orange-400/50',
          btnArrow: 'text-orange-200',
          userBadge: 'text-white bg-orange-600/60 border-orange-400/50'
        };
      case 2: // 3ra Card: Naranja Medio
        return {
          cardBg: 'bg-orange-200 border-orange-200/80 text-orange-950 shadow-md hover:bg-orange-200/90',
          titleColor: 'text-orange-950 font-extrabold',
          descColor: 'text-orange-950/90',
          secondaryDescColor: 'text-orange-900/80',
          footerBorder: 'border-orange-400/50',
          metaColor: 'text-orange-900',
          btnBg: 'bg-orange-400/80 text-orange-950 border border-orange-400',
          btnArrow: 'text-orange-950',
          userBadge: 'text-orange-950 bg-orange-200/80 border-orange-400/50'
        };
      case 3: // 4ta Card: Naranja Pastel Suave
        return {
          cardBg: 'bg-orange-100/90 border-orange-200/60 text-orange-950 shadow-md hover:bg-orange-100/90',
          titleColor: 'text-orange-950 font-extrabold',
          descColor: 'text-orange-900/90',
          secondaryDescColor: 'text-orange-800/70',
          footerBorder: 'border-orange-200/60',
          metaColor: 'text-orange-800/80',
          btnBg: 'bg-orange-200/80 text-orange-950 border border-orange-300/60',
          btnArrow: 'text-orange-700',
          userBadge: 'text-orange-900 bg-orange-200/60 border-orange-300/50'
        };
      default: // 5ta Card: Naranja / Crema Ultra Claro (Pálido)
        return {
          cardBg: 'bg-amber-50/95 border-amber-200/80 text-amber-950 shadow-sm hover:bg-amber-100/90',
          titleColor: 'text-amber-950 font-extrabold',
          descColor: 'text-amber-900/80',
          secondaryDescColor: 'text-amber-800/60',
          footerBorder: 'border-amber-200/50',
          metaColor: 'text-amber-800/80',
          btnBg: 'bg-amber-200/60 text-amber-950 border border-amber-300/50',
          btnArrow: 'text-amber-800',
          userBadge: 'text-amber-900 bg-amber-100/80 border-amber-200/60'
        };
    }
  };

  return (
  
    <div className="relative w-full flex flex-col items-center pt-10">
      {/* Contenedor 3D */}
      <div 
        onWheel={handleWheel}
        className="relative w-full h-[580px] flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing select-none"
        style={{ perspective: "1400px" }}
      >
        {displayApps.map((app, index) => {
          const offset = index - activeIndex;
          const absOffset = Math.abs(offset);
          const isFront = offset === 0;
          const hasVoted = votedApps.includes(app.id);
          const theme = getCardTheme(absOffset);

          // Calibración de elevación (translateY) para revelar el nombre superior de las apps traseras
          const translateZ = isFront ? 0 : -absOffset * 90;
          const translateY = isFront ? 0 : offset * -62;
          const scale = isFront ? 1 : Math.max(0.82, 1 - absOffset * 0.07);
          const opacity = isFront ? 1 : Math.max(0.8, 1 - absOffset * 0.06);
          const rotateX = isFront ? 0 : 5;

          return (
           <motion.div
                key={app.id}
                onClick={() => setActiveIndex(index)}
                initial={false}
                animate={{
                  z: translateZ,
                  y: translateY,
                  scale,
                  opacity,
                  rotateX,
                }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 24,
                  mass: 0.7,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: displayApps.length - absOffset,
                  willChange: "transform, opacity", // Optimización por hardware (GPU)
                }}
                // Importante: Removimos 'transition-all duration-300' para evitar conflictos
                className={`absolute w-full max-w-xl p-8 rounded-3xl border overflow-hidden cursor-pointer ${isFront ? '' : 'backdrop-blur-md'} ${theme.cardBg}`}
              >
              <div className="relative z-10">
                {/* 1. TÍTULO EN LA CABECERA SUPERIOR (SIEMPRE VISIBLE EN LA SOLAPA) */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h4 className={`text-2xl font-display tracking-tight truncate ${theme.titleColor}`}>
                    {app.name}
                  </h4>
                  {!isFront && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-black/10 text-current border border-current/20 backdrop-blur-sm shrink-0">
                      Ver app
                    </span>
                  )}
                </div>

                {/* 2. BADGES Y ESTADO */}
                <div className="flex justify-between items-center gap-4 mb-5">
                  <span className={`text-[10px] uppercase tracking-widest font-black px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 border shadow-sm transition-all ${
                    isFront 
                      ? getStatusStyle(app.status)
                      : 'bg-white/30 text-current border-current/30 backdrop-blur-sm'
                  }`}>
                    {app.status === 'En desarrollo' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                    {app.status === 'Idea' && <span className="w-1.5 h-1.5 rounded-full bg-neutral-400"></span>}
                    {app.status === 'Próximamente' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>}
                    {app.status}
                  </span>

                  <span className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 shadow-sm transition-all ${theme.userBadge}`}>
                    <Users size={13} className={isFront ? 'text-neutral-500' : 'opacity-80'} />
                    <strong>{app.interestedCount}</strong> 
                    <span className="opacity-80">interesados</span>
                  </span>
                </div>

                {/* 3. DESCRIPCIONES */}
                <p className={`text-sm leading-relaxed mb-3 font-medium ${theme.descColor}`}>
                  {app.description}
                </p>
                
                <p className={`text-sm leading-relaxed mb-6 font-normal ${theme.secondaryDescColor}`}>
                  {app.secondaryDescription}
                </p>

                {/* 4. FOOTER Y BOTÓN */}
                <div className={`flex justify-between items-center pt-5 border-t transition-colors ${theme.footerBorder}`}>
                  <span className={`text-xs font-medium ${theme.metaColor}`}>
                    Categoría: <strong className="font-bold">{app.category}</strong>
                  </span>
                  
                  <button
                    disabled={hasVoted || !isFront}
                    onClick={(e) => {
                      e.stopPropagation();
                      onVote(app.id);
                    }}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                      hasVoted
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : isFront
                        ? `${theme.btnBg} active:scale-95 shadow-md`
                        : `${theme.btnBg} cursor-pointer`
                    }`}
                  >
                    {hasVoted ? (
                      <>
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        Registrado
                      </>
                    ) : (
                      <>
                        Quiero novedades
                        <ArrowRight size={14} className={theme.btnArrow} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controles de Navegación */}
      <div className="flex items-center gap-4 mt-6 z-20">
        <button
          onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
          disabled={activeIndex === 0}
          className="p-2.5 rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2">
          {displayApps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === idx ? 'w-8 bg-orange-500' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveIndex((prev) => Math.min(prev + 1, displayApps.length - 1))}
          disabled={activeIndex === displayApps.length - 1}
          className="p-2.5 rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm hover:bg-neutral-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---

const Interaccion: React.FC = () => {
  const [upcomingApps, setUpcomingApps] = useState<UpcomingApp[]>(initialUpcomingApps);
  const [votedApps, setVotedApps] = useState<string[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    idea: '',
    category: 'Ventas y Marketing'
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const API_BASE_URL = 'https://sertos.github.io/solvra-marketplace-data';
  const EMAIL_SERVICE_URL = 'https://us-central1-solvra-demos.cloudfunctions.net/solvra-email-service';

  useEffect(() => {
    const savedVotes = localStorage.getItem('solvra_voted_apps');
    if (savedVotes) {
      setVotedApps(JSON.parse(savedVotes));
    }
  }, []);

  const handleVote = async (appId: string) => {
    if (votedApps.includes(appId)) return;

    const updated = upcomingApps.map(app => {
      if (app.id === appId) {
        return { ...app, interestedCount: app.interestedCount + 1 };
      }
      return app;
    });
    setUpcomingApps(updated);

    const newVotes = [...votedApps, appId];
    setVotedApps(newVotes);
    localStorage.setItem('solvra_voted_apps', JSON.stringify(newVotes));

    try {
      await fetch(`${API_BASE_URL}/upcoming-apps/${appId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.log('Voto registrado localmente');
    }
  };

 // ✅ BLOQUE ACTUALIZADO PARA CLOUD FUNCTIONS:
const handleSubmitSuggestion = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoadingForm(true);

  try {
    const response = await fetch(EMAIL_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'suggestions',
        ...formData
      })
    });

    if (response.ok) {
      setFormSubmitted(true);
    } else {
      const data = await response.json();
      alert(data.error || "Ocurrió un problema al enviar la propuesta. Intentá nuevamente.");
    }
  } catch (error) {
    console.error("Error al conectar con la API:", error);
    alert("No se pudo conectar con el servidor. Verificá tu conexión o intentá más tarde.");
  } finally {
    setLoadingForm(false);
  }
};

  const getStatusStyle = (status: UpcomingApp['status']) => {
    switch (status) {
      case 'Idea':
        return 'bg-neutral-100 text-neutral-700 border-neutral-200/70';
      case 'En evaluación':
        return 'bg-amber-50 text-amber-700 border-amber-200/70';
      case 'En desarrollo':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/70';
      case 'Próximamente':
        return 'bg-blue-50 text-blue-700 border-blue-200/70';
    }
  };

  return (
    <section 
      id="co-creacion" 
      className="py-28 relative overflow-hidden border-t border-neutral-200/60"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER DEL MÓDULO */}
        <div className="text-left mb-16 max-w-4xl">
          <div className="flex justify-start mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xl font-medium tracking-wide shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              Co-Creation Solvra →
            </div>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-display font-extrabold tracking-tighter text-neutral-950 mb-6 leading-[1.1]"
          >
            El futuro de Solvra lo construimos juntos
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neutral-700 text-xl leading-relaxed max-w-3xl"
          >
            Queremos resolver problemas reales de negocio. Explorá las aplicaciones bajo análisis en nuestro visor Time Machine, votá tus favoritas o sugerí tu propia idea.
          </motion.p>
        </div>

        {/* ESTRUCTURA PRINCIPAL EN 2 COLUMNAS */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* COLUMNA 1 (lg:col-span-7) - CARRUSEL TIME MACHINE 3D */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center border border-orange-200/60 shadow-inner">
                <Lightbulb className="text-orange-600" size={26} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-extrabold text-neutral-950 tracking-tight">Próximas Apps en evaluación</h3>
                <p className="text-sm text-neutral-600 mt-0.5">Usa la rueda del mouse o haz clic en las tarjetas traseras para navegar.</p>
              </div>
            </div>

            {/* IMPLEMENTACIÓN DEL VISOR TIME MACHINE */}
            <TimeMachineCarousel 
              apps={upcomingApps}
              votedApps={votedApps}
              onVote={handleVote}
              getStatusStyle={getStatusStyle}
            />
          </div>

          {/* COLUMNA 2 (lg:col-span-5) - FORMULARIO */}
          <div className="lg:col-span-5 lg:sticky lg:top-12">
            <div className="bg-white border border-neutral-200/70 rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 flex items-center justify-center border border-neutral-200/60 shadow-inner">
                    <MessageSquare className="text-orange-600" size={24} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-neutral-950 tracking-tight">¿Qué aplicación necesitás?</h3>
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed mb-8 font-normal">
                  ¿Tenés un problema operativo o administrativo recurrente que podría resolverse de manera automatizada con software? Contanos tu idea.
                </p>

                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmitSuggestion}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-2 tracking-wide uppercase">Nombre completo</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ej. Juan Pérez"
                          className="w-full px-5 py-3 border border-neutral-200 rounded-2xl text-sm bg-neutral-50/50 text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all shadow-inner"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-neutral-800 mb-2 tracking-wide uppercase">Email</label>
                          <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="juan@empresa.com"
                            className="w-full px-5 py-3 border border-neutral-200 rounded-2xl text-sm bg-neutral-50/50 text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all shadow-inner"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-neutral-800 mb-2 tracking-wide uppercase">Empresa</label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Soluciones S.A."
                            className="w-full px-5 py-3 border border-neutral-200 rounded-2xl text-sm bg-neutral-50/50 text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all shadow-inner"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-2 tracking-wide uppercase">Categoría</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-5 py-3 border border-neutral-200 rounded-2xl text-sm bg-neutral-50/50 text-neutral-950 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all cursor-pointer shadow-inner"
                        >
                          <option value="Ventas y Marketing">Ventas y Marketing</option>
                          <option value="Ingeniería de Datos">Ingeniería de Datos</option>
                          <option value="Administración y Finanzas">Administración y Finanzas</option>
                          <option value="Integración de APIs">Integración de APIs</option>
                          <option value="Otro">Otro</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-2 tracking-wide uppercase">Descripción</label>
                        <textarea
                          required
                          rows={4}
                          value={formData.idea}
                          onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                          placeholder="Explicá brevemente qué tarea te gustaría automatizar..."
                          className="w-full px-5 py-3 border border-neutral-200 rounded-2xl text-sm bg-neutral-50/50 text-neutral-950 placeholder-neutral-400 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 focus:bg-white transition-all resize-none shadow-inner leading-relaxed"
                        />
                      </div>

                      <motion.button
                        layout
                        type="submit"
                        disabled={loadingForm}
                        whileHover={{ translateY: -2, boxShadow: "0 10px 20px rgba(255,140,0,0.2)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-neutral-950 hover:bg-neutral-900 text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-sm flex items-center justify-center gap-3 shadow-md"
                      >
                        {loadingForm ? 'Enviando...' : 'Enviar Propuesta a Co-Creación'}
                        <Send size={16} className="text-orange-300" />
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 px-4 space-y-5 bg-emerald-50/50 rounded-2xl border border-emerald-100"
                    >
                      <div className="w-16 h-16 bg-white text-emerald-600 border-4 border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <CheckCircle2 size={32} />
                      </div>
                      <h4 className="text-lg font-extrabold text-neutral-950">¡Propuesta recibida!</h4>
                      <p className="text-xs text-neutral-700 leading-relaxed max-w-sm mx-auto">
                        Muchas gracias, <strong>{formData.name}</strong>. Analizaremos tu propuesta pronto.
                      </p>
                      <button
                        onClick={() => {
                          setFormData({ name: '', email: '', company: '', idea: '', category: 'Ventas y Marketing' });
                          setFormSubmitted(false);
                        }}
                        className="px-5 py-2.5 border border-neutral-300 rounded-xl text-xs font-bold bg-white text-neutral-950 hover:bg-neutral-50 shadow-sm"
                      >
                        Sugerir otra idea
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200/60"></div>
    </section>
  );
};

export default Interaccion;