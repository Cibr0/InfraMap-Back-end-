import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import pointRoutes from "./routes/points.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Para __dirname funcionar no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Expor a pasta uploads
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

console.log("MONGO_URI:", process.env.MONGO_URI);

// Conectar ao MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Usar as rotas
app.use("/points", pointRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
