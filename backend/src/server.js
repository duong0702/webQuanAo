import express, { response } from "express";
import clothesRouter from "./routes/clothesRouters.js";
const app = express();

app.use("/api/clothes/", clothesRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
