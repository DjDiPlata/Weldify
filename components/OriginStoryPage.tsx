import React from 'react';
import { Link } from 'react-router-dom';
import Button from './common/Button';

const OriginStoryPage: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl text-gray-300">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
        📖 MI HISTORIA – EL ORIGEN DE WELDIFY
      </h2>
      
      <div className="max-w-3xl mx-auto space-y-6 prose prose-invert prose-sm md:prose-base lg:prose-lg xl:prose-xl">
        <section>
          <h3 className="text-xl font-semibold text-orange-400 mb-3 !mt-0">
            🧑‍🏭 De aprendiz a creador: por qué nació esta app
          </h3>
          <blockquote className="border-l-4 border-orange-500 pl-4 py-2 my-4 bg-gray-700 rounded-r-md not-prose">
            <p className="text-lg italic text-gray-200">
              “Descubrir Cefosol fue un antes y un después. Allí no solo aprendí a soldar, sino a soñar en grande.”
            </p>
          </blockquote>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-100 mb-2">📍 Inicio del viaje</h4>
          <p>
            En 2024 cursé el certificado FMEC0110_CEN – Soldadura con electrodos revestidos y TIG, con una duración total de 740 horas. Esta formación incluyó los procesos TIG, MIG/MAG, electrodo revestido, soldadura láser, así como corte por plasma, oxicorte, interpretación de planos y prevención de riesgos laborales. Finalicé la formación con un periodo de prácticas en una empresa del sector, lo que me permitió afianzar los conocimientos adquiridos en un entorno real de trabajo.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-100 mb-2">🔧 Una formación de verdad</h4>
          <p>
            Cada clase estaba llena de aprendizaje, desafíos reales y un apoyo incondicional. Los instructores no solo enseñaban técnica: nos transmitían pasión, motivación y seguridad. Las instalaciones estaban perfectamente equipadas, pero lo más valioso era el equipo humano que nos guiaba.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-100 mb-2">🤝 Compañerismo que impulsa</h4>
          <p>
            Como uno más del grupo de alumnos, viví en primera persona lo que significa sentirse acompañado y respaldado por un equipo increíble. Gracias al apoyo constante de Paola, Laia, Cristian, Lucas, Martín, Nico y Petre, miembros del equipo de Cefosol, cada duda se convirtió en aprendizaje y cada reto en una oportunidad de superación. Su cercanía, profesionalidad y entrega hicieron que el camino fuera mucho más llevadero y motivador. Ellos marcaron una verdadera diferencia en mi formación.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-100 mb-2">🛡️ Prevención y excelencia</h4>
          <p>
            Gracias a Irene, entendimos que la seguridad no es un requisito: es una forma de trabajar. Y con Juan Carlos y Sebastián, instructores de Deotec, aprendimos a dominar la soldadura con conocimiento y respeto por cada detalle técnico. Nos enseñaron que detrás de cada chispa, hay ciencia, técnica y responsabilidad.
          </p>
        </section>

        <section>
          <h4 className="text-lg font-semibold text-gray-100 mb-2">🚀 El nacimiento de Weldify</h4>
          <p>
            Weldify nace como una herramienta para devolver todo lo que aprendí. Para ayudarte a ti:
          </p>
          <ul className="list-disc list-inside ml-4 my-2 space-y-1">
            <li>A soldar mejor.</li>
            <li>A trabajar con seguridad.</li>
            <li>A tener los recursos siempre a mano.</li>
            <li>A sentir que no estás solo en este camino.</li>
          </ul>
        </section>

        <section className="text-center mt-8 not-prose">
          <p className="text-lg text-gray-200">
            💬 Gracias por formar parte de esto
          </p>
          <p className="mt-2">
            Esta app es para ti, que estás empezando, o para ti, que ya vives del metal.
            <br />
            Aquí comenzó mi historia. Y ojalá aquí comience también la tuya.
          </p>
        </section>
      </div>

      <div className="text-center mt-10 pt-6 border-t border-gray-700">
        <Link to="/my-story">
          <Button variant="secondary" size="lg" aria-label="Volver a Mi Historia">
            🧡 Volver a Mi Historia
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default OriginStoryPage;