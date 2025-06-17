import React, { useState } from 'react';

interface SymbolInfo {
  // symbolImgUrl: string; // Removed
  name: string;
  description: string;
  application: string;
}

const commonWeldSymbols: SymbolInfo[] = [
  { 
    // symbolImgUrl: 'https://picsum.photos/seed/metal-fabrication-fillet-weld-symbol/300/150?text=Fillet+Weld+Symbol', // Removed
    name: 'Símbolo de Soldadura de Filete', 
    description: 'Representa una soldadura de sección transversal triangular que une dos superficies aproximadamente en ángulo recto entre sí.',
    application: 'Común en uniones en T, uniones de solape y uniones de esquina.'
  },
  { 
    // symbolImgUrl: 'https://picsum.photos/seed/metal-plate-square-butt-weld-symbol/300/150?text=Square+Butt+Symbol', // Removed
    name: 'Símbolo de Soldadura a Tope (Cuadrada)', 
    description: 'Indica una soldadura donde los bordes de las piezas están juntos y se sueldan sin preparación de bisel.',
    application: 'Adecuado para materiales delgados donde la penetración completa es posible sin biselado.'
  },
  { 
    // symbolImgUrl: 'https://picsum.photos/seed/steel-v-groove-weld-blueprint-symbol/300/150?text=V-Groove+Symbol', // Removed
    name: 'Símbolo de Soldadura en V (Bisel Sencillo)', 
    description: 'Representa una soldadura donde una o ambas piezas tienen un bisel en forma de V para permitir una mayor penetración.',
    application: 'Utilizado en materiales de espesor medio a grueso para asegurar una fusión completa.'
  },
  { 
    // symbolImgUrl: 'https://picsum.photos/seed/metal-pipe-weld-all-around-symbol/300/150?text=All+Around+Symbol', // Removed
    name: 'Símbolo de Soldadura Alrededor', 
    description: 'Un círculo en la intersección de la línea de referencia y la flecha indica que la soldadura debe realizarse completamente alrededor de la unión.',
    application: 'Para sellar completamente una unión, como en tuberías o perfiles cerrados.'
  },
  { 
    // symbolImgUrl: 'https://picsum.photos/seed/structural-steel-field-weld-symbol/300/150?text=Field+Weld+Symbol', // Removed
    name: 'Símbolo de Soldadura en Campo/Obra', 
    description: 'Una bandera en la intersección de la línea de referencia y la flecha significa que la soldadura se realizará en el lugar de montaje (campo u obra) y no en el taller.',
    application: 'Indica operaciones de montaje final fuera del taller de fabricación.'
  },
];

const BlueprintReader: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'symbols' | 'elements' | 'quiz'>('symbols');

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Lectura de Planos de Soldadura</h2>
      <p className="text-gray-300 mb-8">
        Aprenda a interpretar los símbolos y elementos clave en los planos de fabricación de soldadura.
      </p>

      <div className="mb-6 border-b border-gray-700">
        <nav className="flex space-x-4" aria-label="Tabs">
          {([
            { id: 'symbols', label: 'Símbolos Comunes' },
            { id: 'elements', label: 'Elementos del Símbolo de Soldadura' },
            { id: 'quiz', label: 'Cuestionario (Próximamente)' }
          ] as {id: 'symbols' | 'elements' | 'quiz', label: string}[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'symbols' && (
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-4">Símbolos de Soldadura Comunes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonWeldSymbols.map(symbol => (
              <div key={symbol.name} className="bg-gray-700 p-4 rounded-lg shadow">
                {/* Image removed */}
                {/* <img src={symbol.symbolImgUrl} alt={symbol.name} className="h-24 mb-3 bg-white p-1 rounded object-contain mx-auto"/> */}
                <h4 className="text-lg font-semibold text-orange-400 mb-1">{symbol.name}</h4>
                <p className="text-sm text-gray-300 mb-1">{symbol.description}</p>
                <p className="text-xs text-gray-400"><strong>Aplicación:</strong> {symbol.application}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'elements' && (
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-4">Elementos del Símbolo de Soldadura Estándar</h3>
          <p className="text-gray-300 mb-4">
            Un símbolo de soldadura completo según AWS/ISO consta de varios elementos que proporcionan información detallada sobre la soldadura requerida.
          </p>
          {/* Image removed */}
          {/* <img src="https://picsum.photos/seed/aws-metal-welding-symbol-elements-chart/800/400?text=AWS+Weld+Symbol+Elements" alt="Diagrama del Símbolo de Soldadura en Metal" className="w-full max-w-2xl mx-auto rounded-md shadow-md mb-4 bg-white p-2"/> */}
          <p className="text-gray-400 my-4 p-4 bg-gray-700 rounded-md">
            (Aquí se mostraría un diagrama de los elementos del símbolo de soldadura si las imágenes estuvieran habilitadas. 
            Por ahora, consulte un manual de soldadura estándar para ver ejemplos visuales.)
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
            <li><strong>Línea de Flecha (Arrow Line):</strong> Apunta a la unión que se va a soldar.</li>
            <li><strong>Línea de Referencia (Reference Line):</strong> Línea horizontal donde se colocan los símbolos y dimensiones.</li>
            <li><strong>Lado de la Flecha (Arrow Side):</strong> Información debajo de la línea de referencia se aplica al lado de la unión al que apunta la flecha.</li>
            <li><strong>Otro Lado (Other Side):</strong> Información encima de la línea de referencia se aplica al lado opuesto de la unión.</li>
            <li><strong>Símbolo Básico de Soldadura:</strong> Indica el tipo de soldadura (filete, bisel V, etc.).</li>
            <li><strong>Dimensiones de la Soldadura:</strong> Tamaño, longitud, espaciado del cordón.</li>
            <li><strong>Símbolos Suplementarios:</strong> Contorno (plano, convexo, cóncavo), soldadura alrededor, soldadura en campo.</li>
            <li><strong>Cola (Tail):</strong> Se usa para especificar el proceso de soldadura, tipo de electrodo, especificaciones u otra información (puede omitirse si no hay referencias específicas).</li>
          </ul>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-4">Cuestionario de Símbolos</h3>
          <p className="text-gray-400">Esta funcionalidad estará disponible pronto para poner a prueba sus conocimientos sobre símbolos de soldadura.</p>
          {/* Placeholder for quiz content */}
        </div>
      )}
    </div>
  );
};

export default BlueprintReader;