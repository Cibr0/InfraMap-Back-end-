import * as pointService from "../services/pointService.js";

export const createPoint = async (req, res) => {
  try {
    const { name, description, latitude, longitude } = req.body;
    const userID = req.user.userId;
    const image = req.file?.filename;

    const point = await pointService.createPoint({
      name,
      description,
      latitude,
      longitude,
      image,
      userID,
    });
    res.status(201).json(point);
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "Erro ao criar point" });
  }
};

export const getAllPoints = async (req, res) => {
  try {
    const points = await pointService.getAllPoints();
    res.status(200).json(points);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar points" });
  }
};

export const getUserPoints = async (req, res) => {
  try {
    const pontos = await pointService.getUserPoints(req.params.id);
    res.status(200).json(pontos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar points do usuário" });
  }
};

export const deletePoint = async (req, res) => {
  try {
    await pointService.deletePoint(req.params.id);
    res.status(200).json({ message: "Point deletado com sucesso" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Erro ao deletar point" });
  }
};

export const updatePoint = async (req, res) => {
  try {
    const { name, description, latitude, longitude, userID } = req.body;
    const image = req.file?.filename;

    const updatedPoint = await pointService.updatePoint(req.params.id, {
      name,
      description,
      latitude,
      longitude,
      userID,
      image,
    });

    res.status(200).json(updatedPoint);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: messages });
    }
    res
      .status(error.status || 500)
      .json({ error: error.message || "Erro ao atualizar point" });
  }
};
