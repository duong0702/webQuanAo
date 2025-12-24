import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import clothesRouter from "./routes/clothesRouters.js";
import authRoutes from "./routes/authRouters.js";
import orderRoutes from "./routes/orderRouters.js";
// import uploadRoute from "./controllers/routeUpload.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

console.log("Mongo URI:", process.env.MONGODB_CONNECTIONSTRING);
console.log("Cloudinary key:", process.env.CLOUDINARY_API_KEY);
console.log("Frontend URL:", process.env.FRONTEND_URL);

app.use(cors());
app.use(express.json());

// app.use("/api/upload", uploadRoute);
app.use("/api/clothes", clothesRouter);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// ===== SERVE FRONTEND (PRODUCTION) =====
const frontendPath = path.resolve(__dirname, "../../frontend/dist");

app.use(express.static(frontendPath));
cd;

// SPA fallback (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// SPA fallback (React Router)
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

connectDB()
  .then(() => {
    app
      .listen(PORT, HOST, () => {
        console.log(`✅ Server running on ${HOST}:${PORT}`);
      })
      .on("error", (err) => {
        console.error("Server listen error:", err);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
    process.exit(1);
  });
