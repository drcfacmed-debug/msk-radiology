import { C } from '@/lib/tokens';

const SECTIONS = [
  { icon: '🔬', name: 'Casos clínicos',         desc: 'Presentación estructurada con imagen, hallazgos y diagnóstico diferencial.' },
  { icon: '📖', name: 'Artículos de revisión',  desc: 'Actualizaciones en técnica y protocolo por subespecialidad MSK.' },
  { icon: '⬡',  name: 'IA en imagen MSK',       desc: 'Aplicaciones de aprendizaje profundo y visión computacional en el aparato locomotor.' },
  { icon: '💉', name: 'Intervencionismo comentado', desc: 'Casos de procedimientos guiados por imagen con discusión de técnica.' },
];

export default function Magazine() {
  return (
    <section id="revista" style={{ background: C.bg1, paddingTop: 80, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="fade-up" style={{ marginBottom: 48 }}>
          <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Próximamente</span>
          <h2 style={{ fontSize: 'clamp(24px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, color: C.t1 }}>
            Revista SRIM
          </h2>
          <p style={{ color: C.t2, fontSize: 16, lineHeight: 1.75, maxWidth: 580, marginTop: 14 }}>
            Publicación orientada a la imagenología del sistema músculo-esquelético e inteligencia artificial. Casos clínicos, artículos de revisión y los últimos avances en IA aplicada al aparato locomotor.
          </p>
        </div>

        <div className="fade-up" style={{ display: 'flex', gap: 56, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Magazine cover SVG */}
          <div className="mag-cover" style={{ flex: '0 0 300px', maxWidth: '100%' }}>
            <svg viewBox="0 0 300 420" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
              {/* Background */}
              <rect width="300" height="420" fill="#081e2c" />
              <rect width="300" height="420" fill="url(#mag-grad)" opacity="0.7" />
              <defs>
                <radialGradient id="mag-grad" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="#1a3a5c" />
                  <stop offset="100%" stopColor="#040c14" />
                </radialGradient>
                <radialGradient id="bone-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e06830" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e06830" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid lines (DICOM-style) */}
              {[60,120,180,240,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="420" stroke="#2aa8c8" strokeWidth="0.3" strokeOpacity="0.12" />)}
              {[60,120,180,240,300,360,420].map(y => <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#2aa8c8" strokeWidth="0.3" strokeOpacity="0.12" />)}

              {/* Articular cross-section — RM style */}
              {/* Glow */}
              <ellipse cx="150" cy="200" rx="80" ry="80" fill="url(#bone-glow)" />
              {/* Outer ring — cortical bone */}
              <circle cx="150" cy="200" r="72" fill="none" stroke="#c8e0f0" strokeWidth="6" strokeOpacity="0.85" />
              {/* Cartilage layer (cian) */}
              <circle cx="150" cy="200" r="64" fill="none" stroke="#2aa8c8" strokeWidth="5" strokeOpacity="0.75" />
              {/* Medullary canal */}
              <ellipse cx="150" cy="200" rx="52" ry="50" fill="#0a1a28" />
              <ellipse cx="150" cy="200" rx="52" ry="50" fill="none" stroke="#4a7a8a" strokeWidth="1" strokeOpacity="0.5" />
              {/* Bone marrow pattern */}
              <ellipse cx="150" cy="200" rx="28" ry="26" fill="#1a3040" />
              <ellipse cx="150" cy="200" rx="14" ry="12" fill="#e06830" fillOpacity="0.6" />
              <ellipse cx="150" cy="200" rx="6"  ry="5"  fill="#e06830" fillOpacity="0.9" />

              {/* Neural network overlay */}
              {[[100,145],[200,145],[75,210],[225,210],[130,270],[170,270]].map(([x,y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="4" fill="none" stroke="#e06830" strokeWidth="1" strokeOpacity="0.5" />
                  <circle cx={x} cy={y} r="2" fill="#e06830" fillOpacity="0.6" />
                </g>
              ))}
              {/* Connections */}
              {[[100,145,200,145],[100,145,75,210],[200,145,225,210],[75,210,130,270],[225,210,170,270],[130,270,170,270],[100,145,130,270],[200,145,75,210]].map(([x1,y1,x2,y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e06830" strokeWidth="0.8" strokeOpacity="0.25" />
              ))}

              {/* DICOM annotations */}
              <text x="8"   y="16"  fontFamily="monospace" fontSize="7" fill="#2aa8c8" fillOpacity="0.7">T2 FATSAT · 3.0T</text>
              <text x="292" y="16"  textAnchor="end" fontFamily="monospace" fontSize="7" fill="#2aa8c8" fillOpacity="0.7">TR/TE 4200/85</text>
              <text x="8"   y="414" fontFamily="monospace" fontSize="7" fill="#2aa8c8" fillOpacity="0.7">FOV 16×16 cm</text>
              <text x="292" y="414" textAnchor="end" fontFamily="monospace" fontSize="7" fill="#2aa8c8" fillOpacity="0.7">SRIM · NL</text>

              {/* Measurement lines */}
              <line x1="78" y1="200" x2="222" y2="200" stroke="#2aa8c8" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="3,3" />
              <line x1="150" y1="128" x2="150" y2="272" stroke="#2aa8c8" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="3,3" />

              {/* AI Enhanced badge */}
              <rect x="8" y="360" width="80" height="18" rx="3" fill="#22aa66" fillOpacity="0.9" />
              <text x="48" y="372" textAnchor="middle" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="white">AI · Enhanced</text>

              {/* Gradient overlay bottom */}
              <defs>
                <linearGradient id="mag-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="55%" stopColor="#081e2c" stopOpacity="0" />
                  <stop offset="100%" stopColor="#081e2c" stopOpacity="1" />
                </linearGradient>
              </defs>
              <rect width="300" height="420" fill="url(#mag-fade)" />

              {/* Title block */}
              <rect x="0" y="340" width="300" height="80" fill="#081e2c" fillOpacity="0.95" />
              <line x1="20" y1="348" x2="280" y2="348" stroke="#e06830" strokeWidth="1.5" />
              <text x="20" y="368" fontFamily="Outfit, sans-serif" fontSize="20" fontWeight="800" fill="#e06830">SR</text>
              <text x="46" y="368" fontFamily="Outfit, sans-serif" fontSize="20" fontWeight="800" fill="white">IM</text>
              <text x="80" y="368" fontFamily="Outfit, sans-serif" fontSize="11" fontWeight="600" fill="#7aaabb"> · Revista MSK</text>
              <text x="20" y="390" fontFamily="monospace" fontSize="8" fill="#4a7a8a" letterSpacing="2">IMAGENOLOGÍA · INTELIGENCIA ARTIFICIAL</text>
              <text x="20" y="408" fontFamily="monospace" fontSize="8" fill="#4a7a8a">Vol. 1 · Nuevo León, México · 2026</text>
            </svg>
          </div>

          {/* Right column */}
          <div style={{ flex: 1, minWidth: 280 }}>
            {/* Coming soon badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a3d2a', border: '1px solid #5aab7a44', borderRadius: 100, padding: '5px 14px', marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5aab7a', display: 'inline-block' }} />
              <span style={{ color: '#5aab7a', fontSize: 11, fontWeight: 700, letterSpacing: '.06em' }}>EN DESARROLLO · PRÓXIMAMENTE</span>
            </div>

            <h3 style={{ fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 800, color: C.t1, letterSpacing: '-0.02em', marginBottom: 20 }}>
              Secciones planificadas
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
              {SECTIONS.map((s, i) => (
                <div key={i} style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 10, padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20, lineHeight: 1.2, color: C.or }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: C.t1, marginBottom: 4 }}>{s.name}</div>
                    <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.6 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Email capture */}
            <div style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 12, padding: '24px 22px' }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: C.t1, marginBottom: 6 }}>Sé el primero en saberlo</p>
              <p style={{ fontSize: 13, color: C.t2, marginBottom: 16, lineHeight: 1.6 }}>Recibe una notificación cuando la revista esté disponible.</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="email" placeholder="correo@ejemplo.com"
                  style={{ flex: 1, background: C.bg2, border: `1px solid ${C.br}`, borderRadius: 7, padding: '10px 14px', color: C.t1, fontSize: 14, fontFamily: 'Outfit,sans-serif', outline: 'none' }} />
                <button style={{ background: C.or, color: '#fff', border: 'none', padding: '10px 18px', borderRadius: 7, fontWeight: 700, fontSize: 14, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Notificarme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
