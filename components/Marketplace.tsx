import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Bot, FileSpreadsheet, Cpu, HelpCircle } from 'lucide-react';

type AppType = {
  id: string;
  name: string;
  category: string;
  description: string;
  downloads?: number;
  rating?: number;
  reviews?: number;
  images?: string[];
  type?: 'marketplace' | 'saas';
  url?: string;
};

type ImplementationFormData = {
  company: string;
  name: string;
  email: string;
  appName: string;
  usersCount: string;
  need: string;
  comments: string;
};

// 🔥 APPS
const fallbackApps: AppType[] = [];

// 🌐 Mapeo de URLs de Google Cloud por ID o Nombre de la App
const CLOUD_DEMOS: Record<string, string> = {
  // Podés mapear por ID de la app o por Nombre
  'closebot-ai': 'https://closebot-ai-971636503516.us-central1.run.app',
  'ContadorOS': 'https://contadoros.ai.studio',
  'ClinicaOS': 'https://clinicaos.ai.studio',
  'consorcioos': 'https://consorciopro-gesti-n-de-consorcios-caba.ai.studio',
  'pdf-ai': 'https://pdf-ai-971636503516.us-central1.run.app',
  'smartcrm-ai': 'https://smartcrm-ai-971636503516.us-central1.run.app',
  'dataflow-ml': 'https://dataflow-ml-971636503516.us-central1.run.app',
  'audiostudio': 'https://audiostudio-971636503516.us-central1.run.app',
  'finops-oci': 'https://finopsdashoci-971636503516.us-central1.run.app',
  'photostudio': 'https://photostudio-971636503516.us-central1.run.app',
  'linguaflow': 'https://linguaflow-roleplay.ai.studio',
  // Agregás las 10, 20 o más URLs fácilmente acá...
};

const DEFAULT_DEMO_URL = "https://closebot-ai-971636503516.us-central1.run.app";

// Función Helper para resolver la URL de la demo de forma dinámica
const getAppDemoUrl = (app: AppType): string => {
  if (app.url) return app.url; // 1. Prioridad: URL que viene de la API
  if (app.id && CLOUD_DEMOS[app.id]) return CLOUD_DEMOS[app.id]; // 2. Coincidencia por ID
  
  // 3. Coincidencia por Nombre (convirtiendo a minúsculas)
  const appNameKey = Object.keys(CLOUD_DEMOS).find(key => 
    app.name?.toLowerCase().includes(key.toLowerCase())
  );
  if (appNameKey) return CLOUD_DEMOS[appNameKey];

  // 4. Fallback si no hay coincidencia
  return DEFAULT_DEMO_URL;
};

// iconos (Blindado)
const getIcon = (category?: string) => {
  const safeCategory = String(category || '').toLowerCase();

  if (safeCategory.includes('datos')) return <Database size={20} />;
  if (safeCategory.includes('ventas') || safeCategory.includes('marketing')) return <Bot size={20} />;
  
  return <FileSpreadsheet size={20} />;
};

// estilos (Blindado)
const getStyles = (category?: string) => {
  const safeCategory = String(category || '').toLowerCase();

  if (safeCategory.includes('datos')) return { color: 'text-neutral-800', bg: 'bg-neutral-100' };
  if (safeCategory.includes('ventas') || safeCategory.includes('marketing')) return { color: 'text-neutral-800', bg: 'bg-neutral-100' };

  return { color: 'text-neutral-800', bg: 'bg-neutral-100' };
};

const Marketplace: React.FC = () => {
  const [apps, setApps] = useState<AppType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<AppType | null>(null);
  const [search, setSearch] = useState('');
  const [imgIndex, setImgIndex] = useState(0);

  // Reemplaza la URL previa de OCI por tu nueva CDN en GitHub Pages
  const API_BASE_URL = 'https://sertos.github.io/solvra-marketplace-data';
  const EMAIL_SERVICE_URL = 'https://us-central1-solvra-demos.cloudfunctions.net/solvra-email-service';
  

  // Estados para el flujo de implementación
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState<ImplementationFormData>({
    company: '',
    name: '',
    email: '',
    appName: '',
    usersCount: '1-5',
    need: '',
    comments: ''
  });

  // Actualiza el nombre de la app en el formulario cuando se selecciona una app
  useEffect(() => {
    if (selectedApp) {
      setFormData(prev => ({ ...prev, appName: selectedApp.name }));
    }
  }, [selectedApp]);


// 2. Actualiza la función del formulario:
const handleFormSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // CAMBIO CLAVE: Usa EMAIL_SERVICE_URL (no API_BASE_URL)
    const response = await fetch(EMAIL_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'request-implementation',
        ...formData
      }),
    });

    if (response.ok) {
      setFormSubmitted(true);
    } else {
      console.error('Error al enviar la solicitud');
      setFormSubmitted(true);
    }
  } catch (error) {
    console.error('Error de red al enviar el formulario:', error);
    setFormSubmitted(true);
  } finally {
    setIsSubmitting(false);
  }
};
  

