import { useState } from "react";

const modalities = [
  {
    id: "rx",
    icon: "📡",
    name: "Radiografía Convencional",
    subtitle: "Primera línea diagnóstica",
    color: "cyan",
    overview: "La radiografía simple es la modalidad inicial en la mayoría de las patologías musculoesqueléticas. Utiliza radiación ionizante para generar imágenes proyeccionales del esqueleto.",
    advantages: ["Amplia disponibilidad", "Bajo costo", "Rápida adquisición", "Excelente resolución ósea", "Evaluación dinámica (funcional)"],
    limitations: ["Radiación ionizante", "Superposición de estructuras", "Baja sensibilidad para tejidos blandos", "Artefactos por implantes metálicos"],
    indications: ["Fracturas traumáticas", "Evaluación de alineación articular", "Patología degenerativa (artrosis)", "Monitoreo de consolidación", "Deformidades esqueléticas"],
    technique: [
      { label: "Proyecciones estándar", value: "AP, lateral; oblicuas según región" },
      { label: "Distancia foco-film", value: "100–180 cm según región" },
      { label: "kV recomendado", value: "60–80 kV extremidades; 70–90 kV columna" },
      { label: "Contraste óptimo", value: "Ventana ósea (ancho ~2000 UH)" },
    ],
    pearls: [
      "Solicitar siempre dos proyecciones ortogonales para fractura",
      "La cortical perióstica y trabéculas deben ser claramente visibles",
      "Comparar con lado contralateral en niños",
      "Las calcificaciones pueden indicar patología específica (condrocalcinosis, tendinitis cálcica)",
    ],
  },
  {
    id: "tc",
    icon: "🔄",
    name: "Tomografía Computada (TC)",
    subtitle: "Detalle óseo y morfología 3D",
    color: "blue",
    overview: "La TC ofrece imágenes seccionales con excelente resolución espacial ósea. Permite reconstrucciones multiplanares y 3D, esencial en trauma complejo y planificación quirúrgica.",
    advantages: ["Máxima resolución ósea", "Reconstrucciones 3D", "Rápida adquisición", "Evalúa extensión intraarticular", "Útil en postoperatorio con metal"],
    limitations: ["Mayor dosis de radiación", "Inferior a RM en tejidos blandos", "Artefactos metálicos (aunque reducibles)", "Alto costo relativo"],
    indications: ["Fractura compleja/conminuta", "Evaluación preoperatoria", "Espondilolistesis y fusiones", "Tumores óseos primarios", "Planificación de implantes"],
    technique: [
      { label: "Colimación", value: "≤1 mm (detector 64+ canales)" },
      { label: "Reconstrucciones", value: "Axial, coronal, sagital, 3D VR" },
      { label: "Ventanas", value: "Ósea (C 400/W 1800) y partes blandas (C 40/W 400)" },
      { label: "Contraste IV", value: "Según indicación (tumores, infección)" },
    ],
    pearls: [
      "DECT (doble energía) mejora detección de gota y edema óseo",
      "Las reconstrucciones 3D son clave para fracturas periarticulares",
      "El modo artroscópico-TC permite artro-TC de alta resolución",
      "Reducir dosis con protocolos de baja radiación en seguimiento",
    ],
  },
  {
    id: "rm",
    icon: "🧲",
    name: "Resonancia Magnética (RM)",
    subtitle: "Tejidos blandos y médula ósea",
    color: "teal",
    overview: "La RM es la modalidad de elección para la evaluación de tejidos blandos musculoesqueléticos: cartílago, ligamentos, tendones, meniscos y médula ósea, sin radiación ionizante.",
    advantages: ["Sin radiación ionizante", "Máxima resolución en tejidos blandos", "Detección precoz de edema óseo", "Evaluación de médula ósea", "Múltiples secuencias tisulares"],
    limitations: ["Larga duración del estudio", "Alto costo", "Claustrofobia", "Contraindicado con ciertos implantes", "Artefactos de movimiento"],
    indications: ["Patología ligamentosa y meniscal", "Lesión del manguito rotador", "Tumores de tejidos blandos", "Necrosis avascular", "Osteomielitis y artritis séptica"],
    technique: [
      { label: "Campo magnético", value: "1.5T o 3T (preferible)" },
      { label: "Secuencias básicas", value: "DP fat-sat, T1, T2, STIR, PDw" },
      { label: "Contraste IV", value: "Gadolinio (tumores, sinovitis, infección)" },
      { label: "Planos", value: "Axial, coronal, sagital adaptados a la articulación" },
    ],
    pearls: [
      "STIR es más sensible que T2 fat-sat para edema óseo difuso",
      "T1 sin supresión grasa: evaluación de médula ósea y necrosis",
      "Artro-RM: útil para lesiones de labrum y cartílago",
      "3T superior a 1.5T para cartílago y pequeñas articulaciones",
    ],
  },
  {
    id: "eco",
    icon: "〰️",
    name: "Ecografía Musculoesquelética",
    subtitle: "Dinámica, tiempo real, sin radiación",
    color: "indigo",
    overview: "La ecografía permite evaluación dinámica en tiempo real de tendones, músculos, bursas y nervios periféricos. Es guía ideal para procedimientos intervencionistas.",
    advantages: ["Sin radiación", "Evaluación dinámica", "Económica y disponible", "Guía para intervenciones", "Bilateral en un solo examen"],
    limitations: ["Operador-dependiente", "Ventana acústica limitada (gas, hueso)", "No evalúa médula ósea", "Menor penetración en obesos"],
    indications: ["Tendinopatía y rotura tendinosa", "Bursitis", "Quiste sinovial", "Síndrome del túnel carpiano", "Guía para infiltraciones"],
    technique: [
      { label: "Transductor", value: "Lineal 7–18 MHz (superficial); Convexo para cadera profunda" },
      { label: "Técnica", value: "Escala de grises + Doppler color/poder" },
      { label: "Evaluación dinámica", value: "Esencial para tendones y nervios" },
      { label: "Elastografía", value: "Valoración de rigidez tisular" },
    ],
    pearls: [
      "La anisotropía es el artefacto más frecuente en tendones (cambiar ángulo del transductor)",
      "Comparar siempre con el lado contralateral asintomático",
      "El Doppler color detecta sinovitis activa y neovascularización tendinosa",
      "Marcar la piel sobre colecciones antes de aspiración guiada",
    ],
  },
];

