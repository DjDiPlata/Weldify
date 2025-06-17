
import React, { useState, useCallback } from 'react';
import { getGeneralWeldingInfo } from '../../services/geminiService';
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


interface Tutorial {
  id: string;
  title: string;
  category: string;
  summary: string;
  content?: string; // Full content for a dedicated page, or link to video
  videoUrl?: string;
}

const tutorials: Tutorial[] = [
  { 
    id: 'tig-aluminum', 
    title: 'Introducción a la Soldadura TIG en Aluminio', 
    category: 'TIG', 
    summary: 'Conceptos básicos, preparación y técnicas para soldar aluminio con TIG.', 
    videoUrl: 'https://www.youtube.com/watch?v=KD8z39yAYHM&t=191s' 
  },
  { 
    id: 'smaw-electrodes', 
    title: 'Selección de Electrodos para SMAW (Electrodo Revestido)', 
    category: 'SMAW', 
    summary: 'Entiende los diferentes tipos de electrodos (E6010, E6013, E7018) y sus aplicaciones.', 
    content: 'Contenido detallado sobre la clasificación AWS de electrodos, tipos de revestimiento, polaridad y técnicas de uso para cada tipo principal.',
    videoUrl: 'https://www.youtube.com/watch?v=lh359GRf-fI&t=546s'
  },
  { 
    id: 'mig-setup', 
    title: 'Configuración Básica de una Máquina MIG/MAG', 
    category: 'MIG/MAG', 
    summary: 'Pasos para conectar el gas, instalar el hilo, y ajustar los parámetros iniciales.', 
    videoUrl: 'https://www.youtube.com/watch?v=nfIHhYjOmhQ' 
  },
  { 
    id: 'safety-fumes', 
    title: 'Peligros de los Humos de Soldadura y Protección', 
    category: 'Seguridad', 
    summary: 'Identifica los riesgos asociados a los humos de soldadura y cómo protegerte eficazmente.', 
    content: 'Explicación sobre los componentes de los humos, riesgos para la salud (fiebre del metal, problemas respiratorios crónicos), y tipos de protección respiratoria.',
    videoUrl: 'https://www.youtube.com/watch?v=bkekJmpzsEA'
  },
  { 
    id: 'sharpen-tungsten', 
    title: 'Afilado Correcto de Electrodos de Tungsteno para TIG', 
    category: 'TIG', 
    summary: 'Técnicas y recomendaciones para afilar tungsteno según el material y tipo de corriente.', 
    videoUrl: 'https://www.youtube.com/watch?v=802kLmegAnc&t=1s' 
  },
];


const TutorialsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuestionSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError("Por favor, escriba su pregunta.");
      return;
    }
    setError('');
    setIsLoading(true);
    setAnswer('');
    try {
      const result = await getGeneralWeldingInfo(question);
      setAnswer(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocurrió un error desconocido.";
      setError(`Error al obtener respuesta: ${errorMessage}`);
      setAnswer('');
    } finally {
      setIsLoading(false);
    }
  }, [question]);

  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-6">Tutoriales y Aprendizaje</h2>
      
      {/* Sección de Búsqueda de Tutoriales */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar tutoriales (ej: TIG aluminio, electrodos)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredTutorials.map(tutorial => (
          <div key={tutorial.id} className="bg-gray-700 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-semibold text-orange-400 mb-2">{tutorial.title}</h3>
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">{tutorial.category}</p>
            <p className="text-sm text-gray-300 mb-3">{tutorial.summary}</p>
            {tutorial.videoUrl && (
              <a href={tutorial.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-orange-500 hover:text-orange-400 font-medium">
                Ver Video Tutorial &rarr;
              </a>
            )}
            {tutorial.content && !tutorial.videoUrl && (
               <p className="text-sm text-gray-400 italic">(Contenido disponible en la app)</p> // Placeholder for navigation to full content
            )}
          </div>
        ))}
        {filteredTutorials.length === 0 && (
          <p className="text-gray-400 md:col-span-2 lg:col-span-3 text-center">No se encontraron tutoriales que coincidan con su búsqueda.</p>
        )}
      </div>

      {/* Sección de Preguntas y Respuestas con IA */}
      <div className="mt-10 pt-8 border-t border-gray-700">
        <h3 className="text-2xl font-bold text-orange-500 mb-4">Pregunte al Experto IA de Weldify</h3>
        <p className="text-gray-300 mb-6">
          ¿Tiene alguna pregunta específica sobre soldadura? Escríbala aquí y nuestro asistente de IA intentará ayudarle.
        </p>
        <form onSubmit={handleQuestionSubmit} className="space-y-4">
          <div>
            <textarea
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ej: ¿Cuál es la diferencia entre polaridad DCEP y DCEN en SMAW?"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" isLoading={isLoading} disabled={isLoading} variant="primary">
            {isLoading ? 'Obteniendo Respuesta...' : 'Enviar Pregunta'}
          </Button>
        </form>

        {answer && !isLoading && (
          <div className="mt-6 p-5 bg-gray-700 rounded-lg shadow">
            <h4 className="text-lg font-semibold text-orange-400 mb-3">Respuesta de la IA:</h4>
            <FormattedResponse text={answer} />
          </div>
        )}
        {isLoading && !answer && (
          <div className="mt-6 flex justify-center">
            <LoadingSpinner text="Consultando a la IA..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsPage;