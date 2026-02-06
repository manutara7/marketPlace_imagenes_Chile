//backend/utils/auth.js

import bcrypt from "bcryptjs";
import { pool } from "../db/conexionDB.js";

export const verificarCredenciales = async (email, password) => {
  const { rows } = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  if (rows.length === 0) return null;

  const usuario = rows[0];

  // 🔥 PROTECCIÓN ANTI ERROR 500
  if (!usuario.password || usuario.password.length < 20) {
    console.error("Password inválido en DB:", usuario.password);
    return null;
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);

  if (!passwordValida) return null;

  return usuario;
};


