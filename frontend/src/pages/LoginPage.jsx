import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect nếu đã login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.warning("Vui lòng nhập đầy đủ thông tin");
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Đăng nhập thành công 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Đăng nhập thất bại");
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
              "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f')",
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Form */}
        <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
          <h1 className="text-2xl font-bold text-center mb-2">
            Chào mừng trở lại 👋
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Đăng nhập để tiếp tục mua sắm
          </p>

          <input
            className="w-full border rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />

          <div className="relative mb-3">
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

          <div className="flex justify-end mb-5">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-indigo-600 cursor-pointer hover:underline"
            >
              Quên mật khẩu?
            </span>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>

          <p className="text-sm text-center mt-6 text-gray-600">
            Chưa có tài khoản?{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </span>
          </p>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default LoginPage;
