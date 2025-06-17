import React from 'react';

interface ErgonomicTipProps {
  title: string;
  advice: string[];
  imageUrl?: string; // Kept optional as it might be used later, but not rendered now
}

const ErgonomicTipCard: React.FC<ErgonomicTipProps> = ({ title, advice, imageUrl }) => (
  <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
    {/* {imageUrl && <img src={imageUrl} alt={title} className="w-full h-48 object-cover"/>} */}
    <div className="p-6">
      <h3 className="text-xl font-semibold text-orange-400 mb-3">{title}</h3>
      <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
        {advice.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  </div>
);

const ErgonomicsGuide: React.FC = () => {
  const postureAdvice: ErgonomicTipProps = {
    title: "Posturas Correctas en Soldadura",
    advice: [
      "Mantenga la espalda recta y evite encorvarse. Use la altura de la mesa de trabajo a su favor.",
      "Alterne posturas siempre que sea posible para evitar la fatiga en un solo grupo muscular.",
      "Para soldadura horizontal: Colóquese de manera que pueda ver la unión claramente sin forzar el cuello. Apoye los brazos si es posible.",
      "Para soldadura vertical: Intente mantener el cuerpo alineado. Use andamios o plataformas estables si es necesario.",
      "Para soldadura sobre cabeza: Minimice el tiempo en esta posición. Use soportes y asegúrese de que el EPI proteja completamente de chispas.",
      "Para espacios confinados: Planifique la entrada y salida. Asegure ventilación y posturas que permitan una evacuación rápida si es necesario."
    ],
    // imageUrl: "https://picsum.photos/seed/welder-correct-posture-at-metal-workbench/600/300" // Removed
  };

  const equipmentAdvice: ErgonomicTipProps = {
    title: "Equipos Ergonómicos Recomendados",
    advice: [
      "Utilice rodilleras si debe arrodillarse frecuentemente para reducir la presión sobre las rodillas.",
      "Considere cinturones lumbares de apoyo si levanta objetos pesados o mantiene posturas forzadas por periodos prolongados, aunque su efectividad es debatida y no sustituyen una buena técnica de levantamiento.",
      "Use caretas de soldar ligeras y bien equilibradas para reducir la tensión en el cuello.",
      "Mangos de herramientas ergonómicos pueden reducir la fatiga en las manos y muñecas.",
      "Mesas de trabajo ajustables en altura pueden mejorar significativamente la postura."
    ],
    // imageUrl: "https://picsum.photos/seed/ergonomic-stool-at-metal-fabrication-station/600/300" // Removed
  };
  
  const exerciseAdvice: ErgonomicTipProps = {
    title: "Ejercicios de Estiramiento y Pausas",
    advice: [
      "Realice pausas cortas y frecuentes (ej. 5 minutos cada hora) en lugar de pocas pausas largas.",
      "Estire el cuello: incline la cabeza suavemente de lado a lado y de adelante hacia atrás.",
      "Estire los hombros: rote los hombros hacia adelante y hacia atrás.",
      "Estire la espalda: entrelace los dedos detrás de la cabeza y arquee suavemente la espalda, o inclínese hacia adelante desde la cintura con las rodillas ligeramente flexionadas.",
      "Estire las muñecas y antebrazos: extienda los brazos y flexione/extienda las muñecas; rote las muñecas.",
      "Camine un poco durante las pausas para mejorar la circulación."
    ],
    // imageUrl: "https://picsum.photos/seed/welder-stretching-in-metal-workshop/600/300" // Removed
  };

  return (
    <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-orange-500 mb-2">Guía de Ergonomía en Soldadura</h2>
      <p className="text-gray-300 mb-8">
        La ergonomía es crucial para prevenir lesiones musculoesqueléticas y mejorar la comodidad y eficiencia del soldador. Siga estas recomendaciones para un trabajo más seguro y saludable.
      </p>
      <div className="space-y-8">
        <ErgonomicTipCard {...postureAdvice} />
        <ErgonomicTipCard {...equipmentAdvice} />
        <ErgonomicTipCard {...exerciseAdvice} />
      </div>
      <div className="mt-8 p-4 bg-gray-700 rounded-md">
        <h3 className="text-xl font-semibold text-orange-400 mb-2">Principios Ergonómicos Clave:</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
          <li><strong>Trabaje en la zona de confort:</strong> Mantenga el trabajo cerca del cuerpo para evitar estiramientos excesivos.</li>
          <li><strong>Reduzca la fuerza excesiva:</strong> Use herramientas mecánicas de ayuda cuando sea posible.</li>
          <li><strong>Minimice movimientos repetitivos:</strong> Varíe las tareas y tome descansos.</li>
          <li><strong>Mantenga una buena postura:</strong> Evite posturas incómodas o estáticas prolongadas.</li>
          <li><strong>Organice su espacio de trabajo:</strong> Tenga herramientas y materiales al alcance fácil.</li>
        </ul>
      </div>
    </div>
  );
};

export default ErgonomicsGuide;