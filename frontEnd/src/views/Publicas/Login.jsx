//frontEnd/src/views/Publicas/Login.jsx

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await login(form);

  if (result.ok) {
    navigate("/perfil");
  } else {
    setError(result.error);
  }
};
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const ok = await login(form);

  //   if (ok) {
  //     navigate("/perfil"); // ✅ VA AL PERFIL
  //   } else {
  //     setError("Email o contraseña incorrectos");
  //   }
  // };

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

          {error && (
            <p className="text-danger text-center mt-3">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
