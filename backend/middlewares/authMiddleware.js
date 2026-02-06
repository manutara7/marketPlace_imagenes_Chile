//backend/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });


export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
};

export const soloAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "No autorizado" });
  }
  next();
};
