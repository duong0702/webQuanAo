import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaHome,
  FaShoppingCart,
  FaClipboardList,
  FaSignInAlt,
} from "react-icons/fa";

const HomeHeader = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome className="mr-2" /> },
    { name: "Cart", path: "/cart", icon: <FaShoppingCart className="mr-2" /> },
    {
      name: "Orders",
      path: "/",
      icon: <FaClipboardList className="mr-2" />,
    },
    { name: "Sign In", path: "/", icon: <FaSignInAlt className="mr-2" /> },
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
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
