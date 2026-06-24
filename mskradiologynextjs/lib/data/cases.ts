export type Case = {
  mod: string;
  region: string;
  src: string;
  caseId: string;
  title: string;
  authors: string;
  finding: string;
  url: string;
};

export const CASES: Case[] = [
  // ── EPOS ECR 2026 ──────────────────────────────────────────────────────────
  { mod:'RM', region:'Rodilla', src:'EPOS', caseId:'ECR 2026 · C-20201',
    title:'Cuantificación del alineamiento de colágeno en el LCA mediante Magic Angle Directional Imaging',
    authors:'Humphreys DM, Amiras D, Lanz H, Gupte C, Mcginley J, Chappell K, Ristic M',
    finding:'El MADI-RM revela la orientación del colágeno en el LCA con precisión milimétrica, diferenciando fibras funcionalmente activas de zonas degeneradas sin necesidad de contraste.',
    url:'https://epos.myesr.org/poster/esr/ecr2026/C-20201' },
  { mod:'TC', region:'Mano', src:'EPOS', caseId:'ECR 2026 · C-21333',
    title:'Mapeo de yodo con TC de conteo de fotones (PCD-CT) en artritis de mano mediada por inmunidad',
    authors:'Horváth A, Ambrus A, Maurovich-Horvat P, Marton N',
    finding:'El mapeo de yodo con PCD-CT cuantifica la actividad inflamatoria sinovial en artritis reumatoide y psoriásica con mayor sensibilidad que la RM convencional.',
    url:'https://epos.myesr.org/poster/esr/ecr2026/C-21333' },
  { mod:'TC', region:'Hueso', src:'EPOS', caseId:'ECR 2026 · C-12957',
    title:'Abordaje paso a paso en imagenología de tumores óseos: simplificando lo complejo',
    authors:'Stoica F, Ghiea SL',
    finding:'Algoritmo diagnóstico estructurado que integra localización, zona de transición y matriz tumoral en Rx, TC y RM para caracterización diferencial de lesiones óseas.',
    url:'https://epos.myesr.org/poster/esr/ecr2026/C-12957' },
  // ── Radiopaedia ─────────────────────────────────────────────────────────────
  { mod:'RM', region:'Hombro', src:'Radiopaedia', caseId:'Radiopaedia · Artículo',
    title:'Lesión SLAP tipo II con extensión al tendón del supraespinoso',
    authors:'Frank G, Murphy A, Jones J · Radiopaedia contributors',
    finding:'Discontinuidad del labrum superior de 12 a 2 h con señal T2 elevada en la interfaz labro-glenoidal.',
    url:'https://radiopaedia.org/articles/slap-lesion' },
  { mod:'RM', region:'Rodilla', src:'Radiopaedia', caseId:'Radiopaedia · Artículo',
    title:'Rotura completa del LCA: signos primarios y secundarios en RM',
    authors:'El-Feky M, Jones J, Murphy A · Radiopaedia contributors',
    finding:'Discontinuidad de fibras con ángulo <45°. Contusión ósea posterolateral en plato tibial y cóndilo femoral lateral. Signo de la muesca de Segond.',
    url:'https://radiopaedia.org/articles/anterior-cruciate-ligament-tear' },
  { mod:'RM', region:'Cadera', src:'Radiopaedia', caseId:'Radiopaedia · Artículo',
    title:'Necrosis avascular de cabeza femoral – estadio III de Ficat-Arlet',
    authors:'Gaillard F, Jones J, Murphy A · Radiopaedia contributors',
    finding:'Signo del doble halo: banda interna grasa alta en T1 rodeada de banda esclerótica hipointensa en T1/T2 con colapso subcondral incipiente.',
    url:'https://radiopaedia.org/articles/avascular-necrosis-of-the-femoral-head' },
  // ── RadioGraphics ───────────────────────────────────────────────────────────
  { mod:'TC', region:'Tobillo', src:'RadioGraphics', caseId:'RadioGraphics · RSNA',
    title:'Fractura de Pilón tibial conminuta: clasificación y planificación quirúrgica con TC',
    authors:'RSNA RadioGraphics Educational Content',
    finding:'Clasificación de Rüedi-Allgöwer tipo III: trazo conminuto con impactación articular >2 mm. TC permite planificación de fijación interna diferida.',
    url:'https://pubs.rsna.org/journal/radiographics' },
  { mod:'Rx', region:'Pie', src:'RadioGraphics', caseId:'RadioGraphics · RSNA',
    title:'Lesión de Lisfranc: diagnóstico en proyecciones de carga bilateral',
    authors:'RSNA RadioGraphics Educational Content',
    finding:'Diástasis >2 mm del 1er–2do espacio metatarsal en AP con carga. Fragmento de Fleck en base del 2do metatarsiano como signo patognomónico.',
    url:'https://pubs.rsna.org/journal/radiographics' },
  // ── Casos adicionales ───────────────────────────────────────────────────────
  { mod:'US', region:'Hombro', src:'Radiopaedia', caseId:'Radiopaedia · Artículo',
    title:'Tendinitis calcificante del supraespinoso: ecografía y correlación radiológica',
    authors:'Jones J, Murphy A · Radiopaedia contributors',
    finding:'Depósito hiperecoico con sombra acústica posterior en la inserción troquitérea. Fase reabsortiva muestra aspecto pastoso sin sombra y flujo Doppler perilesional.',
    url:'https://radiopaedia.org/articles/calcific-tendinopathy' },
  { mod:'TC', region:'Rodilla', src:'Radiopaedia', caseId:'Radiopaedia · Artículo',
    title:'Fractura del platillo tibial tipo Schatzker II con hundimiento articular',
    authors:'El-Feky M, Jones J · Radiopaedia contributors',
    finding:'Trazo lateral con hundimiento articular >3 mm. TC multiplanar imprescindible para cuantificar impactación y planificar injerto óseo subcondroplástico.',
    url:'https://radiopaedia.org/articles/tibial-plateau-fracture' },
  { mod:'TC', region:'Hombro', src:'Radiopaedia', caseId:'Radiopaedia · Artículo',
    title:'Lesión de Bankart óseo: cuantificación del defecto glenoideo en TC 3D',
    authors:'Murphy A, Jones J · Radiopaedia contributors',
    finding:'Defecto anteroinferior del 25% de la glenoide en TC 3D (método de "mejor círculo"). Indicación quirúrgica de Latarjet por defecto engaging.',
    url:'https://radiopaedia.org/articles/bony-bankart-lesion' },
  { mod:'US', region:'Rodilla', src:'Radiopaedia', caseId:'Radiopaedia · Artículo',
    title:'Quiste de Baker complicado con rotura y extensión al compartimento posterior',
    authors:'Frank G, Murphy A · Radiopaedia contributors',
    finding:'Colección fusiforme entre gastrocnemio medial y semimembranoso. Rotura muestra patrón de "cola de cometa" con edema difuso en pantorrilla.',
    url:'https://radiopaedia.org/articles/popliteal-cyst' },
];

export function getCasesForWeek(): Case[] {
  const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const start   = (weekNum % Math.floor(CASES.length / 3)) * 3;
  return CASES.slice(start, start + 3);
}
