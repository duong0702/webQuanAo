import React from "react";

const STATUS_CONFIG = {
  pending: {
    text: "Chờ thanh toán",
    className: "bg-yellow-100 text-yellow-700 border-yellow-300",
  },
  paid: {
    text: "Đã thanh toán",
    className: "bg-blue-100 text-blue-700 border-blue-300",
  },
  shipped: {
    text: "Đang giao",
    className: "bg-purple-100 text-purple-700 border-purple-300",
  },
  completed: {
    text: "Hoàn thành",
    className: "bg-green-100 text-green-700 border-green-300",
  },
  cancelled: {
    text: "Đã hủy",
    className: "bg-red-100 text-red-700 border-red-300",
  },
};

const OrderStatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full border font-medium ${config.className}`}
    >
      {config.text}
    </span>
  );
};

export default OrderStatusBadge;
