import { C } from '@/lib/tokens';

const REGIONS = [
  { region:'Hombro',  first:'US',  mods:['US','RM','ArtroRM'],     pathos:['Manguito rotador','Inestabilidad','SLAP','Calcificaciones'] },
  { region:'Rodilla', first:'RM',  mods:['RM','Rx','US','TC'],     pathos:['Meniscos','Ligamentos','OCD','Platillo tibial'] },
  { region:'Cadera',  first:'Rx',  mods:['Rx','RM','US'],          pathos:['AVN','FAI','Labrum','DDC'] },
  { region:'Tobillo', first:'Rx',  mods:['Rx','RM','US'],          pathos:['ATFL','Aquiles','Peroneos','Lisfranc'] },
  { region:'Columna', first:'Rx',  mods:['Rx','RM','TC'],          pathos:['Disco','Estenosis','Fractura','Tumor'] },
  { region:'Muñeca',  first:'Rx',  mods:['Rx','RM','ArtroRM'],     pathos:['TFCC','Escafoides','De Quervain','STC'] },
  { region:'Pie',     first:'Rx',  mods:['Rx','RM','US'],          pathos:['Fascitis plantar','Morton','Estrés','Lisfranc'] },
  { region:'Codo',    first:'Rx',  mods:['Rx','US','RM'],          pathos:['Epicondilitis','Bíceps distal','Cúbito del tenista','Atrapamiento nervioso'] },
];

const MOD_CLR: Record<string, string> = {
  US: '#2aa8c8', RM: '#e06830', TC: '#6a9fe0', Rx: '#88b87a', ArtroRM: '#c07ad6',
};

export default function MSKGuide() {
  return (
    <section id="guia" style={{ background: C.bg1, paddingTop: 80, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="fade-up" style={{ marginBottom: 48 }}>
          <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Referencia rápida</span>
          <h2 style={{ fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, color: C.t1 }}>Guía de imagen musculoesquelética</h2>
          <p style={{ color: C.t2, fontSize: 15, lineHeight: 1.75, maxWidth: 560, marginTop: 12 }}>Protocolo de primera línea por región anatómica. La modalidad destacada es la elección inicial recomendada.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
          {REGIONS.map((r, i) => (
            <div key={r.region} className="fade-up" style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 12, padding: '22px 22px 18px', display: 'flex', flexDirection: 'column', gap: 14, transitionDelay: `${i * 50}ms` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: 17, color: C.t1 }}>{r.region}</span>
                <span style={{ background: MOD_CLR[r.first] || C.or, color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 4 }}>{r.first} primero</span>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {r.mods.map((m, j) => (
                  <span key={m} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 4, background: j === 0 ? `${MOD_CLR[m]}22` : C.bg2, color: j === 0 ? MOD_CLR[m] : C.t3, border: j === 0 ? `1px solid ${MOD_CLR[m]}44` : `1px solid ${C.br}` }}>{m}</span>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${C.br}`, paddingTop: 12 }}>
                <p style={{ fontSize: 10, color: C.t3, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>Patologías clave</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {r.pathos.map(p => (
                    <span key={p} style={{ fontSize: 11, color: C.t2, background: C.bg2, padding: '2px 8px', borderRadius: 4, border: `1px solid ${C.br}` }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI note */}
        <div className="fade-up" style={{ marginTop: 40, background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: '#1a3a5c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: C.or, fontSize: 16 }}>⬡</span>
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: C.t1, marginBottom: 4 }}>Inteligencia Artificial en imagen MSK</p>
            <p style={{ fontSize: 13, color: C.t2, lineHeight: 1.65 }}>Modelos de aprendizaje profundo para detección de fracturas en Rx, segmentación de cartílago en RM, cuantificación sinovial en TC espectral y generación asistida de informes estructurados. SRIM integra estos avances en su programa de formación continua 2026–2027.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
