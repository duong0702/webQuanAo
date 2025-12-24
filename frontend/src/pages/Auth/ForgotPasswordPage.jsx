import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";
import { useEffect } from "react";

const ForgotPasswordPage = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      toast.error("Vui lòng nhập email");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`,
        { email }
      );

      toast.success("Tạo link đặt lại mật khẩu thành công");
      setResetLink(res.data.resetLink);
    } catch (err) {
      toast.error(err.response?.data?.message || "Có lỗi xảy ra");
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
              "url(https://images.unsplash.com/photo-1521791136064-7986c2920216)",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Card */}
        <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Quên mật khẩu
          </h1>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Nhập email đã đăng ký để nhận link đặt lại mật khẩu
          </p>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Đang xử lý..." : "Tạo link đặt lại mật khẩu"}
          </button>

          {resetLink && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-sm break-all">
              <p className="font-medium mb-1">🔗 Reset link (DEV MODE):</p>
              <a href={resetLink} className="text-indigo-600 underline">
                {resetLink}
              </a>
            </div>
          )}
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default ForgotPasswordPage;
