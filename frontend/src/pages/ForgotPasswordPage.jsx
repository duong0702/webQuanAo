import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: reset password

  // Redirect nếu đã login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSendEmail = async () => {
    if (!email) {
      return toast.warning("Vui lòng nhập email");
    }

    try {
      setLoading(true);
      // TODO: Thay bằng API thực tế
      toast.success("Email xác nhận đã được gửi");
      setStep(2);
    } catch (err) {
      toast.error("Gửi email thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return toast.warning("Vui lòng nhập đầy đủ thông tin");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Mật khẩu không khớp");
    }

    if (newPassword.length < 6) {
      return toast.error("Mật khẩu phải ít nhất 6 ký tự");
    }

    try {
      setLoading(true);
      // TODO: Thay bằng API thực tế
      toast.success("Đặt lại mật khẩu thành công 🎉");
      navigate("/login");
    } catch (err) {
      toast.error("Đặt lại mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      <main className="relative flex-1 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1487014679447-9f8336841d58')",
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
          <h1 className="text-2xl font-bold text-center mb-2">
            Quên mật khẩu 🔒
          </h1>
          <p className="text-center text-gray-500 mb-6">
            {step === 1
              ? "Nhập email để nhận link đặt lại mật khẩu"
              : "Nhập mật khẩu mới của bạn"}
          </p>

          {step === 1 ? (
            <>
              <input
                className="w-full border rounded-xl px-4 py-3 mb-5 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />

              <button
                onClick={handleSendEmail}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Đang gửi..." : "Gửi email"}
              </button>
            </>
          ) : (
            <>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-gray-50"
                  placeholder="Mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                onClick={handleResetPassword}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
              </button>
            </>
          )}

          <p className="text-sm text-center mt-6">
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 cursor-pointer hover:underline"
            >
              Quay lại đăng nhập
            </span>
          </p>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default ForgotPasswordPage;
