// src/components/Publicos/Footer.jsx

import { useState } from "react";

const Footer = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mensaje enviado:", form);
    alert("Mensaje enviado correctamente ✅");
    setForm({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <footer className="footer-container mt-5">
      <div className="container py-5">
        <div className="row align-items-center">

          {/* COLUMNA IZQUIERDA */}
          <div className="col-md-6 text-white mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">📍 Contacto</h5>
            <p className="mb-2">🏢 3033 Jacson Avenue, New York</p>
            <p className="mb-2">✉️ info@correo.com</p>
            <p className="mb-2">📞 +07 000 8000 000</p>
            <p className="mb-2">☎️ +56 9 4568 0000</p>

            {/* REDES SOCIALES */}
            <div className="d-flex gap-3 mt-3">
              <a href="www.facebook.com" className="text-white fs-4 social-icon">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="www.instagram.com" className="text-white fs-4 social-icon">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="www.twitter.com" className="text-white fs-4 social-icon">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="www.youtube.com" className="text-white fs-4 social-icon">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="www.tiktok.com"  className="text-white fs-4 social-icon">
                <i className="bi bi-tiktok"></i>
              </a>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="col-md-6">
            <div className="footer-form p-4 shadow">
              <h5 className="fw-bold mb-3 text-center">✉️ Envíanos un mensaje</h5>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="nombre"
                  className="form-control mb-3"
                  placeholder="Nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="correo"
                  className="form-control mb-3"
                  placeholder="Correo electrónico"
                  value={form.correo}
                  onChange={handleChange}
                  required
                />

                <textarea
                  name="mensaje"
                  className="form-control mb-3"
                  rows="3"
                  placeholder="Escribe tu mensaje..."
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                ></textarea>

                <button className="btn btn-primary w-100">
                  Enviar mensaje 🚀
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="footer-bottom text-center text-white py-3">
        © 2026 YaiYo Imágenes - Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;