const colorMap: Record<string, string> = {
  cyan: "border-cyan-700 bg-cyan-900/20 text-cyan-400",
  blue: "border-blue-700 bg-blue-900/20 text-blue-400",
  teal: "border-teal-700 bg-teal-900/20 text-teal-400",
  indigo: "border-indigo-700 bg-indigo-900/20 text-indigo-400",
};

const tabColors: Record<string, string> = {
  cyan: "border-cyan-500 text-cyan-400",
  blue: "border-blue-500 text-blue-400",
  teal: "border-teal-500 text-teal-400",
  indigo: "border-indigo-500 text-indigo-400",
};

export default function PageModalities() {
  const [selected, setSelected] = useState("rx");
  const [tab, setTab] = useState<"overview" | "technique" | "pearls">("overview");
  const mod = modalities.find((m) => m.id === selected)!;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>Modalidades de Imagen</h1>
        <p className="text-slate-400 text-sm">Principios técnicos, indicaciones y perlas diagnósticas por modalidad</p>
      </div>

      {/* Modality selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {modalities.map((m) => (
          <button
            key={m.id}
            onClick={() => { setSelected(m.id); setTab("overview"); }}
            className={`p-4 rounded-xl border text-left transition-all ${
              selected === m.id
                ? colorMap[m.color] + " border-2"
                : "border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-600"
            }`}
          >
            <div className="text-2xl mb-2">{m.icon}</div>
            <div className="font-bold text-sm leading-tight">{m.name}</div>
            <div className="text-xs mt-1 opacity-70">{m.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Panel header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-4">
          <span className="text-4xl">{mod.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>{mod.name}</h2>
            <p className="text-slate-400 text-sm">{mod.subtitle}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800">
          {(["overview", "technique", "pearls"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-sm font-mono transition-all border-b-2 ${
                tab === t ? tabColors[mod.color] + " bg-slate-800/40" : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {t === "overview" ? "Descripción" : t === "technique" ? "Técnica" : "Perlas"}
            </button>
          ))}
        </div>

        <div className="p-6">
          {tab === "overview" && (
            <div className="space-y-6">
              <p className="text-slate-300 leading-relaxed">{mod.overview}</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">✅ Ventajas</h3>
                  <ul className="space-y-1">
                    {mod.advantages.map((a) => (
                      <li key={a} className="text-sm text-slate-300 flex gap-2">
                        <span className="text-green-400 shrink-0">+</span>{a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">⚠️ Limitaciones</h3>
                  <ul className="space-y-1">
                    {mod.limitations.map((l) => (
                      <li key={l} className="text-sm text-slate-300 flex gap-2">
                        <span className="text-red-400 shrink-0">−</span>{l}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">📌 Indicaciones</h3>
                  <ul className="space-y-1">
                    {mod.indications.map((i) => (
                      <li key={i} className="text-sm text-slate-300 flex gap-2">
                        <span className="text-cyan-400 shrink-0">·</span>{i}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === "technique" && (
            <div className="space-y-3">
              {mod.technique.map((t) => (
                <div key={t.label} className="flex gap-4 p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
                  <div className="text-slate-400 text-sm font-mono w-44 shrink-0">{t.label}</div>
                  <div className="text-slate-200 text-sm">{t.value}</div>
                </div>
              ))}
            </div>
          )}

          {tab === "pearls" && (
            <div className="space-y-3">
              {mod.pearls.map((p, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-800/40 rounded-lg border border-slate-700/50">
                  <span className="text-cyan-400 font-bold font-mono text-sm shrink-0 w-6">{i + 1}.</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
