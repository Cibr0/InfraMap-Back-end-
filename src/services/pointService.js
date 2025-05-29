import Point from "../models/Point.js";

export const createPoint = async ({
  name,
  description,
  latitude,
  longitude,
  image,
  userID,
}) => {
  if (!name || !description || !latitude || !longitude || !userID || !image) {
    throw { status: 400, message: "Todos os campos são obrigatórios" };
  }

  const existingNamePoint = await Point.findOne({ name });
  if (existingNamePoint) {
    throw { status: 400, message: "Já existe um point com esse nome." };
  }

  const existingLocatePoint = await Point.findOne({
    coordinates: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: 1000,
      },
    },
  });

  if (existingLocatePoint) {
    throw { status: 400, message: "Já existe um point nesse local." };
  }

  const coordinates = [longitude, latitude];

  const point = new Point({ name, description, coordinates, image, userID });
  return await point.save();
};

export const getAllPoints = async () => {
  return await Point.find();
};

export const getUserPoints = async (userID) => {
  return await Point.find({ userID });
};

export const deletePoint = async (pointId) => {
  const deleted = await Point.findByIdAndDelete(pointId);
  if (!deleted) {
    throw { status: 404, message: "Point não encontrado" };
  }
  return deleted;
};

export const updatePoint = async (pointId, { name, description, image }) => {
  if (!name || !description || !image) {
    throw { status: 400, message: "Todos os campos são obrigatórios" };
  }

  const updateData = {
    name,
    description,
    image,
  };

  const updated = await Point.findByIdAndUpdate(pointId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw { status: 404, message: "Point não encontrado" };
  }

  return updated;
};
