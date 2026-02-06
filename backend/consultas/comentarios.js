//backend/consultas/comentarios.js

import { pool } from "../db/conexionDB.js";

export async function agregarComentario(publicacion_id, usuario_id, texto) {
  const query = `
    INSERT INTO comentarios (publicacion_id, usuario_id, comentario)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const { rows } = await pool.query(query, [
    publicacion_id,
    usuario_id,
    texto,
  ]);
  return rows[0];
}

export async function obtenerComentarios(publicacion_id) {
  const query = `
    SELECT c.*, u.nombre
    FROM comentarios c
    JOIN usuarios u ON u.id = c.usuario_id
    WHERE publicacion_id = $1
    ORDER BY fecha DESC`;
  const { rows } = await pool.query(query, [publicacion_id]);
  return rows;
}
