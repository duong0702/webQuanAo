// src/controllers/orderController.js
import Order from "../models/Order.js";

/**
 * @desc   Create new order
 * @route  POST /api/orders
 * @access Private
 */
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, customerName, message } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Order items is empty" });
    }

    // ✅ BE tự tính totalPrice
    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * (item.qty || 1),
      0
    );

    // ✅ Lưu snapshot sản phẩm (tên, ảnh, giá) để sau này product bị xoá vẫn có data
    const orderItemsSnapshot = orderItems.map((item) => ({
      product: item.product || item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      qty: item.quantity || item.qty || 1,
    }));

    const order = await Order.create({
      user: req.user._id,
      items: orderItemsSnapshot,
      shippingAddress,
      customerName: customerName || req.user.name,
      message: message || "",
      totalPrice,
    });

    res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get logged in user orders
 * @route  GET /api/orders/my
 * @access Private
 */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    console.error("GET MY ORDERS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Get order by ID
 * @route  GET /api/orders/:id
 * @access Private
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "name image price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔒 Chỉ owner hoặc admin mới xem được
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    console.error("GET ORDER BY ID ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc   Cancel order by ID (owner only, pending/paid)
 * @route  PUT /api/orders/:id/cancel
 * @access Private
 */
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    // Only owner can cancel
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Không có quyền hủy đơn này" });
    }

    // Only allow cancelling pending or paid
    if (!["pending", "paid"].includes(order.status)) {
      return res
        .status(400)
        .json({ message: "Đơn hàng không thể hủy ở trạng thái này" });
    }

    // Permanently remove only this order from DB
    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: "Đơn hàng đã bị xóa" });
  } catch (error) {
    console.error("CANCEL ORDER ERROR:", error);
    res.status(500).json({ message: "Lỗi server khi hủy đơn hàng" });
  }
};

/**
 * @desc   Pay order (pending → paid)
 * @route  PUT /api/orders/:id/pay
 * @access Private
 */
export const payOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only owner can pay
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Only allow payment when pending
    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order is not pending" });
    }

    order.status = "paid";
    order.paidAt = Date.now();
    order.paymentMethod = "mock";

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    console.error("PAY ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
