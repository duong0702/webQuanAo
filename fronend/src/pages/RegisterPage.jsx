import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Đăng ký thành công 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md border p-6 rounded-xl shadow">
          <h1 className="text-xl font-semibold mb-4">Đăng ký</h1>

          <input
            className="w-full border p-3 rounded mb-3"
            placeholder="Họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            onClick={handleRegister}
            className="w-full bg-indigo-600 text-white py-3 rounded"
          >
            Đăng ký
          </button>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default RegisterPage;
