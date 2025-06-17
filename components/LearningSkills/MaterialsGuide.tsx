import React, { useState } from 'react';

interface MaterialInfo {
  id: MaterialType;
  name: string;
  description: string;
  weldingConsiderations: string[];
  commonProcesses: string[];
  fillerMetals?: string;
  preheatPostweld?: string;
  // image: string; // Removed
}

enum MaterialType {
  CARBON_STEEL = "Acero al Carbono",
  STAINLESS_STEEL = "Acero Inoxidable",
  ALUMINUM = "Aluminio",
  TITANIUM = "Titanio",
  CAST_IRON = "Hierro Fundido",
}

const materialsData: MaterialInfo[] = [
  {
    id: MaterialType.CARBON_STEEL,
    name: "Acero al Carbono",
    description: "El material más común en soldadura debido a su versatilidad, resistencia y bajo costo. Existe en varios grados (bajo, medio, alto carbono).",
    weldingConsiderations: [
      "Generalmente fácil de soldar.",
      "Aceros con mayor contenido de carbono (>0.3%) pueden requerir precalentamiento y post-enfriamiento controlado para evitar fisuración.",
      "Buena limpieza es esencial para evitar porosidad.",
      "Sensible a la fisuración por hidrógeno si hay humedad presente."
    ],
    commonProcesses: ["SMAW (Electrodo)", "GMAW (MIG/MAG)", "FCAW", "GTAW (TIG)", "SAW"],
    fillerMetals: "E60xx, E70xx (SMAW); ER70S-x (GMAW/GTAW); Alambres tubulares E7xT-x (FCAW).",
    preheatPostweld: "Precalentamiento para secciones gruesas o alto carbono. PWHT (Tratamiento térmico post-soldadura) puede ser necesario para aliviar tensiones en aplicaciones críticas.",
    // image: "https://picsum.photos/seed/polished-carbon-steel-sheet-texture/400/250" // Removed
  },
  {
    id: MaterialType.STAINLESS_STEEL,
    name: "Acero Inoxidable",
    description: "Aleaciones de hierro, cromo (mín. 10.5%) y a menudo níquel, molibdeno. Conocido por su resistencia a la corrosión. Tipos comunes: austenítico (serie 300), ferrítico (serie 400), martensítico, dúplex.",
    weldingConsiderations: [
      "Menor conductividad térmica y mayor expansión térmica que el acero al carbono, lo que aumenta el riesgo de distorsión.",
      "Usar bajo aporte térmico (low heat input) para minimizar la distorsión y la sensibilización (pérdida de resistencia a la corrosión en austeníticos).",
      "Debe evitarse la contaminación con acero al carbono (usar herramientas dedicadas).",
      "La limpieza es crítica. Usar cepillos de acero inoxidable."
    ],
    commonProcesses: ["GTAW (TIG)", "GMAW (MIG)", "SMAW (Electrodo)", "PAW (Plasma)"],
    fillerMetals: "ER308L, ER309L, ER316L (para austeníticos). El tipo 'L' indica bajo carbono para mejor resistencia a la corrosión intergranular.",
    preheatPostweld: "Austeníticos generalmente no requieren precalentamiento. Martensíticos y algunos ferríticos sí. PWHT raramente usado en austeníticos, pero puede ser necesario para otros tipos.",
    // image: "https://picsum.photos/seed/brushed-stainless-steel-surface-detail/400/250" // Removed
  },
  {
    id: MaterialType.ALUMINUM,
    name: "Aluminio",
    description: "Metal ligero con alta conductividad térmica y eléctrica, y buena resistencia a la corrosión. Forma una capa de óxido refractaria en la superficie.",
    weldingConsiderations: [
      "La capa de óxido de aluminio (alúmina) tiene un punto de fusión mucho más alto que el aluminio base y debe eliminarse antes de soldar (mecánicamente o químicamente).",
      "Alta conductividad térmica requiere mayor aporte de calor y velocidades de soldadura más rápidas.",
      "Propenso a la porosidad por hidrógeno (limpieza y secado son cruciales).",
      "Usar corriente AC para GTAW (TIG) para la acción de limpieza del arco.",
      "Riesgo de fisuración en caliente; seleccionar el metal de aporte adecuado es vital (ej. ER4043, ER5356)."
    ],
    commonProcesses: ["GTAW (TIG AC)", "GMAW (MIG)", "LBW (Láser)"],
    fillerMetals: "ER4043 (uso general, buena fluidez), ER5356 (mayor resistencia, mejor coincidencia de color después de anodizado).",
    preheatPostweld: "Precalentamiento para secciones gruesas (>6mm) puede ser beneficioso (100-200°C). PWHT no es común.",
    // image: "https://picsum.photos/seed/extruded-aluminum-profile-macro/400/250" // Removed
  },
  {
    id: MaterialType.TITANIUM,
    name: "Titanio",
    description: "Metal ligero, fuerte y altamente resistente a la corrosión, especialmente en ambientes marinos y químicos. Es reactivo a altas temperaturas.",
    weldingConsiderations: [
      "Extremadamente sensible a la contaminación por oxígeno, nitrógeno e hidrógeno a temperaturas de soldadura, lo que causa fragilización.",
      "Requiere una protección gaseosa excelente y extensa (argón puro) tanto en la cara como en la raíz de la soldadura (purga).",
      "Limpieza meticulosa es imprescindible.",
      "El color del cordón post-soldadura indica la calidad de la protección (plateado/pajizo claro es bueno, azul/gris/blanco es malo)."
    ],
    commonProcesses: ["GTAW (TIG DCEN)", "PAW (Plasma)", "LBW (Láser)", "EBW (Haz de Electrones)"],
    fillerMetals: "Generalmente coincide con la aleación base (ej. ERTi-2 para titanio comercialmente puro Grado 2).",
    preheatPostweld: "Generalmente no se precalienta. PWHT (recocido de alivio de tensiones) puede usarse para mejorar la ductilidad y estabilidad dimensional.",
    // image: "https://picsum.photos/seed/machined-titanium-alloy-part-texture/400/250" // Removed
  },
   {
    id: MaterialType.CAST_IRON,
    name: "Hierro Fundido",
    description: "Aleación de hierro con alto contenido de carbono (típicamente 2-4%) y silicio. Es duro y frágil, lo que lo hace difícil de soldar.",
    weldingConsiderations: [
      "Propenso a la fisuración debido a su baja ductilidad y tensiones residuales.",
      "Precalentamiento lento y uniforme (250-650°C) es crucial para reducir el gradiente térmico.",
      "Enfriamiento muy lento (cubrir con manta aislante, arena) para evitar la formación de martensita frágil.",
      "Técnica de 'cordones cortos y alternados' y martilleo (peening) de los cordones para aliviar tensiones.",
      "Identificar el tipo de hierro fundido (gris, blanco, nodular, maleable) es importante.",
    ],
    commonProcesses: ["SMAW (Electrodo)", "GTAW (TIG)", "OAW (Oxiacetilénica con flux)"],
    fillerMetals: "Electrodos a base de níquel (ENi-CI, ENiFe-CI) son comunes para SMAW. Para TIG, varillas de níquel o bronce.",
    preheatPostweld: "Precalentamiento esencial. Enfriamiento lento es la forma más común de PWHT.",
    // image: "https://picsum.photos/seed/rough-cast-iron-surface-texture/400/250" // Removed
  },
];

