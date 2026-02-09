// frontEnd/src/components/Privados/CrearPublicacion.jsx  

import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function CrearPublicacion() {
  const { agregarPublicacion, ApiUrl } = useContext(UserContext);


  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    imagenurl: "",
    precio: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Debes iniciar sesión");
    return;
  }
  try {
    const response = await fetch(`${ApiUrl}/publicaciones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        ...form,
        precio: Number(form.precio)
      })
    });
    const data = await response.json();
    if (!response.ok) {
      alert(data.error || "Error al crear publicación");
      return;
    }
    agregarPublicacion(data); // 👈 magia aquí
    alert("✅ Publicación creada");
    setForm({
      titulo: "",
      descripcion: "",
      imagenurl: "",
      precio: ""
    });
  } catch (error) {
    console.error(error);
    alert("Error de conexión con el servidor");
  }
};


  return (
    <section className="card p-3">
      <h2>Crear publicación</h2>

      <input
        name="titulo"
        value={form.titulo}
        onChange={handleChange}
        placeholder="Título"
        className="form-control mb-2"
      />

      <textarea
        name="descripcion"
        value={form.descripcion}
        onChange={handleChange}
        placeholder="Descripción..."
        className="form-control mb-2"
      />

      <input
        name="imagenurl"
        value={form.imagenurl}
        onChange={handleChange}
        placeholder="URL de la imagen"
        className="form-control mb-2"
      />

      <input
        name="precio"
        type="number"
        value={form.precio}
        onChange={handleChange}
        placeholder="Precio $"
        className="form-control mb-3"
      />

      <button onClick={handleSubmit} className="btn btn-primary w-100">
        Publicar
      </button>
    </section>
  );
}
