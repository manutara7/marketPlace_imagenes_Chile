//backend/obtenerHash.js

import bcrypt from "bcrypt";

const password = "asd123"; // ← escribe aquí la clave que quieras

const hash = await bcrypt.hash(password, 10);
console.log(hash);
