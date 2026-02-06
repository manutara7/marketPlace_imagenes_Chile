//backend/routes/comentarios.js

import express from "express";
import { verificarToken } from "../middlewares/authMiddleware.js";
import { agregarComentario, obtenerComentarios } from "../consultas/comentarios.js";

const router = express.Router();

router.get("/:publicacionId", async (req, res) => {
  const data = await obtenerComentarios(req.params.publicacionId);
  res.json(data);
});

router.post("/", verificarToken, async (req, res) => {
  const { publicacion_id, comentario } = req.body;
  const nuevo = await agregarComentario(publicacion_id, req.user.id, comentario);
  res.status(201).json(nuevo);
});

export default router;
