//src/views/Publicas/DetallePublicacion.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function DetallePublicacion({APiUrl}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [verImg, setVerImg] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    // 🔵 Cargar publicación
    fetch(`${APiUrl}/publicaciones/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Respuesta no válida");
        return res.json();
      })
      .then(setVerImg)
      .catch(err => console.error("❌ Error publicación:", err));

    // 🔵 Cargar comentarios
    fetch(`${APiUrl}/comentarios/${id}`)
      .then(res => res.json())
      .then(setComentarios)
      .catch(err => console.error("❌ Error comentarios:", err));

  }, [id]);

  // 🔵 Enviar comentario
  const enviarComentario = async () => {
    if (!user) return navigate("/login");
    if (!texto.trim()) return;

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

  const requireAuth = (action) => {
    if (!user) return navigate("/login");
    action();
  };

  if (!verImg) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Volver
      </button>

      <div className="card shadow-lg p-3">
        <img
          src={verImg.imagenurl}
          className="rounded mb-3"
          alt={verImg.titulo}
        />

        <div className="card-body">
          <h2>{verImg.titulo}</h2>
          <p>{verImg.descripcion}</p>

          <h4>${Number(verImg.precio).toLocaleString("es-CL")}</h4>

          <div className="d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() =>
                requireAuth(() => alert("Agregado al carrito 🛒"))
              }
            >
              Agregar al carrito
            </button>

            <button
              className="btn btn-outline-danger"
              onClick={() =>
                requireAuth(() => alert("Agregado a favoritos ❤️"))
              }
            >
              Favoritos
            </button>
          </div>

          {/* 🔥 COMENTARIOS */}
          <hr />
          <h5>Comentarios</h5>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Escribe un comentario..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
            <button className="btn btn-primary mt-2" onClick={enviarComentario}>
              Comentar
            </button>
          </div>

          {comentarios.map((c) => (
            <div key={c.id} className="border p-2 mb-2 rounded">
              <strong>{c.nombre}</strong>
              <p className="mb-0">{c.comentario}</p>
              <small className="text-muted">
                {new Date(c.fecha).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



