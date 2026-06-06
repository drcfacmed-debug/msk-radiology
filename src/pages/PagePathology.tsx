import { useState } from "react";

const categories = [
  {
    id: "fracturas",
    icon: "💥",
    name: "Fracturas",
    color: "red",
    entities: [
      {
        name: "Fractura por estrés",
        desc: "Lesión ósea por sobrecarga repetitiva sin trauma único. Frecuente en tibia, metatarsianos y calcáneo en atletas.",
        imaging: "RX: línea esclerótica o periostitis reactiva (tardía). RM: edema intramedular y perióstico en STIR (precoz). TC: línea de fractura fina.",
        pearls: "La RM detecta fracturas por estrés 1–2 semanas antes que la RX. Las fracturas de cuello femoral y navicular son de alto riesgo.",
        grade: "Inicial: RM",
      },
      {
        name: "Fractura de escafoides",
        desc: "La fractura de carpo más frecuente. Riesgo de necrosis avascular del polo proximal por irrigación retrógrada.",
        imaging: "RX: línea en cintura del escafoides (puede ser negativa). TC: elección para diagnóstico y unión. RM: edema precoz en polo proximal.",
        pearls: "RX negativa + sospecha clínica = RM o TC urgente. La falta de diagnóstico lleva a seudoartrosis.",
        grade: "Inicial: RX + RM/TC si sospecha",
      },
      {
        name: "Fractura vertebral por compresión",
        desc: "Colapso del cuerpo vertebral por osteoporosis o trauma. Distorsión de los platillos vertebrales.",
        imaging: "RX: pérdida de altura anterior (cuña), acuñamiento central o posterior. RM: edema en STIR indica reciente. TC para clasificar Magerl.",
        pearls: "STIR diferencia fractura aguda (edema) de antigua (grasa). Buscar componente retrolistético para mielopatía.",
        grade: "Inicial: RX → RM para agudeza",
      },
    ],
  },
  {
    id: "degenerativa",
    icon: "⏳",
    name: "Patología Degenerativa",
    color: "amber",
    entities: [
      {
        name: "Artrosis (Osteoartritis)",
        desc: "Degeneración del cartílago articular con reacción ósea subcondral y sinovial. Rodilla, cadera, columna y manos.",
        imaging: "RX: estrechamiento del espacio articular, osteofitos, esclerosis subcondral, geodas. RM: pérdida de cartílago, edema óseo, derrames.",
        pearls: "El estrechamiento en bipedestación es más representativo que en decúbito. La distribución asimétrica sugiere reumatoide vs simétrica en OA.",
        grade: "Inicial: RX → RM para cartílago",
      },
      {
        name: "Hernia discal",
        desc: "Protrusión del núcleo pulposo a través del anillo fibroso con posible compromiso radicular o medular.",
        imaging: "RM: protrusión focal o difusa del disco con señal T2 del núcleo. Clasificar: abombamiento, protrusión, extrusión, secuestro. TC para canal óseo.",
        pearls: "L4-L5 y L5-S1 son los niveles más afectados en lumbar. La extrusión migra craneocaudalmente. El contraste muestra refuerzo periférico en hernia aguda.",
        grade: "Elección: RM",
      },
      {
        name: "Rotura del manguito rotador",
        desc: "Desgarro del supraespinoso (principalmente) por degeneración crónica, trauma o ambos. Espectro: parcial a completo.",
        imaging: "RM: discontinuidad del tendón, líquido en la brecha, retracción muscular y atrofia/infiltración grasa en crónico. ECO: igual sensibilidad con dinámica.",
        pearls: "Roturas parciales: clasificar por localización (bursal/articular) y profundidad (<50% vs ≥50%). Infiltración grasa de Goutallier predice mal resultado quirúrgico.",
        grade: "Elección: RM o ECO",
      },
    ],
  },
  {
    id: "inflamatoria",
    icon: "🔥",
    name: "Patología Inflamatoria",
    color: "orange",
    entities: [
      {
        name: "Artritis Reumatoide",
        desc: "Poliartritis simétrica erosiva, de predominio en pequeñas articulaciones. Sinovitis crónica con destrucción articular.",
        imaging: "RX: erosiones marginales, osteopenia yuxtaarticular, pérdida de espacio articular. RM: sinovitis (refuerzo con Gd), pannus, edema óseo y erosiones precoces.",
        pearls: "La RM detecta erosiones 2 años antes que la RX. La inestabilidad C1-C2 (artritis atlanto-axoidea) requiere evaluación urgente en todo paciente con AR.",
        grade: "Seguimiento: RX → RM para actividad",
      },
      {
        name: "Espondilitis Anquilosante",
        desc: "Espondiloartritis con afección predominante axial (sacroilíacas y columna). Ligamento anterior, osificación progresiva.",
        imaging: "RX: sacroileítis bilateral (erosiones, esclerosis, fusión). Columna: sindesmofitos, fusión en bambú. RM: edema óseo en sacroilíacas (STIR) precede cambios radiológicos.",
        pearls: "RM de sacroilíacas es el estándar para diagnóstico precoz (criterios ASAS). La imagen en 'caña de bambú' es tardía y diagnóstica en RX simple.",
        grade: "Precoz: RM sacroilíacas",
      },
      {
        name: "Gota y Pseudogota",
        desc: "Artropatías por depósito de cristales: monourato de sodio (gota) o pirofosfato cálcico (pseudogota/condrocalcinosis).",
        imaging: "RX: erosiones con voladizo óseo en gota crónica; calcificaciones en fibrocartílago (condrocalcinosis). RM: tofos hipointensos en T1. DECT (TC doble energía) detecta tofos de urato directamente.",
        pearls: "DECT es el método no invasivo más específico para gota. La condrocalcinosis afecta menisco, fibrocartílago triangular de la muñeca y sínfisis del pubis.",
        grade: "RX + TC (DECT) para gota",
      },
    ],
  },
  {
    id: "tumoral",
    icon: "🔴",
    name: "Patología Tumoral",
    color: "red",
    entities: [
      {
        name: "Tumores óseos benignos",
        desc: "Osteocondroma, encondroma, quiste óseo simple, fibroma no osificante. Generalmente asintomáticos o hallazgo incidental.",
        imaging: "RX: caracterizar morfología, zona de transición, calcificaciones, periostio. RM para extensión de tejidos blandos y edema. TC para cortical y mineralización.",
        pearls: "Una zona de transición estrecha sugiere proceso benigno. Los exostosis/osteocondromas siempre evaluar con RM para el espesor del capuchón cartilaginoso (>1.5cm en adulto = alerta).",
        grade: "RX → RM + TC para caracterización",
      },
      {
        name: "Tumores óseos malignos",
        desc: "Osteosarcoma (adolescentes, metáfisis), condrosarcoma (adultos), sarcoma de Ewing (pelvis/diáfisis). Metástasis óseas.",
        imaging: "RX: zona de transición amplia, destrucción cortical, triángulo de Codman, spiculas periósticas. RM: extensión intramedular y a tejidos blandos. TC tórax para metástasis.",
        pearls: "Cualquier lesión ósea agresiva en adulto: primero descartar metástasis. Biopsia siempre guiada por imagen. El contraste en RM define áreas viables para biopsia.",
        grade: "RX → RM + TC tórax",
      },
      {
        name: "Tumores de tejidos blandos",
        desc: "Lipoma (frecuente), liposarcoma, fibrosarcoma, sarcoma sinovial. La RM es fundamental para caracterización y estadificación.",
        imaging: "RM: lesión con señal T1 alta (lipoma); T2 alta heterogénea (sarcoma); refuerzo con gadolinio variable. La infiltración de planos define resecabilidad.",
        pearls: "Todo tumor de tejidos blandos >5cm, profundo a la fascia o de crecimiento rápido requiere RM y biopsia. La ausencia de refuerzo no excluye malignidad.",
        grade: "Elección: RM con contraste",
      },
    ],
  },
  {
    id: "infeccion",
    icon: "🦠",
    name: "Infección",
    color: "green",
    entities: [
      {
        name: "Osteomielitis",
        desc: "Infección bacteriana del hueso, hematógena o por contigüidad. S. aureus el más frecuente. Metáfisis en niños.",
        imaging: "RX: cambios tardíos (10–21 días): destrucción, periostitis, secuestros. RM: edema intramedular (STIR), absceso de Brodie, colección subperióstica. Gammagrafía para multifocal.",
        pearls: "RM negativa tiene alto VPN para excluir osteomielitis. El signo del absceso central de Brodie indica forma crónica. Contraste IV imprescindible para definir extensión.",
        grade: "Precoz: RM con contraste",
      },
      {
        name: "Artritis Séptica",
        desc: "Emergencia ortopédica. Infección articular que destruye cartílago en horas. Principalmente monoarticular; S. aureus el más frecuente.",
        imaging: "RX: inicialmente normal o derrame. ECO: derrame y sinovitis (muy sensible y guía de artrocentesis urgente). RM: sinovitis, edema periarticular, erosiones tempranas.",
        pearls: "La ECO guía la artrocentesis diagnóstica/terapéutica urgente. El diagnóstico es microbiológico, no de imagen. El líquido >50.000 leucocitos/mm³ = cirugía.",
        grade: "ECO urgente → artrocentesis",
      },
    ],
  },
  {
    id: "deportiva",
    icon: "🏃",
    name: "Lesiones Deportivas",
    color: "blue",
    entities: [
      {
        name: "Rotura del LCA",
        desc: "Lesión ligamentosa más frecuente en deporte. Mecanismo: valgo-rotación o hiperextensión. Puede asociar lesión meniscal y contusión ósea.",
        imaging: "RM: discontinuidad del LCA en sagital (plano oblicuo), edema en cóndilo lateral y platillo tibial posterolateral (contusión ósea típica). Signos secundarios: cajón anterior, ondulación LCP.",
        pearls: "El 70% de roturas de LCA asocia lesión meniscal. La contusión ósea 'beso' es patognomónica del mecanismo. La RM predice anatomía para reconstrucción.",
        grade: "Elección: RM",
      },
      {
        name: "Desgarro meniscal",
        desc: "Rotura por trauma agudo o degeneración crónica. Clasificar: vertical longitudinal, radial, horizontal, colgajo, complejo. El cuerno posterior del menisco medial es el más afectado.",
        imaging: "RM: señal aumentada que alcanza la superficie articular (grado III). Coronal y sagital DP fat-sat. Signo del menisco fantasma, del punto de interrogación y del menisco en balde.",
        pearls: "Grado I-II: señal intrasusstancial sin alcanzar superficie = degeneración, no rotura. Las roturas radiales son difíciles de ver, evaluar en plano axial. La artro-RM mejora sensibilidad.",
        grade: "Elección: RM",
      },
      {
        name: "Tendinosis de Aquiles",
        desc: "Degeneración del tendón de Aquiles por sobrecarga crónica. Riesgo de rotura. Frecuente en corredores y deportes de salto.",
        imaging: "ECO: engrosamiento fusiforme del tendón (>6mm), señal heterogénea, neovascularización en Doppler. RM: señal T2 aumentada intrasustancial, fusiforme. La rotura completa = discontinuidad.",
        pearls: "La inserción distal puede presentar entesopatía y bursitis retrocalcánea asociada. El Doppler color predice respuesta a terapias conservadoras. La rotura parcial tiene >50% de profundidad en el espesor tendíneo.",
        grade: "Elección: ECO o RM",
      },
    ],
  },
];

