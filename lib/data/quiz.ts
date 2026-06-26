export type QuizCase = {
  mod: string;
  region: string;
  modality: string;
  stem: string;
  answer: string;
  distractors: string[];
  explanation: string;
};

export const QUIZ_POOL: QuizCase[] = [
  { mod:'RM', region:'Rodilla', modality:'RM · plano sagital DP',
    stem:'Futbolista de 28 años, dolor agudo tras giro con pie fijo. RM muestra discontinuidad de fibras con ángulo <45°, contusión ósea posterolateral en plato tibial y cóndilo femoral lateral.',
    answer:'Rotura completa del LCA',
    distractors:['Rotura del LCP','Rotura del menisco medial','Esguince del LCL grado III'],
    explanation:'La discontinuidad del LCA con patrón de contusión "kissing" en plato tibial y cóndilo lateral, más el ángulo <45°, son hallazgos patognomónicos de rotura completa del LCA.' },
  { mod:'US', region:'Hombro', modality:'Ecografía dinámica · corte longitudinal',
    stem:'Mujer de 55 años con dolor crónico en hombro. Ecografía muestra defecto hipoecoico focal en la inserción troquitérea del supraespinoso, sin flujo Doppler en zona lesional.',
    answer:'Rotura parcial del tendón supraespinoso',
    distractors:['Tendinitis calcificante','Bursitis subacromial aislada','Síndrome de pinzamiento interno'],
    explanation:'El defecto hipoecoico focal sin flujo Doppler indica rotura tendinosa parcial. La bursitis mostraría líquido bursal con hipervascularización perilesional.' },
  { mod:'Rx', region:'Pie', modality:'Radiografía AP con carga bilateral',
    stem:'Deportista de 32 años, traumatismo indirecto. AP con carga muestra diástasis de 2.5 mm entre 1er y 2do metatarsiano con fragmento óseo en la base del 2do metatarsiano.',
    answer:'Lesión de Lisfranc con fractura de Fleck',
    distractors:['Fractura de Jones','Fractura de estrés del 2do metatarsiano','Luxación metatarsofalángica'],
    explanation:'Diástasis >2 mm + fractura de Fleck (avulsión en base del 2do metatarsiano por el ligamento de Lisfranc) son hallazgos diagnósticos. TC confirma congruencia articular tarsometatarsal.' },
  { mod:'RM', region:'Cadera', modality:'RM · secuencia STIR coronal',
    stem:'Hombre de 45 años, usuario crónico de corticosteroides. Dolor inguinal progresivo. RM: banda hipointensa en T1 rodeada de edema en cabeza femoral, con colapso subcondral incipiente.',
    answer:'Necrosis avascular de cabeza femoral estadio III',
    distractors:['Coxartrosis primaria','Fractura de estrés subcondral','Sinovitis transitoria'],
    explanation:'El "signo del doble halo" (banda grasa interna + banda esclerótica hipointensa) más el colapso subcondral incipiente en paciente con corticosteroides = NAV estadio III de Ficat-Arlet.' },
  { mod:'TC', region:'Hombro', modality:'TC 3D · reconstrucción axial oblicua',
    stem:'Joven de 22 años con 4 luxaciones glenohumerales anteriores recidivantes. TC 3D muestra impactación ósea del 25% en cara posterolateral de la cabeza humeral.',
    answer:'Lesión de Hill-Sachs engaging',
    distractors:['Fractura de húmero proximal','Lesión de Bankart ósea','Quiste subarticular glenoideo'],
    explanation:'Impactación >20-25% del diámetro cefálico = Hill-Sachs "engaging". Guía la indicación de remplissage artroscópico o procedimiento de Latarjet según el defecto glenoideo asociado.' },
];

export function getQuizForWeek(): QuizCase[] {
  const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const start   = (weekNum % 2) * 5;
  return [...QUIZ_POOL.slice(start), ...QUIZ_POOL.slice(0, start)].slice(0, 5);
}
