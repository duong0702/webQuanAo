import Order from "../models/Order.js";

export const createOrderService = (data) => {
  return Order.create(data);
};

export const getAllOrdersService = () => {
  return Order.find().populate("userId").populate("items.clothesId");
};
