import { ANATOMICAL_ORDER, MODALIDADES } from "./anatomicalOrder.js";

export function buildReportePrompt({ region, modalidad, hallazgos, lateralidad, datosEstudio }) {
  const orden = ANATOMICAL_ORDER[region];
  const mod = MODALIDADES[modalidad] || MODALIDADES["RM"];

  if (!orden) throw new Error(`Región no reconocida: ${region}`);

  const ordenTexto = orden.map((e, i) => `${i + 1}. ${e}`).join("\n");

  return `Eres un radiólogo especialista en imagen musculoesquelética. Tu tarea es redactar la sección de HALLAZGOS de un reporte radiológico estructurado, profesional y en español médico formal.

DATOS DEL ESTUDIO:
- Modalidad: ${mod.nombre} (${mod.abreviatura})
- Región anatómica: ${region.replace(/_/g, " ").toUpperCase()}${lateralidad ? ` - ${lateralidad}` : ""}
- Secuencias / técnica: ${mod.secuencias_tipicas}
${datosEstudio ? `- Datos adicionales: ${datosEstudio}` : ""}

ORDEN ANATÓMICO OBLIGATORIO (describe CADA grupo en un párrafo separado, en este orden exacto):
${ordenTexto}

HALLAZGOS REGISTRADOS POR EL RADIÓLOGO:
${JSON.stringify(hallazgos, null, 2)}

INSTRUCCIONES DE REDACCIÓN:
1. Redacta un párrafo por cada grupo anatómico en el orden indicado arriba.
2. Usa terminología de señal correcta para ${mod.nombre}: ${mod.terminos_señal}.
3. ${mod.notas}
4. Para estructuras normales usa frases concisas: "de morfología, señal y continuidad conservadas" o equivalente.
5. Para estructuras patológicas describe: localización exacta, extensión, características de señal, dimensiones si aplica, y relación con estructuras adyacentes.
6. NO incluyas "Conclusión" ni "Técnica" — solo los Hallazgos.
7. NO uses viñetas ni listas. Solo prosa en párrafos.
8. Tiempo presente en voz impersonal: "Se identifica...", "Se observa...", "No se demuestra..."
9. Si un hallazgo no fue registrado, asume normalidad y redáctalo brevemente.
10. Si hay lateralidad, menciona siempre el lado al referirte a estructuras pares.

Responde ÚNICAMENTE con el texto de Hallazgos, sin encabezados, sin introducción, sin comentarios adicionales.`;
}

export function buildValidadorPrompt({ region, modalidad, hallazgos, conclusion, reporteTexto }) {
  return `Eres un radiólogo senior revisando un reporte de imagen musculoesquelética antes de su firma. Tu rol es de control de calidad estricto.

REGIÓN: ${region.replace(/_/g, " ").toUpperCase()} | MODALIDAD: ${modalidad}

${reporteTexto
    ? `TEXTO COMPLETO DEL REPORTE:\n${reporteTexto}`
    : `HALLAZGOS (datos estructurados):\n${JSON.stringify(hallazgos, null, 2)}\n\nCONCLUSIÓN PROPUESTA:\n${conclusion || "No proporcionada"}`
  }

Evalúa el reporte y responde en formato JSON con exactamente esta estructura:

{
  "aprobado": true/false,
  "puntaje_calidad": 0-100,
  "problemas": [
    {
      "severidad": "CRÍTICO" | "ADVERTENCIA" | "SUGERENCIA",
      "categoria": "consistencia" | "terminología" | "omisión" | "conclusión" | "redacción",
      "descripcion": "descripción clara del problema",
      "ubicacion": "dónde está el problema",
      "correccion_sugerida": "cómo corregirlo"
    }
  ],
  "fortalezas": ["lista de aspectos bien redactados"],
  "resumen_revision": "párrafo breve con evaluación general"
}

- CRÍTICO: conclusión contradice hallazgos, diagnósticos no sustentados, omisión clínicamente significativa, error de lateralidad.
- ADVERTENCIA: hallazgos sin clasificación cuando corresponde, terminología incorrecta, conclusión incompleta.
- SUGERENCIA: redacción mejorable, mediciones faltantes, orden anatómico no seguido.

Si "aprobado" es false debe haber al menos un problema CRÍTICO.
Responde ÚNICAMENTE con el JSON, sin texto adicional.`;
}

export function buildDiferencialesPrompt({ region, modalidad, hallazgos, edad, sexo, datosClinico }) {
  return `Eres un radiólogo especialista en sistema musculoesquelético. Genera diagnósticos diferenciales ordenados por probabilidad basándote en los hallazgos descritos.

DATOS CLÍNICOS:
- Región: ${region.replace(/_/g, " ").toUpperCase()}
- Modalidad: ${modalidad}
${edad ? `- Edad: ${edad} años` : ""}
${sexo ? `- Sexo: ${sexo}` : ""}
${datosClinico ? `- Contexto clínico: ${datosClinico}` : ""}

HALLAZGOS DE IMAGEN:
${JSON.stringify(hallazgos, null, 2)}

Responde en formato JSON con exactamente esta estructura:

{
  "diagnostico_principal": {
    "nombre": "nombre del diagnóstico más probable",
    "probabilidad": "alta" | "moderada" | "baja",
    "sustento_imagenologico": "qué hallazgos específicos lo sustentan",
    "clasificacion_recomendada": "clasificación estandarizada si aplica, o null"
  },
  "diferenciales": [
    {
      "nombre": "nombre del diagnóstico",
      "probabilidad": "alta" | "moderada" | "baja",
      "hallazgos_a_favor": "qué hallazgos lo apoyan",
      "hallazgos_en_contra": "qué hallazgos lo hacen menos probable",
      "como_diferenciarlo": "estudio o dato adicional para confirmarlo o descartarlo"
    }
  ],
  "recomendaciones_imagen": ["secuencias adicionales, proyecciones o estudios complementarios útiles"],
  "correlacion_clinica": "datos clínicos o de laboratorio que ayudarían a definir el diagnóstico final",
  "banderas_rojas": ["hallazgos que requieren atención urgente, si los hay"]
}

Máximo 4 diferenciales, de mayor a menor probabilidad.
Responde ÚNICAMENTE con el JSON, sin texto adicional.`;
}
