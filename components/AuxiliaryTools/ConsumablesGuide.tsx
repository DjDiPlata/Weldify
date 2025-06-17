import React, { useState, useCallback } from 'react';
import { getGeneralWeldingInfo } from '../../services/geminiService'; // Re-use for specific consumable questions
import { WeldingProcess, MaterialType } from '../../types';
import { WELDING_PROCESSES_OPTIONS, MATERIAL_TYPES_OPTIONS } from '../../constants';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';

// Re-using FormattedResponse. Ideally, this would be a shared common component.
const FormattedResponse: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split(/\\n|\n/); 
  
  const formattedLines = lines.map(line => {
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); 
    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    if (line.startsWith('### ')) {
      return `<h3 class="text-xl font-semibold mt-4 mb-2 text-orange-400">${line.substring(4)}</h3>`;
    }
    if (line.startsWith('## ')) {
      return `<h2 class="text-2xl font-semibold mt-6 mb-3 text-orange-500">${line.substring(3)}</h2>`;
    }
    // Ordered list item (must be checked before general '*' or '-')
    if (line.match(/^\d+\.\s/)) { 
      return `<li class="ml-4 list-decimal">${line.substring(line.indexOf(' ') + 1)}</li>`;
    }
    // Unordered list item (e.g. "* " or "- ")
    if (line.match(/^(\*|-)\s/)) { 
       return `<li class="ml-4 list-disc">${line.substring(line.indexOf(' ') + 1)}</li>`;
    }
    return line; // Return line as is if no markdown matched
  });

  let inList = false;
  let listWrapperTag = 'ul'; // Default to unordered
  const finalOutput = formattedLines.reduce((acc, line) => {
    const isListItem = line.includes('<li');
    const isOrderedListItem = line.includes('list-decimal'); 

    if (isListItem) {
      if (!inList) {
        listWrapperTag = isOrderedListItem ? 'ol' : 'ul';
        acc.push(`<${listWrapperTag}>`);
        inList = true;
      }
      acc.push(line);
    } else {
      if (inList) {
        acc.push(`</${listWrapperTag}>`);
        inList = false;
      }
      acc.push(line);
    }
    return acc;
  }, [] as string[]);

  if (inList) {
    finalOutput.push(`</${listWrapperTag}>`);
  }
  
  return <div className="prose prose-sm prose-invert max-w-none break-words" dangerouslySetInnerHTML={{ __html: finalOutput.join('<br />').replace(/<br \/><(ul|ol)>/g, '<$1>').replace(/<\/(ul|ol)><br \/>/g, '</$1>') }} />;
};


interface ConsumableInfo {
  type: 'Electrodos (SMAW)' | 'Hilos (GMAW/FCAW)' | 'Varillas (GTAW)' | 'Gases Protectores';
  name: string;
  description: string;
  commonUses: string;
  // image?: string; // Removed
}

const consumablesData: ConsumableInfo[] = [
  // SMAW Electrodes
  { type: 'Electrodos (SMAW)', name: 'E6010/E6011 (Celulósicos)', description: 'Alta penetración, arco fuerte. Todas posiciones. E6011 para AC/DC.', commonUses: 'Aceros al carbono, tuberías, estructuras, ambientes con óxido o pintura ligera.' }, // image removed
  { type: 'Electrodos (SMAW)', name: 'E6013 (Rutilo)', description: 'Arco suave, fácil de usar, buen aspecto del cordón. Menor penetración.', commonUses: 'Aceros al carbono de bajo espesor, trabajos generales, chapa fina.' }, // image removed
  { type: 'Electrodos (SMAW)', name: 'E7018 (Bajo Hidrógeno)', description: 'Propiedades mecánicas excelentes, cordones de alta calidad. Requiere almacenamiento seco.', commonUses: 'Aceros al carbono de media/alta resistencia, estructuras críticas, aceros de baja aleación.' }, // image removed
  { type: 'Electrodos (SMAW)', name: 'E308L-16 (Inoxidable)', description: 'Para soldar aceros inoxidables tipo 304L y similares.', commonUses: 'Industria alimentaria, química, tanques de acero inoxidable.' }, // image removed
  // Wires
  { type: 'Hilos (GMAW/FCAW)', name: 'ER70S-6 (Hilo Macizo MIG)', description: 'El hilo más común para GMAW en acero al carbono. Contiene desoxidantes (Si, Mn).', commonUses: 'Fabricación general, automotriz, estructuras ligeras y medianas.' }, // image removed
  { type: 'Hilos (GMAW/FCAW)', name: 'E71T-1 (Hilo Tubular FCAW-G)', description: 'Autoprotegido o con gas. Alta tasa de deposición. Todas posiciones.', commonUses: 'Estructuras pesadas, construcción naval, equipos.' }, // image removed
  { type: 'Hilos (GMAW/FCAW)', name: 'ER308LSi (Hilo MIG Inox)', description: 'Para GMAW en aceros inoxidables tipo 304L. \'Si\' para mejor fluidez.', commonUses: 'Similar a E308L-16 pero para proceso MIG.' }, // image removed
  // GTAW Rods
  { type: 'Varillas (GTAW)', name: 'ER70S-2 (Varilla TIG Acero Carbono)', description: 'Varilla para GTAW en acero al carbono. Contiene desoxidantes.', commonUses: 'Pases de raíz, soldaduras de alta calidad en acero al carbono.' }, // image removed
  { type: 'Varillas (GTAW)', name: 'ER308L (Varilla TIG Inox)', description: 'Para GTAW en aceros inoxidables tipo 304L.', commonUses: 'Soldaduras de precisión en acero inoxidable.' }, // image removed
  { type: 'Varillas (GTAW)', name: 'ER4043 (Varilla TIG Aluminio)', description: 'Aleación Al-Si. Buena fluidez, menor tendencia a fisuras.', commonUses: 'Soldadura de aleaciones de aluminio series 1xxx, 3xxx, 6xxx.' }, // image removed
  // Gases
  { type: 'Gases Protectores', name: 'Argón (Ar)', description: 'Gas inerte. Usado puro para TIG en todos los metales y MIG en no ferrosos (Al, Mg).', commonUses: 'GTAW (todos los metales), GMAW (Al, Cu, Ni).' }, // image removed
  { type: 'Gases Protectores', name: 'Dióxido de Carbono (CO2)', description: 'Gas activo. Usado puro o en mezclas para GMAW en acero al carbono. Mayor penetración, más salpicaduras.', commonUses: 'GMAW (acero al carbono).' }, // image removed
  { type: 'Gases Protectores', name: 'Mezcla Argón/CO2 (ej. 75% Ar / 25% CO2)', description: 'Mezcla común para GMAW en acero al carbono. Buen equilibrio entre penetración, estabilidad de arco y salpicaduras.', commonUses: 'GMAW (acero al carbono, baja aleación).' }, // image removed
];

