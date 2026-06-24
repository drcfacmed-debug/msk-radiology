import { C } from '@/lib/tokens';

const PROCS = [
  'Infiltraciones articulares ecoguiadas',
  'Bloqueos nerviosos periféricos',
  'Aspiración y lavado de calcificaciones',
  'Biopsia percutánea de lesiones óseas y partes blandas',
  'Drenaje de colecciones y quistes',
  'Proloterapia y PRP guiados por imagen',
  'Neuromodulación de nervios periféricos',
  'Artrocentesis diagnóstica y terapéutica',
];

export default function Interventional() {
  return (
    <section id="intervencionismo" style={{ background: C.bg0, paddingTop: 80, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="fade-up" style={{ display: 'flex', gap: 72, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Image placeholder */}
          <div style={{ flex: '0 0 420px', maxWidth: '100%', background: 'radial-gradient(ellipse 70% 80% at 50% 50%,#1a3a4a 0%,#07161f 100%)', borderRadius: 16, height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${C.br}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.05) 3px,rgba(0,0,0,.05) 4px)' }} />
            <span style={{ fontFamily: 'monospace', fontSize: 13, color: C.t3, textAlign: 'center', lineHeight: 2, position: 'relative' }}>
              procedimiento intervencionista<br />guiado por ultrasonido
            </span>
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Área especializada</span>
            <h2 style={{ fontSize: 'clamp(24px,2.8vw,40px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 12, marginBottom: 20, color: C.t1 }}>
              Intervencionismo MSK<br />guiado por imagen
            </h2>
            <p style={{ color: C.t2, fontSize: 16, lineHeight: 1.75, maxWidth: 440, marginBottom: 28 }}>
              Procedimientos diagnósticos y terapéuticos bajo guía ultrasonográfica. Formación práctica con supervisión de especialistas en el sistema locomotor.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PROCS.map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: C.or, fontSize: 13, lineHeight: 1 }}>▸</span>
                  <span style={{ fontSize: 14, color: C.t2 }}>{p}</span>
                </div>
              ))}
            </div>
            <a href="#educacion" style={{ display: 'inline-block', marginTop: 28, color: C.or, border: `1.5px solid ${C.or}`, padding: '11px 28px', borderRadius: 6, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
              Ver módulos →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
