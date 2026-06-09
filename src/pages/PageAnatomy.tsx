import { useState } from "react";

const regions = [
  {
    id: "columna",
    icon: "🦴",
    name: "Columna Vertebral",
    sub: "Cervical · Torácica · Lumbar",
    structures: ["Cuerpos vertebrales (C1–S5)", "Discos intervertebrales", "Pedículos y láminas", "Articulaciones facetarias", "Forámenes neurales", "Ligamentos longitudinales anterior/posterior", "Ligamento amarillo", "Médula espinal y cauda equina"],
    modalities: {
      rx: "Proyecciones AP y lateral en bipedestación. Proyecciones funcionales (flexo-extensión) para inestabilidad. Evaluar alineación, altura discal, platillos vertebrales y apófisis espinosas.",
      tc: "Elección para fracturas vertebrales complejas, estenosis de canal óseo y evaluación posquirúrgica con instrumentación. Reconstrucciones MPR multiplanares esenciales.",
      rm: "Modalidad de elección para médula espinal, discos, ligamentos, epidural y raíces nerviosas. Secuencias sagitales T1, T2 y STIR; axiales a nivel de patología.",
      eco: "Limitada; útil para guía de infiltraciones epidurales, facetarias y de nervios periféricos.",
    },
    keyFindings: ["Espondilosis: osteofitos, estrechamiento discal, esclerosis subcondral", "Hernia discal: protrusión, extrusión, secuestro", "Espondilolistesis: desplazamiento anterior del cuerpo vertebral", "Fractura por compresión: pérdida de altura del cuerpo vertebral"],
  },
  {
    id: "hombro",
    icon: "💪",
    name: "Hombro",
    sub: "Glenohumeral · Acromion · Manguito",
    structures: ["Cabeza humeral y glenoides", "Articulación acromioclavicular", "Manguito rotador (supraespinoso, infraespinoso, redondo menor, subescapular)", "Tendón del bíceps (porción larga)", "Labrum glenoideo anterior y posterior", "Bursa subacromial-subdeltoidea", "Ligamentos coracohumeral y glenohumeral"],
    modalities: {
      rx: "AP en rotación neutra, interna y externa; proyección outlet para espacio subacromial; Axial o Y escapular. Evaluar esclerosis del troquíter, calcificaciones tendinosas, morfología del acromion.",
      tc: "Artro-TC para lesiones de labrum y superficies articulares. TC simple para fracturas complejas de húmero proximal y planificación de prótesis.",
      rm: "Modalidad principal para manguito rotador (DP fat-sat coronal y axial), labrum (axial), tendón bíceps y colecciones bursales. Artro-RM para lesiones labrales menores.",
      eco: "Excelente para evaluación dinámica del manguito rotador, bursitis subacromial y tendón del bíceps. Guía de infiltraciones.",
    },
    keyFindings: ["Rotura del manguito: parcial (bursal/articular) o total", "Tendinosis del supraespinoso: señal heterogénea en RM", "SLAP lesion: desgarro del labrum superior", "Luxación glenohumeral: lesiones de Bankart y Hill-Sachs"],
  },
  {
    id: "rodilla",
    icon: "🦵",
    name: "Rodilla",
    sub: "Meniscos · LCA · LCP · Cartílago",
    structures: ["Menisco medial y lateral", "Ligamento cruzado anterior (LCA) y posterior (LCP)", "Ligamento colateral medial (LCM) y lateral (LCL)", "Cartílago articular (fémoro-tibial, fémoro-patelar)", "Tendón rotuliano y cuadricipital", "Bursa prerrotuliana y anserina", "Grasa de Hoffa"],
    modalities: {
      rx: "AP, lateral y axial de rótula. Evaluar espacio articular, osteofitos, calcificaciones (condrocalcinosis) y alineación fémoro-patelar.",
      tc: "Artro-TC para lesiones condrales y cuerpos libres. TC para fracturas complejas (tibial proximal, fémur distal).",
      rm: "Estándar de oro para meniscos (sagital y coronal DP fat-sat), ligamentos (sagital/coronal T1 y DP), cartílago (secuencias 3D). LCA evaluado en sagital oblicuo.",
      eco: "Evalúa tendones (rotuliano, cuadricipital), ligamentos colaterales, bursas y derrames. Guía de aspiración y artrocentesis.",
    },
    keyFindings: ["Rotura de LCA: discontinuidad, edema en huella tibial", "Desgarro meniscal: señal grado III que alcanza la superficie", "Condropatía: adelgazamiento y fisura del cartílago articular", "Quiste de Baker: colección en receso poplíteo medial"],
  },
  {
    id: "cadera",
    icon: "🦴",
    name: "Cadera",
    sub: "Cabeza femoral · Labrum · NAV",
    structures: ["Cabeza femoral y cuello", "Acetábulo y labrum acetabular", "Articulación sacroilíaca (relación)", "Ligamento redondo", "Tendones pelvitrocantéreos (glúteos, psoasilíaco)", "Bursa trocantérica e iliopectínea", "Nervio ciático (relación)"],
    modalities: {
      rx: "AP de pelvis y AP/lateral de cadera. Evaluar espacio articular, esfericidad de la cabeza femoral, ángulo cervicodiafisario y cobertura acetabular.",
      tc: "Útil para fracturas de acetábulo/cuello femoral y planificación preoperatoria de prótesis. Angulación y morfología en FAI (impingement femoroacetabular).",
      rm: "Modalidad de elección para necrosis avascular (NAV), lesiones del labrum, coxitis y evaluación de médula ósea. Protocolo con cortes axiales oblicuos.",
      eco: "Evalúa bursas (trocantérica, iliopectínea), tendones y derrames. Muy útil en pediatría (displasia de cadera DDH).",
    },
    keyFindings: ["NAV: banda subarticular en T1 baja señal, signo del doble halo en T2", "FAI tipo CAM: asferización de cabeza femoral (ángulo alfa >55°)", "FAI tipo PINCER: sobrecobertura acetabular (ángulo CE >40°)", "Fractura de cuello femoral: frecuente en osteoporosis"],
  },
  {
    id: "tobillo",
    icon: "🦶",
    name: "Tobillo y Pie",
    sub: "Ligamentos · Tendones · Huesos tarsos",
    structures: ["Articulación tibiotalar", "Ligamentos del complejo lateral (LPAA, LPC, LPA)", "Complejo deltoides (medial)", "Tendones peroneos (largo y corto)", "Tendón tibial posterior", "Tendón de Aquiles", "Subastragalino y articulaciones del mediopié", "Sesamoideos del primer radio"],
    modalities: {
      rx: "AP, lateral y oblicua (mortaja). Evaluar espacio articular, alineación talus-calcáneo, fracturas y exóstosis.",
      tc: "Fracturas complejas del calcáneo (índice de Böhler, ángulo de Gissane) y tarso. Planificación de artrodesis y osteotomías.",
      rm: "Ligamentos laterales, tendón de Aquiles, tibial posterior, peroneos. Evalúa médula ósea (edema, necrosis). Contraste para sinovitis.",
      eco: "Tendones peroneos (luxación, rotura), tendón de Aquiles (tendinosis, rotura parcial), ligamentos y cuerpos libres. Guía para infiltraciones.",
    },
    keyFindings: ["Rotura tendón de Aquiles: discontinuidad, hueco palpable", "Tendinosis tibial posterior: engrosamiento fusiforme y señal aumentada", "Fractura de calcáneo: pérdida ángulo de Böhler (<20°)", "Ligamentos laterales: engrosamiento o discontinuidad en esguince crónico"],
  },
  {
    id: "mano",
    icon: "✋",
    name: "Mano y Muñeca",
    sub: "Carpo · Tendones · Nervio mediano",
    structures: ["8 huesos del carpo (escafoides, semilunar, piramidal, pisiforme, trapecio, trapezoide, grande, ganchoso)", "Articulación radiocarpiana y mediocarpiana", "TFCC (Complejo fibrocartilaginoso triangular)", "Tendones flexores y extensores", "Nervio mediano (túnel del carpo)", "Nervio cubital (canal de Guyon)", "Ligamentos intercarpales (ESL, LTL)"],
    modalities: {
      rx: "PA, lateral y oblicua. Evalúa fracturas (escafoides, radio distal), luxaciones y artritis. Serie especial: proyección del túnel del carpo.",
      tc: "Elección para fracturas de escafoides ocultas y unión de carpos. Artro-TC para TFCC y ligamentos intercarpales.",
      rm: "TFCC (axial DP y coronal DP fat-sat), ligamentos intercarpales, médula ósea. 3T recomendado para lesiones pequeñas. Artro-RM mejora la sensibilidad.",
      eco: "Síndrome del túnel carpiano (sección transversal del nervio mediano), tenosinovitis, quistes ganglionares y reumatología (sinovitis).",
    },
    keyFindings: ["Fractura de escafoides: línea hipodensa en cintura; puede ser oculta en RX", "Lesión TFCC: señal aumentada en RM o paso de contraste en artro-RM", "Síndrome del túnel carpiano: área nervio mediano >10 mm² en ECO", "Artritis reumatoide: erosiones en huesos del carpo, sinovitis activa"],
  },
  {
    id: "codo",
    icon: "💪",
    name: "Codo",
    sub: "Epicóndilo · Ligamentos · UCL",
    structures: ["Articulación humeroulnar y humeroradial", "Ligamento colateral ulnar (UCL medial)", "Ligamento colateral radial (LCR lateral)", "Tendón del bíceps distal", "Tendones epicondíleos laterales (extensor común)", "Tendones epitrocleares mediales (flexor-pronador)", "Nervio cubital (surco epitroclear)", "Nervio interóseo posterior"],
    modalities: {
      rx: "AP y lateral estrictos. Evalúa fractura de cóndilo, cabeza radial (proyección oblicua específica), calcificaciones y cuerpos libres.",
      tc: "Cuerpos libres intraarticulares y fracturas de radio/coronoides. Artro-TC para cartílago.",
      rm: "Ligamento UCL (coronal oblicuo DP fat-sat), tendón del bíceps distal (axial y sagital), epicondilitis lateral (extensor común). Artro-RM para UCL parcial.",
      eco: "Epicondilitis lateral/medial, tendón bíceps distal, UCL medial y evaluación dinámica del nervio cubital en el surco.",
    },
    keyFindings: ["Epicondilitis lateral: engrosamiento del tendón extensor común con señal aumentada", "Rotura UCL: discontinuidad o señal en el ligamento colateral medial", "Osteocondritis disesecante: lesión condral del capitelo en adolescentes", "Atrapamiento nervio cubital: engrosamiento y edema perineural"],
  },
];

