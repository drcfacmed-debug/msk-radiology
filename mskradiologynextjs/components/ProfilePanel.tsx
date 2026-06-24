'use client';

import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { C } from '@/lib/tokens';

type Tab = 'perfil' | 'formacion' | 'certificados' | 'ajustes';

const MODULES = [
  { key: 'US',       label: 'Ultrasonido',   pct: 65, color: '#2aa8c8' },
  { key: 'RM',       label: 'Resonancia RM', pct: 40, color: '#e06830' },
  { key: 'TC',       label: 'Tomografía',    pct: 30, color: '#6a9fe0' },
  { key: 'Rx',       label: 'Radiografía',   pct: 80, color: '#88b87a' },
  { key: 'ArtroRM',  label: 'Artro-RM',      pct: 20, color: '#c07ad6' },
  { key: 'Int',      label: 'Intervencionismo', pct: 15, color: '#e06830' },
  { key: 'IA',       label: 'IA en MSK',     pct: 50, color: '#4ab4cc' },
];

const CERTS = [
  { name: 'Ultrasonido MSK básico', available: true },
  { name: 'Interpretación de RM de rodilla', available: true },
  { name: 'Tomografía musculoesquelética', available: false },
  { name: 'Intervencionismo guiado por imagen', available: false },
];

interface Props {
  user: User;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function ProfilePanel({ user, open, onClose, onLogout }: Props) {
  const [tab, setTab] = useState<Tab>('perfil');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifCong,  setNotifCong]  = useState(true);

  const tabBtn = (t: Tab, label: string) => (
    <button onClick={() => setTab(t)} style={{
      flex: 1, padding: '10px 4px', background: 'transparent',
      border: 'none', borderBottom: `2px solid ${tab === t ? C.or : 'transparent'}`,
      color: tab === t ? C.t1 : C.t3, fontWeight: tab === t ? 700 : 500,
      fontSize: 13, fontFamily: 'Outfit,sans-serif', cursor: 'pointer',
      transition: 'color .15s',
    }}>
      {label}
    </button>
  );

  const toggle = (val: boolean, set: (v: boolean) => void) => (
    <div onClick={() => set(!val)} style={{
      width: 40, height: 22, borderRadius: 11,
      background: val ? C.or : C.bg4,
      position: 'relative', cursor: 'pointer', transition: 'background .2s', flexShrink: 0,
    }}>
      <div style={{
        position: 'absolute', top: 3, left: val ? 21 : 3,
        width: 16, height: 16, borderRadius: '50%', background: '#fff',
        transition: 'left .2s',
      }} />
    </div>
  );

  return (
    <>
      <div className={`profile-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`profile-panel${open ? ' open' : ''}`}>
        {/* Header */}
        <div style={{ padding: '20px 20px 0', background: C.bg2, borderBottom: `1px solid ${C.br}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: C.or, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: '#fff' }}>
                {(user.email?.[0] ?? '?').toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.t1 }}>
                  {user.user_metadata?.full_name ?? user.email?.split('@')[0] ?? 'Usuario'}
                </div>
                <div style={{ fontSize: 12, color: C.t3 }}>{user.email}</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: C.t2, fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>✕</button>
          </div>
          <div style={{ display: 'flex' }}>
            {tabBtn('perfil', 'Perfil')}
            {tabBtn('formacion', 'Formación')}
            {tabBtn('certificados', 'Certificados')}
            {tabBtn('ajustes', 'Ajustes')}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>

          {tab === 'perfil' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['Nombre completo', user.user_metadata?.full_name ?? ''],
                ['Especialidad', user.user_metadata?.specialty ?? ''],
                ['Institución', user.user_metadata?.institution ?? ''],
                ['Correo electrónico', user.email ?? ''],
              ].map(([label, value]) => (
                <div key={label}>
                  <label style={{ display: 'block', fontSize: 12, color: C.t3, fontWeight: 600, marginBottom: 5, letterSpacing: '.04em' }}>{label}</label>
                  <input defaultValue={value} readOnly={label === 'Correo electrónico'}
                    style={{ width: '100%', background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 8, padding: '10px 14px', color: C.t1, fontSize: 14, fontFamily: 'Outfit,sans-serif', outline: 'none' }} />
                </div>
              ))}
              <button style={{ background: C.or, color: '#fff', border: 'none', padding: 12, borderRadius: 8, fontWeight: 700, fontSize: 14, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', marginTop: 8 }}>
                Guardar cambios
              </button>
            </div>
          )}

          {tab === 'formacion' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontSize: 13, color: C.t3, marginBottom: 4 }}>Progreso en módulos SRIM</p>
              {MODULES.map(m => (
                <div key={m.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: C.t2, fontWeight: 600 }}>{m.label}</span>
                    <span style={{ fontSize: 12, color: m.color, fontWeight: 700 }}>{m.pct}%</span>
                  </div>
                  <div style={{ background: C.bg3, borderRadius: 100, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${m.pct}%`, height: '100%', background: m.color, borderRadius: 100, transition: 'width .5s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'certificados' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 13, color: C.t3, marginBottom: 4 }}>Constancias de participación</p>
              {CERTS.map(c => (
                <div key={c.name} style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 10, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: c.available ? 1 : .5 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.t1, marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: c.available ? '#5aab7a' : C.t3 }}>
                      {c.available ? '✓ Disponible' : '🔒 Completa el módulo para desbloquear'}
                    </div>
                  </div>
                  {c.available && (
                    <button style={{ background: 'transparent', border: `1px solid ${C.or}`, color: C.or, padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, fontFamily: 'Outfit,sans-serif', cursor: 'pointer' }}>
                      PDF
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'ajustes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                { label: 'Notificaciones por correo', desc: 'Convocatorias y nuevos casos', val: notifEmail, set: setNotifEmail },
                { label: 'Alertas de congresos',      desc: 'Recordatorios de eventos MSK',  val: notifCong,  set: setNotifCong },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: `1px solid ${C.br}` }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.t1 }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: C.t3, marginTop: 2 }}>{item.desc}</div>
                  </div>
                  {toggle(item.val, item.set)}
                </div>
              ))}
              <button style={{ marginTop: 20, background: 'transparent', border: `1px solid ${C.br}`, color: C.t2, padding: '11px', borderRadius: 8, fontWeight: 600, fontSize: 13, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', width: '100%' }}>
                Cambiar contraseña
              </button>
              <button onClick={onLogout} style={{ marginTop: 10, background: '#3d1a1a', border: '1px solid #5c2b2e', color: '#e05555', padding: '11px', borderRadius: 8, fontWeight: 700, fontSize: 13, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', width: '100%' }}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
