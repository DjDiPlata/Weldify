
import React, { useState, useEffect } from 'react';
import type { SafetyChecklistItem } from '../../types';
import Button from '../common/Button';

const initialChecklistItems: SafetyChecklistItem[] = [
  // EPI
  { id: 'epi1', text: 'Careta de soldar en buen estado y con filtro adecuado', category: 'EPI', details: 'Verificar que el cristal no esté roto o rayado y que el auto-oscurecimiento funcione (si aplica).' },
  { id: 'epi2', text: 'Guantes de soldador sin agujeros ni quemaduras excesivas', category: 'EPI', details: 'Asegurar que cubran muñecas y parte de antebrazos.' },
  { id: 'epi3', text: 'Ropa ignífuga (delantal, chaqueta, pantalones) cubriendo toda la piel', category: 'EPI', details: 'Evitar ropa sintética que pueda derretirse. No usar ropa con aceite o grasa.' },
  { id: 'epi4', text: 'Botas de seguridad con puntera protectora', category: 'EPI', details: 'Deben ser de cuero o material resistente.' },
  { id: 'epi5', text: 'Gafas de seguridad (si se requiere bajo la careta o para esmerilado)', category: 'EPI' },
  { id: 'epi6', text: 'Protección respiratoria adecuada si se sueldan materiales tóxicos (galvanizado, inox, etc.)', category: 'EPI', details: 'Consultar FDS del material. Asegurar buen ajuste del respirador.' },
  // Entorno de Trabajo
  { id: 'env1', text: 'Área de trabajo libre de materiales combustibles o inflamables (mínimo 10 metros)', category: 'Entorno', details: 'Incluye líquidos, trapos, papel, madera, etc.' },
  { id: 'env2', text: 'Buena ventilación (natural o forzada) para dispersar humos', category: 'Entorno', details: 'Especialmente importante en espacios confinados o con materiales tóxicos.' },
  { id: 'env3', text: 'Extintor de incendios adecuado y accesible cerca', category: 'Entorno', details: 'Clase ABC es común, pero verificar compatibilidad.' },
  { id: 'env4', text: 'Conexión a tierra de la máquina de soldar correcta y segura', category: 'Equipo', details: 'Pinza de masa bien sujeta a la pieza de trabajo o mesa metálica limpia.' },
  { id: 'env5', text: 'Cables de soldadura en buen estado (sin cortes ni aislamiento dañado)', category: 'Equipo', details: 'Evitar enrollamientos excesivos que puedan sobrecalentarse.' },
  { id: 'env6', text: 'Iluminación adecuada del área de trabajo', category: 'Entorno' },
  { id: 'env7', text: 'Suelo seco y libre de obstáculos para evitar resbalones y caídas', category: 'Entorno' },
  // Material y Proceso
  { id: 'mat1', text: 'Material a soldar identificado y FDS consultada si es necesario (especialmente para aleaciones, recubrimientos)', category: 'Material', details: 'Conocer los riesgos específicos de humos (ej. Cromo VI en inox, Zinc en galvanizado).' },
  { id: 'mat2', text: 'Superficies a soldar limpias (sin óxido, pintura, grasa, humedad)', category: 'Material', details: 'La contaminación puede generar humos peligrosos y defectos en la soldadura.' },
  { id: 'mat3', text: 'Procedimiento de soldadura (WPS) conocido y entendido (si aplica)', category: 'Proceso' },
  { id: 'mat4', text: 'Parámetros de la máquina de soldar ajustados según el trabajo', category: 'Equipo' },
];

const SafetyChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load saved checklist state from local storage
    const savedState = localStorage.getItem('weldifySafetyChecklist');
    if (savedState) {
      setCheckedItems(JSON.parse(savedState));
    }
  }, []);

  const handleCheckboxChange = (itemId: string) => {
    const newCheckedItems = { ...checkedItems, [itemId]: !checkedItems[itemId] };
    setCheckedItems(newCheckedItems);
    localStorage.setItem('weldifySafetyChecklist', JSON.stringify(newCheckedItems));
  };

  const toggleDetails = (itemId: string) => {
    setShowDetails(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };
  
  const resetChecklist = () => {
    setCheckedItems({});
    localStorage.removeItem('weldifySafetyChecklist');
  };

  const allChecked = initialChecklistItems.length > 0 && initialChecklistItems.every(item => checkedItems[item.id]);

  const itemsByCategory = initialChecklistItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, SafetyChecklistItem[]>);

  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-2">Lista de Verificación de Seguridad Pre-Trabajo</h2>
      <p className="text-gray-300 mb-6">
        Complete esta lista antes de comenzar cualquier operación de soldadura para asegurar un entorno de trabajo seguro.
      </p>

      {Object.entries(itemsByCategory).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold text-orange-400 border-b border-gray-700 pb-2 mb-4">{category}</h3>
          <ul className="space-y-3">
            {items.map(item => (
              <li key={item.id} className="p-3 bg-gray-700 rounded-md shadow">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={!!checkedItems[item.id]}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="h-5 w-5 rounded text-orange-600 bg-gray-600 border-gray-500 focus:ring-orange-500 mt-0.5 mr-3 flex-shrink-0"
                  />
                  <label htmlFor={item.id} className={`flex-grow text-sm ${checkedItems[item.id] ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                    {item.text}
                  </label>
                  {item.details && (
                    <button 
                      onClick={() => toggleDetails(item.id)} 
                      className="ml-2 text-xs text-orange-400 hover:text-orange-300 flex-shrink-0"
                      aria-label={`Mostrar detalles para ${item.text}`}
                    >
                      {showDetails[item.id] ? 'Ocultar' : 'Detalles'}
                    </button>
                  )}
                </div>
                {item.details && showDetails[item.id] && (
                  <p className="mt-2 ml-8 text-xs text-gray-400 bg-gray-600 p-2 rounded-md">{item.details}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button onClick={resetChecklist} variant="secondary" size="md">
            Reiniciar Lista
        </Button>
        {allChecked ? (
          <div className="flex items-center p-3 rounded-md bg-green-700 text-green-100">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.06 0l4.002-5.5a.75.75 0 00-.163-1.214z" clipRule="evenodd" />
            </svg>
            ¡Todo verificado! Listo para soldar de forma segura.
          </div>
        ) : (
          <div className="flex items-center p-3 rounded-md bg-yellow-700 text-yellow-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Aún quedan ítems por verificar.
          </div>
        )}
      </div>
    </div>
  );
};

export default SafetyChecklist;
