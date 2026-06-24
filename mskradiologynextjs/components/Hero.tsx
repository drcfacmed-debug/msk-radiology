import { C } from '@/lib/tokens';

const TICKER_ITEMS = [
  { tag: 'Radiology AI', title: 'Deep learning for ACL tear detection in knee MRI outperforms residents' },
  { tag: 'AJR', title: 'AI-based bone age assessment achieves radiologist-level accuracy on wrist Rx' },
  { tag: 'JMRI', title: 'Automated cartilage segmentation with nnU-Net in 3T knee RM: validation study' },
  { tag: 'ESSR Journal', title: 'Spectral CT iodine mapping quantifies synovitis in rheumatoid arthritis' },
  { tag: 'BJR', title: 'Fracture detection AI reduces missed findings in emergency Rx interpretation' },
  { tag: 'Radiology', title: 'Foundation models for musculoskeletal imaging: a systematic review' },
  { tag: 'ARD', title: 'Machine learning predicts progression to total knee replacement from RM features' },
];

const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function Hero() {
  return (
    <section id="inicio" style={{ background: `linear-gradient(140deg,${C.bg0} 0%,${C.bg1} 65%)`, paddingTop: 136, paddingBottom: 0 }}>
      <div className="wrap" style={{ paddingBottom: 72 }}>
        <div className="hero-layout">
          {/* Text column */}
          <div style={{ flex: 1 }}>
            {/* Live badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.bg3, padding: '5px 14px', borderRadius: 100, marginBottom: 28, border: `1px solid ${C.br}` }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: C.or, display: 'inline-block' }} />
              <span style={{ color: C.t1, fontSize: 11, fontWeight: 700, letterSpacing: '.06em' }}>EN VIVO · NUEVA SESIÓN DISPONIBLE</span>
            </div>

            <h1 style={{ fontSize: 'clamp(34px,5vw,64px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: 28, color: C.t1 }}>
              Aprende<br />
              <span style={{ color: C.or }}>radiología</span><br />
              MSK con expertos
            </h1>
            <p style={{ color: C.t2, fontSize: 17, lineHeight: 1.75, maxWidth: 480, marginBottom: 44 }}>
              La Sociedad de Radiólogos de Imagen Musculoesquelética de Nuevo León ofrece formación estructurada en ultrasonido, TC, RM, radiografía, artro-RM, intervencionismo guiado por imagen y los últimos avances en{' '}
              <strong style={{ color: C.t1 }}>inteligencia artificial aplicada a la imagen MSK</strong>.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#educacion" style={{ background: C.or, color: '#fff', border: 'none', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>
                Ver programa →
              </a>
              <a href="#casos" style={{ background: 'transparent', color: C.t1, border: `1.5px solid ${C.br}`, padding: '14px 28px', borderRadius: 8, fontWeight: 500, fontSize: 15, textDecoration: 'none', display: 'inline-block' }}>
                Casos de la semana
              </a>
            </div>

            {/* Stats */}
            <div className="stats-row" style={{ marginTop: 52 }}>
              {[['6', 'Módulos de imagen'], ['32', 'Casos MSK'], ['2026–27', 'Congresos activos']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 34, fontWeight: 800, color: C.t1, letterSpacing: '-0.03em' }}>{n}</div>
                  <div style={{ fontSize: 13, color: C.t2, fontWeight: 500, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="hero-img scan-bg" style={{
            flex: '0 0 460px', borderRadius: 16, height: 400,
            background: `radial-gradient(ellipse 70% 80% at 50% 50%,#1a3a4a 0%,#07161f 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${C.br}`, position: 'relative', overflow: 'hidden',
          }}>
            {/* DICOM corner annotations */}
            {[['top:12px;left:14px', 'T2 FATSAT · 3.0T'], ['top:12px;right:14px', 'TR/TE 4200/85'], ['bottom:12px;left:14px', 'FOV 16×16 cm'], ['bottom:12px;right:14px', 'SRIM · MSK']].map(([pos, text]) => (
              <span key={text} style={{ position: 'absolute', ...Object.fromEntries(pos.split(';').map(s => { const [k,v]=s.split(':'); return [k,v]; })), fontFamily: 'monospace', fontSize: 9, color: 'rgba(180,220,255,.45)', letterSpacing: '.04em' }}>
                {text}
              </span>
            ))}
            <span style={{ fontFamily: 'monospace', fontSize: 13, color: C.t3, textAlign: 'center', lineHeight: 2 }}>
              imagen radiológica MSK<br />RM · TC · US
            </span>
          </div>
        </div>
      </div>

      {/* Publications ticker */}
      <div style={{ borderTop: `1px solid ${C.br}`, background: C.bg1, padding: '12px 0' }}>
        <div className="ticker-wrap">
          <div className="news-track">
            {doubled.map((item, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', padding: '0 12px' }}>
                <span style={{ background: C.or, color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 3, letterSpacing: '.06em' }}>{item.tag}</span>
                <span style={{ fontSize: 13, color: C.t2 }}>{item.title}</span>
                <span style={{ color: C.br, fontSize: 14 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
