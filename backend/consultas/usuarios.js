//backend/consultas/usuarios.js

import {pool } from "../db/conexionDB.js" 
import bcrypt from "bcryptjs";


//obtener usuario
export const obtenerUsuarios = async () => {
  const { rows } = await pool.query("SELECT * FROM usuarios");
  return rows;
};

//ver usuario
export const verUsuarios = async (id) => {
  const consulta = "SELECT * FROM usuarios WHERE id = $1";
  const { rows } = await pool.query(consulta, [id]);
  return rows;
};

//eliminar usuario
export const eliminarUsuario = async (id) => {
  const consulta = `
    DELETE FROM usuarios WHERE id = $1
    RETURNING *`;
  const values = [id];
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

//agregar usuario

export const agregarUsuario = async (nombre, email, password, role) => {
  const hash = await bcrypt.hash(password, 10);

  const consulta = `
    INSERT INTO usuarios (nombre, email, password, role)
    VALUES ($1,$2,$3,$4)
    RETURNING *`;

  const values = [nombre, email, hash, role];

  const { rows } = await pool.query(consulta, values);
  return rows[0];
};

//modificar usuario
export const modificarUsuarios = async (id, nombre, email, password, role, banned) => {
  const consulta = `
    UPDATE usuarios
    SET nombre = $2,
        email = $3,
        password = $4,
        role = $5,
        banned = $6
    WHERE id = $1
    RETURNING *`;
  const values = [id, nombre, email, password, role, banned];
  const { rows } = await pool.query(consulta, values);
  return rows[0];
};


