import Clothes from "../models/Clothes.js";

// Lấy tất cả
export const getAllClothesService = async () => {
  return await Clothes.find().sort({ createdAt: -1 });
};

// Cập nhật
export const updateClothesService = async (id, data) => {
  return await Clothes.findByIdAndUpdate(id, data, { new: true });
};

// Xoá
export const deleteClothesService = async (id) => {
  return await Clothes.findByIdAndDelete(id);
};
