'use client';

import { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import LogoMark from './LogoMark';
import { C } from '@/lib/tokens';

type Mode = 'login' | 'register' | 'forgot';

interface Props {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

const OAUTH = [
  { id: 'google',        label: 'Google',   mark: 'G',  bg: '#fff',    fg: '#222', border: '#ddd' },
  { id: 'facebook',      label: 'Facebook', mark: 'f',  bg: '#1877f2', fg: '#fff', border: '#1877f2' },
  { id: 'linkedin_oidc', label: 'LinkedIn', mark: 'in', bg: '#0a66c2', fg: '#fff', border: '#0a66c2' },
] as const;

export default function LoginModal({ onClose, onSuccess }: Props) {
  const [mode,    setMode]    = useState<Mode>('login');
  const [email,   setEmail]   = useState('');
  const [pass,    setPass]    = useState('');
  const [name,    setName]    = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [msg,     setMsg]     = useState('');

  const supabase = createClient();

  const input: React.CSSProperties = {
    width: '100%', background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 8,
    padding: '11px 14px', color: C.t1, fontSize: 15, fontFamily: 'Outfit,sans-serif', outline: 'none',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setMsg('');
    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        if (data.user) onSuccess(data.user);
      } else if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email, password: pass,
          options: { data: { full_name: name }, emailRedirectTo: `${location.origin}/auth/callback` },
        });
        if (error) throw error;
        setMsg('Revisa tu correo para confirmar tu cuenta.');
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${location.origin}/auth/callback?next=/reset-password`,
        });
        if (error) throw error;
        setMsg('Correo de recuperación enviado.');
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Error inesperado. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'facebook' | 'linkedin_oidc') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  };

  const titles = { login: 'Iniciar sesión', register: 'Crear cuenta', forgot: 'Recuperar contraseña' };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: C.bg2, border: `1px solid ${C.br}`, borderRadius: 14, padding: '40px 44px', width: '100%', maxWidth: 460, position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: C.t2, fontSize: 20, cursor: 'pointer' }}>✕</button>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <LogoMark size={36} />
          <div>
            <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: 17, letterSpacing: '-0.03em', color: C.t1 }}>
              <span style={{ color: C.or }}>SR</span>IM
            </div>
            <div style={{ fontSize: 11, color: C.t2 }}>Comunidad médica MSK</div>
          </div>
        </div>

        {/* Mode tabs */}
        <div style={{ display: 'flex', marginBottom: 24, gap: 0, background: C.bg3, borderRadius: 8, padding: 4 }}>
          {(['login', 'register'] as Mode[]).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setMsg(''); }}
              style={{ flex: 1, padding: '9px', borderRadius: 6, border: 'none', fontFamily: 'Outfit,sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: mode === m ? C.bg4 : 'transparent', color: mode === m ? C.t1 : C.t3, transition: 'all .15s' }}>
              {m === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        {/* OAuth buttons */}
        {mode !== 'forgot' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {OAUTH.map(o => (
              <button key={o.id} onClick={() => handleOAuth(o.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderRadius: 8, border: `1px solid ${o.border}`, background: o.bg, color: o.fg, fontFamily: 'Outfit,sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer', width: '100%' }}>
                <span style={{ fontWeight: 800, fontSize: 15, width: 22, textAlign: 'center' }}>{o.mark}</span>
                Continuar con {o.label}
              </button>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
              <div style={{ flex: 1, height: 1, background: C.br }} />
              <span style={{ fontSize: 12, color: C.t3 }}>o con correo</span>
              <div style={{ flex: 1, height: 1, background: C.br }} />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: 13, color: C.t2, fontWeight: 600, marginBottom: 6 }}>Nombre completo</label>
              <input value={name} onChange={e => setName(e.target.value)} type="text" required placeholder="Dr. Nombre Apellido" style={input} />
            </div>
          )}
          <div>
            <label style={{ display: 'block', fontSize: 13, color: C.t2, fontWeight: 600, marginBottom: 6 }}>Correo electrónico</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="usuario@ejemplo.com" style={input} />
          </div>
          {mode !== 'forgot' && (
            <div>
              <label style={{ display: 'block', fontSize: 13, color: C.t2, fontWeight: 600, marginBottom: 6 }}>Contraseña</label>
              <input value={pass} onChange={e => setPass(e.target.value)} type="password" required placeholder="••••••••" style={input} />
            </div>
          )}
          {error && <p style={{ fontSize: 13, color: '#e05555', background: '#3d1a1a', padding: '10px 14px', borderRadius: 6 }}>{error}</p>}
          {msg   && <p style={{ fontSize: 13, color: '#5aab7a', background: '#1a3d2a', padding: '10px 14px', borderRadius: 6 }}>{msg}</p>}
          <button type="submit" disabled={loading}
            style={{ background: C.or, color: '#fff', border: 'none', padding: 14, borderRadius: 8, fontWeight: 700, fontSize: 16, fontFamily: 'Outfit,sans-serif', cursor: loading ? 'wait' : 'pointer', opacity: loading ? .7 : 1 }}>
            {loading ? 'Procesando...' : titles[mode]}
          </button>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          {mode === 'login' && (
            <p onClick={() => setMode('forgot')} style={{ fontSize: 12, color: C.t3, cursor: 'pointer' }}>¿Olvidaste tu contraseña?</p>
          )}
          {mode !== 'login' && (
            <p style={{ fontSize: 13, color: C.t2 }}>¿Ya tienes cuenta?{' '}
              <span onClick={() => setMode('login')} style={{ color: C.or, fontWeight: 600, cursor: 'pointer' }}>Iniciar sesión</span>
            </p>
          )}
        </div>
        <p style={{ fontSize: 11, color: C.t3, textAlign: 'center', marginTop: 16 }}>Al registrarte aceptas el aviso de privacidad</p>
      </div>
    </div>
  );
}
