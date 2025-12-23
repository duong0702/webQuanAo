import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const statusOptions = ["pending", "paid", "shipped", "completed", "cancelled"];

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

  // SORT + FILTER STATE
  const [sortDate, setSortDate] = useState("newest");
  const [sortTotal, setSortTotal] = useState("default");
  const [filterStatus, setFilterStatus] = useState("all");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/admin/all`,
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

  // SORT + FILTER PROCESS
  const sortedOrders = [...orders]
    .filter((order) => {
      if (filterStatus === "all") return true;
      return order.status === filterStatus;
    })
    .sort((a, b) => {
      if (sortDate === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortDate === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    })
    .sort((a, b) => {
      if (sortTotal === "asc") return a.totalPrice - b.totalPrice;
      if (sortTotal === "desc") return b.totalPrice - a.totalPrice;
      return 0;
    });

  const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleSortDate = () => {
    setSortDate((prev) => (prev === "newest" ? "oldest" : "newest"));
  };

  const toggleSortTotal = () => {
    setSortTotal((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (loading)
    return <div className="p-10 text-center text-white">Đang tải...</div>;

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Cosmic Sparkle Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.08) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.08) 10%, transparent 55%),
            radial-gradient(circle at 50% 50%, #111 0%, #1a1a1a 100%)
          `,
          backgroundBlendMode: "soft-light",
          boxShadow: `
            inset 0 0 60px rgba(255, 255, 255, 0.3),
            inset 20px 0 80px rgba(255, 0, 255, 0.2),
            inset -20px 0 80px rgba(0, 255, 255, 0.2),
            inset 20px 0 300px rgba(255, 0, 255, 0.1),
            inset -20px 0 300px rgba(0, 255, 255, 0.1),
            0 0 50px rgba(255, 255, 255, 0.1),
            -10px 0 80px rgba(255, 0, 255, 0.1),
            10px 0 80px rgba(0, 255, 255, 0.1)
          `,
          filter: "contrast(1.05) brightness(1.05) blur(0.5px)",
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        <HomeHeader />

        <main className="flex-1 max-w-7xl mx-auto p-6 w-full text-white">
          <h1 className="text-3xl font-bold mb-2">📋 Quản lý đơn hàng</h1>
          <p className="text-gray-300 text-sm mb-6">
            Tổng cộng: {orders.length} đơn hàng
          </p>

          <div className="overflow-x-auto bg-white/90 backdrop-blur-md rounded-xl shadow">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 border-b">
                <tr>
                  <th className="p-4 text-left">Mã</th>
                  <th className="p-4 text-left">Khách hàng</th>

                  <th className="p-4 text-left">
                    <button
                      onClick={toggleSortDate}
                      className="font-semibold hover:text-indigo-600 flex items-center gap-1"
                    >
                      Ngày
                      <span>{sortDate === "newest" ? "↓" : "↑"}</span>
                    </button>
                  </th>

                  <th className="p-4 text-center">
                    <button
                      onClick={toggleSortTotal}
                      className="font-semibold hover:text-indigo-600 flex items-center gap-1 justify-center w-full"
                    >
                      Tổng
                      <span>
                        {sortTotal === "asc"
                          ? "↑"
                          : sortTotal === "desc"
                          ? "↓"
                          : "↕"}
                      </span>
                    </button>
                  </th>

                  <th className="p-4 text-center w-44">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border rounded px-2 py-1 text-sm bg-white"
                    >
                      <option value="all">Tất cả trạng thái</option>
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </th>

                  <th className="p-4 text-center">Chi tiết</th>
                </tr>
              </thead>

              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-900">
                      #{order._id.slice(-6)}
                    </td>

                    <td className="p-4 text-gray-900">
                      <div className="font-semibold">
                        {order.user?.name || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.user?.email || "N/A"}
                      </div>
                    </td>

                    <td className="p-4 text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </td>

                    <td className="p-4 text-center font-semibold text-indigo-600">
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
                        className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm"
                      >
                        Xem
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedOrders.length === 0 && (
              <p className="text-center p-8 text-gray-600 font-medium">
                Không có đơn hàng phù hợp
              </p>
            )}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-3 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`px-4 py-2 rounded ${
                  currentPage === n
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </main>

        <HomeFooter />
      </div>
    </div>
  );
};

export default AdminOrdersPage;
