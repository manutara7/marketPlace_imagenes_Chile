  //backend/routes/publicaciones.js

  import express from "express";
  import { agregarPublicacion } from "../consultas/publicaciones.js";
  import { verificarToken } from "../middleware/authMiddleware.js";
  import { reportarConsulta } from "../middleware/reportarConsulta.js"; 
  import { modificarPublicacion, eliminarPublicacion, obtenerPublicaciones } from "../consultas/publicaciones.js";
  import { MisPublicaciones } from "../consultas/publicaciones.js";



  const router = express.Router();

  router.get("/admin/publicaciones",reportarConsulta, verificarToken, async (req, res) => {
  const { rows } = await pool.query(`SELECT * FROM publicaciones`);
  res.json(rows);
});

router.get("/mis-publicaciones", verificarToken, reportarConsulta, async (req, res) => {
  try {
    const data = await MisPublicaciones(req.user.id);
    res.json(data);
  } catch (error) {
    console.error("Error obteniendo mis publicaciones:", error);
    res.status(500).json({ error: "Error al obtener mis publicaciones" });
  }
});

  router.put("/publicaciones/:id", verificarToken, reportarConsulta, async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, imagenurl, precio, hidden } = req.body;

    const pub = await modificarPublicacion(
      id,
      titulo,
      descripcion,
      imagenurl,
      precio,
      hidden,
      req.user
    );

    res.json(pub);

  } catch (err) {
    console.error("ERROR PUT:", err);
    res.status(500).json({ error: "Error al modificar publicación" });
  }
});


router.put("/admin/publicaciones/:id", verificarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, imagenurl, precio, hidden } = req.body;

    const pub = await modificarPublicacion(
      id,
      titulo,
      descripcion,
      imagenurl,
      precio,
      hidden,
      req.user
    );

    res.json(pub);
  } catch (err) {
    console.error("ERROR PUT ADMIN:", err);
    res.status(500).json({ error: "Error admin modificando publicación" });
  }
});


// 🗑 ELIMINAR PUBLICACIÓN
router.delete("/publicaciones/:id",reportarConsulta, verificarToken, async (req, res) => {
  try {
    await eliminarPublicacion(req.params.id, req.user);
    res.json({ ok: true });
  } catch (error) {
    console.error("Error eliminando:", error);
    res.status(500).json({ error: "Error al eliminar publicación" });
  }
});
// 👁 VER TODAS LAS PUBLICACIONES (admin + público)
router.get("/publicaciones", reportarConsulta, async (req, res) => {
  try {
    const data = await obtenerPublicaciones();
    res.json(data);
  } catch (error) {
    console.error("Error obteniendo publicaciones:", error);
    res.status(500).json({ error: "Error al obtener publicaciones" });
  }
});

  export default router;

  
