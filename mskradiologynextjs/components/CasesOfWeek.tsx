import type { Case } from '@/lib/data/cases';
import { C } from '@/lib/tokens';

const SRC_CLR: Record<string, string> = {
  Radiopaedia:  '#e04444',
  RadioGraphics: '#2080c0',
  EPOS:          '#22aa66',
};

const MOD_BG: Record<string, string> = {
  RM:      'radial-gradient(ellipse 60% 75% at 50% 50%,#1a3a4a 0%,#07161f 100%)',
  TC:      'linear-gradient(160deg,#0f2230 0%,#1a3040 45%,#071520 100%)',
  US:      'radial-gradient(circle at 50% 35%,#172a3a 0%,#0a1822 55%,#040d14 100%)',
  Rx:      'radial-gradient(ellipse 80% 90% at 50% 55%,#1c2e3a 0%,#060f16 100%)',
  ArtroRM: 'radial-gradient(ellipse 55% 65% at 50% 50%,#18284a 0%,#060c1e 100%)',
};

interface Props { cases: Case[]; }

export default function CasesOfWeek({ cases }: Props) {
  const today = new Date();
  const mon   = new Date(today); mon.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const sun   = new Date(mon);   sun.setDate(mon.getDate() + 6);
  const fmt   = (d: Date) => d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
  const wkLbl = `${fmt(mon)}–${fmt(sun)} ${sun.getFullYear()}`;

  return (
    <section id="casos" style={{ background: C.bg0, paddingTop: 80, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Casos de la semana</span>
            <h2 style={{ fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, color: C.t1 }}>
              Aprendizaje por imagen MSK
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.bg3, border: `1px solid ${C.br}`, padding: '7px 16px', borderRadius: 100 }}>
            <span style={{ fontSize: 12, color: C.t2 }}>📅 Semana del {wkLbl}</span>
          </div>
        </div>

        <div className="g-mods">
          {cases.map((c, i) => (
            <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
              className="fade-up" style={{ display: 'block', textDecoration: 'none', transitionDelay: `${i * 80}ms` }}>
              <div className="card" style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 12, overflow: 'hidden', height: '100%' }}>
                {/* Modality header */}
                <div style={{ height: 160, background: MOD_BG[c.mod] || MOD_BG.RM, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 32, fontWeight: 800, color: 'rgba(160,210,255,.10)' }}>{c.mod}</div>
                  <div style={{ position: 'absolute', top: 10, left: 10, background: C.or, padding: '3px 10px', borderRadius: 4, fontSize: 10, fontWeight: 800, color: '#fff' }}>{c.mod}</div>
                  <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)', padding: '3px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700, color: SRC_CLR[c.src] || C.t2 }}>{c.src}</div>
                  <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(4px)', padding: '3px 8px', borderRadius: 4, fontSize: 9, color: 'rgba(180,220,255,.65)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.caseId}</div>
                </div>
                {/* Card body */}
                <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ fontSize: 10, color: C.t3, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>{c.region}</span>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.t1, lineHeight: 1.35 }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: C.t3, fontStyle: 'italic', lineHeight: 1.4 }}>{c.authors}</div>
                  <div style={{ fontSize: 12, color: C.t2, lineHeight: 1.65, borderTop: `1px solid ${C.br}`, paddingTop: 8, marginTop: 2 }}>{c.finding}</div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 4 }}>
                    <span style={{ color: C.or, fontSize: 12, fontWeight: 700 }}>Ver caso →</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
