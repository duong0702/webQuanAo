import express from "express";
import {
  createClothes,
  deleteClothes,
  getAllClothes,
  getClothesById,
  updateClothes,
} from "../controllers/clothesControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Public routes (ai cũng xem được)
router.get("/", getAllClothes);
router.get("/:id", getClothesById);

// Admin routes (bắt buộc login + admin)
router.post("/", protect, isAdmin, createClothes);
router.put("/:id", protect, isAdmin, updateClothes);
router.delete("/:id", protect, isAdmin, deleteClothes);
export default router;
