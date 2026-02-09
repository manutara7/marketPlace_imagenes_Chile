//backend/routes/usuarioPerfil.jsx
import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 👤 PERFIL DEL USUARIO LOGUEADO
router.get("/perfil", verificarToken, async (req, res) => {
  try {
    // el middleware ya dejó el usuario en req.user
    res.json(req.user);
  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
});

export default router;

