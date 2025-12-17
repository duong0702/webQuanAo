import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  payOrder,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ User Routes
router.post("/", authMiddleware, createOrder);
router.get("/my", authMiddleware, getMyOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id/cancel", authMiddleware, cancelOrder);
router.put("/:id/pay", authMiddleware, payOrder);

// ✅ ADMIN: Lấy tất cả đơn hàng
router.get("/admin/all", authMiddleware, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error("GET ALL ORDERS ERROR:", err);
    res.status(500).json({ message: "Lỗi lấy danh sách đơn hàng" });
  }
});

// ✅ ADMIN: Cập nhật trạng thái đơn hàng
router.put("/:id/status", authMiddleware, isAdmin, async (req, res) => {
  const { status } = req.body;

  const validStatus = ["pending", "paid", "shipped", "completed", "cancelled"];
  if (!validStatus.includes(status)) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ" });
  }

  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    console.error("UPDATE ORDER STATUS ERROR:", err);
    res.status(500).json({ message: "Cập nhật trạng thái thất bại" });
  }
});

export default router;
