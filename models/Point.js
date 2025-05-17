import mongoose from "mongoose";

const PointSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String, // nome do arquivo da imagem
  coordinates: {
    type: [Number], // [longitude, latitude]
    index: "2dsphere", // permite buscas geoespaciais
  },
});

export default mongoose.model("Point", PointSchema);