const MaterialsGuide: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialInfo | null>(materialsData[0]);

  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Fundamentos de Materiales de Soldadura</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar de selección de material */}
        <div className="md:w-1/4 bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-100 mb-3">Seleccionar Material:</h3>
          <ul className="space-y-2">
            {materialsData.map(material => (
              <li key={material.id}>
                <button
                  onClick={() => setSelectedMaterial(material)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-150
                              ${selectedMaterial?.id === material.id 
                                ? 'bg-orange-600 text-white font-semibold' 
                                : 'text-gray-300 hover:bg-gray-600 hover:text-gray-100'}`}
                >
                  {material.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contenido del material seleccionado */}
        <div className="md:w-3/4">
          {selectedMaterial ? (
            <div className="bg-gray-700 p-6 rounded-lg shadow-inner">
              <div className="mb-6">
                {/* Image removed */}
                {/* <img src={selectedMaterial.image} alt={selectedMaterial.name} className="w-full sm:w-1/3 h-auto object-cover rounded-md shadow-md"/> */}
                <div>
                  <h3 className="text-2xl font-bold text-orange-400 mb-2">{selectedMaterial.name}</h3>
                  <p className="text-gray-300 text-sm">{selectedMaterial.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-100 mb-1">Consideraciones de Soldadura:</h4>
                  <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                    {selectedMaterial.weldingConsiderations.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-100 mb-1">Procesos Comunes:</h4>
                  <p className="text-gray-400 text-sm">{selectedMaterial.commonProcesses.join(', ')}</p>
                </div>
                {selectedMaterial.fillerMetals && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-100 mb-1">Metales de Aporte Típicos:</h4>
                    <p className="text-gray-400 text-sm">{selectedMaterial.fillerMetals}</p>
                  </div>
                )}
                {selectedMaterial.preheatPostweld && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-100 mb-1">Precalentamiento y PWHT:</h4>
                    <p className="text-gray-400 text-sm">{selectedMaterial.preheatPostweld}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-10">Seleccione un material de la lista para ver los detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialsGuide;