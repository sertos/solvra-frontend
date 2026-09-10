import React from 'react';

const Privacidad: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-300 py-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 shadow-sm">
        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Política de Privacidad</h1>
        <p className="text-xs text-slate-400 mb-8">En cumplimiento con la Ley N° 25.326 de Protección de Datos Personales</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-2">1. Datos Recolectados y Finalidad</h2>
            <p>
              Solvra recopila información de contacto únicamente cuando el usuario interactúa con los formularios del sitio, solicita una cotización, agenda una call técnica o introduce su dirección de correo electrónico para obtener una <strong>API Key de pruebas por 48 horas</strong>. Los datos se utilizan pura y exclusivamente para proveer el servicio técnico solicitado y autenticar los accesos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-2">2. Almacenamiento y Seguridad de Datos</h2>
            <p>
              La información recolectada se almacena utilizando infraestructuras seguras provistas por terceros de escala global (como Google Firebase). Implementamos medidas técnicas de cifrado y autenticación para evitar el acceso no autorizado, la alteración o divulgación de tus datos personales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-2">3. Uso de Cookies</h2>
            <p>
              Este sitio web utiliza cookies técnicas y analíticas mínimas para recordar las preferencias de interfaz de usuario (como la alternancia entre el Modo Claro y Modo Oscuro) y recopilar métricas anónimas de navegación para optimizar la experiencia de usuario.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-2">4. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h2>
            <p>
              De conformidad con la ley vigente, los usuarios titulares de los datos tienen derecho a acceder, rectificar, actualizar o solicitar la eliminación definitiva de sus registros de nuestras bases de datos en cualquier momento. Para ejercer este derecho, pueden enviar una solicitud formal por correo electrónico a: <strong>sergiot@solvra.com.ar</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacidad;