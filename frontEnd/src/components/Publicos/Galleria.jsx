//Frontend/src/components/Publicos/Galleria.jsx


import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import IniciarSesionModal from "./IniciarSesionModal";
import AccionModal from "../Privados/AccionModal";

const Galleria = () => {
  const navigate = useNavigate();
  const { publicaciones, cargarPublicaciones, addFavorito, addCarrito, user } =
    useContext(UserContext);

  const [showModal, setShowModal] = useState(false);
  const [showAccion, setShowAccion] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const mostrarAccion = (texto) => {
    setMensaje(texto);
    setShowAccion(true);
  };

  const requireAuth = () => {
    if (!user) {
      setShowModal(true);
      return false;
    }
    return true;
  };

  return (
    <main className="container mt-4">
      <h2 className="text-center mb-4">🇨🇱 Imagenes de Chile</h2>

      <div className="row g-4">
          {Array.isArray(publicaciones) &&
          publicaciones
            .filter(p => !p.hidden)
            .map((datos) => (
            
            <div
              key={datos.id}
              className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
            >
              <div className="card h-100 shadow-sm">
                <img
                  src={datos.imagenurl}
                  onError={(e) =>
                    (e.target.src =
                      "https://placedog.net/400/317?id=224")
                  }
                  className="card-img-top"
                  style={{
                    height: "180px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/zoom", { state: { imagen: datos } })
                  }
                />

                <div className="card-body d-flex flex-column">
                  <h5>{datos.titulo}</h5>
                  <p className="text-muted small">
                    {datos.descripcion.slice(0, 70)}...
                  </p>
                  <p className="fw-bold">
                    ${datos.precio.toLocaleString("es-CL")}
                  </p>

                  <div className="d-flex gap-2 mt-auto">
                    <button
                      className="btn btn-outline-primary btn-sm w-100"
                      onClick={() =>
                        navigate("/zoom", { state: { imagen: datos } })
                      }
                    >
                      Ver foto
                    </button>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        navigate("/zoom", {
                          state: { imagen: datos, irComentarios: true },
                        })
                      }
                    >
                      💬
                    </button>
                  </div>

                  <button
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => {
                      if (!requireAuth()) return;
                      addFavorito(datos);
                      mostrarAccion("Agregado a favoritos ❤️");
                    }}
                  >
                    Agregar a favoritos ❤️
                  </button>

                  <button
                    className="btn btn-warning btn-sm w-100 mt-2"
                    onClick={() => {
                      if (!requireAuth()) return;
                      addCarrito(datos);
                      mostrarAccion("Agregado al carrito 🛒");
                    }}
                  >
                    Agregar al carrito 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <IniciarSesionModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />

      <AccionModal
        show={showAccion}
        mensaje={mensaje}
        onClose={() => setShowAccion(false)}
      />
    </main>
  );
};

export default Galleria;


