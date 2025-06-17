import React, { useState, useCallback } from 'react';
import { analyzeWeldingDefect } from '../../services/geminiService';
import { WeldingProcess, MaterialType } from '../../types';
import { WELDING_PROCESSES_OPTIONS, MATERIAL_TYPES_OPTIONS } from '../../constants';
import LoadingSpinner from '../common/LoadingSpinner';
import Button from '../common/Button';

// Re-using FormattedResponse from ParameterAssistant. Ideally, this would be a shared common component.
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


const DefectAnalyzer: React.FC = () => {
  const [defectDescription, setDefectDescription] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const [process, setProcess] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!defectDescription.trim()) {
      setError("Por favor, describa el defecto observado.");
      return;
    }
    setError('');
    setIsLoading(true);
    setAnalysis('');
    try {
      const result = await analyzeWeldingDefect(defectDescription, material, process);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido.";
      setError(`Error al analizar el defecto: ${errorMessage}`);
      setAnalysis('');
    } finally {
      setIsLoading(false);
    }
  }, [defectDescription, material, process]);

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Analizador de Defectos de Soldadura IA</h2>
      <p className="text-gray-300 mb-6">
        Describa el defecto que ha encontrado, junto con el material y proceso utilizado, y la IA le ayudará a identificar causas y soluciones.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="defectDescription" className="block text-sm font-medium text-gray-300 mb-1">Descripción del Defecto *</label>
          <textarea
            id="defectDescription"
            name="defectDescription"
            rows={4}
            value={defectDescription}
            onChange={(e) => setDefectDescription(e.target.value)}
            required
            placeholder="Ej: Porosidad excesiva en el cordón, grietas longitudinales en el centro de la soldadura, socavación en los bordes..."
            className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-300 mb-1">Material Base</label>
            <select
              id="material"
              name="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Seleccione un material (opcional)</option>
              {MATERIAL_TYPES_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="process" className="block text-sm font-medium text-gray-300 mb-1">Proceso de Soldadura</label>
            <select
              id="process"
              name="process"
              value={process}
              onChange={(e) => setProcess(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm p-2.5 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Seleccione un proceso (opcional)</option>
              {WELDING_PROCESSES_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        {error && <p className="text-sm text-red-400 bg-red-900_border border-red-700 p-3 rounded-md">{error}</p>}

        <Button type="submit" isLoading={isLoading} disabled={isLoading} variant="primary" size="lg">
          {isLoading ? 'Analizando Defecto...' : 'Analizar Defecto con IA'}
        </Button>
      </form>

      {analysis && !isLoading && (
        <div className="mt-8 p-6 bg-gray-700 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">Análisis del Defecto:</h3>
          <FormattedResponse text={analysis} />
        </div>
      )}
      {isLoading && !analysis && (
         <div className="mt-8 flex justify-center">
            <LoadingSpinner text="Consultando a la IA..." />
         </div>
      )}
    </div>
  );
};

export default DefectAnalyzer;