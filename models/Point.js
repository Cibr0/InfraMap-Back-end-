import mongoose from "mongoose";

const PointSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String, 
  coordinates: {
    type: [Number], // [longitude, latitude]
    index: "2dsphere", // permite buscas geoespaciais
  },
  userID: String,
});

export default mongoose.model("Point", PointSchema);
