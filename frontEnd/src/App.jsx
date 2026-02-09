// src/App.jsx

import { Route, Routes } from "react-router-dom";
import Home from "./views/Publicas/Home";
import Perfil from "./views/Privadas/Perfil";
import Login from "./views/Publicas/Login";
import Register from "./views/Publicas/Register";
import Navbar from "./components/Publicos/Navbar";
import DetallePublicacion from "./views/Publicas/DetallePublicacion";
import PrivateRoute from "./routes/PrivateRoute";
import Logout from "./views/Publicas/Logout";
import NotFound from "./views/Publicas/NotFound";
import ZoomImagen from "./components/Publicos/ZoomImagen";
import AvisoLogin from "./components/Publicos/AvisoLogin";


const App = () => {

  
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zoom" element={<ZoomImagen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aviso-login" element={<AvisoLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detalle/:id" element={<DetallePublicacion />} />
        <Route path="/logout" element={<Logout />} />
          {/* ⚠️ SIEMPRE AL FINAL */}
        <Route path="*" element={<NotFound />} />  
        {/* 🔒 RUTAS PROTEGIDAS */}
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        <Route path="/admin" element={<PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
              
      </Routes>
    </div>
  );
};

export default App;


