//src/views/Publicas/Register.jsx

import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register(form);
    navigate("/aviso-login");

  };

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
              name="name"
              value={form.name}
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
