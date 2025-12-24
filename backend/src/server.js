import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import clothesRouter from "./routes/clothesRouters.js";
import authRoutes from "./routes/authRouters.js";
import orderRoutes from "./routes/orderRouters.js";
import { connectDB } from "./config/db.js";

// ====== INIT ======
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// ====== LOG ENV (DEBUG) ======
console.log("Mongo URI:", process.env.MONGODB_CONNECTIONSTRING);
console.log("Cloudinary key:", process.env.CLOUDINARY_API_KEY);
console.log("NODE_ENV:", process.env.NODE_ENV);

// ====== MIDDLEWARE ======
app.use(
  cors({
    origin: "https://webquanao-liqd.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors()); // cho phép mọi origin (OK cho Render)
app.use(express.json());

// ====== API ROUTES ======
app.use("/api/clothes", clothesRouter);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// ====== SERVE FRONTEND (PRODUCTION ONLY) ======
// if (process.env.NODE_ENV === "production") {
//   const frontendPath = path.resolve(__dirname, "../../frontend/dist");

//   // Serve static files
//   app.use(express.static(frontendPath));

//   app.get(/^\/(?!api).*/, (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// }

// ====== START SERVER ======
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
