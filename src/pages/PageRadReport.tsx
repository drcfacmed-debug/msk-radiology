import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  FileText,
  GitBranch,
  Loader2,
  ShieldCheck,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

type Modalidad = "RM" | "US" | "TC" | "RX";
type Lateralidad = "" | "derecho" | "izquierdo" | "bilateral";
type Tab = "generar" | "validar" | "diferenciales";

const REGIONES = [
  "rodilla", "hombro", "cadera", "tobillo_pie",
  "columna_cervical", "columna_toracica", "columna_lumbar",
  "muneca_mano", "codo", "pelvis_sacroiliacas", "pie", "pulgar", "atm",
];

const MODALIDADES: Modalidad[] = ["RM", "US", "TC", "RX"];

const HALLAZGOS_EJEMPLO: Record<string, object> = {
  rodilla: {
    meniscos: "desgarro horizontal en cuerno posterior de menisco medial con extensión a superficie articular inferior, extrusión de 4mm del cuerpo",
    ligamento_cruzado_anterior: "normal",
    ligamento_cruzado_posterior: "normal",
    ligamentos_colaterales: "normales",
    tendones: "tendón patelar con engrosamiento difuso e incremento de señal en su tercio proximal",
    patela: "condromalacia patelar grado II en faceta medial",
    musculos: "sin alteraciones",
    estructuras_oseas: "edema óseo subcondral en platillo tibial medial",
    tejidos_blandos: "derrame articular moderado, quiste de Baker de 2.5cm",
  },
  hombro: {
    manguito: "desgarro parcial de superficie bursal de supraespinoso en su tercio distal, grosor residual de 4mm",
    biceps: "efusión en vaina tendinosa",
    labrum: "normal",
    espacio_subacromial: "bursitis subacromial-subdeltoidea con 5mm de efusión",
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function jsonPlaceholder(region: string): string {
  const ejemplo = HALLAZGOS_EJEMPLO[region];
  if (ejemplo) return JSON.stringify(ejemplo, null, 2);
  return `{\n  "estructura": "descripción del hallazgo"\n}`;
}

function jsonHeaders() {
  return { "Content-Type": "application/json" };
}

// ---------------------------------------------------------------------------
// Componente principal
// ---------------------------------------------------------------------------

export default function PageRadReport() {
  const [tab, setTab] = useState<Tab>("generar");

  // Campos comunes
  const [region, setRegion] = useState("rodilla");
  const [modalidad, setModalidad] = useState<Modalidad>("RM");
  const [lateralidad, setLateralidad] = useState<Lateralidad>("");
  const [hallazgosJson, setHallazgosJson] = useState(() => jsonPlaceholder("rodilla"));
  const [datosEstudio, setDatosEstudio] = useState("");

  // Campos de validar
  const [reporteTexto, setReporteTexto] = useState("");

  // Campos de diferenciales
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [datosClinico, setDatosClinico] = useState("");

  // Estado de resultados
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState<string>("");
  const [resultadoJson, setResultadoJson] = useState<object | null>(null);

  const handleRegionChange = (r: string) => {
    setRegion(r);
    setHallazgosJson(jsonPlaceholder(r));
    setResultado("");
    setResultadoJson(null);
    setError("");
  };

  const parseHallazgos = (): object | null => {
    try {
      return JSON.parse(hallazgosJson);
    } catch {
      setError("El campo Hallazgos no es un JSON válido. Revisa la sintaxis.");
      return null;
    }
  };

  const callEndpoint = async (endpoint: string, body: object) => {
    setLoading(true);
    setError("");
    setResultado("");
    setResultadoJson(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify(body),
      });
      const data = await res.json() as Record<string, unknown>;
      if (!res.ok) throw new Error((data.error as string) ?? "Error desconocido");
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al conectar con la API");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleGenerar = async () => {
    const hallazgos = parseHallazgos();
    if (!hallazgos) return;
    const data = await callEndpoint("/api/reporte/generar", {
      region, modalidad, hallazgos,
      lateralidad: lateralidad || undefined,
      datosEstudio: datosEstudio || undefined,
    });
    if (data?.hallazgos_texto) setResultado(data.hallazgos_texto as string);
  };

  const handleValidar = async () => {
    if (!reporteTexto.trim() && hallazgosJson.trim() === "{}") {
      setError("Ingresa el texto del reporte o los hallazgos para validar.");
      return;
    }
    const hallazgos = reporteTexto ? undefined : parseHallazgos();
    if (!reporteTexto && !hallazgos) return;
    const data = await callEndpoint("/api/reporte/validar", {
      region, modalidad,
      reporteTexto: reporteTexto || undefined,
      hallazgos,
    });
    if (data?.validacion) setResultadoJson(data.validacion as object);
  };

  const handleDiferenciales = async () => {
    const hallazgos = parseHallazgos();
    if (!hallazgos) return;
    const data = await callEndpoint("/api/reporte/diferenciales", {
      region, modalidad, hallazgos,
      edad: edad ? Number(edad) : undefined,
      sexo: sexo || undefined,
      datosClinico: datosClinico || undefined,
    });
    if (data?.diferenciales) setResultadoJson(data.diferenciales as object);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Encabezado */}
      <div className="mb-8 flex items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-emerald-100 p-2 dark:bg-emerald-900/40">
          <FileText size={22} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">RadReport Pro</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Generación de reportes MSK asistida por IA · SRIMSKNL
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
        {([
          { id: "generar", label: "Generar hallazgos", icon: FileText },
          { id: "validar", label: "Validar reporte", icon: ShieldCheck },
          { id: "diferenciales", label: "Diferenciales", icon: GitBranch },
        ] as const).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setTab(id); setResultado(""); setResultadoJson(null); setError(""); }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors
              ${tab === id
                ? "bg-white text-gray-900 shadow dark:bg-gray-700 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
          >
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {/* Campos comunes */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-2">
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Región anatómica</label>
            <div className="relative">
              <select
                value={region}
                onChange={(e) => handleRegionChange(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                {REGIONES.map((r) => (
                  <option key={r} value={r}>{r.replace(/_/g, " ")}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Modalidad</label>
            <div className="relative">
              <select
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value as Modalidad)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                {MODALIDADES.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Lateralidad</label>
            <div className="relative">
              <select
                value={lateralidad}
                onChange={(e) => setLateralidad(e.target.value as Lateralidad)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">No aplica</option>
                <option value="derecho">Derecho</option>
                <option value="izquierdo">Izquierdo</option>
                <option value="bilateral">Bilateral</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Tab: Generar */}
        {tab === "generar" && (
          <>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
                Datos del estudio (opcional)
              </label>
              <input
                type="text"
                value={datosEstudio}
                onChange={(e) => setDatosEstudio(e.target.value)}
                placeholder="Ej: RM 1.5T, secuencias DP FS coronal y sagital, sin contraste"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
                Hallazgos (JSON)
              </label>
              <textarea
                value={hallazgosJson}
                onChange={(e) => setHallazgosJson(e.target.value)}
                rows={10}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button onClick={handleGenerar} disabled={loading} className={btnClass}>
              {loading ? <><Loader2 size={15} className="animate-spin" /> Generando…</> : "Generar hallazgos en prosa"}
            </button>
          </>
        )}

        {/* Tab: Validar */}
        {tab === "validar" && (
          <>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
                Texto completo del reporte (o deja vacío y usa hallazgos JSON abajo)
              </label>
              <textarea
                value={reporteTexto}
                onChange={(e) => setReporteTexto(e.target.value)}
                rows={6}
                placeholder="Pega aquí el texto de hallazgos y conclusión del reporte a validar…"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            {!reporteTexto && (
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Hallazgos (JSON) — si no pegaste texto arriba
                </label>
                <textarea
                  value={hallazgosJson}
                  onChange={(e) => setHallazgosJson(e.target.value)}
                  rows={8}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm
                             dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
              </div>
            )}
            <button onClick={handleValidar} disabled={loading} className={btnClass}>
              {loading ? <><Loader2 size={15} className="animate-spin" /> Validando…</> : "Validar consistencia del reporte"}
            </button>
          </>
        )}

        {/* Tab: Diferenciales */}
        {tab === "diferenciales" && (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Edad (años)</label>
                <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} min={1} max={120}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Sexo</label>
                <div className="relative">
                  <select value={sexo} onChange={(e) => setSexo(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                    <option value="">No especificado</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-2 top-2.5 text-gray-400" />
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Contexto clínico</label>
                <input type="text" value={datosClinico} onChange={(e) => setDatosClinico(e.target.value)}
                  placeholder="Ej: dolor post-traumático de 3 semanas"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Hallazgos (JSON)</label>
              <textarea value={hallazgosJson} onChange={(e) => setHallazgosJson(e.target.value)} rows={9}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
            </div>
            <button onClick={handleDiferenciales} disabled={loading} className={btnClass}>
              {loading ? <><Loader2 size={15} className="animate-spin" /> Analizando…</> : "Sugerir diagnósticos diferenciales"}
            </button>
          </>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Resultado texto (generar) */}
        {resultado && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Hallazgos generados</span>
              <button onClick={() => navigator.clipboard.writeText(resultado)}
                className="ml-auto text-xs text-indigo-500 hover:underline">Copiar</button>
            </div>
            <textarea value={resultado} onChange={(e) => setResultado(e.target.value)} rows={14}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm leading-relaxed
                         dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100" />
          </div>
        )}

        {/* Resultado JSON (validar / diferenciales) */}
        {resultadoJson && tab === "validar" && <ValidacionResult data={resultadoJson as ValidacionData} />}
        {resultadoJson && tab === "diferenciales" && <DiferencialesResult data={resultadoJson as DiferencialesData} />}
      </div>
    </div>
  );
}

const btnClass =
  "flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white " +
  "hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";

// ---------------------------------------------------------------------------
// Sub-componentes de resultado
// ---------------------------------------------------------------------------

interface ValidacionData {
  aprobado: boolean;
  puntaje_calidad: number;
  problemas: Array<{ severidad: string; categoria: string; descripcion: string; correccion_sugerida: string }>;
  fortalezas: string[];
  resumen_revision: string;
}

function ValidacionResult({ data }: { data: ValidacionData }) {
  const colorSev: Record<string, string> = {
    CRÍTICO: "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400",
    ADVERTENCIA: "text-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400",
    SUGERENCIA: "text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400",
  };
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
      <div className="flex items-center gap-3">
        {data.aprobado
          ? <CheckCircle2 size={20} className="text-emerald-500" />
          : <AlertCircle size={20} className="text-red-500" />}
        <span className="font-semibold text-gray-800 dark:text-white">
          {data.aprobado ? "Reporte aprobado" : "Reporte requiere correcciones"}
        </span>
        <span className="ml-auto rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium dark:bg-gray-700">
          Calidad: {data.puntaje_calidad}/100
        </span>
      </div>
      {data.problemas.length > 0 && (
        <div className="space-y-2">
          {data.problemas.map((p, i) => (
            <div key={i} className={`rounded-lg p-3 text-sm ${colorSev[p.severidad] ?? ""}`}>
              <div className="font-semibold">[{p.severidad}] {p.categoria}</div>
              <div className="mt-1">{p.descripcion}</div>
              <div className="mt-1 opacity-80">→ {p.correccion_sugerida}</div>
            </div>
          ))}
        </div>
      )}
      {data.fortalezas.length > 0 && (
        <div>
          <p className="mb-1 text-xs font-semibold text-gray-500">Fortalezas</p>
          <ul className="list-inside list-disc space-y-0.5 text-sm text-gray-700 dark:text-gray-300">
            {data.fortalezas.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}
      <p className="text-sm text-gray-600 italic dark:text-gray-400">{data.resumen_revision}</p>
    </div>
  );
}

interface DiferencialesData {
  diagnostico_principal: { nombre: string; probabilidad: string; sustento_imagenologico: string; clasificacion_recomendada: string | null };
  diferenciales: Array<{ nombre: string; probabilidad: string; hallazgos_a_favor: string; hallazgos_en_contra: string; como_diferenciarlo: string }>;
  recomendaciones_imagen: string[];
  correlacion_clinica: string;
  banderas_rojas: string[];
}

const PROB_COLOR: Record<string, string> = {
  alta: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  moderada: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  baja: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

function DiferencialesResult({ data }: { data: DiferencialesData }) {
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
      {/* Principal */}
      <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span className="font-semibold text-emerald-800 dark:text-emerald-300">Diagnóstico principal</span>
          <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${PROB_COLOR[data.diagnostico_principal.probabilidad] ?? ""}`}>
            {data.diagnostico_principal.probabilidad}
          </span>
        </div>
        <p className="mt-1 font-bold text-gray-800 dark:text-white">{data.diagnostico_principal.nombre}</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{data.diagnostico_principal.sustento_imagenologico}</p>
        {data.diagnostico_principal.clasificacion_recomendada && (
          <p className="mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Clasificación: {data.diagnostico_principal.clasificacion_recomendada}
          </p>
        )}
      </div>
      {/* Diferenciales */}
      {data.diferenciales.map((d, i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-3 dark:border-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 dark:text-white">{d.nombre}</span>
            <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-medium ${PROB_COLOR[d.probabilidad] ?? ""}`}>
              {d.probabilidad}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-500">A favor: {d.hallazgos_a_favor}</p>
          <p className="text-xs text-gray-500">En contra: {d.hallazgos_en_contra}</p>
          <p className="text-xs italic text-gray-400">→ {d.como_diferenciarlo}</p>
        </div>
      ))}
      {/* Recomendaciones */}
      {data.recomendaciones_imagen.length > 0 && (
        <div>
          <p className="mb-1 text-xs font-semibold text-gray-500">Recomendaciones de imagen</p>
          <ul className="list-inside list-disc space-y-0.5 text-sm text-gray-700 dark:text-gray-300">
            {data.recomendaciones_imagen.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
      {/* Banderas rojas */}
      {data.banderas_rojas.length > 0 && (
        <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
          <p className="mb-1 text-xs font-semibold text-red-600">Banderas rojas</p>
          <ul className="list-inside list-disc space-y-0.5 text-sm text-red-700 dark:text-red-300">
            {data.banderas_rojas.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      )}
      <p className="text-sm text-gray-500 italic">{data.correlacion_clinica}</p>
    </div>
  );
}
