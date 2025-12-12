import express from "express";
import clothesRouter from "./routes/clothesRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRouters.js";
import orderRoutes from "./routes/orderRouters.js";
import cors from "cors";
import uploadRoute from "./controllers/routeUpload.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

console.log("Cloudinary key:", process.env.CLOUDINARY_API_KEY); // <-- test ở đây

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api/users", uploadRoute);
app.use("/api/clothes", clothesRouter);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});
