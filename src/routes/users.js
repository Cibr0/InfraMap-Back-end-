import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

dotenv.config();

const router = express.Router();

// Rotas públicas
router.post("/register", registerUser);
router.post("/login", loginUser);

// Rotas protegidas
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Middleware para proteger rotas
export function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token ausente ou inválido" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

export default router;
