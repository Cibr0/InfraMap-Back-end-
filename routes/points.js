import express from "express";
import Point from "../models/point.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/criarpoint", upload.single("image"), async (req, res) => {
  try {
    const { name, description, coordinates, userID } = req.body;
    console.log("USER ID RECEBIDO:", userID);
    const image = req.file.filename;

    const point = new Point({
      name,
      description,
      coordinates: JSON.parse(coordinates),
      image,
      userID,
    });

    await point.save();
    res.status(201).json(point);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar point" });
  }
});

router.get("/", async (req, res) => {
  try {
    const points = await Point.find();
    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar points" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const pontosDoUsuario = await Point.find({ userID });
    res.status(200).json(pontosDoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar points do usuário" });
  }
});

export default router;
