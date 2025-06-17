
import React, { useState, useCallback } from 'react';
import { getWeldingParametersSuggestion } from '../../services/geminiService';
import type { WeldingParameters } from '../../types';
import { WeldingProcess, MaterialType } from '../../types';
import { WELDING_PROCESSES_OPTIONS, MATERIAL_TYPES_OPTIONS, JOINT_TYPES_OPTIONS } from '../../constants';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';

// Helper component for markdown-like rendering
const FormattedResponse: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split(/\\n|\n/); // Use regex to split by \n or \\n
  
  // Basic markdown-like formatting
  const formattedLines = lines.map(line => {
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');       // Italic
    if (line.startsWith('### ')) {
      return `<h3 class="text-xl font-semibold mt-4 mb-2 text-orange-400">${line.substring(4)}</h3>`;
    }
    if (line.startsWith('## ')) {
      return `<h2 class="text-2xl font-semibold mt-6 mb-3 text-orange-500">${line.substring(3)}</h2>`;
    }
    if (line.startsWith('* ')) { // Unordered list item
       return `<li class="ml-4 list-disc">${line.substring(2)}</li>`;
    }
    if (line.match(/^\d+\.\s/)) { // Ordered list item (e.g., "1. Item")
      return `<li class="ml-4 list-decimal">${line.substring(line.indexOf(' ') + 1)}</li>`;
    }
    return line;
  });

  // Wrap list items in <ul> or <ol>
  let inList = false;
  let listTag = 'ul'; // default to unordered
  const finalOutput = formattedLines.reduce((acc, line) => {
    const isListItem = line.includes("<li");
    const isOrderedListItem = line.includes('list-decimal');

    if (isListItem) {
      if (!inList) {
        listTag = isOrderedListItem ? 'ol' : 'ul';
        acc.push(`<${listTag}>`);
        inList = true;
      }
      acc.push(line);
    } else {
      if (inList) {
        acc.push(`</${listTag}>`);
        inList = false;
      }
      acc.push(line);
    }
    return acc;
  }, [] as string[]);

  if (inList) {
    finalOutput.push(`</${listTag}>`);
  }
  
  return <div className="prose prose-sm prose-invert max-w-none break-words" dangerouslySetInnerHTML={{ __html: finalOutput.join('<br />').replace(/<br \/>(<(ul|ol)>)/g, '$1').replace(/(<\/(ul|ol)>)<br \/>/g, '$1') }} />;
};


const ParameterAssistant: React.FC = () => {
  const [params, setParams] = useState<WeldingParameters>({
    process: undefined,
    material: undefined,
    thickness: 1, // Default thickness
    jointType: JOINT_TYPES_OPTIONS[0].value,
  });
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: name === 'thickness' || name === 'electrodeDiameter' || name === 'wireDiameter' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.process || !params.material || !params.thickness) {
      setError("Por favor, complete todos los campos obligatorios: Proceso, Material y Espesor.");
      return;
    }
    setError('');
    setIsLoading(true);
    setSuggestion('');
    try {
      const result = await getWeldingParametersSuggestion(params);
      setSuggestion(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido.";
      setError(`Error al obtener sugerencia: ${errorMessage}`);
      setSuggestion(''); // Clear previous suggestion on new error
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Asistente Inteligente de Parámetros</h2>
      <p className="text-gray-300 mb-6">
        Proporcione los detalles de su trabajo de soldadura y la IA le sugerirá los parámetros de inicio.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="process" className="block text-sm font-medium text-gray-300 mb-1">Proceso de Soldadura *</label>
            <select
              id="process"
              name="process"
              value={params.process || ''}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="" disabled>Seleccione un proceso</option>
              {WELDING_PROCESSES_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-300 mb-1">Material Base *</label>
            <select
              id="material"
              name="material"
              value={params.material || ''}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="" disabled>Seleccione un material</option>
              {MATERIAL_TYPES_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="thickness" className="block text-sm font-medium text-gray-300 mb-1">Espesor del Material (mm) *</label>
            <input
              type="number"
              id="thickness"
              name="thickness"
              value={params.thickness || ''}
              onChange={handleChange}
              min="0.1"
              step="0.1"
              required
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="jointType" className="block text-sm font-medium text-gray-300 mb-1">Tipo de Unión</label>
            <select
              id="jointType"
              name="jointType"
              value={params.jointType || ''}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="" disabled>Seleccione un tipo de unión</option>
              {JOINT_TYPES_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="electrodeDiameter" className="block text-sm font-medium text-gray-300 mb-1">Diámetro Electrodo/Hilo (mm)</label>
            <input
              type="number"
              id="electrodeDiameter"
              name="electrodeDiameter" // Can be wire or electrode
              value={params.electrodeDiameter || params.wireDiameter || ''}
              onChange={handleChange}
              min="0.1"
              step="0.1"
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
           <div>
            <label htmlFor="gasType" className="block text-sm font-medium text-gray-300 mb-1">Gas Protector (si aplica)</label>
            <input
              type="text"
              id="gasType"
              name="gasType"
              value={params.gasType || ''}
              onChange={handleChange}
              placeholder="Ej: Argón, CO2, Ar/CO2 80/20"
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        
        {error && <p className="text-sm text-red-400 bg-red-900_border border-red-700 p-3 rounded-md">{error}</p>}

        <Button type="submit" isLoading={isLoading} disabled={isLoading} variant="primary" size="lg">
          {isLoading ? 'Obteniendo Sugerencia...' : 'Obtener Sugerencia de IA'}
        </Button>
      </form>

      {suggestion && !isLoading && (
        <div className="mt-8 p-6 bg-gray-700 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">Sugerencia de Parámetros:</h3>
          <FormattedResponse text={suggestion} />
        </div>
      )}
      {isLoading && !suggestion && (
         <div className="mt-8 flex justify-center">
            <LoadingSpinner text="Consultando a la IA..." />
         </div>
      )}
    </div>
  );
};

export default ParameterAssistant;
