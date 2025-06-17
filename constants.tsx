import React from 'react';
import type { AppModule } from './types';

// Placeholder SVG Icons (Heroicons style)
const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

const ShieldCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const AcademicCapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path d="M12 14.25L3.75 9l8.25-5.25 8.25 5.25L12 14.25z" />
    <path d="M3.75 9v6.75A2.25 2.25 0 006 18h12a2.25 2.25 0 002.25-2.25V9" />
    <path d="M15.75 12l-3.75 2.25L8.25 12" />
  </svg>
);

const CogIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15.036+6.364l-1.06-1.06M21.75 7.25l-1.06-1.06m-16.854 9.172l1.06-1.06m14.732-7.052l1.06-1.06M12 6.75V3m0 18v-3.75m-6.364-15.036L7.25 4.25m10.55 16.086L15.75 18.75m-9.528-9.528l-1.06 1.06M18.75 15.75l1.06 1.06" />
  </svg>
);

const MagnifyingGlassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DocumentTextIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const WrenchScrewdriverIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.52-.635 1.425-.835 2.175-.537L20.25 7.5M11.42 15.17L5.625 21m5.795-5.83a1.593 1.593 0 00-2.258 2.258M11.42 15.17l2.175-.537m5.877-5.877L11.42 15.17M3 21l6-6M3 21V11.25A2.25 2.25 0 015.25 9h3.75A2.25 2.25 0 0111.25 11.25V21M3 21h3.75m4.5 0h.008v.008H11.25v-.008zm0 0c.004 0 .008.002.008.006v.005a.009.009 0 01-.008.005H11.25a.01.01 0 01-.008-.006V21.006c0-.003.003-.005.007-.006h.001zm0 0h.008v.008H11.25v-.008zm0 0c.004 0 .008.002.008.006v.005a.009.009 0 01-.008.005H11.25a.01.01 0 01-.008-.006V21.006c0-.003.003-.005.007-.006h.001z" />
  </svg>
);

const BookOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const ClipboardDocumentCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
  </svg>
);

const ViewfinderCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);


export const APP_MODULES_LIST: AppModule[] = [
  {
    id: 'dashboard', name: 'Panel Principal', description: 'Visión general de Weldify.', path: '/dashboard', icon: <HomeIcon className="w-6 h-6" />,
    features: [] // Dashboard is a standalone page
  },
  {
    id: 'safety', name: 'Seguridad y Ergonomía', description: 'Guías, listas de verificación y formación.', path: '/safety', icon: <ShieldCheckIcon className="w-6 h-6" />,
    features: [
      { id: 'epi', name: 'Guía de EPI', description: 'Información sobre Equipos de Protección Individual.', path: '/safety/epi' },
      { id: 'checklist', name: 'Checklist de Seguridad', description: 'Verificaciones previas al trabajo.', path: '/safety/checklist' },
      { id: 'ergonomics', name: 'Guía de Ergonomía', description: 'Posturas correctas y prevención de lesiones.', path: '/safety/ergonomics' },
    ]
  },
  {
    id: 'learning', name: 'Aprendizaje y Habilidades', description: 'Simulador, tutoriales y guías de materiales.', path: '/learning', icon: <AcademicCapIcon className="w-6 h-6" />,
    features: [
      { id: 'simulator', name: 'Simulador de Soldadura (UI)', description: 'Práctica virtual de procesos de soldadura.', path: '/learning/simulator' },
      { id: 'tutorials', name: 'Tutoriales Interactivos', description: 'Guías teóricas, videos y cuestionarios.', path: '/learning/tutorials' },
      { id: 'materials', name: 'Fundamentos de Materiales', description: 'Información sobre diversos materiales.', path: '/learning/materials' },
      { id: 'process-encyclopedia', name: 'Enciclopedia de Procesos', description: 'Detalles sobre procesos de soldadura.', path: '/learning/process-encyclopedia', icon: <BookOpenIcon className="w-5 h-5"/> },
    ]
  },
  {
    id: 'config', name: 'Configuración de Parámetros', description: 'Asistente IA y calculadoras avanzadas.', path: '/config', icon: <CogIcon className="w-6 h-6" />,
    features: [
      { id: 'assistant', name: 'Asistente de Parámetros IA', description: 'Recomendaciones de parámetros por IA.', path: '/config/assistant' },
      { id: 'calculators', name: 'Calculadoras Avanzadas', description: 'Cálculos de soldadura especializados.', path: '/config/calculators' },
    ]
  },
  {
    id: 'defects', name: 'Diagnóstico de Defectos', description: 'Base de datos y análisis de defectos.', path: '/defects', icon: <MagnifyingGlassIcon className="w-6 h-6" />,
    features: [
      { id: 'database', name: 'Base de Datos de Defectos', description: 'Catálogo visual de defectos comunes.', path: '/defects/database' },
      { id: 'analyzer', name: 'Analizador de Defectos IA', description: 'Identifica causas y soluciones con IA.', path: '/defects/analyzer' },
    ]
  },
  {
    id: 'quality', name: 'Control de Calidad', description: 'Guías de inspección y normativas.', path: '/quality', icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />,
    features: [
      { id: 'ndt-guide', name: 'Guía de Ensayos END', description: 'Información sobre Ensayos No Destructivos.', path: '/quality/ndt-guide', icon: <ViewfinderCircleIcon className="w-5 h-5"/> },
    ]
  },
  {
    id: 'efficiency', name: 'Eficiencia y Optimización', description: 'Gestión de trabajos y mantenimiento.', path: '/efficiency', icon: <ClockIcon className="w-6 h-6" />,
    features: [
      { id: 'jobs', name: 'Gestión de Trabajos', description: 'Carga, guarda y edita secuencias de parámetros.', path: '/efficiency/jobs' },
    ]
  },
  {
    id: 'data', name: 'Gestión de Datos', description: 'Trazabilidad, escaneo y lectura de planos.', path: '/data', icon: <DocumentTextIcon className="w-6 h-6" />,
    features: [
      { id: 'log', name: 'Registro de Trazabilidad', description: 'Registra datos de componentes y soldaduras.', path: '/data/log' },
      { id: 'blueprints', name: 'Lectura de Planos', description: 'Tutoriales para entender símbolos de soldadura.', path: '/data/blueprints' },
    ]
  },
  {
    id: 'auxiliary', name: 'Herramientas y Consumibles', description: 'Guías de consumibles y preparación.', path: '/auxiliary', icon: <WrenchScrewdriverIcon className="w-6 h-6" />,
    features: [
      { id: 'consumables', name: 'Guía de Consumibles', description: 'Selección de electrodos, hilos y gases.', path: '/auxiliary/consumables' },
    ]
  },
  {
    id: 'my-story',
    name: '🧡 Mi Historia',
    description: 'El origen de Weldify y agradecimientos.',
    path: '/my-story',
    icon: <HeartIcon className="w-6 h-6" />,
    features: [] // Direct link, no sub-features in sidebar
  }
];