export default function PageAnatomy() {
  const [selected, setSelected] = useState("columna");
  const [modality, setModality] = useState<"rx" | "tc" | "rm" | "eco">("rm");

  const region = regions.find((r) => r.id === selected)!;

  const modLabels = { rx: "RX", tc: "TC", rm: "RM", eco: "ECO" };
  const modColors = {
    rx: "bg-cyan-900/30 border-cyan-700 text-cyan-300",
    tc: "bg-blue-900/30 border-blue-700 text-blue-300",
    rm: "bg-teal-900/30 border-teal-700 text-teal-300",
    eco: "bg-indigo-900/30 border-indigo-700 text-indigo-300",
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "Georgia, serif" }}>Anatomía Regional</h1>
        <p className="text-slate-400 text-sm">Estructuras clave y características por modalidad en cada región del aparato locomotor</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Region list */}
        <div className="w-full shrink-0 lg:w-52">
          <div className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">Región</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:block lg:space-y-1">
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all
                  ${selected === r.id
                    ? "bg-slate-800 border border-slate-600 text-white"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`}
              >
                <span>{r.icon}</span>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-slate-500 truncate">{r.sub}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center gap-3">
              <span className="text-3xl">{region.icon}</span>
              <div>
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "Georgia, serif" }}>{region.name}</h2>
                <p className="text-slate-400 text-xs">{region.sub}</p>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Structures */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">Estructuras anatómicas clave</h3>
                <div className="flex flex-wrap gap-2">
                  {region.structures.map((s) => (
                    <span key={s} className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              {/* Modality selector */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">Evaluación por modalidad</h3>
                <div className="flex gap-2 mb-4">
                  {(Object.keys(modLabels) as Array<"rx"|"tc"|"rm"|"eco">).map((m) => (
                    <button
                      key={m}
                      onClick={() => setModality(m)}
                      className={`px-4 py-2 rounded-lg text-sm font-mono border transition-all ${
                        modality === m ? modColors[m] : "border-slate-700 text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {modLabels[m]}
                    </button>
                  ))}
                </div>
                <div className={`p-4 rounded-xl border text-sm leading-relaxed text-slate-300 ${modColors[modality]}`}>
                  {region.modalities[modality]}
                </div>
              </div>

              {/* Key findings */}
              <div>
                <h3 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-3">Hallazgos clave a recordar</h3>
                <div className="space-y-2">
                  {region.keyFindings.map((f, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-slate-800/40 rounded-lg border border-slate-700/50">
                      <span className="text-cyan-400 font-bold font-mono text-xs w-5 shrink-0">{i + 1}.</span>
                      <p className="text-slate-300 text-sm leading-relaxed">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
