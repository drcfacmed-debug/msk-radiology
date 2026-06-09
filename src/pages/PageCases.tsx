import { useState } from "react";

const cases = [
  {
    id: 1,
    title: "Dolor de rodilla agudo post-trauma deportivo",
    region: "Rodilla",
    modality: "RM",
    age: "24 años, M",
    context: "Futbolista que refiere dolor agudo en rodilla derecha tras giro brusco durante partido. Rodilla en valgo al momento del trauma. Derrame articular inmediato. Inestabilidad al examen físico.",
    findings: [
      "Discontinuidad completa del LCA en su tercio proximal con señal heterogénea en el muñón",
      "Contusión ósea en cóndilo femoral lateral y platillo tibial posterolateral (patrón 'beso')",
      "Desgarro del cuerno posterior del menisco medial (señal grado III que alcanza superficie inferior)",
      "Derrame articular moderado",
      "LCP y LCM íntegros",
    ],
    diagnosis: "Rotura completa del LCA + desgarro meniscal medial + contusión ósea",
    teaching: [
      "El patrón de contusión ósea cóndilo lateral + platillo tibial posterolateral es patognomónico del mecanismo de rotura del LCA por valgo-rotación interna",
      "Hasta el 70% de roturas de LCA asocian lesión meniscal, siendo el cuerno posterior del menisco medial el más frecuente",
      "El LCA debe evaluarse en el plano sagital oblicuo paralelo al ligamento; un LCA horizontal u ondulado sugiere rotura crónica con cicatrización",
      "La presencia de signo del 'cajón anterior' en RM (desplazamiento anterior de la tibia respecto al fémur) confirma incompetencia del LCA",
    ],
    answer: "Rotura LCA + Menisco medial",
    difficulty: "Intermedio",
    color: "cyan",
  },
  {
    id: 2,
    title: "Dolor de cadera en adulto mayor con limitación funcional",
    region: "Cadera",
    modality: "RX + RM",
    age: "68 años, F",
    context: "Paciente femenina de 68 años con osteoporosis conocida que consulta por dolor progresivo en cadera derecha de 3 semanas de evolución, sin trauma previo. Dificultad para caminar. Analítica: PCR y VSG normales.",
    findings: [
      "RX simple: normal (sin fractura visible)",
      "RM T1: banda hipointensa subarticular en cabeza femoral superior",
      "RM STIR: edema difuso en cabeza y cuello femoral",
      "Sin colapso articular, con preservación de la esfericidad de la cabeza",
      "Sin derrame articular significativo",
    ],
    diagnosis: "Fractura de estrés subcapital del cuello femoral / Necrosis avascular estadio precoz",
    teaching: [
      "La RX normal no excluye fractura de cuello femoral oculta: hasta el 20% no son visibles en la primera radiografía",
      "La RM es el estándar de oro para diagnóstico de fractura oculta de cuello femoral, con sensibilidad >99%",
      "La necrosis avascular (NAV) en estadio I-II de Ficat también puede presentar RX normal con RM alterada",
      "En la práctica: RX normal + dolor de cadera en paciente con osteoporosis → RM urgente antes de permitir la deambulación",
      "La banda de baja señal en T1 representa la zona de fractura o el halo de demarcación vascular en NAV",
    ],
    answer: "Fractura oculta cuello femoral",
    difficulty: "Avanzado",
    color: "blue",
  },
  {
    id: 3,
    title: "Dolor crónico de hombro en trabajador de construcción",
    region: "Hombro",
    modality: "RM",
    age: "52 años, M",
    context: "Trabajador de construcción con dolor en hombro derecho de 8 meses de evolución, que empeora con el trabajo por encima de la cabeza. Debilidad progresiva en abducción. Atrofia visible del músculo supraespinoso.",
    findings: [
      "Rotura completa del tendón supraespinoso con brecha de 2 cm",
      "Retracción del extremo muscular hasta el nivel de la articulación acromioclavicular",
      "Infiltración grasa del músculo supraespinoso: Goutallier grado 3",
      "Atrofia del músculo infraespinoso con grado 2 de Goutallier",
      "Artrosis acromioclavicular con acromion tipo III (ganchoso)",
      "Bursa subacromial con moderada cantidad de líquido",
    ],
    diagnosis: "Rotura completa masiva del manguito rotador con atrofia y degeneración grasa muscular avanzada",
    teaching: [
      "La clasificación de Goutallier evalúa la infiltración grasa muscular: grado 0 (normal) a grado 4 (>50% de grasa). Grado ≥3 indica mal pronóstico quirúrgico",
      "La atrofia del supraespinoso se mide con el índice de ocupación (tangent sign) en corte sagital",
      "El acromion tipo III (ganchoso) se asocia a roturas del manguito por impingement subacromial crónico",
      "Las roturas masivas (>5cm o 2 tendones) tienen alta tasa de nueva rotura post-reparación; la decisión quirúrgica depende de la funcionalidad del músculo",
      "El liquid sign (líquido en bursa + comunicación articular) confirma rotura de espesor completo sin necesidad de contraste",
    ],
    answer: "Rotura masiva manguito + Goutallier 3",
    difficulty: "Avanzado",
    color: "teal",
  },
  {
    id: 4,
    title: "Niño con dolor en tibia distal sin trauma previo",
    region: "Pierna",
    modality: "RX + RM",
    age: "12 años, M",
    context: "Escolar de 12 años con dolor progresivo en pierna derecha distal de 6 semanas de evolución. Fiebre de 38°C, sin trauma previo. Leucocitosis con desviación izquierda. PCR elevada. Examen: calor local y dolor a la palpación.",
    findings: [
      "RX: sutil reacción perióstica laminar en tibia distal (hallazgo tardío)",
      "RM T1: señal baja en metáfisis distal de tibia y fisis",
      "RM STIR: edema intramedular extenso con centro necrótico",
      "Colección subperióstica medial de 2 cm",
      "Edema de partes blandas periféricas",
      "Sin comunicación articular",
    ],
    diagnosis: "Osteomielitis hematógena aguda de tibia distal con absceso subperióstico",
    teaching: [
      "La osteomielitis hematógena en niños afecta preferentemente la metáfisis por la disposición vascular en asa de horquilla con flujo lento",
      "La RM detecta osteomielitis 1–2 semanas antes que la RX convencional, con alta sensibilidad en STIR para edema intramedular",
      "El absceso subperióstico es indicación de drenaje quirúrgico urgente para prevenir necrosis ósea e infección articular séptica",
      "S. aureus es el germen más frecuente a cualquier edad. En recién nacidos también S. agalactiae; en adolescentes también N. gonorrhoeae",
      "El diagnóstico diferencial principal en niños es el sarcoma de Ewing: mismo patrón de imagen → biopsia si no hay respuesta a antibióticos en 48–72h",
    ],
    answer: "Osteomielitis aguda + absceso subperióstico",
    difficulty: "Avanzado",
    color: "red",
  },
  {
    id: 5,
    title: "Dolor lumbar crónico en adulto de mediana edad",
    region: "Columna lumbar",
    modality: "RM",
    age: "45 años, F",
    context: "Administradora de oficina con lumbociatalgia derecha de 4 meses de evolución. El dolor irradia hasta el pie siguiendo el territorio L5. Lasègue positivo a 40°. Sin déficit motor ni alteración de esfínteres.",
    findings: [
      "Hernia discal L4-L5 paramediena derecha con extrusión hacia el foramen",
      "Compresión de la raíz L5 derecha en el foramen y receso lateral",
      "Señal T2 disminuida del disco L4-L5 y L5-S1 (deshidratación)",
      "Preservación de la altura discal",
      "Sin compresión del saco dural",
      "Cambios de Modic tipo I en platillos adyacentes",
    ],
    diagnosis: "Hernia discal L4-L5 con compresión radicular L5 derecha",
    teaching: [
      "La hernia L4-L5 comprime la raíz L5 en el foramen (raíz de salida), mientras que L5-S1 afecta S1. La correlación clínico-radiológica es fundamental",
      "La extrusión migra craneal o caudalmente y puede comprimir raíces no esperables por nivel discal",
      "Los cambios de Modic tipo I (edema, hipointenso T1/hiperintenso T2) indican enfermedad discal activa e inflamatoria",
      "La indicación quirúrgica requiere: déficit neurológico progresivo, síndrome de cauda equina o fracaso de tratamiento conservador >6–12 semanas",
      "La RM con contraste diferencia hernia aguda (refuerzo periférico) de recurrente postquirúrgica (refuerzo central = tejido fibroso vs hernia)",
    ],
    answer: "Hernia discal L4-L5 + compromiso L5",
    difficulty: "Básico",
    color: "amber",
  },
  {
    id: 6,
    title: "Masa en muslo en adulto joven de crecimiento rápido",
    region: "Muslo",
    modality: "RM + TC",
    age: "35 años, M",
    context: "Adulto joven que nota masa en cara anterior del muslo derecho de 3 meses de evolución, de crecimiento rápido. Indolora inicialmente, ahora con dolor sordo. Sin trauma previo. Analítica sin alteraciones.",
    findings: [
      "RM: masa de 8x6x5 cm de señal heterogénea T2 alta, profunda a la fascia muscular",
      "RM T1: áreas de señal baja a intermedia con zonas de alta señal (hemorragia)",
      "Contraste Gd: refuerzo heterogéneo con áreas necróticas centrales",
      "Planos de separación con el vasto intermedio mal definidos",
      "TC: masa sin calcificaciones, sin invasión ósea",
      "TC tórax: sin metástasis pulmonares",
    ],
    diagnosis: "Sarcoma de tejidos blandos de alto grado (Sarcoma sinovial o Liposarcoma mixoide diferencial)",
    teaching: [
      "Regla de los 5 cm: toda masa de tejidos blandos >5 cm, profunda a la fascia o de crecimiento rápido requiere biopsia",
      "La señal T2 alta en RM es inespecífica; la heterogeneidad, necrosis y refuerzo irregular orientan a malignidad",
      "Las calcificaciones en sarcoma sinovial (30%) son un hallazgo radiológico importante. El liposarcoma tiene áreas de señal T1 alta",
      "El estadiaje incluye RM local + TC de tórax (pulmón = 1er sitio de metástasis) ± PET-TC",
      "La biopsia debe planificarse antes con el equipo quirúrgico para no contaminar los planos de resección",
    ],
    answer: "Sarcoma de tejidos blandos de alto grado",
    difficulty: "Avanzado",
    color: "indigo",
  },
  {
    id: 7,
    title: "Atleta con dolor en el talón post-entrenamiento",
    region: "Tobillo",
    modality: "ECO + RM",
    age: "28 años, F",
    context: "Corredora de maratón con dolor en talón derecho de 3 meses de evolución. Empeora al inicio de la marcha y mejora en calor. Masa palpable en la inserción del tendón de Aquiles. Sin trauma.",
    findings: [
      "ECO: engrosamiento del tendón de Aquiles (13mm vs 7mm contralateral) en zona de inserción",
      "ECO Doppler: hipervascularización en neovasos en cara anterior del tendón",
      "RM STIR: señal aumentada intratendinosa difusa en tercio distal",
      "RM: exóstosis de Haglund posterior (calcáneo prominente posterior)",
      "Bursitis retrocalcánea con colección de 8x5 mm",
      "Sin discontinuidad tendinosa: rotura parcial superficial <25%",
    ],
    diagnosis: "Tendinosis insercional de Aquiles + Bursitis retrocalcánea + Deformidad de Haglund",
    teaching: [
      "La triada de Haglund: exóstosis posterosuperior del calcáneo + bursitis retrocalcánea + tendinosis insercional de Aquiles",
      "El Doppler color detecta neovascularización (neoangiogénesis) en tendinosis activa, que predice respuesta a tratamiento",
      "La tendinosis de la zona media vs insercional tienen diferente tratamiento: la insercional es más difícil de tratar y a menudo requiere cirugía",
      "El umbral de espesor de Aquiles: >10 mm en modo B es patológico (normal 4–6 mm)",
      "La RM distingue tendinosis de rotura parcial: la rotura parcial muestra señal T2 que alcanza la superficie o gap",
    ],
    answer: "Tendinosis + Haglund + Bursitis retrocalcánea",
    difficulty: "Intermedio",
    color: "green",
  },
  {
    id: 8,
    title: "Dolor en muñeca tras caída con la mano extendida",
    region: "Muñeca",
    modality: "RX + TC",
    age: "22 años, M",
    context: "Joven que cayó sobre la mano extendida en dorsiflejión. Dolor en tabaquera anatómica. RX inicial reportada como normal. Persiste el dolor a las 2 semanas con carga.",
    findings: [
      "RX inicial: sin fractura visible (escafoides normal a primera vista)",
      "RX 2 semanas: sutil línea radiolucente en la cintura del escafoides",
      "TC: línea de fractura en cintura con mínimo desplazamiento (<1mm)",
      "Sin avascularidad del polo proximal en TC",
      "Alineación carpal normal (sin instabilidad escafolunar)",
    ],
    diagnosis: "Fractura de escafoides en cintura, no desplazada",
    teaching: [
      "El 20% de las fracturas de escafoides son invisibles en la radiografía inicial: dolor en tabaquera anatómica = fractura hasta demostrar lo contrario",
      "TC o RM son las modalidades de elección cuando la RX es negativa: RM para edema precoz (fractura reciente), TC para geometría y planificación quirúrgica",
      "El polo proximal del escafoides tiene irrigación retrógrada: fracturas proximales tienen riesgo alto de NAV",
      "Clasificación Herbert determina el tratamiento: tipo A (estable) → yeso 8–12 semanas; tipo B (inestable) → cirugía",
      "La seudoartrosis del escafoides es consecuencia de diagnóstico tardío o tratamiento inadecuado → colapso carpal SNAC (Scaphoid Non-union Advanced Collapse)",
    ],
    answer: "Fractura de escafoides oculta",
    difficulty: "Básico",
    color: "cyan",
  },
];

