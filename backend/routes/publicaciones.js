  //backend/routes/publicaciones.js

  import express from "express";
  import { agregarPublicacion } from "../consultas/publicaciones.js";
  import { verificarToken } from "../middlewares/authMiddleware.js";
  import { MisPublicaciones } from "../consultas/publicaciones.js";
  import { modificarPublicacion, eliminarPublicacion } from "../consultas/publicaciones.js";


  const router = express.Router();

  router.get("/mis-publicaciones", verificarToken, async (req, res) => {
  const publicaciones = await MisPublicaciones(req.user.id);
  res.json(publicaciones);
  });
  
  router.post("/publicaciones", verificarToken, async (req, res) => {
    try {
      const { titulo, descripcion, imagenurl, precio } = req.body;

      const publicacion = await agregarPublicacion(
        titulo,
        descripcion,
        imagenurl,
        precio,
        req.user.id
      );

      res.status(201).json(publicacion);
    } catch (error) {
      console.error("Error creando publicación:", error);
      res.status(500).json({ error: "Error al crear publicación" });
    }
  });  
  
  // ✏️ EDITAR PUBLICACIÓN
router.put("/publicaciones/:id", verificarToken, async (req, res) => {
  try {
    const { titulo, descripcion, imagenurl, precio } = req.body;

    const data = await modificarPublicacion(
    req.params.id,
    req.body.titulo,
    req.body.descripcion,
    req.body.imagenurl,
    req.body.precio,
    req.user // 👈 pasamos el user entero
    );

    res.json(data);
  } catch (error) {
    console.error("Error editando:", error);
    res.status(500).json({ error: "Error al editar publicación" });
  }
});

// 🗑 ELIMINAR PUBLICACIÓN
router.delete("/publicaciones/:id", verificarToken, async (req, res) => {
  try {
    await eliminarPublicacion(req.params.id, req.user.id);
    res.json({ ok: true });
  } catch (error) {
    console.error("Error eliminando:", error);
    res.status(500).json({ error: "Error al eliminar publicación" });
  }
});

  export default router;

  