// 2. useEffect actualizado con captura de errores
useEffect(() => {
  fetch(`${API_BASE_URL}/apps.json`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      // Aseguramos que data sea una lista válida
      if (Array.isArray(data)) {
        setApps(data);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error al conectar con GitHub Pages:", error);
      // Apagamos el loader para evitar que se quede en 'Cargando plataformas...'
      setLoading(false);
    });
}, []);


// Bloquear el scroll del body cuando el modal está abierto
 useEffect(() => {
  if (selectedApp || isFormOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return () => {
    document.body.style.overflow = 'unset';
  };
}, [selectedApp, isFormOpen]);


 // Valida que el nombre exista antes de usar .includes
  const isNativeApp = (name?: string) => {
    if (!name) return false;
    const safeName = String(name).toLowerCase();
    return safeName.includes('vocaccion') || safeName.includes('vocaccionpro');
  };

  // Valida que la app y el nombre existan antes de filtrar
  const filteredApps = apps.filter(app => {
    if (!app || !app.name) return false; 
    return String(app.name).toLowerCase().includes(String(search || '').toLowerCase());
  });

  const nativeApps = filteredApps.filter(app => isNativeApp(app.name));
  const marketplaceApps = filteredApps.filter(app => app.type === 'marketplace' && !isNativeApp(app.name));
  const saasApps = filteredApps.filter(app => app.type === 'saas' && !isNativeApp(app.name));

  const topApps = [...marketplaceApps]
    .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
    .slice(0, 3);

  const renderCards = (appsList: AppType[]) => (
    <div className="grid md:grid-cols-3 gap-6">
      {appsList.map((app, index) => {
        const styles = getStyles(app.category);

        return (
          <motion.div
            key={app.id}
            onClick={() => {
              setSelectedApp(app);
              setImgIndex(0);
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="cursor-pointer bg-white rounded-2xl p-5 border border-neutral-200/70 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/40 transition-all relative z-10 flex flex-col justify-between"
          >
            <div>
              <div
                className={`w-10 h-10 ${styles.bg} ${styles.color} rounded-xl flex items-center justify-center mb-3 border border-neutral-200/40`}
              >
                {getIcon(app.category)}
              </div>

              <h3 className="text-lg font-bold mb-2 text-[#0a0a0a]">{app.name}</h3>

              <p className="text-sm line-clamp-3 text-[#525252]">
                {app.description}
              </p>
            </div>

         {/* Leyenda/Acción inferior de la tarjeta */}
            <div className="mt-4 flex items-center">
              {isNativeApp(app.name) ? (
                /* CASO 1: Apps Productivas (Vocaccion) -> Leyenda sin enlace directo (obliga a entrar al modal) */
                <span className="inline-flex items-center gap-1.5 text-xs text-neutral-800 bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Plataforma Productiva
                </span>
              ) : (
                /* CASO 2: Demos MVP -> Píldora interactiva naranja con acceso directo */
                <a
                  href={getAppDemoUrl(app)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Evita abrir el modal si hace clic en la píldora
                  className="inline-flex items-center gap-1.5 text-xs text-orange-600 bg-orange-50 border border-orange-200/60 px-2.5 py-1 rounded-full font-medium hover:bg-orange-100 hover:border-orange-300 transition-all cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> Probar Demo ↗
                </a>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-amber-500 text-sm">
        {'★'.repeat(Math.round(rating)).padEnd(5, '☆')}
      </div>
    );
  };

  const cloudApps = filteredApps.filter(app => !isNativeApp(app.name));
 
  return (
    <section 
      id="apps" 
      className="py-24 relative overflow-hidden border-t border-neutral-200/60"
      style={{ backgroundColor: '#faf8f5' }} // El fondo crema de tu Hero
    >
      
    {/* HEADER */}
    <div className="text-left mb-14 w-full"></div>
          {/* Glow superior derecho */}
    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

    {/* Glow inferior izquierdo */}
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

    {/* Gradiente suave */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-left mb-14 w-full">

          
          {/* Píldora Premium Grande forzada a la izquierda */}
          <div className="flex justify-start mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xl font-medium tracking-wide shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
              Solvra Apps →
            </div>
          </div>

          {/* Texto con la misma tipografía y tamaño exactos del subtítulo del Hero */}
         <h2 className="text-left text-3xl lg:text-6xl font-display font-bold tracking-tight text-[#0a0a0a] mb-6">
          Probá nuestras demos interactivas en tiempo real o accedé a plataformas SaaS integradas.
        </h2>

          <div className="flex justify-center w-full">
            <input
              type="text"
              placeholder="Buscar apps de Solvra..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-3 w-full max-w-md border border-neutral-200 rounded-xl text-base bg-white text-[#0a0a0a] placeholder-neutral-400 shadow-sm focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>
        </div>

       <div className="mb-16 bg-white border border-neutral-200 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle size={20} className="text-orange-500" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400">¿Cómo probar Solvra Apps?</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 bg-neutral-50 text-[#0a0a0a] border border-neutral-200 rounded-lg flex items-center justify-center font-bold">
              <Bot size={18} />
            </div>
            <div>
              <h5 className="font-semibold text-[#0a0a0a] mb-1">1. Seleccioná la App</h5>
              <p className="text-xs text-[#525252] leading-relaxed">Explorá el catálogo y elegí la solución impulsada por IA que querés evaluar. Haz click en la tarjeta de la app para ver todo el detalle de la misma.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 bg-neutral-50 text-[#0a0a0a] border border-neutral-200 rounded-lg flex items-center justify-center font-bold">
              <Cpu size={18} />
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 bg-neutral-50 text-[#0a0a0a] border border-neutral-200 rounded-lg flex items-center justify-center font-bold">
                <Cpu size={18} />
              </div>
              <div>
                <h5 className="font-semibold text-[#0a0a0a] mb-1">2. Acceso Instantáneo</h5>
                <p className="text-xs text-[#525252] leading-relaxed">
                  Haciendo clic directamente en la píldora <strong className="text-orange-600 font-semibold">Probar Demo ↗</strong> de cada tarjeta, accedés de inmediato a la aplicación desplegada en Google Cloud sin descargas ni registros.
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 shrink-0 bg-neutral-50 text-[#0a0a0a] border border-neutral-200 rounded-lg flex items-center justify-center font-bold">
              <Database size={18} />
            </div>
            <div>
              <h5 className="font-semibold text-[#0a0a0a] mb-1">3. Evaluá en Vivo</h5>
              <p className="text-xs text-[#525252] leading-relaxed">Evaluá el flujo y la interfaz de la solución en tiempo real. Al tratarse de un MVP de muestra, algunas funcionalidades se encuentran deshabilitadas para pruebas públicas.</p>
            </div>
          </div>
        </div>
      </div>

        {/* TOP APPS */}
        <div className="mb-16">
          <h3 className="text-lg font-bold mb-4 text-[#0a0a0a]">🔥 Top Apps</h3>

          <div className="flex flex-wrap gap-3">
            {topApps.map(app => (
              <div
                key={app.id}
                onClick={() => {
                  setSelectedApp(app);
                  setImgIndex(0);
                }}
                className="cursor-pointer bg-white text-[#0a0a0a] border border-neutral-200 hover:bg-neutral-50 transition-all px-4 py-2 rounded-lg text-sm font-medium"
              >
                {app.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2 text-[#0a0a0a] tracking-tight">
              Solvra AI Cloud Platform
            </h2>
            <p className="text-[#525252] text-lg">
              SaaS e inteligencias aplicadas en la nube
            </p>
          </div>

          {loading ? (
            <p className="text-center text-[#525252]">Cargando plataformas...</p>
          ) : (
            renderCards(cloudApps)
          )}
        </div>

        {/* APLICACIONES NATIVAS SECTION */}
        {nativeApps.length > 0 && (
          <div className="mb-20 mt-12">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2 text-[#0a0a0a] tracking-tight">
                Aplicaciones Saas Productivas o Nativas
              </h2>
              <p className="text-[#525252] text-lg">
                Plataformas funcionando al 100% en producción
              </p>
            </div>
            {renderCards(nativeApps)}
          </div>
        )}

        {/* MODAL */}
        <AnimatePresence>
          {selectedApp && (
            <motion.div className="fixed inset-0 bg-neutral-950/20 z-50 flex items-end justify-center p-6 pb-0 md:pb-4 backdrop-blur-sm">
              <motion.div className="bg-white max-w-7xl w-full rounded-2xl overflow-hidden relative border border-neutral-200 shadow-2xl">

                {/* X */}
                <button
                  onClick={() => setSelectedApp(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#0a0a0a] text-white text-sm font-bold hover:bg-neutral-900 transition-colors z-10"
                >
                  ✕
                </button>

                <div className="grid md:grid-cols-2 gap-8 p-6 pb-20 max-h-[85vh] md:max-h-none overflow-y-auto md:overflow-visible">
                {/* COLUMNA IZQUIERDA: Imagen y Navegación Cíclica */}
                <div className="md:sticky md:top-0 self-start space-y-4">
                  
                  <div className="w-full bg-neutral-50 rounded-xl border border-neutral-200/60 overflow-hidden flex items-center justify-center shadow-inner p-2 min-h-[200px]">
                    {selectedApp.images && selectedApp.images.length > 0 && selectedApp.images[imgIndex] ? (
                      <img
                        src={`${API_BASE_URL}/apps/${selectedApp.id}/images/${selectedApp.images[imgIndex]}`}
                        className="w-full h-auto max-h-[35vh] md:max-h-[350px] object-contain"
                        alt={selectedApp.name}
                        onError={(e) => {
                          console.error("Error al cargar imagen:", e.currentTarget.src);
                        }}
                      />
                    ) : (
                      <div className="text-neutral-400 text-xs text-center font-medium">
                        Sin imagen disponible
                      </div>
                    )}
                  </div>

                  {/* Se muestran los controles de navegación solo si hay más de 1 imagen */}
                  {selectedApp.images && selectedApp.images.length > 1 && (
                    <div className="flex justify-between items-center">
                      <button 
                        type="button"
                        className="px-4 py-2 border border-orange-200 rounded-xl text-xs font-semibold bg-orange-50 text-orange-600 hover:bg-orange-100 active:scale-95 transition-all" 
                        onClick={() => {
                          const total = selectedApp.images?.length || 1;
                          setImgIndex(i => (i - 1 + total) % total);
                        }}
                      >
                        ← Anterior
                      </button>

                      <span className="text-xs text-neutral-400 font-medium">
                        {imgIndex + 1} / {selectedApp.images.length}
                      </span>

                      <button
                        type="button"
                        className="px-4 py-2 border border-orange-200 rounded-xl text-xs font-semibold bg-orange-50 text-orange-600 hover:bg-orange-100 active:scale-95 transition-all"
                        onClick={() => {
                          const total = selectedApp.images?.length || 1;
                          setImgIndex(i => (i + 1) % total);
                        }}
                      >
                        Siguiente →
                      </button>
                    </div>
                  )}

                </div>

                

                  {/* COLUMNA DERECHA: Información con scroll interno si el texto se excede */}
                  <div className="flex flex-col md:max-h-[60vh] justify-between overflow-y-auto pr-1">
                    <div className="space-y-3">
                      <h2 className="text-3xl font-display font-bold tracking-tight text-[#0a0a0a]">
                        {selectedApp.name}
                      </h2>
                      
                      <span className="text-[10px] uppercase tracking-wider font-bold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-1 rounded-md inline-block">
                        {selectedApp.category}
                      </span>

                      {/* Caja de descripción con formateo de saltos de línea */}
                      <p className="text-[#525252] text-sm leading-relaxed whitespace-pre-line">
                        {selectedApp.description}
                      </p>

                      <div className="flex items-center gap-1 pt-1">
                        {renderStars(selectedApp.rating || 5)}
                        <span className="text-xs ml-1 font-medium text-neutral-400">
                          ({selectedApp.reviews || 0} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Contenedor de Botones dentro del Modal */}
                    <div className="mt-8 pt-4 border-t border-neutral-100 space-y-3">
                      {isNativeApp(selectedApp.name) ? (
                        /* CASO 1: Apps SaaS Productivas / Nativas (Vocaccion / VocaccionPro) */
                        <a 
                          href={selectedApp.url || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block w-full text-center bg-[#0a0a0a] text-white py-3.5 rounded-xl font-semibold hover:bg-neutral-900 transition-all text-sm shadow-xl shadow-black/5 active:scale-[0.99]"
                        >
                          Acceder a la Plataforma →
                        </a>
                      ) : (
                        /* CASO 2: Resto de las Apps (Demo + Formulario de Implementación) */
                        <>
                          <div className="bg-neutral-50 border border-neutral-200/80 rounded-xl p-3.5 text-xs text-[#525252] leading-normal flex gap-2">
                            <span className="shrink-0 text-neutral-400">☁️</span>
                            <p>
                              Podés probar la demo interactiva en tiempo real o solicitar una reunión de <strong className="font-semibold text-neutral-800">30 min para evaluar la implementación en tu empresa</strong>.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <a
                              href={getAppDemoUrl(selectedApp)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-center bg-neutral-100 text-[#0a0a0a] border border-neutral-300/80 py-3 rounded-xl font-semibold hover:bg-neutral-200 transition-all text-sm active:scale-[0.99]"
                            >
                              Probar Demo en Vivo ↗
                            </a>

                            <button
                              onClick={() => {
                                setFormSubmitted(false);
                                setIsFormOpen(true);
                              }}
                              className="block w-full text-center bg-[#0a0a0a] text-white py-3 rounded-xl font-semibold hover:bg-neutral-900 transition-all text-sm shadow-lg shadow-black/5 active:scale-[0.99]"
                            >
                              Solicitar Implementación →
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

    {/* MODAL DEL FORMULARIO DE IMPLEMENTACIÓN */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-950/50 z-[70] flex items-center justify-center p-4 pt-27 backdrop-blur-sm overflow-hidden"
              onClick={() => setIsFormOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white max-w-lg w-full max-h-[85vh] rounded-2xl relative border border-neutral-200 shadow-2xl flex flex-col overflow-hidden mt-6"
              >
                {/* BOTÓN CERRAR (Fijo en la esquina superior derecha con margen limpio) */}
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-700 font-bold hover:bg-neutral-200 transition-colors z-30 shadow-sm"
                  aria-label="Cerrar modal"
                >
                  ✕
                </button>

                {/* CONTENIDO DEL FORMULARIO */}
                <div className="p-6 md:p-8 pt-8 overflow-y-auto">
                  {formSubmitted ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                        ✓
                      </div>
                      <h3 className="text-2xl font-bold text-[#0a0a0a]">¡Solicitud Recibida!</h3>
                      <p className="text-sm text-[#525252] leading-relaxed">
                        Recibimos los datos de tu empresa para <strong className="text-neutral-800">{formData.appName}</strong>. Te contactaremos a la brevedad para coordinar la reunión remota de 30 minutos y definir el alcance.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsFormOpen(false);
                          setSelectedApp(null);
                        }}
                        className="mt-4 px-6 py-2.5 bg-[#0a0a0a] text-white text-sm font-semibold rounded-xl hover:bg-neutral-800 transition-all"
                      >
                        Entendido
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-6 pr-8">
                        <span className="text-xs uppercase tracking-wider font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-md inline-block mb-2">
                          Paso siguiente: Reunión & Despliegue
                        </span>
                        <h3 className="text-2xl font-bold text-[#0a0a0a]">Solicitar Implementación</h3>
                        <p className="text-xs text-[#525252] mt-1">
                          Completá el formulario para evaluar los requerimientos y coordinar la puesta en marcha remota de <strong>{formData.appName}</strong>.
                        </p>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1">Nombre y Apellido *</label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-neutral-400 transition-all"
                              placeholder="Ej. Juan Pérez"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1">Empresa *</label>
                            <input
                              type="text"
                              required
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-neutral-400 transition-all"
                              placeholder="Ej. Solvra Corp"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1">Email corporativo *</label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-neutral-400 transition-all"
                              placeholder="juan@empresa.com"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-700 mb-1">Cantidad de usuarios</label>
                            <select
                              value={formData.usersCount}
                              onChange={(e) => setFormData({ ...formData, usersCount: e.target.value })}
                              className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-neutral-400 transition-all"
                            >
                              <option value="1-5">1 a 5 usuarios</option>
                              <option value="6-20">6 a 20 usuarios</option>
                              <option value="21-50">21 a 50 usuarios</option>
                              <option value="50+">Más de 50 usuarios</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">Necesidad Principal *</label>
                          <input
                            type="text"
                            required
                            value={formData.need}
                            onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-neutral-400 transition-all"
                            placeholder="Ej. Automatización de atención al cliente / Análisis de documentos"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">Comentarios o requerimientos adicionales</label>
                          <textarea
                            rows={3}
                            value={formData.comments}
                            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                            className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-neutral-50/50 focus:bg-white focus:outline-none focus:border-neutral-400 transition-all resize-none"
                            placeholder="Detalles sobre sistemas actuales o fechas estimadas..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3.5 bg-[#0a0a0a] hover:bg-neutral-900 text-white font-bold text-sm rounded-xl transition-all shadow-md disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? 'Enviando solicitud...' : 'Enviar Solicitud e Iniciar Proceso'}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Línea divisoria inferior idéntica al Hero */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200/60"></div>
    </section>
  );
};

export default Marketplace;