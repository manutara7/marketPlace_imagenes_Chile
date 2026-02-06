//frontEnd/src/context/userContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // 🔐 restaurar sesión al recargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
  }, []);

  const [publicaciones, setPublicaciones] = useState([]);
  const agregarPublicacion = (nueva) => {
    setPublicaciones((prev) => [nueva, ...prev]);
  };

  const [misPublicaciones, setMisPublicaciones] = useState([]);

  const cargarMisPublicaciones = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/mis-publicaciones", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setMisPublicaciones(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando mis publicaciones", error);
    }
  };

  // 🛒 CARRITO
  const [carrito, setCarrito] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const register = async (form) => {
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        return { ok: false, error: data.error || "Error al registrar" };
      }

      return { ok: true, user: data };

    } catch (error) {
      return { ok: false, error: "Error de conexión con el servidor" };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { ok: false, error: data.error || "Credenciales incorrectas" };
      }

      localStorage.setItem("token", data.token);

      setUser({
        ...data.user,
        token: data.token
      });

      return { ok: true, user: data.user };

    } catch (error) {
      return { ok: false, error: "Error de conexión con el servidor" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCarrito([]);
  };

  const addCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const removeCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const totalCantidad = carrito.length;

  const totalPrecio = carrito.reduce(
    (total, item) => total + item.precio,
    0
  );

  const addFavorito = (img) => {
    setFavoritos((prev) => {
      if (prev.find((i) => i.id === img.id)) return prev;
      return [...prev, img];
    });
  };

  const removeFavorito = (id) => {
    setFavoritos((prev) => prev.filter((img) => img.id !== id));
  };

  const cargarPublicaciones = async () => {
    try {
      const res = await fetch("http://localhost:3000/publicaciones");
      const data = await res.json();

      setPublicaciones(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando publicaciones", error);
      setPublicaciones([]);
    }
  };

  const editarPublicacion = async (id, form) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/publicaciones/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (res.ok) {
      await cargarMisPublicaciones();
      await cargarPublicaciones();
    }

    return data;
  };

  const borrarPublicacion = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3000/publicaciones/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      await cargarMisPublicaciones();
      await cargarPublicaciones();
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        publicaciones,
        agregarPublicacion,
        editarPublicacion,
        borrarPublicacion,
        cargarPublicaciones,
        misPublicaciones,
        cargarMisPublicaciones,
        favoritos,
        addFavorito,
        removeFavorito,
        carrito,
        removeCarrito,
        addCarrito,
        register,
        login,
        logout,
        totalCantidad,
        totalPrecio,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;


