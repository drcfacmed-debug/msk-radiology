import { C } from '@/lib/tokens';

const MODS = [
  { code:'US',      name:'Ultrasonido',          desc:'Evaluación dinámica en tiempo real de estructuras blandas, tendones y nervios periféricos.',       url:'https://radiopaedia.org/articles/musculoskeletal-ultrasound' },
  { code:'TC',      name:'Tomografía',            desc:'Reconstrucciones óseas y articulares multiplanares; TC espectral para mapeo de yodo sinovial.',     url:'https://radiopaedia.org/articles/computed-tomography-2' },
  { code:'RM',      name:'Resonancia magnética',  desc:'Resolución superior de cartílago, tendones, ligamentos y médula ósea con múltiples secuencias.',    url:'https://radiopaedia.org/articles/magnetic-resonance-imaging' },
  { code:'Rx',      name:'Radiografía simple',    desc:'Proyecciones estándar del esqueleto axial y apendicular; primera línea en traumatología.',          url:'https://radiopaedia.org/articles/plain-radiograph' },
  { code:'ArtroRM', name:'Artro-RM',              desc:'Estudio intraarticular con gadolinio paramagnético directo para lesiones labrales y cartilaginosas.', url:'https://radiopaedia.org/articles/mri-arthrography' },
  { code:'Int',     name:'Intervencionismo',      desc:'Procedimientos guiados por imagen en sistema locomotor: infiltraciones, biopsias y drenajes.',        url:'#intervencionismo' },
];

export default function Modalities() {
  return (
    <section id="educacion" style={{ background: C.bg1, paddingTop: 80, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: 52 }}>
          <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Métodos de imagen</span>
          <h2 style={{ fontSize: 'clamp(24px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, color: C.t1 }}>Especialidades del programa</h2>
        </div>
        <div className="g-mods">
          {MODS.map((m, i) => (
            <a key={m.code} href={m.url} target={m.url.startsWith('#') ? '_self' : '_blank'} rel="noopener noreferrer"
              className="fade-up" style={{ textDecoration: 'none', transitionDelay: `${i * 60}ms` }}>
              <div className="card" style={{ background: C.bg2, border: `1px solid ${C.br}`, borderRadius: 10, padding: '28px 24px', height: '100%' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 800, color: C.or, marginBottom: 12 }}>{m.code}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: C.t1, marginBottom: 8 }}>{m.name}</div>
                <div style={{ color: C.t2, fontSize: 13, lineHeight: 1.65 }}>{m.desc}</div>
                <div style={{ marginTop: 16, fontSize: 11, color: C.t3, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {m.url.startsWith('#') ? '↓ Ver sección' : '↗ Radiopaedia'}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
