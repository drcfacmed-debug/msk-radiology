import { useState } from "react";
import type React from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  MessageSquarePlus,
  Sparkles,
  Ticket,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

type Priority = "Alta" | "Media" | "Baja";
type Status = "Abierto" | "En revisión" | "Resuelto";
type Category = "Acceso" | "Contenido" | "Técnico" | "General";

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  userName: string;
  category: Category;
  priority: Priority;
  status: Status;
  date: string;
}

// ---------------------------------------------------------------------------
// Datos de ejemplo
// ---------------------------------------------------------------------------

const SAMPLE_TICKETS: SupportTicket[] = [
  {
    id: "TKT-001",
    subject: "No puedo acceder a los casos clínicos",
    description:
      "Al intentar ingresar a la sección de Casos Clínicos recibo un mensaje de error '403 Forbidden'. Ya cerré sesión e ingresé nuevamente pero el problema persiste. Uso Chrome 124 en Windows 11.",
    userName: "Dr. Martínez",
    category: "Acceso",
    priority: "Alta",
    status: "Abierto",
    date: "2026-06-10",
  },
  {
    id: "TKT-002",
    subject: "Imagen de TC no carga correctamente",
    description:
      "En la sección de Modalidades, la galería de imágenes de Tomografía Computada tarda demasiado en cargar y en ocasiones aparece en blanco. Tengo buena conexión a internet (100 Mbps). El problema ocurre en Firefox y Safari.",
    userName: "Dra. Rodríguez",
    category: "Técnico",
    priority: "Media",
    status: "En revisión",
    date: "2026-06-09",
  },
  {
    id: "TKT-003",
    subject: "Solicitud de contenido: patología de tobillo",
    description:
      "Sería muy útil incluir casos de patología del tobillo y pie en la sección de Hallazgos. Actualmente solo encuentro hombro, rodilla y columna. ¿Está planeada esa sección?",
    userName: "Dr. Garza",
    category: "Contenido",
    priority: "Baja",
    status: "Abierto",
    date: "2026-06-08",
  },
];

// ---------------------------------------------------------------------------
// Helpers UI
// ---------------------------------------------------------------------------

const PRIORITY_STYLES: Record<Priority, string> = {
  Alta: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Media: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Baja: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const STATUS_ICON: Record<Status, React.ReactElement> = {
  Abierto: <AlertCircle size={14} className="text-blue-500" />,
  "En revisión": <Clock size={14} className="text-yellow-500" />,
  Resuelto: <CheckCircle2 size={14} className="text-green-500" />,
};

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function PageSupport() {
  const [tickets] = useState<SupportTicket[]>(SAMPLE_TICKETS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleExpand = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  // Llama al endpoint serverless y almacena el borrador generado
  const generateDraft = async (ticket: SupportTicket) => {
    setLoading((prev) => ({ ...prev, [ticket.id]: true }));
    setErrors((prev) => ({ ...prev, [ticket.id]: "" }));
    setDrafts((prev) => ({ ...prev, [ticket.id]: "" }));

    try {
      const res = await fetch("/api/draft-ticket-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket }),
      });

      const data = await res.json() as { draft?: string; error?: string };

      if (!res.ok || data.error) {
        throw new Error(data.error ?? "Error desconocido");
      }

      setDrafts((prev) => ({ ...prev, [ticket.id]: data.draft ?? "" }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [ticket.id]: err instanceof Error ? err.message : "Error al conectar.",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [ticket.id]: false }));
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Encabezado */}
      <div className="mb-8 flex items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-indigo-100 p-2 dark:bg-indigo-900/40">
          <Ticket size={22} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Soporte Técnico
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Administración de tickets · SRIMSKNL
          </p>
        </div>
      </div>

      {/* Lista de tickets */}
      <div className="space-y-4">
        {tickets.map((ticket) => {
          const isOpen = expandedId === ticket.id;
          const draft = drafts[ticket.id] ?? "";
          const isLoading = loading[ticket.id] ?? false;
          const error = errors[ticket.id] ?? "";

          return (
            <div
              key={ticket.id}
              className="rounded-xl border border-gray-200 bg-white shadow-sm
                         dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Cabecera del ticket */}
              <button
                onClick={() => toggleExpand(ticket.id)}
                className="flex w-full items-start gap-3 p-4 text-left"
              >
                <div className="mt-0.5 flex-shrink-0">
                  {STATUS_ICON[ticket.status]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-gray-400">
                      {ticket.id}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_STYLES[ticket.priority]}`}
                    >
                      {ticket.priority}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {ticket.category}
                    </span>
                  </div>
                  <p className="mt-1 font-semibold text-gray-800 dark:text-white">
                    {ticket.subject}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {ticket.userName} · {ticket.date} · {ticket.status}
                  </p>
                </div>
                <div className="flex-shrink-0 text-gray-400">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </button>

              {/* Detalle expandido */}
              {isOpen && (
                <div className="border-t border-gray-100 p-4 dark:border-gray-700">
                  {/* Descripción */}
                  <div className="mb-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50">
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                      {ticket.description}
                    </p>
                  </div>

                  {/* Botón de IA */}
                  <button
                    onClick={() => generateDraft(ticket)}
                    disabled={isLoading}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2
                               text-sm font-medium text-white transition-colors
                               hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Generando borrador…
                      </>
                    ) : (
                      <>
                        <Sparkles size={15} />
                        Generar respuesta con IA
                      </>
                    )}
                  </button>

                  {/* Error */}
                  {error && (
                    <p className="mt-3 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
                      <AlertCircle size={14} />
                      {error}
                    </p>
                  )}

                  {/* Borrador generado — editable */}
                  {draft && (
                    <div className="mt-4 space-y-2">
                      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        <MessageSquarePlus size={15} />
                        Borrador generado (editable)
                      </label>
                      <textarea
                        value={draft}
                        onChange={(e) =>
                          setDrafts((prev) => ({
                            ...prev,
                            [ticket.id]: e.target.value,
                          }))
                        }
                        rows={10}
                        className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm
                                   leading-relaxed text-gray-800 shadow-sm focus:outline-none
                                   focus:ring-2 focus:ring-indigo-400
                                   dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                      />
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigator.clipboard.writeText(draft)}
                          className="text-xs text-indigo-500 hover:underline dark:text-indigo-400"
                        >
                          Copiar al portapapeles
                        </button>
                        <button
                          onClick={() => generateDraft(ticket)}
                          className="text-xs text-gray-400 hover:underline"
                        >
                          Regenerar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
