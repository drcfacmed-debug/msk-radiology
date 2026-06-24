import { C } from '@/lib/tokens';

const PILLARS = [
  { n:'Educación continua',      d:'Contenido actualizado en todos los métodos de imagen MSK, orientado a residentes y especialistas de Nuevo León.' },
  { n:'Investigación',           d:'Apoyo a proyectos de investigación en radiología MSK, con enlaces a convocatorias nacionales e internacionales.' },
  { n:'Intervencionismo',        d:'Formación en procedimientos guiados por imagen: infiltraciones, biopsias y drenajes percutáneos.' },
  { n:'Inteligencia Artificial', d:'Exploración y enseñanza de los últimos modelos de IA aplicados a la imagen musculoesquelética.' },
];

export default function About() {
  return (
    <section id="acerca" style={{ background: C.bg1, paddingTop: 80, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="fade-up g-about">
          <div>
            <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Acerca de</span>
            <h2 style={{ fontSize: 'clamp(24px,2.8vw,40px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, marginBottom: 20, color: C.t1 }}>
              Sociedad de Radiólogos de Imagen Musculoesquelética
            </h2>
            <p style={{ color: C.t2, fontSize: 16, lineHeight: 1.8, marginBottom: 16 }}>
              SRIM reúne a especialistas en radiología musculoesquelética del Estado de Nuevo León comprometidos con la formación continua, la investigación y el avance clínico.
            </p>
            <p style={{ color: C.t2, fontSize: 16, lineHeight: 1.8, marginBottom: 32 }}>
              Nuestra plataforma integra educación estructurada, casos clínicos semanales, convocatorias de investigación y los últimos avances en inteligencia artificial aplicada a la imagen del aparato locomotor.
            </p>
            <a href="mailto:contacto@srim.org.mx"
              style={{ color: C.or, border: `1.5px solid ${C.or}`, padding: '11px 28px', borderRadius: 6, fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
              Contactar →
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PILLARS.map((p, i) => (
              <div key={i} className="fade-up" style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 10, padding: '18px 20px', transitionDelay: `${i * 80}ms` }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.t1, marginBottom: 6 }}>{p.n}</div>
                <div style={{ fontSize: 13, color: C.t2, lineHeight: 1.65 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
