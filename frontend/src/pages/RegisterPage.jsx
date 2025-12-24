import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect nếu đã login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      return toast.warning("Vui lòng nhập đầy đủ thông tin");
    }

    if (password !== confirmPassword) {
      return toast.error("Mật khẩu không khớp");
    }

    if (password.length < 6) {
      return toast.error("Mật khẩu phải ít nhất 6 ký tự");
    }

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      toast.success("Đăng ký thành công 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      <main className="relative flex-1 flex items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1521334884684-d80222895322')",
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Form */}
        <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
          <h1 className="text-2xl font-bold text-center mb-2">
            Tạo tài khoản 🚀
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Đăng ký để bắt đầu mua sắm
          </p>

          <input
            className="w-full border rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />

          <input
            className="w-full border rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex="-1"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="relative mb-5">
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full border rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex="-1"
            >
              {showConfirm ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>

          <p className="text-sm text-center mt-6 text-gray-600">
            Đã có tài khoản?{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default RegisterPage;
