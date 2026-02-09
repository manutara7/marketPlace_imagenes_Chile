//backend/routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
import { verificarCredenciales } from "../utils/auth.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// 
// dotenv.config({ path: path.resolve(__dirname, "../.env") });
// dotenv.config({ path: path.resolve(__dirname, "../.env.local") });


const router = express.Router();

router.post("/", async (req, res) => {
    // console.log("LOGIN BODY:", req.body);
  const { email, password } = req.body;
// console.log("JWT_SECRET:", process.env.JWT_SECRET);
try {
  const user = await verificarCredenciales(email, password);

  if (!user) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
  console.log("🔑 TOKEN GENERADO:", token);
  console.log("👤 USER LOGIN:", user.email);
  
  res.json({ ok: true, token, user });

} catch (error) {

  if (error.message === "USER_BANNED") {
    return res.status(403).json({
      error: "Usuario baneado. Contacte administrador."
    });
  }

  console.error("❌ Error en login:", error);
  res.status(500).json({ error: "Error en login" });
};
});

export default router;