const ConsumablesGuide: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [activeFilter, setActiveFilter] = useState<'all' | string>('all');
  
  const filteredConsumables = consumablesData.filter(c => 
    activeFilter === 'all' || c.type === activeFilter
  );

  const handleSuggestionRequest = useCallback(async () => {
    if (!selectedProcess || !selectedMaterial) {
      setError("Por favor, seleccione un proceso y un material para obtener una sugerencia de IA.");
      return;
    }
    setError('');
    setIsLoading(true);
    setAiSuggestion('');
    
    const prompt = `Eres Weldify, un experto en consumibles de soldadura. Un soldador necesita seleccionar consumibles.
Proceso de soldadura: ${selectedProcess}
Material a soldar: ${selectedMaterial}
¿Qué tipo de electrodo/hilo (especificando si es macizo o tubular/flux-cored donde aplique) y qué gas protector (argón, CO2, mezclas, o 'ninguno' si no aplica) recomiendas para esta combinación? Justifica brevemente tu elección y menciona alguna designación común (ej. E7018, ER70S-6, Ar/CO2 75/25).`;

    try {
      const result = await getGeneralWeldingInfo(prompt); // Using general info as it's a specific question
      setAiSuggestion(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido.";
      setError(`Error al obtener sugerencia: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [selectedProcess, selectedMaterial]);

  const consumableTypes = ['all', ...Array.from(new Set(consumablesData.map(c => c.type)))];

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Guía de Consumibles de Soldadura</h2>
      
      {/* AI Suggestion Section */}
      <div className="bg-gray-700 p-6 rounded-lg shadow-md mb-10">
        <h3 className="text-xl font-semibold text-orange-400 mb-4">Sugerencia de Consumibles por IA</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="process-select" className="block text-sm font-medium text-gray-300 mb-1">Proceso</label>
            <select id="process-select" value={selectedProcess} onChange={(e) => setSelectedProcess(e.target.value)} className="w-full bg-gray-600 border-gray-500 text-gray-100 p-2.5 rounded-md">
              <option value="">Seleccione Proceso</option>
              {WELDING_PROCESSES_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="material-select" className="block text-sm font-medium text-gray-300 mb-1">Material</label>
            <select id="material-select" value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)} className="w-full bg-gray-600 border-gray-500 text-gray-100 p-2.5 rounded-md">
              <option value="">Seleccione Material</option>
              {MATERIAL_TYPES_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="md:self-end">
            <Button onClick={handleSuggestionRequest} isLoading={isLoading} disabled={isLoading || !selectedMaterial || !selectedProcess} className="w-full">
              Obtener Sugerencia
            </Button>
          </div>
        </div>
        {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
        {isLoading && <div className="flex justify-center my-4"><LoadingSpinner text="Consultando IA..."/></div>}
        {aiSuggestion && !isLoading && (
          <div className="mt-4 p-4 bg-gray-600 rounded-md">
            <h4 className="text-md font-semibold text-orange-300 mb-2">Recomendación de la IA:</h4>
            <FormattedResponse text={aiSuggestion} />
          </div>
        )}
      </div>

      {/* Manual Consumables List */}
      <h3 className="text-2xl font-semibold text-gray-100 mb-4">Catálogo de Consumibles Comunes</h3>
      <div className="mb-6 flex flex-wrap gap-2">
        {consumableTypes.map(type => (
          <Button 
            key={type} 
            onClick={() => setActiveFilter(type)}
            variant={activeFilter === type ? 'primary' : 'secondary'}
            size="sm"
          >
            {type === 'all' ? 'Todos' : type}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConsumables.map(consumable => (
          <div key={consumable.name} className="bg-gray-700 p-4 rounded-lg shadow-md">
            {/* Image removed */}
            {/* {consumable.image && <img src={consumable.image} alt={consumable.name} className="w-full h-32 object-contain rounded-md mb-3 bg-white p-1"/>} */}
            <h4 className="text-lg font-semibold text-orange-400 mb-1">{consumable.name}</h4>
            <p className="text-xs text-gray-500 uppercase mb-1">{consumable.type}</p>
            <p className="text-sm text-gray-300 mb-2">{consumable.description}</p>
            <p className="text-xs text-gray-400"><strong>Usos Comunes:</strong> {consumable.commonUses}</p>
          </div>
        ))}
        {filteredConsumables.length === 0 && activeFilter !== 'all' && (
             <p className="text-gray-400 md:col-span-2 lg:col-span-3 text-center py-6">No hay consumibles en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default ConsumablesGuide;