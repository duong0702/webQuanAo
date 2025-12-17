import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const statusBadge = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await axios.get(
          "http://localhost:3000/api/orders/admin/all",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert("Không có quyền admin");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HomeHeader />

      <main className="flex-1 max-w-7xl mx-auto p-6 w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">📋 Quản lý đơn hàng</h1>
          <p className="text-gray-600 text-sm mt-1">
            Tổng cộng: {orders.length} đơn hàng
          </p>
        </div>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600 border-b">
              <tr>
                <th className="p-4 text-left">Mã</th>
                <th className="p-4 text-left">Khách hàng</th>
                <th className="p-4 text-left">Ngày</th>
                <th className="p-4 text-center">Tổng</th>
                <th className="p-4 text-center">Trạng thái</th>
                <th className="p-4 text-center">Chi tiết</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-gray-900">
                    #{order._id.slice(-6)}
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-gray-900">
                      {order.user?.name || "N/A"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.user?.email || "N/A"}
                    </div>
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </td>

                  <td className="p-4 text-center font-semibold text-gray-900">
                    {order.totalPrice.toLocaleString()}$
                  </td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        statusBadge[order.status]
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                      className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium transition"
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <p className="text-center p-8 text-gray-500 font-medium">
              Chưa có đơn hàng nào
            </p>
          )}
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default AdminOrdersPage;
