//frontEnd/src/views/Publicas/Register.jsx

import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    role: "user" // 👈 por defecto
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await register(form);

  if (result.ok) {
    navigate("/aviso-login");
  } else {
    alert(result.error); // o setError si quieres UI bonita
  }
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await register(form);
  //     navigate("/aviso-login");
  //   } catch (error) {
  //     alert(error.message || "Error al registrar usuario");
  //   }
  // };

  return (
    <div className="caja d-flex flex-column flex-md-row justify-content-center align-items-center px-3">

      {/* TEXTO */}
      <div className="text-register col-12 col-md-6 mb-4 mb-md-0">
        <h1>Regístrate</h1>
        <p>¡Únete a nuestra comunidad y comienza tu viaje con nosotros!</p>
      </div>

      {/* FORM */}
      <div className="register-container col-12 col-md-6">
        <h2 className="text-center mb-4">📝 Crear cuenta</h2>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tu nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="correo@ejemplo.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button className="btn btn-warning w-100 fw-bold">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;


