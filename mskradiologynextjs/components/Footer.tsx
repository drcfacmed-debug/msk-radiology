'use client';

import { useState } from 'react';
import LogoMark from './LogoMark';
import PrivacyModal from './PrivacyModal';
import { C } from '@/lib/tokens';

const COLS = [
  { title:'Educación',     links:[['Ultrasonido','#educacion'],['Tomografía','#educacion'],['Resonancia','#educacion'],['Radiografía','#educacion'],['Artro-RM','#educacion']] },
  { title:'Investigación', links:[['Convocatorias','#investigacion'],['Revistas MSK','#investigacion'],['FMRI','https://www.fmri.org.mx'],['SMRI','https://www.smri.org.mx'],['Anales de Radiología','https://www.medigraphic.com/cgi-bin/new/publicaciones.cgi?IDPUBLICACION=29']] },
  { title:'Plataforma',    links:[['Inicio','#inicio'],['Guía MSK','#guia'],['Quiz interactivo','#quiz'],['Casos de la semana','#casos'],['Congresos','#congresos']] },
];

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer style={{ background: C.bg1, borderTop: `1px solid ${C.br}`, paddingTop: 64, paddingBottom: 32 }}>
        <div className="wrap">
          <div className="g-footer" style={{ marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <LogoMark size={34} />
                <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: 16, letterSpacing: '-0.03em', color: C.t1 }}>
                  <span style={{ color: C.or }}>SR</span>IM
                </div>
              </div>
              <p style={{ color: C.t3, fontSize: 13, lineHeight: 1.8, maxWidth: 260, marginBottom: 16 }}>
                Sociedad de Radiólogos de Imagen Musculoesquelética del Estado de Nuevo León. Educación, investigación e intervencionismo MSK.
              </p>
              <button onClick={() => setShowPrivacy(true)}
                style={{ background: 'transparent', border: 'none', color: C.t3, fontSize: 12, cursor: 'pointer', padding: 0, textDecoration: 'underline', fontFamily: 'Outfit,sans-serif' }}>
                Aviso de Privacidad
              </button>
            </div>
            {COLS.map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: C.t1, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 16 }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                        style={{ fontSize: 13, color: C.t3, textDecoration: 'none', transition: 'color .15s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = C.t2)}
                        onMouseLeave={e => (e.currentTarget.style.color = C.t3)}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: `1px solid ${C.br}`, paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 13, color: C.t3 }}>© 2026 SRIM · Nuevo León, México</span>
            <span style={{ fontSize: 12, color: C.t3 }}>msk-radiology.vercel.app</span>
          </div>
        </div>
      </footer>

      {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
    </>
  );
}