const difficultyColor: Record<string, string> = {
  Básico: "bg-green-900/30 border-green-700 text-green-300",
  Intermedio: "bg-amber-900/30 border-amber-700 text-amber-300",
  Avanzado: "bg-red-900/30 border-red-700 text-red-300",
};

const colorAccent: Record<string, string> = {
  cyan: "border-cyan-700",
  blue: "border-blue-700",
  teal: "border-teal-700",
  red: "border-red-700",
  amber: "border-amber-700",
  indigo: "border-indigo-700",
  green: "border-green-700",
};

export default function PageCases() {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const reveal = (id: number) => setRevealed((prev) => new Set([...prev, id]));
  const c = cases.find((x) => x.id === selected);

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>Casos Clínicos</h1>
        <p className="text-slate-400 text-sm">Historia clínica, hallazgos de imagen y diagnóstico dirigido. Intenta llegar al diagnóstico antes de revelar la respuesta.</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Case list */}
        <div className="w-full shrink-0 lg:w-60">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">Casos ({cases.length})</div>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:block lg:space-y-2">
            {cases.map((cas) => (
              <button
                key={cas.id}
                onClick={() => setSelected(cas.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  selected === cas.id
                    ? colorAccent[cas.color] + " bg-slate-800"
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-slate-400">Caso {cas.id}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded border font-mono ${difficultyColor[cas.difficulty]}`}>
                    {cas.difficulty}
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-200 leading-tight">{cas.region}</div>
                <div className="text-xs text-slate-500 mt-0.5">{cas.modality} · {cas.age}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Case detail */}
        <div className="flex-1 min-w-0">
          {!c ? (
            <div className="text-center py-20 text-slate-500">
              <div className="text-5xl mb-4">📋</div>
              <div className="text-sm">Selecciona un caso clínico para comenzar</div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Header */}
              <div className={`bg-slate-900/60 border rounded-2xl p-5 ${colorAccent[c.color]}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex gap-2 items-center mb-2">
                      <span className={`text-xs px-2 py-1 rounded border font-mono ${difficultyColor[c.difficulty]}`}>{c.difficulty}</span>
                      <span className="text-xs bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded font-mono">{c.modality}</span>
                      <span className="text-xs text-slate-500 font-mono">{c.age}</span>
                    </div>
                    <h2 className="text-lg font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>{c.title}</h2>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{c.context}</p>
              </div>

              {/* Findings */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">🔍 Hallazgos de imagen</h3>
                <ul className="space-y-2">
                  {c.findings.map((f, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                      <span className="text-cyan-400 font-mono shrink-0">{i + 1}.</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diagnosis reveal */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">🏥 Diagnóstico</h3>
                {!revealed.has(c.id) ? (
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-4 text-slate-600 italic text-sm">
                      ¿Cuál es tu diagnóstico? Reflexiona antes de revelar la respuesta…
                    </div>
                    <button
                      onClick={() => reveal(c.id)}
                      className="px-5 py-3 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg text-sm font-semibold transition-colors shrink-0"
                    >
                      Revelar diagnóstico
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 bg-green-900/20 border border-green-700/50 rounded-xl">
                      <div className="text-xs uppercase tracking-widest text-green-500 font-mono mb-1">✅ Diagnóstico final</div>
                      <div className="text-white font-bold text-base">{c.diagnosis}</div>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-2">💡 Puntos de aprendizaje</h4>
                      <div className="space-y-2">
                        {c.teaching.map((t, i) => (
                          <div key={i} className="flex gap-3 p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg">
                            <span className="text-amber-400 font-mono text-xs shrink-0 w-5">{i + 1}.</span>
                            <p className="text-slate-300 text-sm leading-relaxed">{t}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
