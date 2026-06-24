import { C } from '@/lib/tokens';

const CALLS = [
  { tag:'Nacional',      org:'SRIM',                                       title:'Jornadas MSK Nuevo León 2027',  date:'Fecha por confirmar · 2027',    desc:'Primer encuentro de la Sociedad de Radiólogos de Imagen Musculoesquelética del Estado de Nuevo León.', accent:'#e06830', url:'#acerca' },
  { tag:'Nacional',      org:'Federación Mexicana de Radiología e Imagen', title:'Convocatoria FMRI 2027',        date:'Cierre por confirmar · 2027',   desc:'Trabajos originales en imagen musculoesquelética para el congreso nacional de radiología e imagen de México.', accent:'#4ab4cc', url:'https://www.fmri.org.mx' },
  { tag:'Internacional', org:'ISMS',                                        title:'ISMS Research Grant 2026',      date:'Cierre: oct 2026',              desc:'Beca internacional para proyectos de investigación en radiología musculoesquelética con reconocimiento mundial.', accent:'#5aab7a', url:'https://ismusg.org' },
];

const JOURNALS = [
  { abbr:'FMRI',  color:'#1a5fa8', name:'Fed. Mexicana de Radiología e Imagen',        short:'Federación nacional · Eventos y publicaciones',   url:'https://www.fmri.org.mx' },
  { abbr:'SMRI',  color:'#0b6b4a', name:'Soc. Mexicana de Radiología e Imagen',        short:'Sociedad nacional · Congresos y membresía',       url:'https://www.smri.org.mx' },
  { abbr:'CMRI',  color:'#7a2d5e', name:'Consejo Mexicano de Radiología e Imagen',     short:'Certificación y recertificación nacional',         url:'https://www.cmri.org.mx' },
  { abbr:'ARM',   color:'#b84c1a', name:'Anales de la Radiología México',              short:'Revista oficial indexada · Trabajos originales',   url:'https://www.medigraphic.com/cgi-bin/new/publicaciones.cgi?IDPUBLICACION=29' },
  { abbr:'FNRI',  color:'#3a5f8c', name:'Fed. Nacional de Radiólogos e Imagenólogos', short:'Cursos y congresos regionales',                    url:'https://fnriac.org.mx' },
  { abbr:'CIRI',  color:'#2d6b56', name:'Col. Mex. de Radiólogos Intervencionistas',  short:'Intervencionismo y terapia endovascular',          url:'https://ciri2026.com.mx' },
];

export default function Calls() {
  return (
    <section id="investigacion" style={{ background: C.bg1, paddingTop: 80, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="fade-up" style={{ marginBottom: 40 }}>
          <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Convocatorias</span>
          <h2 style={{ fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: 10, color: C.t1 }}>Investigación &amp; Congresos 2026–2027</h2>
        </div>

        <div className="g-calls" style={{ marginBottom: 56 }}>
          {CALLS.map((c, i) => (
            <a key={i} href={c.url} target={c.url.startsWith('#') ? '_self' : '_blank'} rel="noopener noreferrer"
              className="fade-up" style={{ textDecoration: 'none', transitionDelay: `${i * 80}ms` }}>
              <div style={{ background: C.bg2, borderTop: `3px solid ${c.accent}`, padding: '24px 22px', borderRadius: '0 0 10px 10px', height: '100%', transition: 'border-color .2s' }}>
                <span style={{ color: c.accent, fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>{c.tag}</span>
                <div style={{ fontWeight: 700, fontSize: 17, color: C.t1, marginTop: 10, marginBottom: 6 }}>{c.title}</div>
                <div style={{ color: C.t3, fontSize: 12, marginBottom: 10 }}>{c.date}</div>
                <div style={{ color: C.t2, fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>{c.desc}</div>
                <span style={{ color: c.accent, fontSize: 13, fontWeight: 700 }}>Ver más →</span>
              </div>
            </a>
          ))}
        </div>

        {/* Revistas & Sociedades */}
        <div className="fade-up" style={{ borderTop: `1px solid ${C.br}`, paddingTop: 52 }}>
          <div style={{ marginBottom: 28 }}>
            <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Directorio</span>
            <h3 style={{ fontSize: 'clamp(20px,2vw,28px)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: 10, color: C.t1 }}>Revistas &amp; Sociedades Mexicanas</h3>
          </div>
          <div className="g-calls">
            {JOURNALS.map((j, i) => (
              <a key={i} href={j.url} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block' }}>
                <div className="card" style={{ background: C.bg2, border: `1px solid ${C.br}`, borderRadius: 10, padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: j.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 16px ${j.color}55` }}>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: j.abbr.length > 3 ? 11 : 13 }}>{j.abbr}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: C.t1, marginBottom: 3, lineHeight: 1.3 }}>{j.name}</div>
                    <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.5 }}>{j.short}</div>
                  </div>
                  <span style={{ color: C.t3, fontSize: 18 }}>↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
