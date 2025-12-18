import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaHome,
  FaShoppingCart,
  FaClipboardList,
  FaSignInAlt,
  FaClipboard,
} from "react-icons/fa";

const HomeHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(() => {
    return Boolean(
      localStorage.getItem("token") || localStorage.getItem("user")
    );
  });

  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const onStorage = () => {
      setLoggedIn(
        Boolean(localStorage.getItem("token") || localStorage.getItem("user"))
      );
      // Update user name and role
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
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // also update login state when route changes (same-tab login/logout)
  useEffect(() => {
    setLoggedIn(
      Boolean(localStorage.getItem("token") || localStorage.getItem("user"))
    );
    // Update user name and role
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
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/login");
  };

  const navItems = loggedIn
    ? [
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
      ]
    : [
        { name: "Home", path: "/", icon: <FaHome className="mr-2" /> },
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
          {navItems.map((item) => {
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
                <FaClipboard className="mr-2" />
                Admin Orders
              </Link>

              <a
                href="http://localhost:5173/admin/products/"
                className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200
                  ${
                    location.pathname === "/admin/products/new"
                      ? "bg-indigo-600 text-white"
                      : "text-indigo-600 hover:bg-indigo-50 font-semibold"
                  }
                `}
              >
                <FaClipboardList className="mr-2" />
                Admin Product
              </a>
            </>
          )}

          {loggedIn && (
            <div className="flex items-center gap-3 pl-3 border-l border-gray-300">
              <div className="flex items-center gap-2">
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
