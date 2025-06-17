
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { WeldingParameters } from '../types';

const API_KEY = process.env.API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash-preview-04-17'; // General text tasks

let genAIInstance: GoogleGenAI | undefined;

if (API_KEY) {
  genAIInstance = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY no encontrada en process.env.API_KEY. Las funciones de IA no funcionarán. Asegúrese de que la variable de entorno API_KEY esté configurada.");
}

export const getWeldingParametersSuggestion = async (
  params: WeldingParameters
): Promise<string> => {
  if (!genAIInstance) {
    return "Error: API Key no configurada o instancia de IA no inicializada. No se pueden obtener sugerencias de IA.";
  }
  try {
    const prompt = `
Eres Weldify, un asistente experto en soldadura. Un soldador necesita configurar su equipo.
Proceso: ${params.process || "No especificado"}
Material: ${params.material || "No especificado"}
Espesor: ${params.thickness ? params.thickness + "mm" : "No especificado"}
Tipo de unión: ${params.jointType || "No especificado"}
Diámetro de hilo/electrodo: ${params.electrodeDiameter || params.wireDiameter || "No especificado"}mm
Gas protector (si aplica): ${params.gasType || "No especificado"}

Proporciona los parámetros de inicio recomendados para esta configuración. Incluye:
- Amperaje (A)
- Voltaje (V) (si aplica)
- Velocidad de Hilo (m/min o similar) (si aplica para MIG/MAG, FCAW)
- Polaridad (ej. DCEN, DCEP, AC)
- Tipo/diámetro de electrodo o hilo específico (ej. E6013 3.2mm, ER70S-6 0.9mm)
- Caudal de gas (L/min o CFH) (si aplica)
- Consejos adicionales o consideraciones importantes para esta soldadura.

Si falta información crucial para una buena recomendación (ej. tipo de electrodo para SMAW si no se provee), indícalo y pregunta por ella.
Formatea tu respuesta de manera clara y organizada, usando listas o encabezados para cada parámetro.
Ejemplo de formato:
### Parámetros Recomendados para {Proceso} en {Material} de {Espesor}mm

*   **Amperaje:** XX-YY A
*   **Voltaje:** XX-YY V
*   **Velocidad de Hilo:** X.X m/min
*   **Polaridad:** DCEP
*   **Electrodo/Hilo:** ER70S-6, 0.9mm
*   **Gas Protector:** Mezcla Ar 80% / CO2 20%
*   **Caudal de Gas:** 10-15 L/min
*   **Notas Adicionales:** Asegurar una buena limpieza del material base. Considerar precalentamiento si el espesor es considerable.
`;

    const response: GenerateContentResponse = await genAIInstance.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error al obtener sugerencias de parámetros:", error);
    return "Error al comunicarse con el servicio de IA. Por favor, inténtelo de nuevo más tarde.";
  }
};

export const analyzeWeldingDefect = async (
  defectDescription: string,
  material: string,
  process: string
): Promise<string> => {
  if (!genAIInstance) {
    return "Error: API Key no configurada o instancia de IA no inicializada. No se puede analizar el defecto.";
  }
  try {
    const prompt = `
Eres Weldify, un experto en diagnóstico de defectos de soldadura.
Un soldador ha encontrado el siguiente defecto: "${defectDescription}".
El material que se está soldando es: ${material || "No especificado"}.
El proceso de soldadura utilizado es: ${process || "No especificado"}.

Analiza este defecto y proporciona:
1.  **Causas Más Probables:** Detalla las posibles razones por las que este defecto podría haber ocurrido (ej., mala selección de material/gas, técnica incorrecta, velocidad, temperatura, preparación de la superficie, etc.).
2.  **Soluciones Específicas Recomendadas:** Ofrece soluciones prácticas y detalladas para corregir y prevenir este defecto en el futuro. Por ejemplo, si son grietas en aluminio, podrías mencionar el uso de un metal de aporte específico como ALSi5 o ajustar parámetros.
3.  **Acciones Preventivas:** Consejos para evitar que este defecto vuelva a ocurrir.

Formatea tu respuesta de manera clara, utilizando encabezados para cada sección (Causas, Soluciones, Prevención).
`;
    const response: GenerateContentResponse = await genAIInstance.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error al analizar el defecto:", error);
    return "Error al comunicarse con el servicio de IA para el análisis de defectos.";
  }
};

export const getGeneralWeldingInfo = async (question: string): Promise<string> => {
  if (!genAIInstance) {
    return "Error: API Key no configurada o instancia de IA no inicializada. No se puede obtener información.";
  }
  try {
    const prompt = `
Eres Weldify, un instructor de soldadura muy conocedor.
Responde la siguiente pregunta de un usuario de la manera más clara, concisa y útil posible. La pregunta es:
"${question}"

Proporciona una respuesta educativa y práctica. Si la pregunta es muy amplia, intenta enfocarla en los aspectos más relevantes para un soldador.
`;
    const response: GenerateContentResponse = await genAIInstance.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error al obtener información general:", error);
    return "Error al comunicarse con el servicio de IA para obtener información.";
  }
};
