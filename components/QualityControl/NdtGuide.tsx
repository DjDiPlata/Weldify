import React from 'react';
import type { NdtMethodInfo } from '../../types';

const ndtMethodsData: NdtMethodInfo[] = [
  {
    id: 'vt',
    name: "Inspección Visual (VT)",
    abbreviation: "VT",
    principle: "Detección de discontinuidades superficiales utilizando el ojo humano, a veces con ayuda de lupas, boroscopios, etc.",
    description: "Es el método END más básico y a menudo el primero en aplicarse. Busca defectos visibles como grietas, porosidad, socavaciones, errores dimensionales, etc.",
    applications: ["Todas las soldaduras", "Componentes fundidos y forjados", "Inspección en servicio"],
    advantages: ["Bajo costo", "Rápido y fácil de aplicar", "No requiere equipo complejo (generalmente)", "Portátil"],
    limitations: ["Solo detecta defectos superficiales o muy cercanos a la superficie.", "Depende de la agudeza visual y experiencia del inspector.", "La iluminación y el acceso son críticos."]
  },
  {
    id: 'pt',
    name: "Líquidos Penetrantes (PT)",
    abbreviation: "PT",
    principle: "Un líquido coloreado o fluorescente penetra en las discontinuidades abiertas a la superficie por capilaridad. Después de remover el exceso, un revelador extrae el penetrante atrapado, haciéndolo visible.",
    description: "Eficaz para detectar defectos superficiales finos como grietas, porosidad y solapes en materiales no porosos.",
    applications: ["Metales no ferrosos (aluminio, magnesio, titanio)", "Aceros inoxidables austeníticos", "Plásticos, cerámicas (no porosas)"],
    advantages: ["Relativamente económico", "Portátil", "Alta sensibilidad a defectos superficiales finos", "Aplicable a geometrías complejas"],
    limitations: ["Solo detecta defectos abiertos a la superficie.", "No aplicable a materiales porosos.", "Requiere limpieza exhaustiva antes y después.", "El proceso puede ser lento debido a los tiempos de penetración y revelado."]
  },
  {
    id: 'mt',
    name: "Partículas Magnéticas (MT)",
    abbreviation: "MT",
    principle: "Se induce un campo magnético en un material ferromagnético. Las discontinuidades superficiales y subsuperficiales interrumpen el flujo magnético, creando campos de fuga que atraen partículas magnéticas finas (secas o en suspensión líquida), haciéndolas visibles.",
    description: "Método rápido y eficaz para detectar grietas y otras discontinuidades lineales en o cerca de la superficie de materiales ferromagnéticos.",
    applications: ["Aceros al carbono y de baja aleación", "Fundiciones de hierro", "Soldaduras en materiales ferromagnéticos"],
    advantages: ["Rápido y relativamente económico", "Alta sensibilidad a grietas superficiales y subsuperficiales.", "Portátil (equipos de yugo)", "Indicaciones directas y fáciles de interpretar."],
    limitations: ["Solo aplicable a materiales ferromagnéticos.", "La orientación del defecto respecto al campo magnético es crítica.", "Requiere limpieza superficial.", "Puede dejar magnetismo residual que requiera desmagnetización."]
  },
  {
    id: 'ut',
    name: "Ultrasonidos (UT)",
    abbreviation: "UT",
    principle: "Se introducen ondas sonoras de alta frecuencia (ultrasonidos) en el material. Las discontinuidades internas reflejan estas ondas, y los ecos son detectados y analizados para determinar la ubicación, tamaño y naturaleza del defecto.",
    description: "Método versátil para detectar defectos internos (volumétricos y planares) como grietas, inclusiones, laminaciones, falta de fusión. También se usa para medir espesores.",
    applications: ["Soldaduras críticas", "Fundiciones, forjas", "Placas, tuberías", "Inspección de materiales compuestos"],
    advantages: ["Alta sensibilidad a defectos internos, especialmente planares.", "Permite determinar la profundidad y tamaño del defecto.", "Portátil.", "Resultados inmediatos.", "Seguro (sin radiación ionizante)."],
    limitations: ["Requiere personal altamente cualificado.", "La superficie debe ser accesible y relativamente lisa.", "Geometrías complejas pueden dificultar la inspección.", "La interpretación de las señales puede ser compleja."]
  },
  {
    id: 'rt',
    name: "Radiografía Industrial (RT)",
    abbreviation: "RT",
    principle: "Se utiliza radiación ionizante (rayos X o rayos gamma) que atraviesa la pieza. Las discontinuidades internas absorben menos radiación que el material circundante, lo que resulta en una imagen más oscura en una película radiográfica o detector digital.",
    description: "Proporciona un registro permanente (imagen) de los defectos internos. Eficaz para detectar defectos volumétricos como porosidad e inclusiones.",
    applications: ["Soldaduras en recipientes a presión, tuberías", "Fundiciones", "Componentes críticos"],
    advantages: ["Detecta una amplia gama de defectos internos.", "Proporciona un registro visual permanente.", "Puede inspeccionar una variedad de materiales y espesores."],
    limitations: ["Costoso (equipo y consumibles).", "Riesgos de seguridad por radiación (requiere áreas controladas y personal cualificado).", "Menos sensible a defectos planares (grietas) a menos que estén orientados favorablemente al haz.", "Proceso relativamente lento."]
  }
];

const NdtCard: React.FC<NdtMethodInfo> = (method) => (
  <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
    <div className="p-6">
      <h3 className="text-xl font-semibold text-orange-400 mb-1">{method.name} ({method.abbreviation})</h3>
      <p className="text-sm text-gray-300 mb-2 italic">{method.principle}</p>
      <p className="text-sm text-gray-400 mb-3">{method.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div>
          <h4 className="font-semibold text-gray-200">Aplicaciones Comunes:</h4>
          <ul className="list-disc list-inside text-gray-400">
            {method.applications.map((app, i) => <li key={i}>{app}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-200">Ventajas:</h4>
          <ul className="list-disc list-inside text-gray-400">
            {method.advantages.map((adv, i) => <li key={i}>{adv}</li>)}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h4 className="font-semibold text-gray-200 mt-2">Limitaciones:</h4>
          <ul className="list-disc list-inside text-gray-400">
            {method.limitations.map((lim, i) => <li key={i}>{lim}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
);


const NdtGuide: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-2">Guía de Ensayos No Destructivos (END)</h2>
      <p className="text-gray-300 mb-8">
        Conozca los principios, aplicaciones, ventajas y limitaciones de los métodos comunes de Ensayos No Destructivos utilizados para la inspección de soldaduras y materiales.
      </p>
      <div className="space-y-8">
        {ndtMethodsData.map(method => (
          <NdtCard key={method.id} {...method} />
        ))}
      </div>
    </div>
  );
};

export default NdtGuide;