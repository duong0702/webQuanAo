import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useSearchParams, useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";
import { useEffect } from "react";

const ResetPasswordPage = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password) {
      toast.error("Vui lòng nhập mật khẩu mới");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          token,
          newPassword: password,
        }
      );

      toast.success("Đặt lại mật khẩu thành công 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Token không hợp lệ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      <main className="flex-1 relative flex items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d)",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Đặt lại mật khẩu
          </h1>

          <input
            type="password"
            placeholder="Mật khẩu mới"
            className="w-full border p-3 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Đang cập nhật..." : "Xác nhận"}
          </button>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default ResetPasswordPage;
