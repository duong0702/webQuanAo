import express, { response } from "express";
const app = express();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/api/tasks", (req, res) => {
  res.status(200).send("tao met m qua");
});

app.post("/api/tasks", (req, res) => {
  res.status(201).json({ message: "Task created successfully" });
});

app.put("/api/tasks/:id", (req, res) => {
  res.status(200).json({ message: "Nhiem vu moi da thanh cong" });
});

app.delete("/api/tasks/:id", (req, res) => {
  res.status(200).json({ message: "Nhiem vu moi da thanh cong" });
});
