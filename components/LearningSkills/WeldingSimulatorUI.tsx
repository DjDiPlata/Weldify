import React, { useState } from 'react';
import Button from '../common/Button';
import { WELDING_PROCESSES_OPTIONS, MATERIAL_TYPES_OPTIONS, JOINT_TYPES_OPTIONS } from '../../constants';

const WeldingSimulatorUI: React.FC = () => {
  const [process, setProcess] = useState(WELDING_PROCESSES_OPTIONS[0].value);
  const [material, setMaterial] = useState(MATERIAL_TYPES_OPTIONS[0].value);
  const [thickness, setThickness] = useState(3); // mm
  const [jointType, setJointType] = useState(JOINT_TYPES_OPTIONS[0].value);
  const [amperage, setAmperage] = useState(90);
  const [voltage, setVoltage] = useState(20);
  const [travelSpeed, setTravelSpeed] = useState(15); // cm/min
  const [simulationResult, setSimulationResult] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);
    // Simulate API call or complex calculation
    setTimeout(() => {
      // This is a mock result. In a real AR/complex simulation, this would be more involved.
      const quality = Math.random();
      let resultText = `Simulación completada para ${process} en ${material} de ${thickness}mm (${jointType}).\n`;
      resultText += `Parámetros: ${amperage}A, ${voltage}V, Velocidad: ${travelSpeed} cm/min.\n`;
      if (quality > 0.7) {
        resultText += "Resultado: ¡Excelente soldadura! Buena penetración y apariencia del cordón.";
      } else if (quality > 0.4) {
        resultText += "Resultado: Soldadura aceptable. Se observan algunas irregularidades menores. Podría mejorar el ángulo o la velocidad.";
      } else {
        resultText += "Resultado: Soldadura deficiente. Posibles problemas de porosidad, falta de fusión o socavación. Revise sus parámetros y técnica.";
      }
      setSimulationResult(resultText);
      setIsSimulating(false);
    }, 2500);
  };

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Simulador de Soldadura (Conceptual)</h2>
      <p className="text-gray-300 mb-8">
        Configure los parámetros y visualice el resultado conceptual de su soldadura. En una aplicación real, esto podría integrar Realidad Aumentada para una experiencia inmersiva.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Proceso */}
        <div>
          <label htmlFor="sim-process" className="block text-sm font-medium text-gray-300 mb-1">Proceso</label>
          <select id="sim-process" value={process} onChange={(e) => setProcess(e.target.value)} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2.5 rounded-md">
            {WELDING_PROCESSES_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        {/* Material */}
        <div>
          <label htmlFor="sim-material" className="block text-sm font-medium text-gray-300 mb-1">Material</label>
          <select id="sim-material" value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2.5 rounded-md">
            {MATERIAL_TYPES_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        {/* Espesor */}
        <div>
          <label htmlFor="sim-thickness" className="block text-sm font-medium text-gray-300 mb-1">Espesor (mm)</label>
          <input type="number" id="sim-thickness" value={thickness} onChange={(e) => setThickness(Number(e.target.value))} min="1" max="50" className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2.5 rounded-md" />
        </div>
        {/* Tipo de Unión */}
        <div>
          <label htmlFor="sim-joint" className="block text-sm font-medium text-gray-300 mb-1">Tipo de Unión</label>
          <select id="sim-joint" value={jointType} onChange={(e) => setJointType(e.target.value)} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2.5 rounded-md">
            {JOINT_TYPES_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        {/* Amperaje */}
        <div>
          <label htmlFor="sim-amperage" className="block text-sm font-medium text-gray-300 mb-1">Amperaje (A)</label>
          <input type="number" id="sim-amperage" value={amperage} onChange={(e) => setAmperage(Number(e.target.value))} min="10" max="500" className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2.5 rounded-md" />
        </div>
        {/* Voltaje (si aplica) */}
        {(process.includes("MIG/MAG") || process.includes("FCAW") || process.includes("SAW")) && (
          <div>
            <label htmlFor="sim-voltage" className="block text-sm font-medium text-gray-300 mb-1">Voltaje (V)</label>
            <input type="number" id="sim-voltage" value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} min="10" max="50" className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2.5 rounded-md" />
          </div>
        )}
         {/* Velocidad de Avance */}
        <div>
            <label htmlFor="sim-travelSpeed" className="block text-sm font-medium text-gray-300 mb-1">Velocidad de Avance (cm/min)</label>
            <input type="number" id="sim-travelSpeed" value={travelSpeed} onChange={(e) => setTravelSpeed(Number(e.target.value))} min="1" max="100" className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2.5 rounded-md" />
        </div>
      </div>
      
      <Button onClick={handleStartSimulation} isLoading={isSimulating} disabled={isSimulating} variant="primary" size="lg">
        {isSimulating ? 'Simulando...' : 'Iniciar Simulación Conceptual'}
      </Button>

      {isSimulating && (
        <div className="mt-8 p-6 bg-gray-700 rounded-lg shadow flex flex-col items-center">
           <div className="w-32 h-32 border-4 border-dashed border-orange-500 rounded-full animate-pulse flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-orange-500 animate-ping animation-delay-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-2.474-1.99-1.99M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-2.25 3.016L12.75 18M12.75 6A4.5 4.5 0 0117.25 10.5m0-4.5V3.75c0-.621-.504-1.125-1.125-1.125H7.875C7.254 2.625 6.75 3.129 6.75 3.75v2.25m6 4.5H6.75" />
            </svg>
           </div>
          <p className="text-lg text-gray-300">Visualizando cordón de soldadura...</p>
          <p className="text-sm text-gray-400">(Esto es una representación conceptual)</p>
        </div>
      )}

      {simulationResult && !isSimulating && (
        <div className="mt-8 p-6 bg-gray-700 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">Resultado de la Simulación:</h3>
          <pre className="whitespace-pre-wrap text-gray-200 text-sm bg-gray-600 p-4 rounded-md">{simulationResult}</pre>
           {/* Image removed */}
           {/* <img src={`https://picsum.photos/seed/simulated-weld-bead-on-${material.toLowerCase().replace(/[^a-z0-9]/g, '-')}-metal-plate/600/200`} alt="Conceptual weld bead on metal" className="mt-4 rounded-md shadow-md object-cover w-full"/> */}
           {/* <p className="text-xs text-gray-500 mt-1 text-center">Imagen conceptual del cordón de soldadura sobre metal.</p> */}
        </div>
      )}
       <div className="mt-10 p-4 bg-gray-700 rounded-md">
        <h4 className="text-lg font-semibold text-orange-400 mb-2">Características de un Simulador Avanzado (no implementado):</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
          <li>Integración con Realidad Aumentada (ARKit/ARCore) para proyectar la soldadura en un entorno real.</li>
          <li>Retroalimentación en tiempo real sobre ángulo, velocidad y distancia del electrodo/pistola.</li>
          <li>Simulación de diferentes posiciones de soldadura (plana, horizontal, vertical, sobrecabeza).</li>
          <li>Análisis detallado de la penetración, fusión y posibles defectos.</li>
          <li>Biblioteca de ejercicios y desafíos para practicar.</li>
        </ul>
      </div>
    </div>
  );
};

export default WeldingSimulatorUI;