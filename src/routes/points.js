import express from "express";
import upload from "../config/multer.js";
import { verificarToken } from "./users.js";
import * as pointController from "../controllers/pointController.js";

const router = express.Router();

router.post(
  "/createpoint",
  verificarToken,
  upload.single("image"),
  pointController.createPoint
);
router.get("/allpoints", pointController.getAllPoints);
router.get("/:id", pointController.getUserPoints);
router.delete("/delete/:id", verificarToken, pointController.deletePoint);
router.put(
  "/update/:id",
  verificarToken,
  upload.single("image"),
  pointController.updatePoint
);

export default router;
