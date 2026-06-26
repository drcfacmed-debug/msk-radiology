'use client';

import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import LogoMark from './LogoMark';
import LoginModal from './LoginModal';
import ProfilePanel from './ProfilePanel';
import { C } from '@/lib/tokens';

const LINKS = [
  ['Inicio',          '#inicio'],
  ['Educación',       '#educacion'],
  ['Intervencionismo','#intervencionismo'],
  ['IA · Guía',       '#ia-msk'],
  ['Quiz',            '#quiz'],
  ['Investigación',   '#investigacion'],
  ['Congresos',       '#congresos'],
  ['Revista',         '#revista'],
  ['Acerca de',       '#acerca'],
] as const;

export default function Nav({ user }: { user: User | null }) {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [showLogin,    setShowLogin]    = useState(false);
  const [showProfile,  setShowProfile]  = useState(false);
  const [readingMode,  setReadingMode]  = useState(false);
  const [currentUser,  setCurrentUser]  = useState(user);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('reading-mode', readingMode);
  }, [readingMode]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setCurrentUser(null);
    setShowProfile(false);
  };

  const linkStyle: React.CSSProperties = {
    color: C.t2, fontSize: 13, fontWeight: 500, textDecoration: 'none',
    transition: 'color .15s', whiteSpace: 'nowrap',
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? `${C.bg1}f0` : C.bg1,
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${scrolled ? C.br : 'transparent'}`,
        transition: 'background .3s, border-color .3s',
      }}>
        <div className="wrap" style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          {/* Logo */}
          <a href="#inicio" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <LogoMark size={36} />
            <div>
              <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: 16, letterSpacing: '-0.03em', lineHeight: 1.1, color: C.t1 }}>
                <span style={{ color: C.or }}>SR</span>IM
              </div>
              <div style={{ fontSize: 9, color: C.t3, letterSpacing: '.05em' }}>rad.msk</div>
            </div>
          </a>

          {/* Desktop links */}
          <div className="nav-links" style={{ gap: 16 }}>
            {LINKS.map(([label, href]) => (
              <a key={label} href={href} style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = C.t1)}
                onMouseLeave={e => (e.currentTarget.style.color = C.t2)}>
                {label}
              </a>
            ))}

            {/* Reading mode toggle */}
            <button onClick={() => setReadingMode(r => !r)} title="Modo lectura"
              style={{ background: readingMode ? C.bg4 : 'transparent', border: `1px solid ${C.br}`, color: readingMode ? C.t1 : C.t3, padding: '6px 10px', borderRadius: 6, fontSize: 14, cursor: 'pointer', fontFamily: 'Outfit,sans-serif' }}>
              ◐
            </button>

            {/* Auth button */}
            {currentUser ? (
              <button onClick={() => setShowProfile(true)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: `1px solid ${C.br}`, color: C.t1, padding: '6px 12px 6px 6px', borderRadius: 100, fontFamily: 'Outfit,sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: C.or, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: '#fff' }}>
                  {(currentUser.email?.[0] ?? '?').toUpperCase()}
                </div>
                Mi perfil
              </button>
            ) : (
              <button onClick={() => setShowLogin(true)}
                style={{ background: C.or, color: '#fff', border: 'none', padding: '8px 20px', borderRadius: 6, fontWeight: 700, fontSize: 13, fontFamily: 'Outfit,sans-serif', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Iniciar sesión
              </button>
            )}
          </div>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menú">
            {[0, 1, 2].map(i => <span key={i} style={{ display: 'block', width: 22, height: 2, background: C.t1, borderRadius: 2 }} />)}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mob-menu${menuOpen ? ' open' : ''}`} style={{ background: C.bg1, borderTop: `1px solid ${C.br}` }}>
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}
              style={{ color: C.t2, fontSize: 15, fontWeight: 500, textDecoration: 'none', padding: '12px 24px', borderBottom: `1px solid ${C.br}`, display: 'block' }}>
              {label}
            </a>
          ))}
          <div style={{ padding: '16px 24px', display: 'flex', gap: 10 }}>
            <button onClick={() => setReadingMode(r => !r)}
              style={{ background: readingMode ? C.bg4 : 'transparent', border: `1px solid ${C.br}`, color: C.t2, padding: '10px 16px', borderRadius: 6, fontSize: 14, cursor: 'pointer', fontFamily: 'Outfit,sans-serif' }}>
              ◐ Lectura
            </button>
            {currentUser ? (
              <button onClick={() => { setShowProfile(true); setMenuOpen(false); }}
                style={{ flex: 1, background: C.bg4, color: C.t1, border: `1px solid ${C.br}`, padding: 10, borderRadius: 8, fontWeight: 600, fontSize: 15, fontFamily: 'Outfit,sans-serif', cursor: 'pointer' }}>
                Mi perfil
              </button>
            ) : (
              <button onClick={() => { setShowLogin(true); setMenuOpen(false); }}
                style={{ flex: 1, background: C.or, color: '#fff', border: 'none', padding: 10, borderRadius: 8, fontWeight: 700, fontSize: 15, fontFamily: 'Outfit,sans-serif', cursor: 'pointer' }}>
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSuccess={u => { setCurrentUser(u); setShowLogin(false); }}
        />
      )}

      {currentUser && (
        <ProfilePanel
          user={currentUser}
          open={showProfile}
          onClose={() => setShowProfile(false)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
