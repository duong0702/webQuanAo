import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import logo from "../../assets/logo.png";
import {
  FaHome,
  FaShoppingCart,
  FaClipboardList,
  FaSignInAlt,
} from "react-icons/fa";

const megaMenu = {
  all: [
    { label: "Sản phẩm mới", query: { status: "new" } },
    { label: "Hàng bán chạy", query: { status: "hot" } },
    { label: "OUTLET - Sale up to 50%", query: { status: "sale" } },
    { label: "Sản phẩm giới hạn", query: { status: "limited" } },
  ],
  shirt: [
    { label: "Áo Thun", query: { type: "t-shirt" } },
    { label: "Áo Polo", query: { type: "polo" } },
    { label: "Hoodie", query: { type: "hoodie" } },
    { label: "Áo Khoác", query: { type: "jacket" } },
  ],
  pant: [
    { label: "Quần Jean", query: { type: "pant" } },
    { label: "Quần Short", query: { type: "short" } },
  ],
};

const HomeHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const goWithQuery = (queryObj = {}) => {
    console.log("goWithQuery:", queryObj);
    const params = new URLSearchParams();

    Object.entries(queryObj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v)); // Support multi-type
      } else {
        params.set(key, value);
      }
    });

    navigate(params.toString() ? `/?${params.toString()}` : "/");
    toast.success("Đang lọc sản phẩm...");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [loggedIn, setLoggedIn] = useState(() => {
    return Boolean(
      localStorage.getItem("token") || localStorage.getItem("user")
    );
  });

  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const updateUserInfo = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user.name || "");
        setUserRole(user.role || "");
      } catch {
        setUserName("");
        setUserRole("");
      }
    }
  };

  useEffect(() => {
    const onStorage = () => {
      setLoggedIn(
        Boolean(localStorage.getItem("token") || localStorage.getItem("user"))
      );
      updateUserInfo();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // also update login state when route changes (same-tab login/logout)
  useEffect(() => {
    setLoggedIn(
      Boolean(localStorage.getItem("token") || localStorage.getItem("user"))
    );
    updateUserInfo();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome className="mr-2" /> },
    {
      name: "Cart",
      path: "/cart",
      icon: <FaShoppingCart className="mr-2" />,
    },
    {
      name: "My Orders",
      path: "/my-orders",
      icon: <FaClipboardList className="mr-2" />,
    },
  ];

  const additionalItems = loggedIn
    ? []
    : [
        {
          name: "Sign In",
          path: "/login",
          icon: <FaSignInAlt className="mr-2" />,
        },
      ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Shop Logo"
            className="w-16 h-16 object-contain rounded-full border-2 border-indigo-500 shadow-md hover:scale-105 transition-transform duration-300"
          />
          <div className="flex flex-col items-start">
            <div className="flex flex-col items-start relative">
              <div className="text-3xl font-bold text-purple-600 italic drop-shadow-lg animate-blink">
                Men Fashion
              </div>
              <svg
                className="w-24 h-2 mt-1"
                viewBox="0 0 120 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 5 C20 0, 40 10, 60 5 S100 5, 120 5"
                  stroke="#9b5de5"
                  strokeWidth="2"
                  fill="transparent"
                />
              </svg>
            </div>

            <style></style>
          </div>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          {/* HOME */}
          <Link
            to="/"
            className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200
      ${
        location.pathname === "/"
          ? "bg-indigo-600 text-white"
          : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
      }
    `}
          >
            <FaHome className="mr-2" />
            Home
          </Link>

          {/* 🔥 MEGA MENU – SẢN PHẨM (NGAY SAU HOME) */}
          <div className="relative group">
            <button
              type="button"
              className="flex items-center px-3 py-2 rounded-md font-semibold
        text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition"
            >
              Sản phẩm
              <svg
                className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* MEGA MENU CONTENT */}
            <div
              className="absolute left-0 top-full mt-2 w-[900px]
        bg-white border rounded-lg shadow-xl
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-300 z-50"
            >
              <div className="grid grid-cols-3 gap-8 p-8">
                {/* CỘT 1 */}
                <div>
                  <button
                    onClick={() => goWithQuery({})}
                    className="font-bold text-lg mb-4 hover:text-indigo-600 block w-full text-left"
                  >
                    TẤT CẢ SẢN PHẨM
                  </button>
                  {megaMenu.all.map((i) => (
                    <button
                      key={i.label}
                      onClick={() => goWithQuery(i.query)}
                      className="block w-full text-left py-2 hover:text-indigo-600"
                    >
                      {i.label}
                    </button>
                  ))}
                </div>

                {/* CỘT 2 */}
                <div>
                  <button
                    onClick={() =>
                      goWithQuery({
                        group: "shirt",
                        type: ["hoodie", "polo", "jacket", "t-shirt"],
                      })
                    }
                    className="font-bold text-lg mb-4"
                  >
                    ÁO NAM
                  </button>

                  {megaMenu.shirt.map((i) => (
                    <button
                      key={i.label}
                      onClick={() => goWithQuery(i.query)}
                      className="block w-full text-left py-2 hover:text-indigo-600"
                    >
                      {i.label}
                    </button>
                  ))}
                </div>

                {/* CỘT 3 */}
                <div>
                  <button
                    onClick={() =>
                      goWithQuery({
                        group: "pant",
                        type: ["pant", "short"],
                      })
                    }
                    className="font-bold text-lg mb-4"
                  >
                    QUẦN NAM
                  </button>

                  {megaMenu.pant.map((i) => (
                    <button
                      key={i.label}
                      onClick={() => goWithQuery(i.query)}
                      className="block w-full text-left py-2 hover:text-indigo-600"
                    >
                      {i.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CÁC MENU CÒN LẠI (Cart, My Orders, Sign In...) */}
          {navItems
            .filter((item) => item.name !== "Home")
            .map((item) => {
              const isActive = location.pathname === item.path;
              const protectedItems = ["Cart", "My Orders"];

              const handleClick = (e) => {
                if (protectedItems.includes(item.name) && !loggedIn) {
                  e.preventDefault();
                  toast.error("Vui lòng đăng nhập để tiếp tục");
                  navigate("/login");
                }
              };

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleClick}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200
            ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
            }
          `}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}

          {/* Sign In - chỉ hiển thị khi chưa đăng nhập */}
          {additionalItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200
            ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
            }
          `}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}

          {/* ⬇⬇⬇ GIỮ NGUYÊN 100% PHẦN DƯỚI ⬇⬇⬇ */}

          {loggedIn && userRole === "admin" && (
            <>
              <Link
                to="/admin/orders"
                className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200
          ${
            location.pathname === "/admin/orders"
              ? "bg-red-600 text-white"
              : "text-red-600 hover:bg-red-50 font-semibold"
          }
        `}
              >
                <FaClipboardList className="mr-2" />
                Admin Orders
              </Link>

              <Link
                to="/admin/products/"
                className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200
          ${
            location.pathname === "/admin/products/"
              ? "bg-indigo-600 text-white"
              : "text-indigo-600 hover:bg-indigo-50 font-semibold"
          }
        `}
              >
                <FaClipboardList className="mr-2" />
                Admin Product
              </Link>
            </>
          )}

          {loggedIn && (
            <div className="flex items-center gap-3 pl-3 border-l border-gray-300">
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-xs">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium max-w-xs truncate">
                  {userName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
              >
                <FaSignInAlt className="mr-2 transform rotate-180" />
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
