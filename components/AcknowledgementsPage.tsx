import React from 'react';
import { Link } from 'react-router-dom';
import Button from './common/Button';

const AcknowledgementsPage: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl text-gray-300">
      <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">
        🏆 Agradecimientos
      </h2>
      
      <div className="max-w-3xl mx-auto space-y-6 prose prose-invert prose-sm md:prose-base lg:prose-lg xl:prose-xl">
        <section className="text-center">
          <p className="text-lg text-gray-200 mb-4">
            Esta sección está dedicada a reconocer y agradecer a todas aquellas personas, instructores y entidades que han contribuido, inspirado y apoyado la creación y el desarrollo de Weldify.
          </p>
          <p className="text-gray-400 mt-4">
            Un agradecimiento especial a <strong className="text-orange-400">Cefosol</strong> y <strong className="text-orange-400">Deotec</strong> por su invaluable formación y apoyo.
          </p>
           <p className="text-gray-400 mt-2">
            Gracias a Paola, Laia, Cristian, Lucas, Martín, Nico, Petre, Irene, Juan Carlos y Sebastián por su dedicación y por compartir su conocimiento y pasión.
          </p>
          <p className="text-gray-400 mt-6">
            Si hay alguien más que debería estar aquí, ¡por favor házmelo saber!
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

export default AcknowledgementsPage;