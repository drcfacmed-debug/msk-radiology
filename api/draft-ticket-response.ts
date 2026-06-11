import Anthropic from "@anthropic-ai/sdk";

// 1. Definir el cliente — lee ANTHROPIC_API_KEY de las variables de entorno de Vercel
const client = new Anthropic();

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // 2. Recuperar el ticket enviado desde la UI
    const { ticket } = await request.json() as {
      ticket: {
        id: string;
        subject?: string;
        description: string;
        category?: string;
        priority?: string;
        status?: string;
        userName?: string;
      };
    };

    if (!ticket?.description?.trim()) {
      return new Response(
        JSON.stringify({ error: "Se requiere la descripción del ticket." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const ticketContext = [
      `ID del ticket: ${ticket.id}`,
      `Asunto: ${ticket.subject ?? "(sin asunto)"}`,
      ticket.userName ? `Usuario: ${ticket.userName}` : null,
      `Categoría: ${ticket.category ?? "General"}`,
      `Prioridad: ${ticket.priority ?? "Normal"}`,
      `Estado: ${ticket.status ?? "Abierto"}`,
      `\nDescripción:\n${ticket.description}`,
    ]
      .filter(Boolean)
      .join("\n");

    // 3. Llamar a messages.create con el contenido del ticket
    const message = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      thinking: { type: "adaptive" },
      messages: [
        {
          role: "user",
          content: `Eres un agente de soporte técnico de SRIMSKNL | Sociedad de Radiólogos de Imagen Musculoesquelética de Nuevo León.

Redacta una respuesta profesional, empática y clara para el siguiente ticket de soporte, siguiendo estas directrices del equipo:

DIRECTRICES:
- Saluda al usuario por su nombre si está disponible, de lo contrario usa "Estimado/a usuario/a".
- Confirma que recibiste y comprendiste el problema.
- Explica en términos sencillos los próximos pasos o la solución propuesta.
- Si el problema requiere escalamiento o tiempo de revisión, indícalo con claridad.
- Cierra con un ofrecimiento de ayuda adicional.
- Firma como: "Equipo de Soporte Técnico — SRIMSKNL".
- Idioma: español formal. Sin tecnicismos innecesarios.
- Tono: profesional, cálido y directo.

${ticketContext}

Respuesta:`,
        },
      ],
    });

    // 4. Extraer el texto y devolverlo a la UI para renderizar
    const draft = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    return new Response(JSON.stringify({ draft }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[draft-ticket-response] Error:", error);
    return new Response(
      JSON.stringify({ error: "No se pudo generar la respuesta. Intenta de nuevo." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
