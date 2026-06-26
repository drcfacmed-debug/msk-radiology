'use client';

import { C } from '@/lib/tokens';

interface Props { onClose: () => void; }

const CLAUSES = [
  { n: 'I.   Responsable', text: 'La Sociedad de Radiólogos de Imagen Musculoesquelética del Estado de Nuevo León (SRIM), con domicilio en Monterrey, Nuevo León, México, es responsable del tratamiento de sus datos personales.' },
  { n: 'II.  Datos recabados', text: 'Recabamos nombre completo, correo electrónico, especialidad médica e institución de adscripción. No se recaban datos sensibles en los términos del artículo 3, fracción VI, de la LFPDPPP.' },
  { n: 'III. Finalidades', text: 'Sus datos se utilizan para: (a) acceso a la plataforma educativa; (b) envío de convocatorias y novedades académicas; (c) registro de progreso en módulos de formación; (d) expedición de constancias de participación.' },
  { n: 'IV.  Transferencias', text: 'Sus datos no se transfieren a terceros sin su consentimiento, salvo las excepciones previstas en el artículo 37 de la LFPDPPP (autoridades competentes o cumplimiento de obligaciones legales).' },
  { n: 'V.   Derechos ARCO', text: 'Tiene derecho a Acceder, Rectificar, Cancelar u Oponerse (ARCO) al tratamiento de sus datos. Para ejercerlos, envíe su solicitud a privacidad@srim.org.mx con identificación oficial adjunta. Responderemos en un plazo máximo de 20 días hábiles.' },
  { n: 'VI.  Cookies', text: 'Esta plataforma usa cookies técnicas para gestión de sesión y preferencias de visualización. No se utilizan cookies de seguimiento publicitario. Puede deshabilitarlas desde la configuración de su navegador, aunque esto puede afectar la funcionalidad.' },
  { n: 'VII. Cambios', text: 'SRIM se reserva el derecho de modificar este aviso. Cualquier cambio será notificado mediante la plataforma y, en su caso, al correo electrónico registrado, con un mínimo de 10 días naturales de anticipación.' },
  { n: 'VIII. Ley aplicable', text: 'El presente aviso se rige por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento, vigentes en los Estados Unidos Mexicanos.' },
];

export default function PrivacyModal({ onClose }: Props) {
  return (
    <div className="privacy-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="privacy-modal">
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: C.t2, fontSize: 20, cursor: 'pointer' }}>✕</button>
        <div style={{ marginBottom: 28 }}>
          <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' }}>SRIM · Nuevo León</span>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.t1, marginTop: 8, letterSpacing: '-0.02em' }}>Aviso de Privacidad</h2>
          <p style={{ fontSize: 13, color: C.t3, marginTop: 6 }}>Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) · Última actualización: junio 2026</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {CLAUSES.map(c => (
            <div key={c.n}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.or, letterSpacing: '.06em', marginBottom: 6, fontFamily: 'monospace' }}>{c.n}</div>
              <p style={{ fontSize: 14, color: C.t2, lineHeight: 1.75 }}>{c.text}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${C.br}` }}>
          <button onClick={onClose} style={{ background: C.or, color: '#fff', border: 'none', padding: '11px 28px', borderRadius: 8, fontWeight: 700, fontSize: 14, fontFamily: 'Outfit,sans-serif', cursor: 'pointer' }}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
