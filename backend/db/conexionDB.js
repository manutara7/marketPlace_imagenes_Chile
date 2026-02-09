// backend/db/conexionDB.js

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV === "production"
      ? "../.env"
      : "../.env.local"
  ),
});

console.log("DB:", process.env.DB_DATABASE);

import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_DATABASE, 
  port: Number(process.env.DB_PORT),
  allowExitOnIdle: true,
});



