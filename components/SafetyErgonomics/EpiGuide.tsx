import React from 'react';

interface EpiItemProps {
  name: string;
  description: string;
  // imageUrl?: string; // Removed
  importance: string[];
}

const EpiItemCard: React.FC<EpiItemProps> = ({ name, description, importance }) => (
  <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    {/* Image removed */}
    <div className="p-6 flex-1">
      <h3 className="text-xl font-semibold text-orange-500 mb-2">{name}</h3>
      <p className="text-gray-300 mb-3 text-sm">{description}</p>
      <h4 className="text-md font-semibold text-gray-200 mb-1">Importancia:</h4>
      <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
        {importance.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  </div>
);

const EpiGuide: React.FC = () => {
  const epiItems: EpiItemProps[] = [
    {
      name: "Careta de Soldar con Filtro Auto-oscurecible",
      description: "Protege los ojos y la cara de la radiación UV/IR, chispas y salpicaduras. Los filtros auto-oscurecibles se ajustan automáticamente a la intensidad del arco.",
      // imageUrl: "https://picsum.photos/seed/welding-helmet-on-steel-workbench/400/300", // Removed
      importance: [
        "Previene quemaduras en la retina ('ojo de arco').",
        "Protege contra impactos de partículas.",
        "Reduce la fatiga visual al no tener que levantar la careta constantemente."
      ]
    },
    {
      name: "Guantes de Soldador (Cuero Resistente al Calor)",
      description: "Guantes gruesos, generalmente de cuero, que protegen las manos y antebrazos del calor extremo, chispas, metal caliente y radiación.",
      importance: [
        "Evitan quemaduras por contacto y radiación.",
        "Proporcionan agarre para manipular herramientas y piezas calientes.",
        "Protegen contra cortes y abrasiones."
      ]
    },
    {
      name: "Ropa Ignífuga (Delantal, Chaqueta, Pantalones)",
      description: "Vestimenta hecha de materiales resistentes al fuego y al calor, como cuero o algodón tratado, para proteger el cuerpo de quemaduras y chispas.",
      importance: [
        "Cubre la piel expuesta para prevenir quemaduras.",
        "Resiste la ignición por chispas o metal fundido.",
        "Debe cubrir completamente, sin dejar huecos entre prendas."
      ]
    },
    {
      name: "Botas de Seguridad con Puntera de Acero",
      description: "Calzado robusto, preferiblemente de cuero, con puntera reforzada para proteger los pies de objetos pesados que puedan caer y de chispas.",
      // imageUrl: "https://picsum.photos/seed/steel-toe-boots-on-metal-floor/400/300", // Removed
      importance: [
        "Protegen contra impactos y aplastamientos.",
        "Aíslan del calor y las chispas en el suelo.",
        "Suela antideslizante para mayor seguridad."
      ]
    },
    {
      name: "Gafas de Seguridad (Debajo de la Careta)",
      description: "Gafas de seguridad transparentes que se usan debajo de la careta para proteger los ojos de partículas cuando la careta está levantada (ej. al esmerilar o limpiar).",
      // imageUrl: "https://picsum.photos/seed/safety-goggles-reflecting-metal-shine/400/300", // Removed
      importance: [
        "Protección ocular primaria durante tareas auxiliares.",
        "Evitan que escoria o partículas entren en los ojos.",
      ]
    },
    {
      name: "Protección Respiratoria (Mascarillas o Respiradores)",
      description: "Esencial cuando se sueldan materiales que producen humos tóxicos (ej. acero galvanizado, inoxidable, aluminio). Varían desde mascarillas desechables hasta respiradores con filtros específicos.",
      importance: [
        "Previene la inhalación de humos metálicos peligrosos.",
        "Protege contra enfermedades respiratorias a largo plazo.",
        "Tipo de filtro depende del material soldado y contaminantes presentes."
      ]
    }
  ];

  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-2">Guía de Equipo de Protección Personal (EPI)</h2>
      <p className="text-gray-300 mb-8">
        El uso correcto del EPI es fundamental para garantizar su seguridad durante cualquier trabajo de soldadura. Conozca los elementos esenciales y su importancia.
      </p>
      <div className="space-y-8">
        {epiItems.map(item => (
          <EpiItemCard key={item.name} {...item} />
        ))}
      </div>
       <div className="mt-8 p-4 bg-gray-700 rounded-md">
        <h3 className="text-xl font-semibold text-orange-400 mb-2">Recordatorios Generales de Seguridad con EPI:</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
          <li>Inspeccione siempre su EPI antes de cada uso en busca de daños.</li>
          <li>Asegúrese de que el EPI se ajuste correctamente y sea del tamaño adecuado.</li>
          <li>Reemplace el EPI dañado o desgastado inmediatamente.</li>
          <li>No modifique su EPI, ya que podría comprometer su capacidad de protección.</li>
          <li>Consulte las fichas de datos de seguridad (FDS/SDS) de los materiales que va a soldar para conocer los riesgos específicos y el EPI recomendado.</li>
        </ul>
      </div>
    </div>
  );
};

export default EpiGuide;