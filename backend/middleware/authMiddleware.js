//backend/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../db/conexionDB.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.resolve(__dirname, "../.env") });
// dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

/* ---------- VERIFICAR TOKEN ---------- */

export const verificarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Authorization header:", authHeader);
  if (!authHeader)
    return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
   console.log("🎫 Token recibido:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Token decodificado:", decoded);
      
    // buscar usuario real
    const { rows } = await pool.query(
      "SELECT id, email, role, banned FROM usuarios WHERE id = $1",
      [decoded.id]
    );

    if (rows.length === 0)
      return res.status(401).json({ error: "Usuario no existe" });

    const user = rows[0];

    // bloquear baneados
    if (user.banned)
      return res.status(403).json({ error: "Usuario baneado" });

    req.user = user;
    next();

  } catch (error) {
    console.error("Token inválido:", error.message);
    res.status(401).json({ error: "Token inválido" });
  }
};

/* ---------- SOLO ADMIN ---------- */

export const soloAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "No autorizado" });

  next();
};
