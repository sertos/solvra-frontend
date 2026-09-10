import React, { useState } from 'react';
import { ShieldAlert, CheckCircle } from 'lucide-react';

const Arrepentimiento: React.FC = () => {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí conectarías con tu backend local o Firebase para registrar la solicitud de baja.
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-300 py-20 px-6 lg:px-12">
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-md">
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Botón de Arrepentimiento</h1>
            <p className="text-xs text-slate-400">Resolución CNDC N° 424/2020</p>
          </div>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          De acuerdo con las leyes comerciales de la República Argentina, tenés derecho a revocar la contratación de nuestros servicios o licencias dentro de los <strong>10 días corridos</strong> contados a partir de la fecha de compra o aceptación del contrato, sin costo ni penalidad alguna.
        </p>

        {enviado ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
            <CheckCircle size={32} className="text-emerald-500 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Solicitud recibida</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Procesaremos la revocación de la licencia y nos comunicaremos con vos a la brevedad para coordinar cualquier reintegro correspondiente.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Nombre Completo / Razón Social</label>
              <input required type="text" className="w-full px-3 py-2 border dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Correo Electrónico de Contacto</label>
              <input required type="email" className="w-full px-3 py-2 border dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Código de Referencia / ID de Operación</label>
              <input required type="text" placeholder="Ej: N° de Factura, ID de Mercado Pago o ID de Contrato" className="w-full px-3 py-2 border dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Detalle del Servicio o Aplicación a revocar</label>
              <textarea rows={3} className="w-full px-3 py-2 border dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            </div>

            <button type="submit" className="w-full py-3 bg-slate-950 text-white dark:bg-white dark:text-slate-950 font-bold rounded-lg hover:opacity-90 transition-opacity mt-2">
              Confirmar Revocación de Servicio
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Arrepentimiento;