import {
  getAllClothesService,
  createClothesService,
  updateClothesService,
  deleteClothesService,
} from "../services/CRUDservices.js";

const getAllClothes = async (req, res) => {
  try {
    const clothess = await getAllClothesService();
    res.status(200).json(clothess);
  } catch (error) {
    console.error("Lỗi khi gọi getAllClothes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getClothesById = async (req, res) => {
  try {
    const clothes = await Clothes.findById(req.params.id);

    if (!clothes) {
      return res.status(404).json({ message: "Clothes not found" });
    }

    res.status(200).json(clothes);
  } catch (error) {
    console.error("Lỗi khi gọi getClothesById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createClothes = async (req, res) => {
  try {
    const newClothes = await createClothesService(req.body);
    res.status(201).json(newClothes);
  } catch (error) {
    console.error("Lỗi khi gọi createClothes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateClothes = async (req, res) => {
  try {
    const updated = await updateClothesService(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Clothes not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error("Lỗi khi gọi UpdateClothes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteClothes = async (req, res) => {
  try {
    const deleted = await deleteClothesService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Clothes not found" });
    }
    res.status(200).json({ message: "Clothes deleted successfully" });
  } catch (error) {
    console.error("Lỗi khi gọi DeleteClothes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAllClothes,
  createClothes,
  updateClothes,
  deleteClothes,
  getClothesById,
};
