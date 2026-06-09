import { Activity, ArrowRight, Bone, BookOpenCheck, ScanLine, Stethoscope } from "lucide-react";
import { type Page } from "../App";

const cards = [
  {
    page: "modalities" as Page,
    icon: ScanLine,
    title: "Modalidades de imagen",
    desc: "Radiografía, tomografía, resonancia magnética y ecografía aplicadas al sistema musculoesquelético.",
    badge: "4 técnicas",
  },
  {
    page: "anatomy" as Page,
    icon: Bone,
    title: "Anatomía regional",
    desc: "Consulta estructurada por articulación y región anatómica, desde columna hasta pie y tobillo.",
    badge: "7 regiones",
  },
  {
    page: "pathology" as Page,
    icon: Stethoscope,
    title: "Hallazgos patológicos",
    desc: "Patrones útiles para trauma, enfermedad degenerativa, inflamación, infección y tumores.",
    badge: "6 categorías",
  },
  {
    page: "cases" as Page,
    icon: BookOpenCheck,
    title: "Casos clínicos",
    desc: "Ejercicios de razonamiento con contexto clínico, hallazgos y diagnóstico guiado.",
    badge: "8 casos",
  },
];

const highlights = [
  { label: "Radiografía", detail: "Evaluación inicial" },
  { label: "Tomografía", detail: "Arquitectura ósea" },
  { label: "Resonancia", detail: "Tejidos blandos" },
  { label: "Ecografía", detail: "Estudio dinámico" },
];

interface Props {
  setPage: (page: Page) => void;
}

export default function PageHome({ setPage }: Props) {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-grid" />
        <div className="hero-content">
          <p className="eyebrow">Sociedad médica especializada · Nuevo León</p>
          <h1>Imagen musculoesquelética con rigor, claridad y comunidad.</h1>
          <p className="hero-copy">
            Un espacio para el aprendizaje continuo, la colaboración profesional y la
            difusión de la radiología musculoesquelética en el noreste de México.
          </p>
          <div className="hero-actions">
            <button className="primary-cta" onClick={() => setPage("cases")}>
              Explorar casos clínicos <ArrowRight size={18} />
            </button>
            <button className="secondary-cta" onClick={() => setPage("modalities")}>
              Ver modalidades
            </button>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="scan-orbit orbit-one" />
          <div className="scan-orbit orbit-two" />
          <div className="scan-core">
            <Activity size={58} strokeWidth={1.25} />
          </div>
          <span className="scan-label label-rm">RM</span>
          <span className="scan-label label-tc">TC</span>
          <span className="scan-label label-us">US</span>
        </div>
      </section>

      <section className="modality-strip">
        {highlights.map((item) => (
          <div key={item.label} className="modality-item">
            <span />
            <div>
              <strong>{item.label}</strong>
              <small>{item.detail}</small>
            </div>
          </div>
        ))}
      </section>

      <section className="home-content">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Biblioteca educativa</p>
            <h2>Conocimiento organizado para la práctica diaria</h2>
          </div>
          <p>
            Contenido diseñado para residentes, radiólogos y profesionales interesados
            en el diagnóstico por imagen del aparato locomotor.
          </p>
        </div>

        <div className="feature-grid">
          {cards.map(({ page, icon: Icon, title, desc, badge }) => (
            <button key={page} className="feature-card" onClick={() => setPage(page)}>
              <div className="feature-card-top">
                <span className="feature-icon"><Icon size={24} /></span>
                <span className="feature-badge">{badge}</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="feature-link">Abrir sección <ArrowRight size={16} /></span>
            </button>
          ))}
        </div>

        <div className="mission-panel">
          <div className="mission-number">01</div>
          <div>
            <p className="eyebrow">Nuestra misión</p>
            <h2>Impulsar la excelencia en imagen musculoesquelética.</h2>
          </div>
          <p>
            Promovemos educación médica continua, intercambio académico y recursos
            prácticos para fortalecer la atención de los pacientes.
          </p>
        </div>
      </section>
    </div>
  );
}
