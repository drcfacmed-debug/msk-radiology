import { useState } from "react";
import { AlertCircle, BarChart2, Loader2, Zap } from "lucide-react";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

interface ModelResult {
  model: string;
  text: string;
  usage: { input_tokens: number; output_tokens: number };
}

// ---------------------------------------------------------------------------
// Datos de los modelos
// ---------------------------------------------------------------------------

const MODEL_META: Record<string, { label: string; color: string; badge: string }> = {
  "claude-haiku-4-5": {
    label: "Haiku 4.5",
    color: "border-sky-300 bg-sky-50 dark:bg-sky-900/20 dark:border-sky-700",
    badge: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  },
  "claude-sonnet-4-6": {
    label: "Sonnet 4.6",
    color: "border-violet-300 bg-violet-50 dark:bg-violet-900/20 dark:border-violet-700",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  },
  "claude-opus-4-7": {
    label: "Opus 4.7",
    color: "border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
};

const PROMPTS_EJEMPLO = [
  "Describe brevemente los hallazgos típicos de una rotura del LCA en resonancia magnética.",
  "¿Cuál es la clasificación de Ellman para los desgarros del manguito rotador?",
  "Explica qué es la condromalacia patelar y sus grados.",
];

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function PageModelCompare() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<ModelResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState<number | null>(null);

  const handleCompare = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);
    setElapsed(null);

    const start = Date.now();

    try {
      const res = await fetch("/api/model-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json() as { results?: ModelResult[]; error?: string };

      if (!res.ok || data.error) throw new Error(data.error ?? "Error desconocido");

      setResults(data.results ?? []);
      setElapsed(Date.now() - start);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al conectar.");
    } finally {
      setLoading(false);
    }
  };

  const totalInput = results.reduce((s, r) => s + r.usage.input_tokens, 0);
  const totalOutput = results.reduce((s, r) => s + r.usage.output_tokens, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Encabezado */}
      <div className="mb-8 flex items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-violet-100 p-2 dark:bg-violet-900/40">
          <BarChart2 size={22} className="text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Comparación de modelos
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Haiku 4.5 · Sonnet 4.6 · Opus 4.7 — máx. 300 tokens por respuesta
          </p>
        </div>
      </div>

      {/* Prompt */}
      <div className="mb-4 space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Prompt
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          placeholder="Escribe tu pregunta o instrucción para los 3 modelos…"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                     dark:border-gray-600 dark:bg-gray-800 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

        {/* Ejemplos rápidos */}
        <div className="flex flex-wrap gap-2">
          {PROMPTS_EJEMPLO.map((p) => (
            <button
              key={p}
              onClick={() => setPrompt(p)}
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs
                         text-gray-600 hover:bg-gray-100 dark:border-gray-600
                         dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {p.length > 55 ? p.slice(0, 55) + "…" : p}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleCompare}
        disabled={loading || !prompt.trim()}
        className="mb-6 flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5
                   text-sm font-medium text-white hover:bg-violet-700
                   disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
      >
        {loading ? (
          <><Loader2 size={15} className="animate-spin" /> Consultando los 3 modelos…</>
        ) : (
          <><Zap size={15} /> Comparar modelos</>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm
                        text-red-700 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Resumen de uso */}
      {results.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-gray-50
                        px-4 py-3 text-sm dark:bg-gray-800">
          <span className="text-gray-500 dark:text-gray-400">
            Tiempo total: <strong className="text-gray-800 dark:text-white">{((elapsed ?? 0) / 1000).toFixed(1)}s</strong>
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Tokens entrada: <strong className="text-gray-800 dark:text-white">{totalInput}</strong>
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Tokens salida: <strong className="text-gray-800 dark:text-white">{totalOutput}</strong>
          </span>
        </div>
      )}

      {/* Resultados — 3 columnas */}
      {results.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          {results.map((r) => {
            const meta = MODEL_META[r.model] ?? {
              label: r.model,
              color: "border-gray-200 bg-gray-50",
              badge: "bg-gray-100 text-gray-700",
            };
            return (
              <div
                key={r.model}
                className={`flex flex-col rounded-xl border p-4 ${meta.color}`}
              >
                {/* Cabecera del modelo */}
                <div className="mb-3 flex items-center justify-between">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.badge}`}>
                    {meta.label}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {r.usage.input_tokens} in / {r.usage.output_tokens} out
                  </span>
                </div>

                {/* Respuesta */}
                <p className="flex-1 whitespace-pre-wrap text-sm leading-relaxed
                               text-gray-800 dark:text-gray-100">
                  {r.text}
                </p>

                {/* Barra visual de tokens de salida */}
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-gray-400">
                    <span>Tokens usados</span>
                    <span>{r.usage.output_tokens} / 300</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-1.5 rounded-full bg-current opacity-60"
                      style={{ width: `${Math.min((r.usage.output_tokens / 300) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
