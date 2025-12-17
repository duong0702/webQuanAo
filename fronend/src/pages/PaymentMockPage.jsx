import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const PaymentMockPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePay = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/orders/${id}/pay`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Thanh toán thành công 🎉");
      navigate(`/orders/${id}`);
    } catch (err) {
      alert("Thanh toán thất bại");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <HomeHeader />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 text-center">
            Chọn phương thức thanh toán
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Đơn hàng #{id.slice(-6)}
          </p>

          <div className="space-y-4">
            <button
              onClick={handlePay}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md"
            >
              💳 Thanh toán bằng VNPay (Mock)
            </button>

            <button
              onClick={handlePay}
              className="w-full py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition shadow-md"
            >
              📱 Thanh toán bằng Momo (Mock)
            </button>

            <button
              onClick={() => navigate(`/orders/${id}`)}
              className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              ← Quay lại
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-6">
            * Đây là thanh toán giả lập (mock)
          </p>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default PaymentMockPage;
