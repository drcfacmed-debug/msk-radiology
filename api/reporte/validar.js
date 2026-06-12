import Anthropic from "@anthropic-ai/sdk";
import { buildValidadorPrompt } from "../_lib/promptBuilders.js";

const client = new Anthropic();

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { region, modalidad, hallazgos, conclusion, reporteTexto } = await request.json();

    if (!region) return err400("El campo 'region' es requerido");
    if (!modalidad) return err400("El campo 'modalidad' es requerido");
    if (!reporteTexto && !hallazgos)
      return err400("Se requiere 'reporteTexto' o 'hallazgos' para validar");

    const prompt = buildValidadorPrompt({ region, modalidad, hallazgos, conclusion, reporteTexto });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: `Eres un radiólogo senior encargado de control de calidad de reportes de imagen musculoesquelética.
Eres riguroso, preciso y constructivo. Tu objetivo es mejorar la calidad diagnóstica y la seguridad del paciente.
Respondes siempre en JSON válido y bien formado.`,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content.find((b) => b.type === "text")?.text ?? "";
    const clean = raw.replace(/```json|```/g, "").trim();

    let validacion;
    try {
      validacion = JSON.parse(clean);
    } catch {
      throw new Error("La respuesta del validador no pudo parsearse como JSON");
    }

    return ok({ success: true, region, modalidad, validacion, timestamp: new Date().toISOString() });
  } catch (e) {
    console.error("[/reporte/validar]", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: json });
  }
}

const json = { "Content-Type": "application/json" };
const ok = (data) => new Response(JSON.stringify(data), { status: 200, headers: json });
const err400 = (error) => new Response(JSON.stringify({ error }), { status: 400, headers: json });
