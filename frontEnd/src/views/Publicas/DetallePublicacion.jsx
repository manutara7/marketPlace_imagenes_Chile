// //src/views/Publicas/DetallePublicacion.jsx

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export default function DetallePublicacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    fetch("/pizzas.json")
      .then(res => res.json())
      .then(data => setPizza(data.find(p => p.id === id)));
  }, [id]);

  const requireAuth = (action) => {
    if (!user) {
      navigate("/login");
      return;
    }
    action();
  };

  if (!pizza) return <p className="text-center mt-5">Cargando...</p>;

  return (
    <div className="container mt-5">

      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ⬅ Volver
      </button>

      <div className="card shadow-lg p-3">
        <img src={pizza.img} className="rounded" />

        <div className="card-body">
          <h2>{pizza.name}</h2>
          <p>{pizza.desc}</p>

          <h4>${pizza.price.toLocaleString("es-CL")}</h4>

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
        </div>
      </div>
    </div>
  );
}
