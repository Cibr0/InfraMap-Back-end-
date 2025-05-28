import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUserService(req, res) {
  try {
    const { name, email, password } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "A senha deve ter no mínimo 6 caracteres" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Usuário já existe com este email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION || "1h",
      }
    );

    res
      .status(201)
      .json({ message: "Usuário criado com sucesso", token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
}

export async function loginUserService(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Usuário não encontrado" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Senha incorreta" });

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION || "1h",
      }
    );

    res
      .status(200)
      .json({ message: "Login bem-sucedido", token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
}

export async function getUserByIdService(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
}

export async function updateUserService(req, res) {
  try {
    const { name, email, password } = req.body;
    const updateData = { name, email };

    if (password) updateData.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.json({ message: "Usuário atualizado com sucesso", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
}

export async function deleteUserService(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar usuário" });
  }
}
