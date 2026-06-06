import { type Page } from "../App";

const navItems: { id: Page; label: string; icon: string; sub?: string }[] = [
  { id: "home", label: "Inicio", icon: "🏠" },
  { id: "modalities", label: "Modalidades", icon: "🔬", sub: "RX · TC · RM · ECO" },
  { id: "anatomy", label: "Anatomía Regional", icon: "🦴", sub: "Columna · Hombro · Rodilla…" },
  { id: "pathology", label: "Hallazgos Patológicos", icon: "🩺", sub: "Fracturas · Tumores · Inflamación" },
  { id: "cases", label: "Casos Clínicos", icon: "📋", sub: "Ejercicios con diagnóstico" },
];

interface Props {
  page: Page;
  setPage: (p: Page) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
}

export default function Sidebar({ page, setPage, open, setOpen }: Props) {
  return (
    <aside
      className="flex flex-col bg-[#0a0f1a] border-r border-slate-800 transition-all duration-300"
      style={{ width: open ? 260 : 64 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800">
        {open && (
          <div>
            <div className="text-cyan-400 font-bold text-sm tracking-widest uppercase">MSK</div>
            <div className="text-slate-300 text-xs mt-0.5">Radiología & Imagen</div>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="text-slate-400 hover:text-cyan-400 transition-colors ml-auto"
          aria-label="Toggle sidebar"
        >
          {open ? "◀" : "▶"}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`w-full flex items-start gap-3 px-3 py-3 rounded-lg text-left transition-all group
              ${page === item.id
                ? "bg-cyan-950 border border-cyan-700/50 text-cyan-300"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
          >
            <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
            {open && (
              <div className="min-w-0">
                <div className="font-semibold text-sm leading-tight">{item.label}</div>
                {item.sub && (
                  <div className="text-xs text-slate-500 mt-0.5 truncate">{item.sub}</div>
                )}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {open && (
        <div className="px-4 py-4 border-t border-slate-800">
          <div className="text-xs text-slate-600 leading-relaxed">
            Referencia educativa en<br />
            imagenología MSK
          </div>
        </div>
      )}
    </aside>
  );
}
