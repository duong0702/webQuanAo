import express from "express";
import upload from "../middlewares/upload.js";
import {
  createClothes,
  deleteClothes,
  getAllClothes,
  getClothesById,
  updateClothes,
  searchClothes,
} from "../controllers/clothesControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* =======================
   PUBLIC ROUTES
======================= */
router.get("/search", searchClothes);
router.get("/", getAllClothes);
router.get("/all", getAllClothes);
router.get("/:id", getClothesById);

/* =======================
   ADMIN ROUTES
======================= */

// 👉 CREATE PRODUCT (upload nhiều ảnh)
router.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.array("images", 10), // ⬅️ field name phải là "images"
  (req, res, next) => {
    console.log("Create product - files received:", req.files?.length || 0);
    next();
  },
  createClothes
);

// 👉 UPDATE PRODUCT (không upload ảnh hoặc tuỳ bạn mở rộng sau)
router.put(
  "/:id",
  authMiddleware,
  isAdmin,
  upload.array("images", 10),
  updateClothes
);

// 👉 DELETE PRODUCT
router.delete("/:id", authMiddleware, isAdmin, deleteClothes);

export default router;

// import express from "express";
// import upload from "../middlewares/upload.js";
// import {
//   createClothes,
//   deleteClothes,
//   getAllClothes,
//   getClothesById,
//   updateClothes,
//   searchClothes,
// } from "../controllers/clothesControllers.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/adminMiddleware.js";

// const router = express.Router();

// // Logging middleware
// router.use((req, res, next) => {
//   if (req.method === "POST") {
//     console.log(`[${new Date().toISOString()}] POST /api/clothes`);
//     console.log("Headers:", req.headers);
//   }
//   next();
// });

// router.get("/search", searchClothes);
// router.get("/", getAllClothes);
// router.get("/all", getAllClothes);
// router.get("/:id", getClothesById);

// // Logging middleware for POST requests
// router.post("*", (req, res, next) => {
//   console.log("POST request to /api/clothes" + req.path);
//   console.log("Headers:", req.headers);
//   next();
// });

// // create/update/delete are admin-only
// // Support both POST / and POST /create for backward compatibility
// // Admin creates with file upload
// router.post(
//   "/",
//   upload.array("images", 10),
//   (req, res, next) => {
//     console.log("After multer, files:", req.files ? req.files.length : "none");
//     next();
//   },
//   authMiddleware,
//   (req, res, next) => {
//     console.log("After auth, user:", req.user);
//     next();
//   },
//   isAdmin,
//   (req, res, next) => {
//     console.log("After isAdmin check");
//     next();
//   },
//   createClothes
// );

// router.post(
//   "/create",
//   upload.array("images", 10),
//   authMiddleware,
//   isAdmin,
//   createClothes
// );
// router.put("/:id", authMiddleware, isAdmin, updateClothes);
// router.delete("/:id", authMiddleware, isAdmin, deleteClothes);

// export default router;
