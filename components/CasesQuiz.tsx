'use client';

import { useState, useEffect } from 'react';
import type { QuizCase } from '@/lib/data/quiz';
import { C } from '@/lib/tokens';

interface Props { quiz: QuizCase[]; }

export default function CasesQuiz({ quiz }: Props) {
  const [current,  setCurrent]  = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score,    setScore]    = useState(0);
  const [done,     setDone]     = useState(false);
  const [shuffled, setShuffled] = useState<string[]>([]);

  const q = quiz[current];

  useEffect(() => {
    if (!q) return;
    setShuffled([q.answer, ...q.distractors].sort(() => Math.random() - 0.5));
    setSelected(null);
  }, [current, q]);

  const handleAnswer = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    if (opt === q.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (current + 1 >= quiz.length) setDone(true);
    else setCurrent(c => c + 1);
  };

  const handleRestart = () => { setCurrent(0); setScore(0); setDone(false); setSelected(null); };

  const scoreColor = score >= 4 ? '#5aab7a' : score >= 2 ? C.or : '#e05555';

  return (
    <section id="quiz" style={{ background: C.bg0, paddingTop: 80, paddingBottom: 80 }}>
      <div className="wrap">
        <div className="fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ color: C.or, fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' }}>Casos clínicos</span>
            <h2 style={{ fontSize: 'clamp(24px,2.8vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, color: C.t1 }}>Quiz interactivo MSK</h2>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 100, padding: '7px 18px' }}>
              <span style={{ fontSize: 12, color: C.t2 }}>Puntaje: </span>
              <span style={{ fontSize: 14, fontWeight: 800, color: C.or }}>{score}/{quiz.length}</span>
            </div>
            {!done && (
              <div style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 100, padding: '7px 18px' }}>
                <span style={{ fontSize: 12, color: C.t2 }}>Pregunta {current + 1} de {quiz.length}</span>
              </div>
            )}
          </div>
        </div>

        {done ? (
          <div style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 14, padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 52, fontWeight: 800, color: scoreColor, marginBottom: 12 }}>{score}/{quiz.length}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.t1, marginBottom: 8 }}>
              {score === quiz.length ? '¡Excelente! Dominio completo.' : score >= 4 ? '¡Muy bien!' : score >= 2 ? 'Buen intento. Repasa los casos.' : 'Sigue practicando.'}
            </div>
            <p style={{ color: C.t2, fontSize: 14, marginBottom: 32 }}>Nueva sesión disponible la próxima semana con casos diferentes.</p>
            <button onClick={handleRestart}
              style={{ background: C.or, color: '#fff', border: 'none', padding: '13px 36px', borderRadius: 8, fontWeight: 700, fontSize: 16, fontFamily: 'Outfit,sans-serif', cursor: 'pointer' }}>
              Repetir sesión
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Case card */}
            <div style={{ background: C.bg3, border: `1px solid ${C.br}`, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ height: 120, background: 'radial-gradient(ellipse 70% 80% at 50% 50%,#1a3a4a 0%,#07161f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 38, fontWeight: 800, color: 'rgba(160,210,255,.08)' }}>{q.mod}</div>
                <div style={{ position: 'absolute', top: 10, left: 12, background: C.or, padding: '3px 12px', borderRadius: 4, fontSize: 11, fontWeight: 800, color: '#fff' }}>{q.mod}</div>
                <div style={{ position: 'absolute', bottom: 10, right: 12, background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(4px)', padding: '3px 10px', borderRadius: 4, fontSize: 10, color: 'rgba(180,220,255,.6)', fontFamily: 'monospace' }}>{q.modality}</div>
              </div>
              <div style={{ padding: '22px 24px' }}>
                <div style={{ fontSize: 10, color: C.t3, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>{q.region} · Caso clínico</div>
                <p style={{ fontSize: 14, color: C.t1, lineHeight: 1.75 }}>{q.stem}</p>
                {selected && (
                  <div style={{ marginTop: 18, padding: '14px 16px', background: C.bg2, borderRadius: 8, borderLeft: `3px solid ${selected === q.answer ? '#5aab7a' : '#e05555'}` }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: selected === q.answer ? '#5aab7a' : '#e05555', marginBottom: 6 }}>
                      {selected === q.answer ? '✓ Correcto' : `✗ La respuesta era: ${q.answer}`}
                    </p>
                    <p style={{ fontSize: 12, color: C.t2, lineHeight: 1.65 }}>{q.explanation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Answer options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <p style={{ fontSize: 13, color: C.t2, fontWeight: 600, marginBottom: 4 }}>¿Cuál es el diagnóstico más probable?</p>
              {shuffled.map((opt, i) => {
                let bg: string = C.bg3, border: string = `1px solid ${C.br}`, color: string = C.t1;
                if (selected) {
                  if (opt === q.answer)      { bg = '#1a3d2a'; border = '1px solid #5aab7a'; color = '#5aab7a'; }
                  else if (opt === selected) { bg = '#3d1a1a'; border = '1px solid #e05555'; color = '#e05555'; }
                  else                       { color = C.t3; }
                }
                return (
                  <button key={i} onClick={() => handleAnswer(opt)}
                    style={{ background: bg, border, color, borderRadius: 10, padding: '14px 18px', textAlign: 'left', cursor: selected ? 'default' : 'pointer', fontSize: 14, fontWeight: 500, fontFamily: 'Outfit,sans-serif', transition: 'all .15s', lineHeight: 1.4 }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, marginRight: 10, fontSize: 12 }}>{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                );
              })}
              {selected && (
                <button onClick={handleNext}
                  style={{ marginTop: 8, background: C.or, color: '#fff', border: 'none', padding: 14, borderRadius: 10, fontWeight: 700, fontSize: 15, fontFamily: 'Outfit,sans-serif', cursor: 'pointer' }}>
                  {current + 1 < quiz.length ? 'Siguiente caso →' : 'Ver resultados →'}
                </button>
              )}
            </div>
          </div>
        )}

        {!done && (
          <div style={{ marginTop: 24, background: C.bg3, borderRadius: 100, height: 4, overflow: 'hidden' }}>
            <div style={{ width: `${((current + (selected ? 1 : 0)) / quiz.length) * 100}%`, height: '100%', background: C.or, transition: 'width .4s ease', borderRadius: 100 }} />
          </div>
        )}
      </div>
    </section>
  );
}
