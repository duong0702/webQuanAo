const getAllClothes = (req, res) => {
  res.status(200).send("tao met m qua");
};

const createClothes = (req, res) => {
  res.status(201).json({ message: "Task created successfully" });
};

const updateClothes = (req, res) => {
  res.status(200).json({ message: "Nhiem vu moi da thanh cong" });
};

const deleteClothes = (req, res) => {
  res.status(200).json({ message: "Nhiem vu moi da thanh cong" });
};

export { getAllClothes, createClothes, updateClothes, deleteClothes };
