import {
  createOrderService,
  getAllOrdersService,
} from "../services/orderServices.js";

export const createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.body);
    res.status(201).json(order);
  } catch {
    res.status(500).json({ message: "Create order failed" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrdersService();
    res.json(orders);
  } catch {
    res.status(500).json({ message: "Get orders failed" });
  }
};
