import { useEffect, useState } from "react";
import { LogIn, Menu, Moon, Sun } from "lucide-react";
import Sidebar from "./components/Sidebar";
import AuthModal from "./components/AuthModal";
import PageHome from "./pages/PageHome";
import PageModalities from "./pages/PageModalities";
import PageAnatomy from "./pages/PageAnatomy";
import PagePathology from "./pages/PagePathology";
import PageCases from "./pages/PageCases";

export type Page = "home" | "modalities" | "anatomy" | "pathology" | "cases";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 560);
  const [authOpen, setAuthOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("srimsknl-theme");
    return saved ? saved === "dark" : false;
  });

  useEffect(() => {
    localStorage.setItem("srimsknl-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={`app-shell ${darkMode ? "dark" : ""}`}>
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="site-header">
          <button
            className="header-icon mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Abrir o cerrar navegación"
          >
            <Menu size={20} />
          </button>
          <div className="header-title">
            <span>Sociedad de Radiólogos de Imagen Musculoesquelética</span>
            <small>Estado de Nuevo León</small>
          </div>
          <div className="header-actions">
            <button
              className="header-icon"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "Activar modo claro" : "Activar modo nocturno"}
              title={darkMode ? "Modo claro" : "Modo nocturno"}
            >
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button className="login-button" onClick={() => setAuthOpen(true)}>
              <LogIn size={18} />
              <span>Iniciar sesión</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          {page === "home" && <PageHome setPage={setPage} />}
          {page === "modalities" && <PageModalities />}
          {page === "anatomy" && <PageAnatomy />}
          {page === "pathology" && <PagePathology />}
          {page === "cases" && <PageCases />}
        </main>
      </div>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default App;
