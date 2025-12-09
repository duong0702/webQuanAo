import Clothes from "../models/clothes.js";

// Lấy tất cả
export const getAllClothesService = async () => {
  return await Clothes.find().sort({ createdAt: -1 });
};

// Tạo mới
export const createClothesService = async (data) => {
  return await Clothes.create(data);
};

// Cập nhật
export const updateClothesService = async (id, data) => {
  return await Clothes.findByIdAndUpdate(id, data, { new: true });
};

// Xoá
export const deleteClothesService = async (id) => {
  return await Clothes.findByIdAndDelete(id);
};
