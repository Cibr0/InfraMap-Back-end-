import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();
// Rota para criar um novo usuário
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Usuário já existe com este email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
});

export default router;
