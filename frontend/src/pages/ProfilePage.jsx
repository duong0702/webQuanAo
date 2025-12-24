import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Phiên đăng nhập đã hết hạn");
          localStorage.clear();
          navigate("/login");
        } else {
          toast.error("Không thể tải thông tin người dùng");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      <main className="flex-1 flex items-center justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          {loading ? (
            <div className="flex justify-center">
              <p className="text-center text-gray-500">Đang tải...</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Thông tin tài khoản
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Quản lý hồ sơ của bạn
                </p>
              </div>

              <div className="space-y-5 mb-8">
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    Họ tên
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user?.name}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    Email
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {user?.email}
                  </p>
                </div>

                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 font-medium mb-1">
                    Vai trò
                  </p>
                  <div>
                    {user?.role === "admin" ? (
                      <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-red-100 text-red-700">
                        🛡️ Quản trị viên
                      </span>
                    ) : (
                      <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-700">
                        👤 Khách hàng
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition active:scale-[0.98]"
                >
                  🔐 Đổi mật khẩu
                </button>

                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-medium hover:bg-gray-300 transition active:scale-[0.98]"
                >
                  🚪 Đăng xuất
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default ProfilePage;
