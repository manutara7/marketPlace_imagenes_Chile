// //src/views/Publicas/Login.jsx

import { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ok = login(form);

    if (ok) {
      navigate("/perfil");
    }
  };

  return (
    <div className="caja d-flex flex-column flex-md-row justify-content-center align-items-center px-3">

      <div className="text-register col-12 col-md-6 mb-4 mb-md-0">
        <h1>Bienvenido de nuevo</h1>
        <p>Inicia sesión para continuar.</p>
      </div>

      <div className="register-container col-12 col-md-6">
        <h2 className="text-center mb-4">🔐 Iniciar sesión</h2>

        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
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
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-warning w-100 fw-bold">
            Entrar
          </button>
          <div className="text-center mt-3">
              <p className="mb-1">¿No tienes cuenta?</p>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate("/register")}
              >
                Crear cuenta
              </button>
         </div>

        </form>
      </div>
    </div>
  );
};

export default Login;


