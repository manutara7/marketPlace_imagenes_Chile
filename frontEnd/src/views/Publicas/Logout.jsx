// src/views/Publicas/Logout.jsx

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Logout = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/");
  }, []);

  return <h2 className="text-center mt-5">Cerrando sesión...</h2>;
};

export default Logout;
