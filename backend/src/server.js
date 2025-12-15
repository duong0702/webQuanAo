import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import clothesRouter from "./routes/clothesRouters.js";
import authRoutes from "./routes/authRouters.js";
import orderRoutes from "./routes/orderRouters.js";
import uploadRoute from "./controllers/routeUpload.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

console.log("Mongo URI:", process.env.MONGODB_CONNECTIONSTRING);
console.log("Cloudinary key:", process.env.CLOUDINARY_API_KEY);

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoute);
app.use("/api/clothes", clothesRouter);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// simple health check
app.get("/", (req, res) =>
  res.send({ status: "ok", service: "clothing-backend" })
);

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
