import { type Page } from "../App";

const cards = [
  {
    page: "modalities" as Page,
    icon: "🔬",
    title: "Modalidades de Imagen",
    desc: "Radiografía convencional, Tomografía Computada, Resonancia Magnética y Ecografía musculoesquelética.",
    color: "border-blue-700/50 hover:border-blue-500",
    badge: "4 técnicas",
  },
  {
    page: "anatomy" as Page,
    icon: "🦴",
    title: "Anatomía por Región",
    desc: "Columna vertebral, hombro, codo, muñeca, cadera, rodilla y tobillo/pie.",
    color: "border-cyan-700/50 hover:border-cyan-500",
    badge: "7 regiones",
  },
  {
    page: "pathology" as Page,
    icon: "🩺",
    title: "Hallazgos Patológicos",
    desc: "Fracturas, luxaciones, patología degenerativa, tumoral e inflamatoria.",
    color: "border-teal-700/50 hover:border-teal-500",
    badge: "6 categorías",
  },
  {
    page: "cases" as Page,
    icon: "📋",
    title: "Casos Clínicos",
    desc: "Ejercicios de interpretación con historia clínica, imágenes y diagnóstico guiado.",
    color: "border-indigo-700/50 hover:border-indigo-500",
    badge: "8 casos",
  },
];

const highlights = [
  { label: "Radiografía", detail: "Primera línea diagnóstica" },
  { label: "TC Multicorte", detail: "Detalle óseo superior" },
  { label: "RM", detail: "Tejidos blandos" },
  { label: "Ecografía", detail: "Dinámica y en tiempo real" },
];

interface Props { setPage: (p: Page) => void }

export default function PageHome({ setPage }: Props) {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#0d1f35] via-[#0d1117] to-[#0a1628] px-10 py-16 border-b border-slate-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-10 bg-cyan-500 rounded-full" />
            <span className="text-cyan-400 text-sm tracking-widest uppercase font-mono">Sistema Musculoesquelético</span>
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight mb-3" style={{ fontFamily: "Georgia, serif" }}>
            Radiología e Imagenología MSK
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Guía de referencia estructurada para el estudio y diagnóstico por imágenes del aparato locomotor.
            Modalidades, anatomía regional, hallazgos patológicos y casos clínicos integrados.
          </p>

          {/* Modality pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {highlights.map((h) => (
              <div key={h.label} className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-slate-200 text-sm font-semibold">{h.label}</span>
                <span className="text-slate-500 text-xs">— {h.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative skeleton icon */}
        <div className="absolute right-12 top-12 text-8xl opacity-5 select-none">🦴</div>
      </div>

      {/* Cards grid */}
      <div className="p-10">
        <h2 className="text-slate-400 text-xs tracking-widest uppercase mb-6 font-mono">Secciones principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((c) => (
            <button
              key={c.page}
              onClick={() => setPage(c.page)}
              className={`text-left p-6 rounded-xl border bg-slate-900/40 transition-all duration-200 group ${c.color}`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{c.icon}</span>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full font-mono">{c.badge}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                {c.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
              <div className="mt-4 text-cyan-500 text-sm font-mono group-hover:translate-x-1 transition-transform inline-block">
                Ver sección →
              </div>
            </button>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-8 p-5 bg-slate-900/60 border border-slate-800 rounded-xl">
          <div className="flex gap-3 items-start">
            <span className="text-2xl mt-0.5">💡</span>
            <div>
              <div className="text-slate-200 font-semibold mb-1">Uso recomendado</div>
              <div className="text-slate-400 text-sm leading-relaxed">
                Navega por <strong className="text-slate-300">Modalidades</strong> para entender las técnicas,
                luego revisa <strong className="text-slate-300">Anatomía Regional</strong> por zona de interés,
                consulta <strong className="text-slate-300">Hallazgos Patológicos</strong> como referencia diagnóstica
                y practica con <strong className="text-slate-300">Casos Clínicos</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
