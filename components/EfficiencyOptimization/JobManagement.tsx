
import React, { useState, useEffect, useCallback } from 'react';
import type { WeldingJob, WeldingParameters } from '../../types';
import { WeldingProcess, MaterialType } from '../../types'; // Enums for dropdowns
import { WELDING_PROCESSES_OPTIONS, MATERIAL_TYPES_OPTIONS, JOINT_TYPES_OPTIONS } from '../../constants';
import Button from '../common/Button';

const JobManagement: React.FC = () => {
  const [jobs, setJobs] = useState<WeldingJob[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<Partial<WeldingJob>>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedJobs = localStorage.getItem('weldifyJobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  const saveJobsToLocalStorage = useCallback((updatedJobs: WeldingJob[]) => {
    localStorage.setItem('weldifyJobs', JSON.stringify(updatedJobs));
  }, []);

  const openModal = (jobToEdit?: WeldingJob) => {
    if (jobToEdit) {
      setCurrentJob(jobToEdit);
      setIsEditing(true);
    } else {
      setCurrentJob({
        name: '',
        parameters: { 
            process: WELDING_PROCESSES_OPTIONS[0].value as WeldingProcess, // Default
            material: MATERIAL_TYPES_OPTIONS[0].value as MaterialType, // Default
            thickness: 3, 
            jointType: JOINT_TYPES_OPTIONS[0].value,
        }, 
        notes: '' 
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentJob({});
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('param.')) {
      const paramName = name.split('.')[1] as keyof WeldingParameters;
      setCurrentJob(prev => ({
        ...prev,
        parameters: {
          ...prev.parameters,
          [paramName]: (paramName === 'thickness' || paramName === 'amperage' || paramName === 'voltage' || paramName === 'wireSpeed') 
                       ? parseFloat(value) 
                       : value,
        }
      }));
    } else {
      setCurrentJob(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitJob = () => {
    if (!currentJob.name?.trim()) {
      alert("El nombre del trabajo es obligatorio.");
      return;
    }

    let updatedJobs;
    if (isEditing && currentJob.id) {
      updatedJobs = jobs.map(job => job.id === currentJob.id ? { ...job, ...currentJob } as WeldingJob : job);
    } else {
      const newJob: WeldingJob = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...currentJob,
        name: currentJob.name!, // Name is validated
        parameters: currentJob.parameters || {},
      };
      updatedJobs = [...jobs, newJob];
    }
    setJobs(updatedJobs);
    saveJobsToLocalStorage(updatedJobs);
    closeModal();
  };

  const deleteJob = (jobId: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este trabajo?")) {
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
      saveJobsToLocalStorage(updatedJobs);
    }
  };

  return (
    <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-500">Gestión de Trabajos (Jobs)</h2>
        <Button onClick={() => openModal()} variant="primary">
          Nuevo Trabajo
        </Button>
      </div>
      <p className="text-gray-300 mb-8">
        Guarde y gestione sus configuraciones de parámetros de soldadura (Jobs) para un acceso rápido y optimización de sus tareas. Los datos se guardan localmente en su navegador.
      </p>

      {jobs.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No hay trabajos guardados. ¡Cree uno nuevo para empezar!</p>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-gray-700 p-4 rounded-md shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-orange-400">{job.name}</h3>
                  <p className="text-xs text-gray-500">Creado: {new Date(job.createdAt).toLocaleDateString()}</p>
                  <div className="mt-2 text-sm text-gray-300">
                    <p><strong>Proceso:</strong> {job.parameters.process}</p>
                    <p><strong>Material:</strong> {job.parameters.material}, {job.parameters.thickness}mm</p>
                    {job.parameters.amperage && <p><strong>Amperaje:</strong> {job.parameters.amperage}A</p>}
                    {job.parameters.voltage && <p><strong>Voltaje:</strong> {job.parameters.voltage}V</p>}
                    {job.notes && <p className="mt-1"><strong>Notas:</strong> {job.notes}</p>}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                  <Button onClick={() => openModal(job)} size="sm" variant="secondary">Editar</Button>
                  <Button onClick={() => deleteJob(job.id)} size="sm" variant="danger">Eliminar</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para Crear/Editar Trabajo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-orange-500 mb-6">{isEditing ? 'Editar Trabajo' : 'Nuevo Trabajo'}</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="jobName" className="block text-sm font-medium text-gray-300">Nombre del Trabajo *</label>
                <input type="text" name="name" id="jobName" value={currentJob.name || ''} onChange={handleInputChange} required className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-200 pt-2 border-t border-gray-700">Parámetros:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm text-gray-300">Proceso</label>
                    <select name="param.process" value={currentJob.parameters?.process || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md">
                        {WELDING_PROCESSES_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm text-gray-300">Material</label>
                    <select name="param.material" value={currentJob.parameters?.material || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md">
                        {MATERIAL_TYPES_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm text-gray-300">Espesor (mm)</label>
                    <input type="number" name="param.thickness" value={currentJob.parameters?.thickness || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                 </div>
                 <div>
                    <label className="block text-sm text-gray-300">Tipo de Unión</label>
                     <select name="param.jointType" value={currentJob.parameters?.jointType || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md">
                        {JOINT_TYPES_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm text-gray-300">Amperaje (A)</label>
                    <input type="number" name="param.amperage" value={currentJob.parameters?.amperage || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                 </div>
                 <div>
                    <label className="block text-sm text-gray-300">Voltaje (V)</label>
                    <input type="number" name="param.voltage" value={currentJob.parameters?.voltage || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"/>
                 </div>
              </div>

              <div>
                <label htmlFor="jobNotes" className="block text-sm font-medium text-gray-300">Notas Adicionales</label>
                <textarea name="notes" id="jobNotes" rows={3} value={currentJob.notes || ''} onChange={handleInputChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md"></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button onClick={closeModal} variant="secondary">Cancelar</Button>
              <Button onClick={handleSubmitJob} variant="primary">{isEditing ? 'Guardar Cambios' : 'Crear Trabajo'}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManagement;
