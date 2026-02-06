// backend/db/conexionDB.js
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD), // 🔥 forzar string
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});



