import express from "express";
import upload from "../middlewares/upload.js";
import {
  createClothes,
  deleteClothes,
  getAllClothes,
  getClothesById,
  updateClothes,
} from "../controllers/clothesControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", getAllClothes);
router.get("/all", getAllClothes);
router.get("/:id", getClothesById);
// create/update/delete are admin-only
// Support both POST / and POST /create for backward compatibility
router.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.array("images", 6),
  createClothes
);

router.post(
  "/create",
  authMiddleware,
  isAdmin,
  upload.array("images", 6),
  createClothes
);
router.put("/:id", authMiddleware, isAdmin, updateClothes);
router.delete("/:id", authMiddleware, isAdmin, deleteClothes);

export default router;