const colorClasses: Record<string, { border: string; badge: string; accent: string }> = {
  red: { border: "border-red-700/50 hover:border-red-500", badge: "bg-red-900/30 border-red-700 text-red-300", accent: "text-red-400" },
  amber: { border: "border-amber-700/50 hover:border-amber-500", badge: "bg-amber-900/30 border-amber-700 text-amber-300", accent: "text-amber-400" },
  orange: { border: "border-orange-700/50 hover:border-orange-500", badge: "bg-orange-900/30 border-orange-700 text-orange-300", accent: "text-orange-400" },
  green: { border: "border-green-700/50 hover:border-green-500", badge: "bg-green-900/30 border-green-700 text-green-300", accent: "text-green-400" },
  blue: { border: "border-blue-700/50 hover:border-blue-500", badge: "bg-blue-900/30 border-blue-700 text-blue-300", accent: "text-blue-400" },
};

export default function PagePathology() {
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const category = selected ? categories.find((c) => c.id === selected) : null;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>Hallazgos Patológicos</h1>
        <p className="text-slate-400 text-sm">Patrones de imagen, perlas diagnósticas y modalidad de elección por categoría</p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {categories.map((c) => {
          const col = colorClasses[c.color] || colorClasses.blue;
          return (
            <button
              key={c.id}
              onClick={() => { setSelected(c.id); setExpanded(null); }}
              className={`p-4 rounded-xl border bg-slate-900/40 text-left transition-all ${col.border} ${selected === c.id ? "ring-1 ring-offset-0 ring-slate-600" : ""}`}
            >
              <span className="text-2xl">{c.icon}</span>
              <div className="mt-2 font-bold text-sm text-slate-100">{c.name}</div>
              <div className="text-xs text-slate-500 mt-0.5">{c.entities.length} entidades</div>
            </button>
          );
        })}
      </div>

      {category && (
        <div className="space-y-3">
          <h2 className="text-slate-400 text-xs font-mono uppercase tracking-widest">{category.icon} {category.name}</h2>
          {category.entities.map((entity) => {
            const col = colorClasses[category.color] || colorClasses.blue;
            const isOpen = expanded === entity.name;
            return (
              <div key={entity.name} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/30 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : entity.name)}
                >
                  <div className="flex items-start gap-4">
                    <span className={`text-xs font-mono px-2 py-1 rounded border ${col.badge} shrink-0 mt-0.5`}>
                      {entity.grade}
                    </span>
                    <div>
                      <div className="font-bold text-white text-base">{entity.name}</div>
                      <div className="text-slate-400 text-sm mt-1">{entity.desc}</div>
                    </div>
                  </div>
                  <span className={`text-slate-400 ml-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 space-y-4 border-t border-slate-800 pt-4">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-2">🔍 Hallazgos de imagen</div>
                      <p className="text-slate-300 text-sm leading-relaxed">{entity.imaging}</p>
                    </div>
                    <div className={`p-4 rounded-lg border ${col.badge}`}>
                      <div className="text-xs uppercase tracking-widest font-mono mb-1 opacity-70">💡 Perla diagnóstica</div>
                      <p className="text-sm leading-relaxed">{entity.pearls}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!selected && (
        <div className="text-center py-16 text-slate-500">
          <div className="text-5xl mb-4">🩺</div>
          <div className="text-sm">Selecciona una categoría para ver los hallazgos patológicos</div>
        </div>
      )}
    </div>
  );
}
