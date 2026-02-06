// frontEnd/src/components/Publicos/ZoomImagen.jsx

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "../../context/userContext";
import IniciarSesionModal from "./IniciarSesionModal";
import {APiUrl} from '../../context/userContext';

const ZoomImagen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useContext(UserContext);

  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState("");
  const [showModal, setShowModal] = useState(false);

  const comentariosRef = useRef(null);

  if (!state?.imagen) {
    return (
      <div className="container text-center mt-5">
        <h4>No hay imagen para mostrar</h4>
        <button className="btn btn-dark mt-3" onClick={() => navigate(-1)}>
          ⬅ Volver
        </button>
      </div>
    );
  }

  const { id, imagenurl, titulo, descripcion, precio } = state.imagen;

  // 📥 cargar comentarios
  useEffect(() => {
    fetch(`${APiUrl}/comentarios/${id}`)
      .then(res => res.json())
      .then(data => setComentarios(Array.isArray(data) ? data : []))
      .catch(() => setComentarios([]));
  }, [id]);

  // 🔽 scroll automático a comentarios
  useEffect(() => {
    if (state?.irComentarios && comentariosRef.current) {
      comentariosRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const enviarComentario = async () => {
    if (!texto.trim()) return;

    // 👉 si no está logueado → abrir modal
    if (!user) {
      setShowModal(true);
      return;
    }

    const res = await fetch(`${APiUrl}/comentarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        publicacion_id: id,
        comentario: texto,
      }),
    });

    const nuevo = await res.json();

    setComentarios([nuevo, ...comentarios]);
    setTexto("");
  };

  return (
    <div className="container mt-4 text-center">
      <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
        ⬅ Volver
      </button>

      <h2>{titulo}</h2>
      <p className="text-muted">{descripcion}</p>

      <img
        src={imagenurl}
        alt={titulo}
        className="img-fluid rounded shadow-lg mb-3"
        style={{ maxHeight: "90vh" }}
      />

      <h4 className="fw-bold mb-4">
        ${precio.toLocaleString("es-CL")}
      </h4>

      {/* 💬 COMENTARIOS */}
      <div ref={comentariosRef} className="text-start">
        <h5>Comentarios</h5>

        <textarea
          className="form-control mb-2"
          placeholder={
            user
              ? "Escribe un comentario..."
              : "Inicia sesión para comentar..."
          }
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <button
          className="btn btn-primary btn-sm mb-3"
          onClick={enviarComentario}
        >
          Comentar
        </button>

        {comentarios.length === 0 && (
          <p className="text-muted">Aún no hay comentarios</p>
        )}

        {comentarios.map(c => (
          <div key={c.id} className="border rounded p-2 mb-2">
            <strong>{c.nombre}:</strong> {c.comentario}
          </div>
        ))}
      </div>

      {/* 🔐 Modal login */}
      <IniciarSesionModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default ZoomImagen;
