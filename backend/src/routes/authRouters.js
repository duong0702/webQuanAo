import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// GET CURRENT USER
router.get("/me", authMiddleware, getMe);

export default router;
