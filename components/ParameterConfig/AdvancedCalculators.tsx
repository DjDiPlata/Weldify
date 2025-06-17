import React, { useState } from 'react';
import Button from '../common/Button';
import type { JointPrepInputs, JointPrepOutput, JointTypeCalc, FillerMetalCostInputs, FillerMetalCostOutput } from '../../types';
import { JOINT_TYPE_CALC_OPTIONS } from '../../constants';

interface CoolingTimeInputs {
  material: string;
  thickness: number;
  ambientTemp: number;
}
interface CoolingTimeOutput {
  estimatedTime: string; // e.g. "5-10 minutes"
  notes: string;
}

const AdvancedCalculators: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  // State for Cooling Time Calculator
  const [coolingInputs, setCoolingInputs] = useState<CoolingTimeInputs>({ material: 'Acero al Carbono', thickness: 10, ambientTemp: 20 });
  const [coolingOutput, setCoolingOutput] = useState<CoolingTimeOutput | null>(null);

  // State for Joint Prep Calculator
  const [jointPrepInputs, setJointPrepInputs] = useState<JointPrepInputs>({
    jointType: 'butt_v',
    thickness1: 10,
    grooveAngle: 60,
    rootOpening: 2,
    density: 7.85 // Default density for steel g/cm^3
  });
  const [jointPrepOutput, setJointPrepOutput] = useState<JointPrepOutput | null>(null);

  // State for Filler Metal & Cost Calculator
  const [fillerCostInputs, setFillerCostInputs] = useState<FillerMetalCostInputs>({
    weldLength: 1, // meters
    crossSectionalArea: 50, // mm^2
    materialDensity: 7.85, // g/cm^3 (steel)
    depositionEfficiency: 85, // % (GMAW average)
    fillerMetalCostPerKg: 5, // €/kg
    gasCostPerMeter: 0.5, // €/meter
    laborCostPerHour: 30, // €/hour
    weldingSpeed: 2, // m/hour
  });
  const [fillerCostOutput, setFillerCostOutput] = useState<FillerMetalCostOutput | null>(null);


  const handleCoolingCalc = () => {
    setCoolingOutput({
      estimatedTime: `${Math.round(coolingInputs.thickness * 0.5 + 5)}-${Math.round(coolingInputs.thickness * 1 + 10)} minutos`,
      notes: `Estimación para ${coolingInputs.material} a ${coolingInputs.ambientTemp}°C. Factores como la geometría y el aporte térmico real pueden variar el tiempo.`
    });
  };

  const handleJointPrepCalc = () => {
    const { jointType, thickness1, thickness2, grooveAngle = 0, rootOpening = 0, legLength1 = 0, density = 7.85 } = jointPrepInputs;
    let area_mm2 = 0;
    let notes = "Cálculo simplificado. No considera refuerzo del cordón ni penetración de raíz excesiva.";
    const t = thickness1; // Use primary thickness for these calculations

    if (jointType === 'fillet' && legLength1 > 0) {
      area_mm2 = 0.5 * legLength1 * legLength1; // Assuming equal leg fillet a^2/2
      notes += " Para filetes, se asume catetos iguales.";
    } else if (jointType === 'butt_square' && t > 0) {
      area_mm2 = t * (rootOpening > 0 ? rootOpening : Math.max(1, t * 0.1)); // if no root opening, assume weld width is at least 1mm or 10% of thickness
      notes += " Para uniones a tope cuadradas, el ancho del cordón es la apertura de raíz o un valor estimado si no se especifica.";
    } else if (jointType === 'butt_v' && t > 0 && grooveAngle > 0) {
      const angleRad = (grooveAngle * Math.PI) / 180;
      // Area of V-groove: t * RO + t^2 * tan(alpha/2)
      area_mm2 = (t * (rootOpening || 0)) + (t * t * Math.tan(angleRad / 2));
    } else {
        setJointPrepOutput({ notes: "Parámetros insuficientes o tipo de unión no soportado para este cálculo simplificado (espesor y/o ángulo de ranura/longitud de cateto deben ser > 0)." });
        return;
    }
    
    if (area_mm2 <= 0) {
       setJointPrepOutput({ notes: "El área calculada es cero o negativa. Verifique los parámetros de entrada (espesor, ángulo, apertura de raíz, longitud de cateto)." });
        return;
    }

    // Volume in cm^3 per meter of weld: (Area in mm^2 / 100 mm^2/cm^2) * 100 cm/m = Area_mm2 cm^3/m
    // This is incorrect. Correct is: (Area_mm2 / 100 [to get cm^2]) * 100 [cm in a meter] = Area_mm2 cm^3/m is actually Area_cm2 * length_cm
    // Correct Volume (cm^3) for 1 meter (100cm) of weld = (Area_mm^2 / 100) * 100 = Area_mm^2. This is if Area_mm2 was actually Area_cm2.
    // Let's be explicit:
    // Cross-sectional area in cm^2 = Area_mm2 / 100
    // Length in cm = 100 (for 1 meter)
    // Volume_cm3_per_meter = (Area_mm2 / 100) * 100 = Area_mm2. This is only correct if Area_mm2 is defined as cm^3/m. Let's fix.
    const area_cm2 = area_mm2 / 100;
    const volume_cm3_per_meter_of_weld = area_cm2 * 100; // cm^2 * cm/meter = cm^3/meter

    const weight_kg_per_m = (volume_cm3_per_meter_of_weld * (density || 7.85)) / 1000; // (cm^3/m * g/cm^3) / g/kg = kg/m


    setJointPrepOutput({
      crossSectionalArea: `${area_mm2.toFixed(2)} mm²`,
      volumePerUnitLength: `${volume_cm3_per_meter_of_weld.toFixed(3)} cm³/metro`,
      weightPerUnitLength: `${weight_kg_per_m.toFixed(3)} kg/metro`,
      notes: notes
    });
  };

  const handleFillerMetalCostCalc = () => {
    const {
      weldLength,
      crossSectionalArea,
      materialDensity,
      depositionEfficiency,
      fillerMetalCostPerKg,
      gasCostPerMeter = 0,
      laborCostPerHour,
      weldingSpeed
    } = fillerCostInputs;

    if (weldLength <= 0 || crossSectionalArea <=0 || materialDensity <=0 || depositionEfficiency <=0 || depositionEfficiency > 100 || fillerMetalCostPerKg < 0 || gasCostPerMeter < 0 || laborCostPerHour < 0 || weldingSpeed <=0) {
      setFillerCostOutput({
        totalFillerMetalRequiredKg: 'N/A',
        fillerMetalCost: 'N/A',
        gasCost: 'N/A',
        laborCost: 'N/A',
        totalWeldCost: 'N/A',
        notes: "Por favor, introduzca valores válidos y positivos para todos los campos. La eficiencia de deposición debe estar entre 1 y 100."
      });
      return;
    }
    
    // Volume of weld metal (cm³) = (crossSectionalArea_mm2 / 100 (to cm^2)) * (weldLength_m * 100 (to cm))
    const weldVolume_cm3 = (crossSectionalArea / 100) * (weldLength * 100);
    
    // Weight of deposited weld metal (g) = Volume_cm3 * density_g_cm3
    const depositedWeight_g = weldVolume_cm3 * materialDensity;
    // Weight of deposited weld metal (kg)
    const depositedWeight_kg = depositedWeight_g / 1000;

    // Total filler metal required (kg)
    const totalFillerMetalRequired_kg = depositedWeight_kg / (depositionEfficiency / 100);

    // Cost of filler metal (€)
    const fillerMetalCost_eur = totalFillerMetalRequired_kg * fillerMetalCostPerKg;

    // Time to weld (hours)
    const timeToWeld_hours = weldLength / weldingSpeed;

    // Cost of labor (€)
    const laborCost_eur = timeToWeld_hours * laborCostPerHour;
    
    // Cost of gas (€)
    const gasCost_eur = (gasCostPerMeter || 0) * weldLength;

    // Total weld cost (€)
    const totalWeldCost_eur = fillerMetalCost_eur + laborCost_eur + gasCost_eur;

    setFillerCostOutput({
      totalFillerMetalRequiredKg: `${totalFillerMetalRequired_kg.toFixed(3)} kg`,
      fillerMetalCost: `€${fillerMetalCost_eur.toFixed(2)}`,
      gasCost: gasCostPerMeter >= 0 ? `€${gasCost_eur.toFixed(2)}` : 'No especificado', // Check if gasCostPerMeter was actually provided
      laborCost: `€${laborCost_eur.toFixed(2)}`,
      totalWeldCost: `€${totalWeldCost_eur.toFixed(2)}`,
      notes: `Cálculo basado en los parámetros proporcionados. La eficiencia de deposición y la velocidad de soldadura son cruciales. El costo del gas es simplificado.`
    });
  };
  
  const calculators = [
    { id: 'cooling', name: 'Tiempo de Enfriamiento y Precalentamiento' },
    { id: 'jointprep', name: 'Cálculo de Cordón y Preparación de Junta' },
    { id: 'filler', name: 'Cantidad de Metal de Aportación y Costo' },
    { id: 'strength', name: 'Resistencia de Soldadura (Conceptual)' },
    { id: 'pipe', name: 'Parámetros Soldadura a Testa de Tuberías (Conceptual)' },
  ];

  const renderCalculatorContent = () => {
    switch (activeCalculator) {
      case 'cooling':
        return (
          <div>
            <h3 className="text-xl font-semibold text-orange-400 mb-4">Cálculo de Tiempo de Enfriamiento Estimado</h3>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Material:</label>
                <select 
                  value={coolingInputs.material} 
                  onChange={(e) => setCoolingInputs({...coolingInputs, material: e.target.value})}
                  className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"
                >
                  <option>Acero al Carbono</option>
                  <option>Acero Inoxidable</option>
                  <option>Aluminio</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Espesor (mm):</label>
                <input 
                  type="number" 
                  value={coolingInputs.thickness} 
                  min="0"
                  onChange={(e) => setCoolingInputs({...coolingInputs, thickness: Number(e.target.value)})}
                  className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Temperatura Ambiente (°C):</label>
                <input 
                  type="number" 
                  value={coolingInputs.ambientTemp} 
                  onChange={(e) => setCoolingInputs({...coolingInputs, ambientTemp: Number(e.target.value)})}
                  className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"
                />
              </div>
            </div>
            <Button onClick={handleCoolingCalc}>Calcular Tiempo de Enfriamiento</Button>
            {coolingOutput && (
              <div className="mt-4 p-3 bg-gray-600 rounded-md">
                <p className="text-gray-200"><strong>Tiempo Estimado:</strong> {coolingOutput.estimatedTime}</p>
                <p className="text-xs text-gray-400 mt-1">{coolingOutput.notes}</p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-3">Nota: Este es un cálculo simplificado y conceptual.</p>
          </div>
        );
      case 'jointprep':
        return (
          <div>
            <h3 className="text-xl font-semibold text-orange-400 mb-4">Cálculo de Cordón y Preparación de Junta</h3>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Tipo de Unión:</label>
                <select 
                  value={jointPrepInputs.jointType} 
                  onChange={(e) => setJointPrepInputs({...jointPrepInputs, jointType: e.target.value as JointTypeCalc})}
                  className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"
                >
                  {JOINT_TYPE_CALC_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Espesor Principal (t1) (mm):</label>
                <input type="number" value={jointPrepInputs.thickness1} min="0.1" step="0.1" onChange={(e) => setJointPrepInputs({...jointPrepInputs, thickness1: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
              {jointPrepInputs.jointType === 'butt_v' && (
                <>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Ángulo de Bisel (°) (Total):</label>
                    <input type="number" value={jointPrepInputs.grooveAngle || ''} min="1" max="120" onChange={(e) => setJointPrepInputs({...jointPrepInputs, grooveAngle: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Apertura de Raíz (mm):</label>
                    <input type="number" value={jointPrepInputs.rootOpening || ''} min="0" step="0.1" onChange={(e) => setJointPrepInputs({...jointPrepInputs, rootOpening: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                  </div>
                </>
              )}
              {jointPrepInputs.jointType === 'fillet' && (
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Cateto del Filete (a) (mm):</label>
                  <input type="number" value={jointPrepInputs.legLength1 || ''} min="0.1" step="0.1" onChange={(e) => setJointPrepInputs({...jointPrepInputs, legLength1: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                </div>
              )}
               {jointPrepInputs.jointType === 'butt_square' && (
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Apertura de Raíz (mm) (Opcional, si >0 se usa como ancho del cordón):</label>
                  <input type="number" value={jointPrepInputs.rootOpening || ''} min="0" step="0.1" onChange={(e) => setJointPrepInputs({...jointPrepInputs, rootOpening: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-300 mb-1">Densidad del Material (g/cm³):</label>
                <input type="number" value={jointPrepInputs.density || 7.85} step="0.01" min="0.1" onChange={(e) => setJointPrepInputs({...jointPrepInputs, density: Number(e.target.value)})} placeholder="Ej: 7.85 para acero" className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
            </div>
            <Button onClick={handleJointPrepCalc}>Calcular Geometría del Cordón</Button>
            {jointPrepOutput && (
              <div className="mt-4 p-3 bg-gray-600 rounded-md">
                {jointPrepOutput.crossSectionalArea && <p className="text-gray-200"><strong>Área Transversal Estimada:</strong> {jointPrepOutput.crossSectionalArea}</p>}
                {jointPrepOutput.volumePerUnitLength && <p className="text-gray-200"><strong>Volumen Estimado por Metro:</strong> {jointPrepOutput.volumePerUnitLength}</p>}
                {jointPrepOutput.weightPerUnitLength && <p className="text-gray-200"><strong>Peso Estimado por Metro:</strong> {jointPrepOutput.weightPerUnitLength}</p>}
                <p className="text-xs text-gray-400 mt-1">{jointPrepOutput.notes}</p>
              </div>
            )}
             <p className="text-xs text-gray-500 mt-3">Nota: Los cálculos son simplificados y solo para fines orientativos.</p>
          </div>
        );
      case 'filler':
        return (
          <div>
            <h3 className="text-xl font-semibold text-orange-400 mb-4">Calculadora de Cantidad de Metal de Aportación y Costo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Longitud de Soldadura (m):</label>
                <input type="number" value={fillerCostInputs.weldLength} min="0.01" step="0.01" onChange={(e) => setFillerCostInputs({...fillerCostInputs, weldLength: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Área Sección Transversal (mm²):</label>
                <input type="number" value={fillerCostInputs.crossSectionalArea} min="0.1" step="0.1" onChange={(e) => setFillerCostInputs({...fillerCostInputs, crossSectionalArea: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md" placeholder="Obtener de Calc. de Junta"/>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Densidad del Material (g/cm³):</label>
                <input type="number" value={fillerCostInputs.materialDensity} step="0.01" min="0.1" onChange={(e) => setFillerCostInputs({...fillerCostInputs, materialDensity: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Eficiencia de Deposición (%):</label>
                <input type="number" value={fillerCostInputs.depositionEfficiency} min="1" max="100" onChange={(e) => setFillerCostInputs({...fillerCostInputs, depositionEfficiency: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md" placeholder="Ej: SMAW 65, GMAW 85"/>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Costo Metal Aporte (€/kg):</label>
                <input type="number" value={fillerCostInputs.fillerMetalCostPerKg} min="0" step="0.01" onChange={(e) => setFillerCostInputs({...fillerCostInputs, fillerMetalCostPerKg: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Costo Gas (€/metro de soldadura) (Opc.):</label>
                <input type="number" value={fillerCostInputs.gasCostPerMeter || ''} min="0" step="0.01" onChange={(e) => setFillerCostInputs({...fillerCostInputs, gasCostPerMeter: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Costo Mano de Obra (€/hora):</label>
                <input type="number" value={fillerCostInputs.laborCostPerHour} min="0" step="0.01" onChange={(e) => setFillerCostInputs({...fillerCostInputs, laborCostPerHour: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Velocidad de Soldadura (m/hora):</label>
                <input type="number" value={fillerCostInputs.weldingSpeed} min="0.01" step="0.01" onChange={(e) => setFillerCostInputs({...fillerCostInputs, weldingSpeed: Number(e.target.value)})} className="w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
            </div>
            <Button onClick={handleFillerMetalCostCalc}>Calcular Costo de Aportación</Button>
            {fillerCostOutput && (
              <div className="mt-4 p-3 bg-gray-600 rounded-md space-y-1">
                <p className="text-gray-200"><strong>Aporte Requerido:</strong> {fillerCostOutput.totalFillerMetalRequiredKg}</p>
                <p className="text-gray-200"><strong>Costo Metal Aporte:</strong> {fillerCostOutput.fillerMetalCost}</p>
                <p className="text-gray-200"><strong>Costo Gas:</strong> {fillerCostOutput.gasCost}</p>
                <p className="text-gray-200"><strong>Costo Mano de Obra:</strong> {fillerCostOutput.laborCost}</p>
                <p className="text-orange-300 font-semibold"><strong>Costo Total Estimado:</strong> {fillerCostOutput.totalWeldCost}</p>
                <p className="text-xs text-gray-400 mt-1">{fillerCostOutput.notes}</p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-3">Nota: Esta calculadora es conceptual y proporciona estimaciones. Los costos reales pueden variar.</p>
          </div>
        );
      case 'strength':
      case 'pipe':
        return <p className="text-gray-400">Calculadora para '{calculators.find(c=>c.id === activeCalculator)?.name}' aún no implementada. Esta sección es un marcador de posición para funcionalidad futura.</p>;
      default:
        return <p className="text-gray-300">Seleccione una calculadora del menú para comenzar.</p>;
    }
  };

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Calculadoras Avanzadas de Soldadura</h2>
      <p className="text-gray-300 mb-8">
        Herramientas para estimaciones y cálculos específicos en soldadura.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 bg-gray-700 p-4 rounded-lg self-start">
          <h3 className="text-lg font-semibold text-gray-100 mb-3">Calculadoras Disponibles:</h3>
          <ul className="space-y-2">
            {calculators.map(calc => (
              <li key={calc.id}>
                <button
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150
                              ${activeCalculator === calc.id 
                                ? 'bg-orange-600 text-white font-semibold' 
                                : 'text-gray-300 hover:bg-gray-600 hover:text-gray-100'}`}
                >
                  {calc.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-2/3 bg-gray-700 p-6 rounded-lg shadow-inner">
          {renderCalculatorContent()}
        </div>
      </div>
    </div>
  );
};

export default AdvancedCalculators;