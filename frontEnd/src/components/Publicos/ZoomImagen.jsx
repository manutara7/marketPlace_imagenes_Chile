import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ZoomImagen = () => {
  const { id } = useParams();
  const [imagen, setImagen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/imagenesChile.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((img) => img.id === id);
        setImagen(found);
      });
  }, [id]);

  if (!imagen) return <h2 className="text-center mt-5">Cargando...</h2>;

  return (
    <div className="container mt-4 text-center">
      <h2>{imagen.title}</h2>
      <p className="text-muted">{imagen.desc}</p>

      <img
        src={imagen.img}
        alt={imagen.title}
        className="img-fluid rounded shadow-lg mb-3"
        style={{ maxHeight: "80vh" }}
      />

      <h4 className="fw-bold">${imagen.price.toLocaleString("es-CL")}</h4>

      <button className="btn btn-dark mt-3" onClick={() => navigate(-1)}>
        ⬅ Volver
      </button>
    </div>
  );
};

export default ZoomImagen;
