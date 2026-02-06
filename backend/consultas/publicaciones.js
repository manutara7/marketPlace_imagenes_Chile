//backend/consultas/publicaciones.js

import {pool } from "../db/conexionDB.js" 

//PUBLICACIONES

//obtener publicaciones
export const obtenerPublicaciones = async () => {
  const { rows } = await pool.query(`
    SELECT * 
    FROM publicaciones 
    WHERE hidden IS NOT TRUE
  `);
  return rows;
};

export const verPublicaciones = async (id) => {
  const consulta = "SELECT * FROM publicaciones WHERE id = $1";
  const { rows } = await pool.query(consulta, [id]);
  return rows;
};

export const MisPublicaciones = async (usuario_id) => {
  const consulta = "SELECT * FROM publicaciones WHERE usuario_id = $1 ORDER BY id DESC;";
  const { rows } = await pool.query(consulta, [usuario_id]);
  return rows;
};


export const eliminarPublicacion = async (id, user) => {
  if (user.role === "admin") {
    await pool.query("DELETE FROM publicaciones WHERE id=$1", [id]);
    return;
  }

  await pool.query(
    "DELETE FROM publicaciones WHERE id=$1 AND usuario_id=$2",
    [id, user.id]
  );
};


//agregar publicacion
export const agregarPublicacion = async (
  titulo,
  descripcion,
  imagenurl,
  precio,
  usuario_id
) => {
  const consulta = `
    INSERT INTO publicaciones
    (titulo, descripcion, imagenurl, precio, usuario_id)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *`;

  const values = [titulo, descripcion, imagenurl, precio, usuario_id];

  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

//modificar publicacion
export const modificarPublicacion = async (
  id,
  titulo,
  descripcion,
  imagenurl,
  precio,
  hidden,
  user
) => {
  const query = `
    UPDATE publicaciones
    SET titulo=$1,
        descripcion=$2,
        imagenurl=$3,
        precio=$4,
        hidden=$5
    WHERE id=$6
    RETURNING *;
  `;

  const values = [titulo, descripcion, imagenurl, precio, hidden, id];

  const { rows } = await pool.query(query, values);
  return rows[0];
};



