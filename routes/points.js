import express from "express";
import Point from "../models/point.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/createpoint", upload.single("image"), async (req, res) => {
  try {
    const { name, description, latitude, longitude, userID } = req.body;
    console.log("USER ID RECEBIDO:", userID);
    const image = req.file.filename;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!name || !description || !latitude || !longitude || !userID) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    // Verifica se a imagem foi enviada
    if (!req.file) {
      return res.status(400).json({ error: "Imagem é obrigatória" });
    }

    // Verifica se o nome do point já existe
    const existingNamePoint = await Point.findOne({
      name,
    });
    if (existingNamePoint) {
      return res
        .status(400)
        .json({ error: "Já existe um point com esse nome." });
    }

    //para saber se o point já existe no mesma região
    const existingLocatePoint = await Point.findOne({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 1000, // Distância máxima em metros
        },
      },
    });

    if (existingLocatePoint) {
      return res.status(400).json({ error: "Já existe um point nesse local." });
    }

    const coordinates = [longitude, latitude];

    const point = new Point({
      name,
      description,
      coordinates,
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

router.get("/allpoints", async (req, res) => {
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