// For easier access in App.tsx routing
export const APP_MODULES = APP_MODULES_LIST.reduce((acc, module) => {
  acc[module.id] = module;
  return acc;
}, {} as Record<string, AppModule>);

export const WELDING_PROCESSES_OPTIONS = [
  { value: "SMAW (Electrodo Revestido / MMA)", label: "SMAW (Electrodo Revestido / MMA)" },
  { value: "GMAW (MIG/MAG)", label: "GMAW (MIG/MAG)" },
  { value: "FCAW (Flux-Cored Arc Welding)", label: "FCAW (Flux-Cored Arc Welding)" },
  { value: "GTAW (TIG)", label: "GTAW (TIG)" },
  { value: "SAW (Arco Sumergido)", label: "SAW (Arco Sumergido)" },
  { value: "PAW (Soldadura por Plasma)", label: "PAW (Soldadura por Plasma)" },
  { value: "LBW (Soldadura Láser)", label: "LBW (Soldadura Láser)" },
  { value: "OAW (Oxicorte/Soldadura Oxiacetilénica)", label: "OAW (Oxicorte/Soldadura Oxiacetilénica)" }
];

export const MATERIAL_TYPES_OPTIONS = [
  { value: "Acero al Carbono", label: "Acero al Carbono" },
  { value: "Acero Inoxidable", label: "Acero Inoxidable" },
  { value: "Aluminio", label: "Aluminio" },
  { value: "Titanio", label: "Titanio" },
  { value: "Hierro Fundido", label: "Hierro Fundido" },
  { value: "Aleaciones de Cobre", label: "Aleaciones de Cobre" },
  { value: "Aleaciones de Níquel", label: "Aleaciones de Níquel" }
];

export const JOINT_TYPES_OPTIONS = [
  { value: "Unión a Tope (Butt Joint)", label: "Unión a Tope (Butt Joint)" },
  { value: "Unión de Solape (Lap Joint)", label: "Unión de Solape (Lap Joint)" },
  { value: "Unión en T (Tee Joint)", label: "Unión en T (Tee Joint)" },
  { value: "Unión de Esquina (Corner Joint)", label: "Unión de Esquina (Corner Joint)" },
  { value: "Unión de Borde (Edge Joint)", label: "Unión de Borde (Edge Joint)" }
];

export const JOINT_TYPE_CALC_OPTIONS: {value: string, label: string}[] = [
    { value: "butt_v", label: "A Tope en V (Bisel Simple)" },
    { value: "fillet", label: "En Ángulo (Filete)" },
    { value: "butt_square", label: "A Tope Cuadrada (Sin Bisel)" },
];
