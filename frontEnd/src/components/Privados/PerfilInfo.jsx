//src/components/Privados/PerfilInfo.jsx

export default function PerfilInfo({ perfil, setPerfil }) {

  const handleChange = (e) => {
    setPerfil({
      ...perfil,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log("Perfil actualizado:", perfil);
    alert("Perfil actualizado correctamente ✅");
  };

  return (
    <section className="card">
      <h2>Mi Perfil</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        value={perfil.nombre}
        onChange={handleChange}
      />

      <input
        name="correo"
        placeholder="Correo"
        value={perfil.correo}
        onChange={handleChange}
      />

      <button className="btn" onClick={handleSubmit}>
        Guardar cambios
      </button>
    </section>
  );
}

