import Anthropic from "@anthropic-ai/sdk";
import { buildDiferencialesPrompt } from "../_lib/promptBuilders.js";

const client = new Anthropic();

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    const { region, modalidad, hallazgos, edad, sexo, datosClinico } = await request.json();

    if (!region) return err400("El campo 'region' es requerido");
    if (!modalidad) return err400("El campo 'modalidad' es requerido");
    if (!hallazgos || Object.keys(hallazgos).length === 0)
      return err400("El campo 'hallazgos' es requerido");

    const prompt = buildDiferencialesPrompt({ region, modalidad, hallazgos, edad, sexo, datosClinico });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: `Eres un radiólogo especialista en sistema musculoesquelético con experiencia en imagen diagnóstica avanzada.
Generas diagnósticos diferenciales basados estrictamente en los hallazgos de imagen descritos,
considerando epidemiología, edad, sexo y contexto clínico cuando están disponibles.
Respondes siempre en JSON válido y bien formado.`,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = message.content.find((b) => b.type === "text")?.text ?? "";
    const clean = raw.replace(/```json|```/g, "").trim();

    let diferenciales;
    try {
      diferenciales = JSON.parse(clean);
    } catch {
      throw new Error("La respuesta de diferenciales no pudo parsearse como JSON");
    }

    return ok({ success: true, region, modalidad, diferenciales, timestamp: new Date().toISOString() });
  } catch (e) {
    console.error("[/reporte/diferenciales]", e);
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: json });
  }
}

const json = { "Content-Type": "application/json" };
const ok = (data) => new Response(JSON.stringify(data), { status: 200, headers: json });
const err400 = (error) => new Response(JSON.stringify({ error }), { status: 400, headers: json });
