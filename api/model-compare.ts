import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const MODELS = ["claude-haiku-4-5", "claude-sonnet-4-6", "claude-opus-4-7"] as const;

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { prompt } = await request.json() as { prompt: string };

    if (!prompt?.trim()) {
      return new Response(
        JSON.stringify({ error: "Se requiere el campo 'prompt'." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Llama a los 3 modelos en paralelo con max_tokens: 300
    const results = await Promise.all(
      MODELS.map(async (model) => {
        const response = await client.messages.create({
          model,
          max_tokens: 300,
          messages: [{ role: "user", content: prompt }],
        });

        const text = response.content
          .filter((b): b is Anthropic.TextBlock => b.type === "text")
          .map((b) => b.text)
          .join("");

        return {
          model,
          text,
          usage: {
            input_tokens: response.usage.input_tokens,
            output_tokens: response.usage.output_tokens,
          },
        };
      })
    );

    return new Response(JSON.stringify({ results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[model-compare] Error:", error);
    return new Response(
      JSON.stringify({ error: "Error al consultar los modelos. Intenta de nuevo." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
