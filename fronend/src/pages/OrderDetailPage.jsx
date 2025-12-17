import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_LABEL = {
  pending: "Chờ thanh toán",
  paid: "Đã thanh toán",
  shipped: "Đang giao hàng",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCancelOrder = async () => {
    const ok = window.confirm("Bạn có chắc muốn hủy đơn hàng này?");
    if (!ok) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/orders/${order._id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrder((prev) => ({ ...prev, status: "cancelled" }));
    } catch (err) {
      alert("Không thể hủy đơn hàng");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await axios.get(`http://localhost:3000/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrder(res.data);
      } catch (err) {
        console.error(err);
        navigate("/my-orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;
  if (!order) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <HomeHeader />

      <main className="container mx-auto max-w-5xl px-4 py-10 flex-1">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-indigo-600 hover:underline"
        >
          ← Quay lại đơn hàng của tôi
        </button>

        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Đơn hàng #{order._id.slice(-6)}
              </h1>
              <p className="text-gray-500 text-sm">
                Ngày tạo:{" "}
                {new Date(order.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                statusColor[order.status]
              }`}
            >
              {STATUS_LABEL[order.status]}
            </span>
          </div>
        </div>

        {/* ACTION BAR */}
        {["pending", "paid"].includes(order.status) && (
          <div className="mb-8 flex flex-wrap gap-4">
            {order.status === "pending" && (
              <button
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow"
                onClick={() => navigate(`/payment/${order._id}`)}
              >
                Thanh toán ngay
              </button>
            )}

            <button
              onClick={handleCancelOrder}
              className="px-6 py-3 rounded-xl border border-red-400 text-red-500 font-semibold hover:bg-red-50 transition"
            >
              Hủy đơn hàng
            </button>
          </div>
        )}

        {/* SHIPPING INFO - NỔI BẬT */}
        <div className="mb-8 bg-white border-2 border-indigo-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
              ✓
            </span>
            Thông tin giao hàng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600">
              <p className="text-xs uppercase font-semibold text-indigo-600 tracking-wider">
                Họ và tên
              </p>
              <p className="text-xl font-bold text-gray-900 mt-2">
                {order.customerName}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-xs uppercase font-semibold text-blue-600 tracking-wider">
                Số điện thoại
              </p>
              <p className="text-xl font-bold text-gray-900 mt-2">
                {order.shippingAddress.phone}
              </p>
            </div>
            <div className="md:col-span-2 bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
              <p className="text-xs uppercase font-semibold text-green-600 tracking-wider">
                Địa chỉ giao hàng
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-2">
                {order.shippingAddress.address}
              </p>
            </div>
            {order.message && (
              <div className="md:col-span-2 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="text-xs uppercase font-semibold text-purple-600 tracking-wider">
                  Lời nhắn
                </p>
                <p className="text-base font-semibold text-purple-800 mt-2 italic">
                  "{order.message}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ITEMS */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
              📦
            </span>
            Sản phẩm đã đặt
          </h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id || item.product}
                className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-indigo-200"
                />
                <div className="flex-1">
                  <p className="font-bold text-lg text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-1">SL: {item.qty}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.selectedSize && `Size: ${item.selectedSize}`}{" "}
                    {item.selectedColor && `• Màu: ${item.selectedColor}`}
                  </p>
                  <p className="text-sm text-indigo-600 font-semibold mt-2">
                    {item.price.toLocaleString()}$/cái
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Thành tiền</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {(item.price * (item.qty || 1)).toLocaleString()}$
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL - NỔI BẬT */}
          <div className="mt-8 pt-6 border-t-2 border-indigo-200">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Tổng cộng</span>
              <div className="text-right">
                <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {order.totalPrice.toLocaleString()}$
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default OrderDetailPage;
