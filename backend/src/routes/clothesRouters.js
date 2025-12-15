import express from "express";
import upload from "../middlewares/upload.js";
import {
  createClothes,
  deleteClothes,
  getAllClothes,
  getClothesById,
  updateClothes,
} from "../controllers/clothesControllers.js";

const router = express.Router();

router.get("/", getAllClothes);
router.get("/all", getAllClothes);
router.get("/:id", getClothesById);
router.post("/create", upload.array("images", 6), createClothes);
router.put("/:id", updateClothes);
router.delete("/:id", deleteClothes);

export default router;
