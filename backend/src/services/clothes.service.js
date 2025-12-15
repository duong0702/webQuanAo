import Clothes from "../models/Clothes.js";

export const createClothesWithImages = async (data) => {
  return await Clothes.create(data);
};
