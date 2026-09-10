import React from 'react';

const Terminos: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-300 py-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-12 shadow-sm">
        <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Términos y Condiciones de Uso</h1>
        <p className="text-xs text-slate-400 mb-8">Última actualización: Mayo, 2026</p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-2">1. Objeto del Sitio</h2>
            <p>
              El presente documento establece las condiciones que regulan el acceso y uso del sitio web de <strong>Solvra</strong>. Solvra ofrece dos unidades principales: soluciones de software a medida e integración tecnológica (Solvra Solutions) y licencias o descargas de aplicaciones propietarias de escritorio y cloud (Solvra Apps).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-2">2. Licencias de Prueba y API Keys</h2>
            <p>
              Solvra otorga al usuario una licencia de uso limitada, revocable, no exclusiva y no transferible para probar ciertas aplicaciones de escritorio mediante una <strong>API Key de cortesía por un plazo de 48 horas</strong>. Queda estrictamente prohibido descompilar, realizar ingeniería inversa o modificar los ejecutables proporcionados de manera local.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-2">3. Limitación de Responsabilidad</h2>
            <p>
              Las utilidades de Solvra se entregan "tal cual están" (as is). Solvra no se responsabiliza por pérdidas financieras, errores de cálculo, fallos en la infraestructura local del cliente, caídas de servicios de terceros (como Firebase u OpenAI) ni fluctuaciones de mercado derivadas del uso de sus simuladores o dashboards.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-2">4. Propiedad Intelectual</h2>
            <p>
              Todos los desarrollos, marcas, logos, slogans ("Software que resuelve"), código fuente y diseños de interfaces expuestos en este sitio web son propiedad exclusiva de Solvra y están protegidos por las leyes de propiedad intelectual de la República Argentina.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white mb-2">5. Jurisdicción y Ley Aplicable</h2>
            <p>
              Cualquier controversia derivada de las transacciones o el uso de este sitio web será regulada por las leyes de la República Argentina, sometiéndose a la jurisdicción de los Tribunales Ordinarios de la Ciudad Autónoma de Buenos Aires.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terminos;