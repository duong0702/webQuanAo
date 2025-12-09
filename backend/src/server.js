import express from "express";
import clothesRouter from "./routes/clothesRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRouters.js";
import orderRoutes from "./routes/orderRouters.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/api/clothes", clothesRouter);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});
