//Frontend/src/components/Publicos/Galleria.jsx

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import IniciarSesionModal from "./IniciarSesionModal";
import AccionModal from "../Privados/AccionModal";


const Galleria = () => {
  const [imagenes, setImagenes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const { user } = useContext(UserContext);
  const [showAccion, setShowAccion] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();
  const { addFavorito, addCarrito, user } = useContext(UserContext);

  useEffect(() => {
    fetch("/imagenesChile.json")
      .then((res) => res.json())
      .then((data) => setImagenes(data));
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
        {imagenes.map((img) => (
          <div key={img.id} className="col-md-3">
            <div className="card h-100 shadow-sm">

              <img
                src={img.img}
                onError={(e) => e.target.src = " https://placedog.net/500/280/sepia?id=5 "}              
                className="card-img-top"
                style={{ height: "180px", objectFit: "cover", cursor: "pointer" }}
                onClick={() => navigate(`/zoom/${img.id}`)}
              />
              <div className="card-body d-flex flex-column">
                <h5>{img.title}</h5>
                <p className="text-muted small">{img.desc.slice(0, 70)}...</p>
                <p className="fw-bold">${img.price.toLocaleString("es-CL")}</p>              
                <div className="d-flex flex-column gap-2 mt-auto">
                  <button
                    className="btn btn-outline-primary btn-sm w-100"
                    onClick={() => navigate(`/zoom/${img.id}`)}
                  >
                    Ver foto 🔍
                  </button>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      if (!requireAuth()) return;
                      addFavorito(img);
                      mostrarAccion("Agregado a favoritos ❤️");
                    }}
                  >
                    Agregar a favoritos ❤️
                  </button>
                  <button
                  className="btn btn-warning btn-sm w-100 mt-2"
                  onClick={() => {
                    if (!requireAuth()) return;
                    addCarrito(img);
                    mostrarAccion("Agregado al carrito  🛒");
                  }}
                >
                  Agregar al carrito  🛒
                </button>
                </div>
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



