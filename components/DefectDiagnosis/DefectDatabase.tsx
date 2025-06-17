import React, { useState } from 'react';
import type { Defect } from '../../types';
import { Link } from 'react-router-dom';

const commonDefects: Defect[] = [
  {
    id: 'porosity',
    name: 'Porosidad',
    description: 'Pequeñas cavidades o burbujas de gas atrapadas en el cordón de soldadura. Pueden estar en la superficie o internas.',
    // image: 'https://picsum.photos/seed/metal-surface-with-weld-porosity-defect/300/200', // Removed
    possibleCauses: ['Humedad en electrodos/material base/gas', 'Contaminación (óxido, pintura, grasa)', 'Flujo de gas inadecuado (demasiado bajo o alto)', 'Arco demasiado largo', 'Corriente incorrecta'],
    recommendedSolutions: ['Almacenar y secar consumibles correctamente', 'Limpiar a fondo el material base', 'Verificar y ajustar el flujo de gas', 'Mantener longitud de arco correcta', 'Ajustar corriente según especificación']
  },
  {
    id: 'cracks',
    name: 'Grietas (Fisuras)',
    description: 'Fracturas en el metal de soldadura o zona afectada por el calor (ZAC). Pueden ser longitudinales, transversales, en cráter, etc.',
    // image: 'https://picsum.photos/seed/cracked-steel-weld-joint-macro/300/200', // Removed
    possibleCauses: ['Alto contenido de carbono o aleantes', 'Enfriamiento rápido', 'Altas tensiones residuales', 'Contaminación por azufre o fósforo', 'Selección incorrecta de metal de aporte', 'Diseño de junta inadecuado'],
    recommendedSolutions: ['Usar precalentamiento y post-enfriamiento controlado', 'Seleccionar metal de aporte de baja hidrogenación y compatible', 'Reducir la velocidad de soldadura para menor enfriamiento', 'Corregir diseño de junta', 'Limpieza exhaustiva']
  },
  {
    id: 'undercut',
    name: 'Socavación (Mordedura)',
    description: 'Una ranura o muesca en el metal base, adyacente al pie del cordón de soldadura.',
    // image: 'https://picsum.photos/seed/metal-plate-weld-undercut-defect/300/200', // Removed
    possibleCauses: ['Corriente de soldadura excesiva', 'Velocidad de avance demasiado alta', 'Ángulo incorrecto del electrodo/pistola', 'Arco demasiado largo'],
    recommendedSolutions: ['Reducir la corriente', 'Disminuir velocidad de avance', 'Ajustar ángulo y mantener arco corto', 'Técnica de oscilación adecuada si aplica']
  },
  {
    id: 'spatter',
    name: 'Salpicaduras',
    description: 'Pequeñas gotas de metal fundido expulsadas del arco que se adhieren a la superficie de la pieza.',
    // image: 'https://picsum.photos/seed/metal-sheet-with-weld-spatter/300/200', // Removed
    possibleCauses: ['Corriente demasiado alta', 'Polaridad incorrecta (para algunos procesos)', 'Arco demasiado largo', 'Gas de protección inadecuado o flujo incorrecto (para GMAW/FCAW)', 'Electrodos húmedos (SMAW)'],
    recommendedSolutions: ['Ajustar corriente', 'Verificar polaridad', 'Mantener arco corto', 'Optimizar parámetros de gas', 'Usar consumibles secos', 'Aplicar spray anti-salpicaduras']
  },
  {
    id: 'lack_of_fusion',
    name: 'Falta de Fusión',
    description: 'El metal de soldadura no se fusiona correctamente con el metal base o con cordones adyacentes.',
    // image: 'https://picsum.photos/seed/metal-weld-cross-section-lack-of-fusion/300/200', // Removed
    possibleCauses: ['Corriente de soldadura demasiado baja', 'Velocidad de avance excesiva', 'Preparación de junta incorrecta (ángulo de bisel, gap)', 'Técnica de manipulación incorrecta del electrodo/pistola', 'Contaminación en la junta'],
    recommendedSolutions: ['Aumentar corriente', 'Reducir velocidad de avance', 'Corregir preparación de junta', 'Mejorar técnica de soldadura (oscilación, ángulo)', 'Limpiar la junta a fondo']
  },
  {
    id: 'distortion',
    name: 'Distorsión',
    description: 'Deformación de la pieza soldada debido a la expansión y contracción no uniforme del metal durante el ciclo térmico de soldadura.',
    // image: 'https://picsum.photos/seed/warped-metal-sheet-after-welding/300/200', // Removed
    possibleCauses: ['Alto aporte térmico', 'Secuencia de soldadura incorrecta', 'Diseño de junta inadecuado', 'Falta de sujeción o restricción'],
    recommendedSolutions: ['Minimizar aporte térmico (menor corriente, mayor velocidad, cordones más pequeños)', 'Usar secuencia de soldadura balanceada (ej. "backstep", soldadura por puntos alternos)', 'Sujetar firmemente la pieza', 'Usar precalentamiento para reducir gradientes térmicos', 'Diseñar juntas para minimizar contracción']
  }
];

