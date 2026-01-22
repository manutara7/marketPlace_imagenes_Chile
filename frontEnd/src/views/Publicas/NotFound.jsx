//src/views/Publicas/NotFound.jsx

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 style={{ fontSize: "6rem" }}>404</h1>
      <h2>Ruta no encontrada</h2>
      <p>La dirección que ingresaste no existe.</p>

      <Link to="/" className="btn btn-warning mt-3">
        ⬅ Volver al Home
      </Link>
    </div>
  );
};

export default NotFound;
