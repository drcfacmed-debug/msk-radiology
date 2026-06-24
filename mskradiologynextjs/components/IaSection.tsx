import { C } from '@/lib/tokens';

const TOOLS = [
  { name: 'NVIDIA MONAI',         desc: 'Marco de IA para segmentación de cartílago y tejidos blandos en RM de alto campo.',     tag: 'Segmentación', color: '#76b900' },
  { name: 'BoneAge AI',           desc: 'Estimación automatizada de edad ósea en radiografías de mano con nivel de radiólogo.', tag: 'Diagnóstico',   color: '#4ab4cc' },
  { name: 'Fracture Detection',   desc: 'Detección de fracturas ocultas en Rx de muñeca, cadera y columna con alta sensibilidad.',  tag: 'Detección',    color: C.or },
  { name: 'TC Espectral + IA',    desc: 'Cuantificación de yodo sinovial en artritis reumatoide y espondiloartritis con PCD-CT.',  tag: 'Cuantificación', color: '#6a9fe0' },
  { name: 'Informe asistido',     desc: 'Generación asistida de informes estructurados en RM y TC musculoesquelética.',           tag: 'Informes',     color: '#c07ad6' },
  { name: 'US Nerve AI',          desc: 'Identificación automatizada de nervios periféricos en ecografía musculoesquelética.',    tag: 'Ultrasonido',  color: '#88b87a' },
];

const TIMELINE = [
  { year: '2024', event: 'SRIM integra módulos de IA en su currículo de formación MSK' },
  { year: '2025', event: 'Colaboración con centros de referencia para validación de algoritmos locales' },
  { year: '2026', event: 'Certificación en Radiología MSK asistida por IA — primer programa en Nuevo León' },
];

export default function IaSection() {
  return (
    <section id="ia-msk" style={{ background: C.bg0, paddingTop: 80, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="fade-up" style={{ marginBottom: 56 }}>
          <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Innovación tecnológica</span>
          <h2 style={{ fontSize: 'clamp(24px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, color: C.t1 }}>
            Inteligencia artificial en imagen MSK
          </h2>
          <p style={{ color: C.t2, fontSize: 16, lineHeight: 1.75, maxWidth: 640, marginTop: 14 }}>
            SRIM integra los últimos avances en aprendizaje profundo y visión por computadora aplicados a la radiología musculoesquelética, preparando a los especialistas del futuro.
          </p>
        </div>

        {/* Tools grid */}
        <div className="g-mods" style={{ marginBottom: 56 }}>
          {TOOLS.map((t, i) => (
            <div key={t.name} className="fade-up" style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 12, padding: '24px 22px', transitionDelay: `${i * 60}ms` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: `${t.color}22`, border: `1px solid ${t.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: t.color, fontSize: 18 }}>⬡</span>
                </div>
                <span style={{ background: `${t.color}22`, color: t.color, fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase', border: `1px solid ${t.color}33` }}>{t.tag}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.t1, marginBottom: 8 }}>{t.name}</div>
              <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.65 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="fade-up" style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 14, padding: '32px 36px' }}>
          <h3 style={{ fontWeight: 800, fontSize: 18, color: C.t1, marginBottom: 28, letterSpacing: '-0.02em' }}>Hoja de ruta SRIM · IA en MSK</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TIMELINE.map((item, i) => (
              <div key={item.year} style={{ display: 'flex', gap: 24, position: 'relative' }}>
                {/* Timeline rail */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 40 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: C.or, border: `2px solid ${C.bg3}`, zIndex: 1, flexShrink: 0 }} />
                  {i < TIMELINE.length - 1 && <div style={{ width: 2, flex: 1, background: C.br, margin: '4px 0' }} />}
                </div>
                <div style={{ paddingBottom: i < TIMELINE.length - 1 ? 24 : 0 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 12, color: C.or, fontWeight: 700, marginBottom: 4 }}>{item.year}</div>
                  <div style={{ fontSize: 14, color: C.t2, lineHeight: 1.6 }}>{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
