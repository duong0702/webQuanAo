import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";
import OrderStatusTimeline from "@/components/OrderStatusTimeline";
import OrderStatusBadge from "@/components/OrderStatusBadge";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [navigate]);

  const removeTimers = useRef({});

  useEffect(() => {
    return () => {
      Object.values(removeTimers.current).forEach((t) => clearTimeout(t));
      removeTimers.current = {};
    };
  }, []);

  const handleCancelOrder = async (e, orderId) => {
    e.stopPropagation();

    const confirmCancel = window.confirm("Bạn có chắc muốn hủy đơn hàng này?");
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "cancelled" } : o))
      );

      // schedule removal from list after short delay
      if (removeTimers.current[orderId]) {
        clearTimeout(removeTimers.current[orderId]);
      }
      removeTimers.current[orderId] = setTimeout(() => {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        delete removeTimers.current[orderId];
      }, 1200);
    } catch (err) {
      alert("Không thể hủy đơn hàng");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f5dc] relative">
      {/* Dreamy Sunset Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(180deg, 
          rgba(245,245,220,1) 0%, 
          rgba(255,223,186,0.8) 25%, 
          rgba(255,182,193,0.6) 50%, 
          rgba(147,112,219,0.7) 75%, 
          rgba(72,61,139,0.9) 100%
        ),
        radial-gradient(circle at 30% 20%, rgba(255,255,224,0.4) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(72,61,139,0.6) 0%, transparent 70%),
        radial-gradient(circle at 50% 60%, rgba(147,112,219,0.3) 0%, transparent 60%)
      `,
        }}
      />

      <div className="flex flex-col min-h-screen relative z-10">
        <HomeHeader />

        <main className="flex-1 max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-semibold mb-6 text-lg font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            Đơn hàng của tôi
          </h1>

          {orders.length === 0 ? (
            <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  onClick={() => navigate(`/orders/${order._id}`)}
                  className="border rounded-xl p-4 shadow cursor-pointer hover:shadow-lg hover:border-indigo-400 transition bg-white/80 backdrop-blur flex flex-col justify-between h-full"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-sm">
                      Mã đơn: #{order._id.slice(-6)}
                    </span>

                    <OrderStatusBadge status={order.status} />
                  </div>

                  <div className="space-y-3 mb-4">
                    {order.items.slice(0, 2).map((item) => (
                      <div
                        key={item._id || item.product}
                        className="flex items-center gap-3 border-b pb-3 last:border-b-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded border"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.qty} × {item.price.toLocaleString()}$
                          </p>
                        </div>
                      </div>
                    ))}

                    {order.items.length > 2 && (
                      <p className="text-xs text-gray-500 mt-2">
                        + {order.items.length - 2} sản phẩm khác
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t">
                    <span className="font-semibold text-sm">
                      Tổng: {order.totalPrice.toLocaleString()}$
                    </span>

                    {["pending", "paid"].includes(order.status) && (
                      <button
                        onClick={(e) => handleCancelOrder(e, order._id)}
                        className="text-xs px-3 py-1 rounded-full border border-red-400 text-red-500 hover:bg-red-50 transition"
                      >
                        Hủy đơn
                      </button>
                    )}
                  </div>

                  <OrderStatusTimeline status={order.status} />
                </div>
              ))}
            </div>
          )}
        </main>

        <HomeFooter />
      </div>
      {/* Your Content/Components */}
    </div>
  );
};

export default MyOrdersPage;
