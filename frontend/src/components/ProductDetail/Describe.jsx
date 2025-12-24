import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { addToCart } from "@/lib/cart";

const colorNameToHex = (name) => {
  if (!name) return "#CCCCCC";
  const n = name.toLowerCase();
  const map = {
    black: "#000000",
    white: "#ffffff",
    red: "#ef4444",
    blue: "#3b82f6",
    beige: "#e6d8c3",
    "be đậm": "#cdbba8",
    green: "#10b981",
    gray: "#9ca3af",
  };
  if (n.startsWith("#")) return name;
  return map[n] || "#d1d5db";
};

const Describe = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product?.color?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(
    (product?.size && product.size[0]?.toString().trim().toLowerCase()) || null
  );
  const [pricePulse, setPricePulse] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setPricePulse((p) => !p), 800);
    return () => clearInterval(id);
  }, []);

  const changeQty = (delta) => setQty((q) => Math.max(1, q + delta));

  const addToCartHandler = () => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để thêm vào giỏ");
        return;
      }

      addToCart({
        product: product._id,
        name: product.name || product.brand || product.title || "Sản phẩm",
        type: product.type,
        image: product.mainImage,
        price: product.price,
        qty,
        selectedColor,
        selectedSize,
      });
      toast.success("Đã thêm vào giỏ hàng");
    } catch (err) {
      console.error(err);
      toast.error("Không thể thêm vào giỏ hàng");
    }
  };

  const buyNow = () => {
    try {
      // Get user ID for per-user cart key
      const userData = localStorage.getItem("user");
      let userId = "";
      if (userData) {
        try {
          const user = JSON.parse(userData);
          userId = user._id || user.id || "";
        } catch {
          userId = "";
        }
      }

      // Check if user is logged in
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Vui lòng đăng nhập để mua hàng");
        return;
      }

      const cartItem = {
        cartId: `${product._id}-${Date.now()}`, // unique id
        product: product._id,
        name: product.name || product.brand || product.title || "Sản phẩm",
        type: product.type,
        image: product.mainImage,
        price: product.price,
        qty,
        selectedColor,
        selectedSize,
      };

      // Save directly to checkout_items (skip cart)
      localStorage.setItem("checkout_items", JSON.stringify([cartItem]));
      toast.success("Đang chuyển tới thanh toán...");
      navigate("/pay");
    } catch (err) {
      console.error(err);
      toast.error("Không thể tiến hành mua hàng");
    }
  };

  const sizesOrder = ["s", "m", "l", "xl"];

  const normalizedSizes = (product?.size || []).map((s) =>
    (s || "").toString().trim().toLowerCase()
  );

  useEffect(() => {
    if (product) {
      if (!selectedSize || !normalizedSizes.includes(selectedSize)) {
        setSelectedSize(normalizedSizes[0] || null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const previewImage = product.mainImage;

  return (
    <div className="p-4">
      <div className="grid md:grid-cols-2 gap-4 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold">
            {product.name || product.brand || product.title || "Sản phẩm"}
          </h2>
          <div className="text-gray-600 mt-2">
            Sản phẩm còn những size:{" "}
            {product.size && product.size.length > 0
              ? product.size.map((s) => s.toString().toUpperCase()).join(", ")
              : "Không có"}
          </div>

          <div
            className={`font-bold text-2xl md:text-3xl mt-4 transition-colors duration-300 ${
              pricePulse ? "text-rose-600" : "text-indigo-600"
            }`}
          >
            ${product.price}
          </div>

          {/* Color selection */}
          <div className="mt-4">
            <div className="text-sm font-medium">Màu sắc:</div>
            <div className="flex items-center gap-3 mt-2">
              {(product.color && product.color.length > 0
                ? product.color
                : ["#d1d5db"]
              ).map((c, i) => {
                const hex = colorNameToHex(c);
                const isSelected = c === selectedColor;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    className={`w-9 h-9 rounded-full border ${
                      isSelected ? "ring-2 ring-indigo-500" : ""
                    }`}
                    style={{ background: hex }}
                    aria-label={`color-${c}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Size selection */}
          <div className="mt-4">
            <div className="text-sm font-medium">Kích thước:</div>
            <div className="flex items-center gap-3 mt-2">
              {sizesOrder.map((sz) => {
                const available = normalizedSizes.includes(sz);
                const isSelected = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => available && setSelectedSize(sz)}
                    className={`px-3 py-2 border rounded ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700"
                    } ${
                      available
                        ? "opacity-100"
                        : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    {sz.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <img
              src="https://plus.unsplash.com/premium_photo-1672883552013-506440b2f11c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FsZSUyMHNob3BwaW5ofGVufDB8fDB8fHww"
              alt="sale"
              className="w-full h-full object-cover rounded-lg shadow-lg transform rotate-12"
            />
            {product.discount ? (
              <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                {product.discount}%
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* small preview above add buttons */}
      <div className="mt-6 flex items-center gap-4">
        <div className="w-28 h-28 rounded overflow-hidden border">
          <img
            src={previewImage}
            alt="preview"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => changeQty(-1)}
                className="px-4 py-2 bg-white"
              >
                -
              </button>
              <div className="px-6 font-medium">{qty}</div>
              <button
                onClick={() => changeQty(1)}
                className="px-4 py-2 bg-white"
              >
                +
              </button>
            </div>

            <button
              onClick={addToCartHandler}
              className="flex-1 border border-indigo-600 text-indigo-600 px-4 py-3 rounded-lg uppercase font-medium"
            >
              Thêm vào giỏ
            </button>
          </div>

          <button
            onClick={buyNow}
            className="mt-3 w-full bg-indigo-900 text-white px-4 py-3 rounded-lg uppercase font-medium"
          >
            Đặt hàng ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Describe;
