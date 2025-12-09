import Clothes from "../models/clothes.js";

const getAllClothes = async (req, res) => {
  try {
    const clothess = await Clothes.find().sort({ createdAt: -1 });
    res.status(200).json(clothess);
  } catch (error) {
    console.error("Lỗi khi gọi getAllClothes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createClothes = async (req, res) => {
  try {
    const { title } = req.body;

    const newClothes = await Clothes.create({ title });

    res.status(201).json(newClothes);
  } catch (error) {
    console.error("Lỗi khi gọi createClothes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateClothes = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateClothes = await Clothes.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: true }
    );
    if (!updateClothes) {
      return res.status(404).json({ message: "Clothes not found" });
    }
    res.status(200).json(updateClothes);
  } catch (error) {
    console.error("Lỗi khi gọi UpdateClothes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteClothes = async (req, res) => {
  try {
    const deletedClothes = await Clothes.findByIdAndDelete(req.params.id);
    if (!deletedClothes) {
      return res.status(404).json({ message: "Clothes not found" });
    }
    res.status(200).json({ message: "Clothes deleted successfully" });
  } catch (error) {
    console.error("Lỗi khi gọi DeleteClothes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllClothes, createClothes, updateClothes, deleteClothes };
