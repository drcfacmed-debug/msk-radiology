import {
  Activity,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileSearch,
  FileText,
  House,
  LifeBuoy,
  ScanLine,
} from "lucide-react";
import { type Page } from "../App";

const navItems = [
  { id: "home" as Page, label: "Inicio", icon: House },
  { id: "modalities" as Page, label: "Modalidades", icon: ScanLine, sub: "RX · TC · RM · ECO" },
  { id: "anatomy" as Page, label: "Anatomía Regional", icon: Activity, sub: "Columna · Hombro · Rodilla" },
  { id: "pathology" as Page, label: "Hallazgos", icon: FileSearch, sub: "Patología y diagnóstico" },
  { id: "cases" as Page, label: "Casos Clínicos", icon: BookOpen, sub: "Aprendizaje aplicado" },
  { id: "support" as Page, label: "Soporte Técnico", icon: LifeBuoy, sub: "Tickets · IA" },
  { id: "radreport" as Page, label: "RadReport Pro", icon: FileText, sub: "Generar · Validar · Dx" },
];

interface Props {
  page: Page;
  setPage: (page: Page) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ page, setPage, open, setOpen }: Props) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`} style={{ width: open ? 280 : 76 }}>
      <div className="sidebar-brand">
        {open && (
          <div className="brand-lockup">
            <div className="brand-mark">SR</div>
            <div>
              <div className="brand-acronym">SRIMSKNL</div>
              <div className="brand-subtitle">Imagen musculoesquelética</div>
            </div>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="sidebar-toggle"
          aria-label="Abrir o cerrar navegación"
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setPage(item.id);
              if (window.innerWidth <= 560) setOpen(false);
            }}
            className={`nav-item ${page === item.id ? "active" : ""}`}
            title={!open ? item.label : undefined}
          >
            <item.icon size={20} className="nav-icon" />
            {open && (
              <div className="nav-copy">
                <div className="nav-label">{item.label}</div>
                {item.sub && <div className="nav-subtitle">{item.sub}</div>}
              </div>
            )}
          </button>
        ))}
      </nav>

      {open && (
        <div className="sidebar-footer">
          <span className="status-dot" />
          Educación · Ciencia · Comunidad
        </div>
      )}
    </aside>
  );
}
