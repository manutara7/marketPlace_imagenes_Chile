//backend/server/server.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import fs from "fs";
import comentariosRoutes from "../routes/comentarios.js";

  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });
console.log("ENV PATH:", path.resolve(__dirname, "../.env"));


console.log("DB:", process.env.DB_NAME);
console.log("JWT:", process.env.JWT_SECRET);

//middlewares de autenticacion
import { verificarToken, soloAdmin } from "../middlewares/authMiddleware.js";
//login usuarios
import authRoutes from "../routes/auth.js";
import publicacionesRoutes from "../routes/publicaciones.js";


// publicaciones
import { agregarPublicacion } from "../consultas/publicaciones.js";
import { verPublicaciones, obtenerPublicaciones } from "../consultas/publicaciones.js";
import { modificarPublicacion } from "../consultas/publicaciones.js";
import { eliminarPublicacion } from "../consultas/publicaciones.js";

// usuarios
import { agregarUsuario } from "../consultas/usuarios.js";
import { obtenerUsuarios, verUsuarios } from "../consultas/usuarios.js";
import { modificarUsuarios } from "../consultas/usuarios.js";
import { eliminarUsuario } from "../consultas/usuarios.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(publicacionesRoutes);
app.use("/comentarios", comentariosRoutes);
app.use("/login", authRoutes);
app.get("/", (req, res) => {
  res.send("Servidor OK 🚀");
});

// Sincronizar JSON al iniciar el servidor
const filePath = path.join(__dirname, "../data/imagenesChile.json");
try {
  const publicaciones = await obtenerPublicaciones();
  fs.writeFileSync(filePath, JSON.stringify(publicaciones, null, 2));
  console.log("✅ imagenesChile.json actualizado desde la base de datos");
} catch (error) {
  console.error("❌ Error sincronizando JSON:", error.message);
}

export async function syncToJson() {
  const filePath = path.join(__dirname, "../data/imagenesChile.json");
  const publicaciones = await obtenerPublicaciones();
  fs.writeFileSync(filePath, JSON.stringify(publicaciones, null, 2));
}

/* -------- PUBLICACIONES -------- */

// Middleware para reportar consultas a /publicaciones/:id
const reportarConsulta = (req, res, next) => {
  const { method, originalUrl, params, query, body } = req;

  console.log(`
🕒 Fecha: ${new Date().toLocaleString()}
📌 Método: ${method}
🌐 Ruta: ${originalUrl}
🆔 Params: ${JSON.stringify(params)}
🔎 Query: ${JSON.stringify(query)}
📦 Body: ${JSON.stringify(body)}
  `);

  next();
};

app.get("/publicaciones", reportarConsulta, async (req, res) => {
  try {
    const data = await obtenerPublicaciones();
    await syncToJson();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error al obtener publicaciones" });
  }
});

app.get("/publicaciones/:id", reportarConsulta, async (req, res) => {
  try {
        console.log("👉 ID recibido:", req.params.id);
    const data = await verPublicaciones(req.params.id);
    await syncToJson();
    res.json(data);
  } catch (e) {
        console.error("❌ ERROR /publicaciones/:id", e);
    res.status(500).json({ error: "Error al obtener publicación" });
  }
});

app.post("/publicaciones", verificarToken, reportarConsulta, async (req, res) => {
  try {
    const { titulo, descripcion, imagenurl, precio } = req.body;
    const data = await agregarPublicacion(titulo, descripcion, imagenurl, precio, req.user.id);
    await syncToJson();
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ error: "Error al crear publicación" });
  }
});

//modoficar publicacion
app.put("/publicaciones/:id", verificarToken, reportarConsulta, async (req, res) => {
  try {
    // const { titulo, descripcion, imagenurl, precio } = req.body;
    const { titulo, descripcion, imagenurl, precio, hidden } = req.body;
    const data = await modificarPublicacion(req.params.id, titulo, descripcion, imagenurl, precio, hidden, req.user );
    await syncToJson();
    res.status(201).json(data);
  } catch (e) {
    console.error("❌ ERROR PUT /publicaciones:", e.message);
    res.status(500).json({ error: "Error al modificar publicación" });
  }
});

//eliminar publicacion
app.delete("/publicaciones/:id", verificarToken, reportarConsulta, async (req, res) => {
  try {
    const data = await eliminarPublicacion(req.params.id);
    await syncToJson();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error al eliminar publicación" });
  }
});


/* -------- USUARIOS -------- */
// Middleware para reportar consultas a /usuarios/:id
const reportarUsuario = (req, res, next) => {
  const { method, originalUrl, params, query, body } = req;

  console.log(`
🕒 Fecha: ${new Date().toLocaleString()}
📌 Método: ${method}
🌐 Ruta: ${originalUrl}
🆔 Params: ${JSON.stringify(params)}
🔎 Query: ${JSON.stringify(query)}
📦 Body: ${JSON.stringify(body)}
  `);

  next();
};

app.get("/usuarios", reportarUsuario, verificarToken, soloAdmin, async (req, res) => {
  try {
    const data = await obtenerUsuarios();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.get("/usuarios/:id", reportarUsuario, verificarToken, soloAdmin, async (req, res) => {
  try {
    const data = await verUsuarios(req.params.id);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});


app.post("/usuarios", reportarUsuario, async (req, res) => {
  try {
    const { nombre, email, password, role } = req.body;
    const data = await agregarUsuario(nombre, email, password, role);
    res.status(201).json(data);
  } catch (e) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

//eliminar usuario
app.delete("/usuarios/:id", reportarUsuario, verificarToken, async (req, res) => {
  try {
    const data = await eliminarUsuario(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    };
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  };
});


if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () =>
    console.log("🔥 Servidor encendido en puerto 3000")
  );
}

export default app;