const DefectCard: React.FC<{ defect: Defect, onSelect: (defect: Defect) => void }> = ({ defect, onSelect }) => (
  <div 
    className="bg-gray-700 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-200 flex flex-col p-4"
    onClick={() => onSelect(defect)}
  >
    {/* Image removed */}
    {/* <img src={defect.image} alt={defect.name} className="w-full h-40 object-cover"/> */}
    <div className="flex-1 flex flex-col">
      <h3 className="text-lg font-semibold text-orange-400 mb-1">{defect.name}</h3>
      <p className="text-xs text-gray-400 mb-2 flex-grow">{defect.description}</p>
      <button 
        onClick={(e) => { e.stopPropagation(); onSelect(defect); }} 
        className="mt-auto text-sm text-orange-500 hover:text-orange-300 font-medium self-start"
      >
        Ver detalles &rarr;
      </button>
    </div>
  </div>
);

const DefectModal: React.FC<{ defect: Defect | null, onClose: () => void }> = ({ defect, onClose }) => {
  if (!defect) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-orange-500">{defect.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        {/* Image removed */}
        {/* <img src={defect.image} alt={defect.name} className="w-full h-52 object-cover rounded-md mb-4"/> */}
        <p className="text-gray-300 mb-4">{defect.description}</p>
        
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-100 mb-1">Causas Posibles:</h4>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            {defect.possibleCauses.map((cause, i) => <li key={i}>{cause}</li>)}
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-gray-100 mb-1">Soluciones Recomendadas:</h4>
          <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
            {defect.recommendedSolutions.map((solution, i) => <li key={i}>{solution}</li>)}
          </ul>
        </div>
        <div className="mt-6 text-center">
            <Link 
                to="/defects/analyzer" 
                state={{ defectDescription: defect.name }} // Pass defect name to prefill analyzer
                className="inline-block px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                onClick={onClose} // Close modal when navigating
            >
                Analizar este tipo de defecto con IA
            </Link>
        </div>
      </div>
    </div>
  );
};

const DefectDatabase: React.FC = () => {
  const [selectedDefect, setSelectedDefect] = useState<Defect | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredDefects = commonDefects.filter(defect => 
    defect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    defect.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-2">Base de Datos de Defectos Comunes</h2>
      <p className="text-gray-300 mb-6">
        Explore un catálogo de defectos de soldadura, sus causas y posibles soluciones.
      </p>
       <input 
        type="text"
        placeholder="Buscar defecto (ej: Porosidad, Grietas)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-8 bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDefects.map(defect => (
          <DefectCard key={defect.id} defect={defect} onSelect={setSelectedDefect} />
        ))}
        {filteredDefects.length === 0 && (
            <p className="text-gray-400 sm:col-span-2 lg:col-span-3 text-center py-8">No se encontraron defectos que coincidan con su búsqueda.</p>
        )}
      </div>
      <DefectModal defect={selectedDefect} onClose={() => setSelectedDefect(null)} />
    </div>
  );
};

export default DefectDatabase;