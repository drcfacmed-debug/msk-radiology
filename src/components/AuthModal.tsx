import { useState } from "react";
import { Apple, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const providers = [
  { name: "Google", mark: "G", className: "google" },
  { name: "Facebook", mark: "f", className: "facebook" },
  { name: "LinkedIn", mark: "in", className: "linkedin" },
];

export default function AuthModal({ open, onClose }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState("");

  if (!open) return null;

  const selectProvider = (provider: string) => {
    setMessage(
      `La conexión con ${provider} está preparada visualmente. Falta agregar las credenciales OAuth del proveedor para activarla.`
    );
  };

  return (
    <div className="auth-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="auth-close" onClick={onClose} aria-label="Cerrar">
          <X size={20} />
        </button>
        <div className="auth-mark">SR</div>
        <p className="eyebrow">Comunidad médica SRIMSKNL</p>
        <h2 id="auth-title">
          {mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
        </h2>
        <p className="auth-copy">
          {mode === "login"
            ? "Accede a recursos, casos clínicos y actividades académicas."
            : "Regístrate para participar en la comunidad de imagen musculoesquelética."}
        </p>

        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => { setMode("login"); setMessage(""); }}>
            Iniciar sesión
          </button>
          <button className={mode === "register" ? "active" : ""} onClick={() => { setMode("register"); setMessage(""); }}>
            Registrarme
          </button>
        </div>

        <div className="provider-list">
          {providers.map(({ name, mark, className }) => (
            <button key={name} className={`provider-button ${className}`} onClick={() => selectProvider(name)}>
              <span className="provider-mark" aria-hidden="true">{mark}</span>
              Continuar con {name}
            </button>
          ))}
          <button className="provider-button apple" onClick={() => selectProvider("Apple")}>
            <Apple size={20} />
            Continuar con Apple
          </button>
        </div>

        {message && <div className="auth-notice">{message}</div>}
        <p className="auth-legal">
          Al continuar aceptas los términos de uso y el aviso de privacidad.
        </p>
      </section>
    </div>
  );
}
