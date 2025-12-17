import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const statusOptions = ["pending", "paid", "shipped", "completed", "cancelled"];

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const AdminOrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await axios.get(`http://localhost:3000/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrder(res.data);
        setStatus(res.data.status);
      } catch (err) {
        console.error(err);
        alert("Không tìm thấy đơn hàng");
        navigate("/admin/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  const handleUpdateStatus = async () => {
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/orders/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Cập nhật trạng thái thành công ✅");
      setOrder((prev) => ({ ...prev, status }));
    } catch (err) {
      console.error(err);
      alert("Không thể cập nhật trạng thái");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;
  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HomeHeader />

      <main className="flex-1 max-w-5xl mx-auto p-6 w-full">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Đơn hàng #{order._id.slice(-6)}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Ngày tạo: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              statusColor[order.status]
            }`}
          >
            {order.status.toUpperCase()}
          </span>
        </div>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/admin/orders")}
          className="mb-6 text-sm text-indigo-600 hover:underline"
        >
          ← Quay lại danh sách
        </button>

        {/* CUSTOMER INFO */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
              👤
            </span>
            Khách hàng
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600">
              <p className="text-xs uppercase font-semibold text-indigo-600 tracking-wider">
                Tên khách hàng
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {order.customerName}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-xs uppercase font-semibold text-blue-600 tracking-wider">
                Số điện thoại
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {order.shippingAddress.phone}
              </p>
            </div>

            <div className="md:col-span-2 bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
              <p className="text-xs uppercase font-semibold text-green-600 tracking-wider">
                Địa chỉ giao hàng
              </p>
              <p className="text-lg font-bold text-gray-900 mt-2">
                {order.shippingAddress.address}
              </p>
            </div>

            {order.message && (
              <div className="md:col-span-2 bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="text-xs uppercase font-semibold text-purple-600 tracking-wider">
                  Ghi chú
                </p>
                <p className="text-base text-purple-800 mt-2 italic">
                  "{order.message}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ITEMS */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
              📦
            </span>
            Sản phẩm đã đặt
          </h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item._id || item.product}
                className="flex gap-4 border rounded-lg p-4 hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded border-2 border-indigo-200"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-1">SL: {item.qty}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.selectedSize && `Size: ${item.selectedSize}`}{" "}
                    {item.selectedColor && `• Màu: ${item.selectedColor}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Giá</p>
                  <p className="text-lg font-bold text-indigo-600">
                    {item.price.toLocaleString()}$
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Thành tiền: {(item.price * item.qty).toLocaleString()}$
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-6 pt-6 border-t-2 border-indigo-200">
            <p className="text-2xl font-bold text-indigo-600">
              Tổng: {order.totalPrice.toLocaleString()}$
            </p>
          </div>
        </div>

        {/* UPDATE STATUS */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">
              ⚙️
            </span>
            Cập nhật trạng thái
          </h2>

          <div className="flex items-center gap-4 flex-wrap">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border-2 border-gray-300 rounded-lg px-4 py-2 font-medium focus:outline-none focus:border-indigo-600"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>

            <button
              onClick={handleUpdateStatus}
              disabled={updating}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? "Đang lưu..." : "Lưu trạng thái"}
            </button>

            {status !== order.status && (
              <p className="text-sm text-amber-600 font-medium">
                * Đã thay đổi, bấm "Lưu trạng thái" để lưu
              </p>
            )}
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default AdminOrderDetailPage;
