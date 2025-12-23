import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Đăng nhập thành công 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md border p-6 rounded-xl shadow">
          <h1 className="text-xl font-semibold mb-4">Đăng nhập</h1>

          <input
            className="w-full border p-3 rounded mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-3 rounded mb-4"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-3 rounded"
          >
            Đăng nhập
          </button>

          <p className="text-sm text-center mt-4">
            Chưa có tài khoản?{" "}
            <span
              className="text-indigo-600 cursor-pointer"
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
