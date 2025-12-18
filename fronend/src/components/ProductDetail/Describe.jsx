import React, { useState } from "react";
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
    (product?.size && product.size[0]) || null
  );
  const navigate = useNavigate();

  const changeQty = (delta) => setQty((q) => Math.max(1, q + delta));

  const addToCartHandler = () => {
    try {
      addToCart({
        product: product._id,
        name: product.brand || product.title || "Sản phẩm",
        type: product.type,
        image: product.images?.[0] || product.image,
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
    addToCart({
      product: product._id,
      name: product.brand || product.title || "Sản phẩm",
      type: product.type,
      image: product.images?.[0] || product.image,
      price: product.price,
      qty,
      selectedColor,
      selectedSize,
    });
    navigate("/pay");
  };

  const sizesOrder = ["s", "m", "l", "xl"];

  const previewImage = (product.images && product.images[0]) || product.image;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">
        {product.brand || product.title}
      </h2>
      <div className="text-gray-600 mt-2">
        {product.type} · {product.size?.join(", ")}
      </div>
      <div className="text-indigo-600 font-bold text-xl mt-4">
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
            const available = (product.size || [])
              .map((s) => s.toLowerCase())
              .includes(sz);
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
                  available ? "opacity-100" : "opacity-40 cursor-not-allowed"
                }`}
              >
                {sz.toUpperCase()}
              </button>
            );
          })}
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
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Describe;
