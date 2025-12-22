import Clothes from "../models/Clothes.js";

export const createClothesWithImages = async (data) => {
  // Sanitize & normalize data trước khi lưu
  return await Clothes.create({
    ...data,
    description: data.description || "",
    color: Array.isArray(data.color) ? data.color : [],
    size: Array.isArray(data.size) ? data.size : [],
    images: Array.isArray(data.images) ? data.images : [],
  });
};
