import { C } from '@/lib/tokens';

const EVENTS = [
  { month:'NOV', day:'29–dic 3', year:'2026', location:'Chicago, EUA',    name:'RSNA Annual Meeting 2026',     org:'Radiological Society of North America',        highlight:true,  url:'https://www.rsna.org/annual-meeting' },
  { month:'TBD', day:'—',        year:'2027', location:'Nuevo León, Mx',  name:'Jornadas MSK Nuevo León 2027', org:'SRIM · Sociedad de Radiólogos MSK NL',          highlight:true,  url:'#acerca' },
  { month:'TBD', day:'—',        year:'2027', location:'México',           name:'Congreso Nacional FMRI 2027',  org:'Fed. Mexicana de Radiología e Imagen',          highlight:false, url:'https://www.fmri.org.mx' },
  { month:'JUN', day:'24–26',    year:'2027', location:'Bergen, Noruega', name:'ESSR Annual Meeting 2027',     org:'European Society of Musculoskeletal Radiology', highlight:false, url:'https://www.essr.org' },
  { month:'NOV', day:'14–18',    year:'2027', location:'Chicago, EUA',    name:'RSNA Annual Meeting 2027',     org:'Radiological Society of North America',        highlight:false, url:'https://www.rsna.org/annual-meeting' },
];

export default function Congresses() {
  return (
    <section id="congresos" style={{ background: C.bg0, paddingTop: 80, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Agenda</span>
            <h2 style={{ fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: 10, color: C.t1 }}>Congresos 2026–2027</h2>
          </div>
        </div>

        <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 0, border: `1px solid ${C.br}`, borderRadius: 10, overflow: 'hidden' }}>
          {EVENTS.map((e, i) => (
            <a key={i} href={e.url} target={e.url.startsWith('#') ? '_self' : '_blank'} rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'flex', gap: 24, alignItems: 'center', padding: '20px 28px', background: e.highlight ? C.bg3 : C.bg2, borderBottom: i < EVENTS.length - 1 ? `1px solid ${C.br}` : 'none', transition: 'background .15s' }}>
              {/* Date column */}
              <div style={{ textAlign: 'center', width: 52, flexShrink: 0 }}>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: C.or, fontWeight: 700, letterSpacing: '.1em' }}>{e.month}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, color: C.t1, fontWeight: 700 }}>{e.day}</div>
                <div style={{ fontFamily: 'monospace', fontSize: 10, color: C.t3 }}>{e.year}</div>
              </div>
              {/* Event info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.t1 }}>{e.name}</div>
                <div style={{ fontSize: 12, color: C.t2, marginTop: 3 }}>{e.org}</div>
              </div>
              <div style={{ fontSize: 12, color: C.t3, flexShrink: 0 }}>{e.location}</div>
              {e.highlight && (
                <div style={{ background: C.or, color: '#fff', fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 4, flexShrink: 0, letterSpacing: '.06em' }}>DESTACADO</div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
