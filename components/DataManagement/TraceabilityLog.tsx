
import React, { useState, useEffect, useCallback } from 'react';
import Button from '../common/Button';

interface LogEntry {
  id: string;
  timestamp: string;
  componentId: string;
  serialNumber?: string;
  weldId: string;
  welderId: string;
  wpsUsed?: string; // Welding Procedure Specification
  parametersSummary: string; // e.g., "MIG, Acero Carbono, 120A, 20V"
  notes?: string;
}

const TraceabilityLog: React.FC = () => {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<LogEntry>>({});

  useEffect(() => {
    const storedLogs = localStorage.getItem('weldifyTraceabilityLog');
    if (storedLogs) {
      setLogEntries(JSON.parse(storedLogs));
    }
  }, []);

  const saveLogsToLocalStorage = useCallback((updatedLogs: LogEntry[]) => {
    localStorage.setItem('weldifyTraceabilityLog', JSON.stringify(updatedLogs));
  }, []);

  const openModal = () => {
    setCurrentEntry({
      timestamp: new Date().toISOString().slice(0, 16), // Default to now, for datetime-local
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEntry({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitLog = () => {
    if (!currentEntry.componentId?.trim() || !currentEntry.weldId?.trim() || !currentEntry.welderId?.trim()) {
      alert("Los campos ID Componente, ID Soldadura y ID Soldador son obligatorios.");
      return;
    }
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: currentEntry.timestamp || new Date().toISOString(),
      componentId: currentEntry.componentId!,
      serialNumber: currentEntry.serialNumber,
      weldId: currentEntry.weldId!,
      welderId: currentEntry.welderId!,
      wpsUsed: currentEntry.wpsUsed,
      parametersSummary: currentEntry.parametersSummary || "N/A",
      notes: currentEntry.notes,
    };
    const updatedLogs = [newLog, ...logEntries]; // Add to the beginning
    setLogEntries(updatedLogs);
    saveLogsToLocalStorage(updatedLogs);
    closeModal();
  };
  
  const deleteLog = (logId: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar esta entrada del registro?")) {
      const updatedLogs = logEntries.filter(log => log.id !== logId);
      setLogEntries(updatedLogs);
      saveLogsToLocalStorage(updatedLogs);
    }
  };


  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-500">Registro de Trazabilidad Digital</h2>
        <Button onClick={openModal} variant="primary">
          Nueva Entrada
        </Button>
      </div>
      <p className="text-gray-300 mb-8">
        Registre y gestione datos de trazabilidad para sus componentes y soldaduras. Los datos se guardan localmente.
      </p>

      {logEntries.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No hay entradas en el registro. Comience añadiendo una nueva.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-sm text-left text-gray-300">
            <thead className="text-xs text-orange-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-4 py-3">Fecha/Hora</th>
                <th scope="col" className="px-4 py-3">ID Componente</th>
                <th scope="col" className="px-4 py-3">ID Soldadura</th>
                <th scope="col" className="px-4 py-3">ID Soldador</th>
                <th scope="col" className="px-4 py-3">Parámetros</th>
                <th scope="col" className="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {logEntries.map(entry => (
                <tr key={entry.id} className="bg-gray-750 border-b border-gray-700 hover:bg-gray-600">
                  <td className="px-4 py-3">{new Date(entry.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-3">{entry.componentId}{entry.serialNumber ? ` (S/N: ${entry.serialNumber})` : ''}</td>
                  <td className="px-4 py-3">{entry.weldId}</td>
                  <td className="px-4 py-3">{entry.welderId}</td>
                  <td className="px-4 py-3">{entry.parametersSummary} {entry.wpsUsed ? `(WPS: ${entry.wpsUsed})` : ''}</td>
                  <td className="px-4 py-3">
                     <Button onClick={() => deleteLog(entry.id)} size="sm" variant="danger">Eliminar</Button>
                     {/* Placeholder for View/Edit details */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para Nueva Entrada */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Nueva Entrada de Registro</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Fecha y Hora *</label>
                <input type="datetime-local" name="timestamp" value={currentEntry.timestamp || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">ID Componente *</label>
                  <input type="text" name="componentId" value={currentEntry.componentId || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Número de Serie (Opcional)</label>
                  <input type="text" name="serialNumber" value={currentEntry.serialNumber || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">ID Soldadura *</label>
                  <input type="text" name="weldId" value={currentEntry.weldId || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                </div>
                 <div>
                  <label className="block text-sm font-medium text-gray-300">ID Soldador *</label>
                  <input type="text" name="welderId" value={currentEntry.welderId || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">WPS Utilizado (Opcional)</label>
                <input type="text" name="wpsUsed" value={currentEntry.wpsUsed || ''} onChange={handleInputChange} placeholder="Ej: WPS-101 Rev A" className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Resumen de Parámetros *</label>
                <input type="text" name="parametersSummary" value={currentEntry.parametersSummary || ''} onChange={handleInputChange} placeholder="Ej: TIG, Acero Inox, 80A, Ar 15L/min" className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Notas Adicionales</label>
                <textarea name="notes" rows={3} value={currentEntry.notes || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button onClick={closeModal} variant="secondary">Cancelar</Button>
              <Button onClick={handleSubmitLog} variant="primary">Guardar Entrada</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraceabilityLog;
