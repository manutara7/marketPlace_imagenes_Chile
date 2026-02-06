// //src/components/Privados/Favoritos.jsx
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const Favoritos = () => {
  const { favoritos, removeFavorito } = useContext(UserContext);

  if (!favoritos || favoritos.length === 0) {
    return <h4>No tienes favoritos aún ❤️</h4>;
  }

  return (
    <div>
      <h3>Mis Favoritos ❤️</h3>

      <div className="row g-3">
        {favoritos.map((dataFav) => (
          <div key={dataFav.id} className="col-md-3">
            <div className="card position-relative">

              <button
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                onClick={() => removeFavorito(dataFav.id)}
              >
                ❌
              </button>

              <img
                src={dataFav.imagenurl}
                className="card-img-top"
                alt={dataFav.titulo}
              />

              <div className="card-body">
                <h6>{dataFav.titulo}</h6>
                <p className="fw-bold">
                  {/* ${(dataFav.precio ?? 0).toLocaleString("es-CL")} */}
                  ${(dataFav.precio ?? 0).toLocaleString("es-CL")}
                </p>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritos;

