//frontEnd/src/components/Publicos/IniciarSesionModal.jsx

import { useNavigate } from "react-router-dom";

const IniciarSesionModal = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal} className="shadow">

        <h4 className="mb-2">🔐 Inicia sesión</h4>
        <p>Debes iniciar sesión o crear una cuenta para continuar.</p>

        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-warning w-100 fw-bold"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>

          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate("/register")}
          >
            Registrarme
          </button>
        </div>

        <button
          className="btn btn-sm btn-link text-muted mt-3"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  },
  modal: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    width: "90%",
    maxWidth: "420px",
    textAlign: "center"
  }
};

export default IniciarSesionModal;
