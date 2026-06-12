import Anthropic from "@anthropic-ai/sdk";
import { ANATOMICAL_ORDER, MODALIDADES } from "../_lib/anatomicalOrder.js";
import { buildReportePrompt } from "../_lib/promptBuilders.js";

const client = new Anthropic();

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { region, modalidad, hallazgos, lateralidad, datosEstudio } = await request.json();

    if (!region) return err400("El campo 'region' es requerido");
    if (!modalidad) return err400("El campo 'modalidad' es requerido");
    if (!hallazgos || Object.keys(hallazgos).length === 0)
      return err400("El campo 'hallazgos' es requerido y no puede estar vacío");
    if (!ANATOMICAL_ORDER[region])
      return err400(`Región no válida: ${region}`, { regiones_validas: Object.keys(ANATOMICAL_ORDER) });
    if (!MODALIDADES[modalidad])
      return err400(`Modalidad no válida: ${modalidad}`, { modalidades_validas: Object.keys(MODALIDADES) });

    const prompt = buildReportePrompt({ region, modalidad, hallazgos, lateralidad, datosEstudio });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: `Eres un radiólogo especialista en imagen musculoesquelética con 15 años de experiencia.
Redactas reportes en español médico formal, precisos, estructurados y clínicamente útiles.
Nunca inventas hallazgos que no se hayan descrito. Para estructuras no mencionadas, asumes normalidad.`,
      messages: [{ role: "user", content: prompt }],
    });

    const texto = message.content.find((b) => b.type === "text")?.text ?? "";

    return ok({ success: true, region, modalidad, hallazgos_texto: texto.trim(), timestamp: new Date().toISOString() });
  } catch (e) {
    console.error("[/reporte/generar]", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: json });
  }
}

const json = { "Content-Type": "application/json" };
const ok = (data) => new Response(JSON.stringify(data), { status: 200, headers: json });
const err400 = (error, extra = {}) =>
  new Response(JSON.stringify({ error, ...extra }), { status: 400, headers: json });
