
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_MODULES_LIST } from '../constants';
import type { AppModule } from '../types';

const ModuleCard: React.FC<{ moduleInfo: AppModule }> = ({ moduleInfo }) => {
  // For modules like Dashboard, link to its own path. For others, link to the first feature if available.
  const linkPath = moduleInfo.id === 'dashboard' ? moduleInfo.path : (moduleInfo.features && moduleInfo.features.length > 0 ? moduleInfo.features[0].path : '#');
  
  return (
    <Link 
      to={linkPath}
      className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center text-orange-500 mb-3">
          {React.isValidElement(moduleInfo.icon) ? React.cloneElement(moduleInfo.icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className: "w-8 h-8 mr-3" }) : moduleInfo.icon}
          <h3 className="text-xl font-semibold text-gray-100">{moduleInfo.name}</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4">{moduleInfo.description}</p>
      </div>
      {moduleInfo.id !== 'dashboard' && moduleInfo.features && moduleInfo.features.length > 0 && (
         <div className="mt-auto">
           <span className="text-sm text-orange-500 hover:text-orange-400 font-medium">
             Explorar {moduleInfo.features.length} {moduleInfo.features.length === 1 ? 'función' : 'funciones'} &rarr;
            </span>
         </div>
      )}
       {moduleInfo.id === 'dashboard' && (
         <div className="mt-auto">
           <span className="text-sm text-orange-500 hover:text-orange-400 font-medium">
             Ir al Panel Principal &rarr;
            </span>
         </div>
      )}
    </Link>
  );
};


const Dashboard: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-100 mb-8">Bienvenido a Weldify</h2>
      <p className="text-lg text-gray-300 mb-10">
        Su asistente integral para todas las necesidades de soldadura. Explore nuestros módulos para mejorar su seguridad, habilidades y eficiencia.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {APP_MODULES_LIST.filter(module => module.id !== 'dashboard').map(moduleInfo => ( // Exclude dashboard from cards
          <ModuleCard key={moduleInfo.id} moduleInfo={moduleInfo} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
