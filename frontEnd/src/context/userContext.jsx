//src/context/userContext.jsx

import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  // 🛒 CARRITO
  const [carrito, setCarrito] = useState([]);

  const [favoritos, setFavoritos] = useState([]);

  const register = (newUser) => {
    setUsers([...users, newUser]);
  };

  const login = ({ email, password }) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      setUser(found);
      return true;
    } else {
      alert("Credenciales incorrectas");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setCarrito([]);
  };

  // ➕ AGREGAR AL CARRITO
  const addCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // ❌ ELIMINAR DEL CARRITO (opcional)
  const removeCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // 🔢 TOTALES
  const totalCantidad = carrito.length;

  const totalPrecio = carrito.reduce(
    (total, item) => total + item.price,
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

  return (
    <UserContext.Provider
      value={{
        user,
        users,               
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







