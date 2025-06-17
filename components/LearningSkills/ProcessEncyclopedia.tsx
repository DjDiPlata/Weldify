import React, { useState } from 'react';
import type { WeldingProcessInfo } from '../../types';
import { WeldingProcess } from '../../types'; // Enum for IDs

const processesData: WeldingProcessInfo[] = [
  {
    id: 'gmaw', // Using a simple ID for selection
    name: WeldingProcess.GMAW,
    variant: "MIG (Metal Inert Gas) / MAG (Metal Active Gas)",
    description: "Un proceso de soldadura por arco que utiliza un electrodo de alambre continuo y un gas de protección suministrado externamente. Versátil y ampliamente utilizado.",
    advantages: [
      "Alta tasa de deposición y velocidad de soldadura.",
      "Fácil de aprender y automatizar.",
      "Soldadura en todas las posiciones (con técnica adecuada y transferencia de metal).",
      "Poca o ninguna escoria, lo que reduce la limpieza post-soldadura."
    ],
    limitations: [
      "El equipo es más complejo y costoso que SMAW.",
      "Menos portátil que SMAW.",
      "Sensible al viento y corrientes de aire que pueden dispersar el gas de protección.",
      "Requiere una correcta selección de gas para diferentes materiales."
    ],
    typicalApplications: ["Fabricación general", "Industria automotriz", "Construcción naval", "Tuberías", "Recipientes a presión"],
    commonParameters: "Variables clave: tipo y diámetro de alambre, tipo de gas y caudal, voltaje, velocidad de alimentación de alambre (amperaje), velocidad de avance, extensión del electrodo (stick-out)."
  },
  {
    id: 'gtaw',
    name: WeldingProcess.GTAW,
    variant: "TIG (Tungsten Inert Gas)",
    description: "Un proceso de soldadura por arco que utiliza un electrodo de tungsteno no consumible. El metal de aporte se añade externamente si es necesario. Produce soldaduras de muy alta calidad y precisión.",
    advantages: [
      "Soldaduras de excelente calidad, limpias y precisas.",
      "Poca o ninguna salpicadura.",
      "Permite soldar una amplia variedad de metales, incluyendo aluminio, magnesio, titanio y aceros inoxidables.",
      "Excelente control del baño de fusión.",
      "Soldadura en todas las posiciones."
    ],
    limitations: [
      "Proceso más lento y con menor tasa de deposición que GMAW o SMAW.",
      "Requiere mayor habilidad del soldador.",
      "Más sensible a la contaminación del material base y del tungsteno.",
      "El equipo puede ser más costoso."
    ],
    typicalApplications: ["Industria aeroespacial", "Tuberías de alta presión", "Industria alimentaria y farmacéutica", "Soldadura de precisión en metales delgados", "Pases de raíz"],
    commonParameters: "Variables clave: tipo y diámetro de tungsteno, afilado del tungsteno, tipo de gas (generalmente Argón) y caudal, corriente (AC para aluminio/magnesio, DCEN para aceros/otros), tipo y diámetro de varilla de aporte."
  },
  {
    id: 'smaw',
    name: WeldingProcess.SMAW,
    variant: "MMA (Manual Metal Arc) / Electrodo Revestido",
    description: "Un proceso de soldadura por arco que utiliza un electrodo consumible recubierto de fundente (flux). El fundente protege el baño de fusión y proporciona elementos de aleación.",
    advantages: [
      "Equipo simple, económico y portátil.",
      "Versátil, se puede usar en una amplia gama de materiales y condiciones.",
      "Menos sensible al viento y corrientes de aire que los procesos con protección gaseosa.",
      "Disponible una gran variedad de electrodos para diferentes aplicaciones."
    ],
    limitations: [
      "Baja tasa de deposición, proceso más lento.",
      "Requiere limpieza de escoria después de cada cordón.",
      "Produce más humos y salpicaduras que GTAW o GMAW.",
      "La habilidad del soldador es crucial para la calidad de la soldadura."
    ],
    typicalApplications: ["Construcción", "Reparación y mantenimiento", "Fabricación de estructuras pesadas", "Soldadura en campo"],
    commonParameters: "Variables clave: tipo y diámetro del electrodo (ej. E6013, E7018), polaridad (AC, DCEP, DCEN según electrodo), amperaje, longitud de arco, ángulo y velocidad de avance."
  },
  // Add more processes like FCAW, SAW, PAW, LBW with similar details
];

const ProcessEncyclopedia: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState<WeldingProcessInfo | null>(processesData[0]);

  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Enciclopedia de Procesos de Soldadura</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar de selección de proceso */}
        <div className="md:w-1/3 lg:w-1/4 bg-gray-700 p-4 rounded-lg self-start">
          <h3 className="text-lg font-semibold text-gray-100 mb-3">Seleccionar Proceso:</h3>
          <ul className="space-y-2">
            {processesData.map(proc => (
              <li key={proc.id}>
                <button
                  onClick={() => setSelectedProcess(proc)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150
                              ${selectedProcess?.id === proc.id 
                                ? 'bg-orange-600 text-white font-semibold' 
                                : 'text-gray-300 hover:bg-gray-600 hover:text-gray-100'}`}
                >
                  {proc.name}
                  {proc.variant && <span className="block text-xs opacity-75">{proc.variant}</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contenido del proceso seleccionado */}
        <div className="md:w-2/3 lg:w-3/4">
          {selectedProcess ? (
            <div className="bg-gray-700 p-6 rounded-lg shadow-inner">
              <h3 className="text-2xl font-bold text-orange-400 mb-1">{selectedProcess.name}</h3>
              {selectedProcess.variant && <p className="text-md text-orange-300 mb-3">{selectedProcess.variant}</p>}
              <p className="text-gray-300 text-sm mb-4">{selectedProcess.description}</p>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-100 mb-1">Ventajas:</h4>
                  <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                    {selectedProcess.advantages.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100 mb-1">Limitaciones:</h4>
                  <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                    {selectedProcess.limitations.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100 mb-1">Aplicaciones Típicas:</h4>
                  <p className="text-gray-400 text-sm">{selectedProcess.typicalApplications.join(', ')}</p>
                </div>
                {selectedProcess.commonParameters && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-100 mb-1">Parámetros Comunes / Consideraciones:</h4>
                    <p className="text-gray-400 text-sm">{selectedProcess.commonParameters}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-10">Seleccione un proceso de la lista para ver los detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessEncyclopedia;