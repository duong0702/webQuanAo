import express from "express";
import {
  createClothes,
  deleteClothes,
  getAllClothes,
  getClothesById,
  updateClothes,
} from "../controllers/clothesControllers.js";

const router = express.Router();

router.get("/", getAllClothes);
router.get("/:id", getClothesById);
router.post("/", createClothes);
router.put("/:id", updateClothes);
router.delete("/:id", deleteClothes);
export default router;
