import {
  getAllClothesService,
  updateClothesService,
  deleteClothesService,
} from "../services/CRUDservices.js";
import { createClothesWithImages } from "../services/clothes.service.js";
import Clothes from "../models/Clothes.js";
import cloudinary from "../config/cloudinary.js";
const getAllClothes = async (req, res) => {
  try {
    // simpler query: return ordered list and basic counts
    console.log("getAllClothes called from", req.ip, req.headers["user-agent"]);
    const clothes = await Clothes.find().sort({ createdAt: -1 }).lean();
    const shirtCount = await Clothes.countDocuments({ type: "shirt" });
    const pantCount = await Clothes.countDocuments({ type: "pant" });
    // If no clothes found, return empty array gracefully
    return res
      .status(200)
      .json({ clothes: clothes || [], shirtCount, pantCount });
  } catch (error) {
    console.error("Lỗi khi gọi getAllClothes:", error);
    return res.status(500).json({ message: "Internal server error" });
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
    const imageUrls = [];

    for (const file of req.files) {
      const upload = await cloudinary.uploader.upload(file.path, {
        folder: "clothes",
      });
      imageUrls.push(upload.secure_url);
    }

    const clothesData = {
      ...req.body,
      images: imageUrls,
    };

    const newClothes = await createClothesWithImages(clothesData);

    res.status(201).json(newClothes);
  } catch (err) {
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
