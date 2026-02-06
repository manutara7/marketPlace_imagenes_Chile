//backend/routes/auth.js

import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });


import { verificarCredenciales } from "../utils/auth.js";

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("LOGIN BODY:", req.body);
  const { email, password } = req.body;
console.log("JWT_SECRET:", process.env.JWT_SECRET);

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

    res.json({
      ok: true,
      token,
      user
    });
    } catch (error) {
  console.error("❌ Error en login completo:", error);
  res.status(500).json({ error: "Error en login" });
};
});

export default router;





