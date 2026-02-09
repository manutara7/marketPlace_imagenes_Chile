// src/views/Privadas/Perfil.jsx

import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

import PerfilInfo from "../../components/Privados/PerfilInfo";
import CrearPublicacion from "../../components/Privados/CrearPublicacion";
import MisPublicaciones from "../../components/Privados/MisPublicaciones";
import Carrito from "../../components/Privados/Carrito";
import Favoritos from "../../components/Privados/Favoritos";
import AccionModal from "../../components/Privados/AccionModal";
import AdminPanel from "../../components/Privados/AdminPanel";

export default function Perfil() {
  const { user, loadingUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [seccion, setSeccion] = useState("perfil");
  const [foto, setFoto] = useState(
  localStorage.getItem("fotoPerfil") ||
  "https://i.pravatar.cc/150?img=12"
);

  const [perfil, setPerfil] = useState({
    nombre: "",
    correo: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // ✅ sincronizar perfil cuando llega user
  useEffect(() => {
    if (user) {
      setPerfil({
        nombre: user.nombre || "",
        // apellido:user.apellido || "",
        correo: user.email || ""
      });
    }
  }, [user]);

  if (loadingUser) return <h2>Cargando...</h2>;
  if (!user) return <h2>No autenticado</h2>;

const handleFoto = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result;
    setFoto(base64);
    localStorage.setItem("fotoPerfil", base64);
  };
  reader.readAsDataURL(file);
};

useEffect(() => {
  const guardada = localStorage.getItem("fotoPerfil");
  if (guardada && guardada.startsWith("data:image")) {
    setFoto(guardada);
  }
}, []);


  const mostrarModal = (texto) => {
    setMensaje(texto);
    setShowModal(true);
  };

  return (
    <div className="profile-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <label className="avatar-box">
          <img src={foto} alt="perfil" />
          <input type="file" hidden onChange={handleFoto} />
          <span>Cambiar foto</span>
        </label>

        <h4 className="username">{user?.nombre}</h4>

        <nav className="profile-nav">
          <button onClick={() => navigate("/")}>🏠 Ir a Home</button>
          <button onClick={() => setSeccion("perfil")}>👤 Perfil</button>
          <button onClick={() => setSeccion("crear")}>➕ Crear publicación</button>
          <button onClick={() => setSeccion("mis")}>🗂 Mis publicaciones</button>
          <button onClick={() => setSeccion("carrito")}>🛒 Carrito</button>
          <button onClick={() => setSeccion("favoritos")}>❤️ Favoritos</button>

          {user?.role === "admin" && (
            <button onClick={() => setSeccion("admin")}>
              🛠 Panel Admin
            </button>
          )}
        </nav>
      </aside>

      {/* CONTENIDO */}
      <main className="profile-main">
        {seccion === "perfil" && (
          <PerfilInfo perfil={perfil} setPerfil={setPerfil} />
        )}
        {seccion === "crear" && <CrearPublicacion />}
        {seccion === "carrito" && <Carrito />}
        {seccion === "favoritos" && <Favoritos />}
        {seccion === "mis" && (
          <MisPublicaciones onAccion={mostrarModal} />
        )}
        {seccion === "admin" && <AdminPanel />}

        <AccionModal
          show={showModal}
          onClose={() => setShowModal(false)}
          mensaje={mensaje}
        />
      </main>
    </div>
  );
}

