import { useState } from "react";
import Sidebar from "./components/Sidebar";
import PageHome from "./pages/PageHome";
import PageModalities from "./pages/PageModalities";
import PageAnatomy from "./pages/PageAnatomy";
import PagePathology from "./pages/PagePathology";
import PageCases from "./pages/PageCases";

export type Page = "home" | "modalities" | "anatomy" | "pathology" | "cases";

function App() {
  const [page, setPage] = useState<Page>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#0d1117] text-slate-100 overflow-hidden" style={{ fontFamily: "'Georgia', serif" }}>
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto">
        {page === "home" && <PageHome setPage={setPage} />}
        {page === "modalities" && <PageModalities />}
        {page === "anatomy" && <PageAnatomy />}
        {page === "pathology" && <PagePathology />}
        {page === "cases" && <PageCases />}
      </main>
    </div>
  );
}

export default App;
