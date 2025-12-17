import React, { useEffect, useState } from "react";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react";
import StatsAndFilters from "@/components/Cart/StatsAndFilters";
import ClothesListPagination from "@/components/Cart/ClothesListPagination";
import { visibleClothesLimit } from "@/lib/data";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filteredIndices, setFilteredIndices] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Get user ID from stored user data
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

    // Use per-user cart key
    const cartKey = userId ? `cart_${userId}` : "cart";
    const raw = localStorage.getItem(cartKey) || "[]";
    const parsed = JSON.parse(raw);
    setCart(parsed);
    console.log("cart items:", parsed);
  }, [navigate]);

  const toggle = (cartId) => {
    setSelected((prev) =>
      prev.includes(cartId)
        ? prev.filter((id) => id !== cartId)
        : [...prev, cartId]
    );
  };

  const total = selected.reduce((sum, cartId) => {
    const item = cart.find((c) => c.cartId === cartId);
    return sum + (item?.price || 0) * (item?.qty || 1);
  }, 0);

  const pageSize = visibleClothesLimit || 5;
  const filtered = filteredIndices.map((i) => cart[i]).filter(Boolean);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  if (page > totalPages) setPage(totalPages);
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const removeSelected = () => {
    const remain = cart.filter((item) => !selected.includes(item.cartId));
    setCart(remain);

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
    const cartKey = userId ? `cart_${userId}` : "cart";
    localStorage.setItem(cartKey, JSON.stringify(remain));
    setSelected([]);
  };

  const checkout = () => {
    const items = cart.filter((item) => selected.includes(item.cartId));
    localStorage.setItem("checkout_items", JSON.stringify(items));
    navigate("/pay");
  };

  if (cart.length === 0) {
    return (
      <>
        <HomeHeader />
        <div className="container mx-auto py-16 text-center">
          🛒 Giỏ hàng trống
        </div>
        <HomeFooter />
      </>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f9fafb] relative">
      {/* Diagonal Fade Bottom Grid Left Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="flex flex-col min-h-screen relative z-10">
        <HomeHeader />

        <main className="container mx-auto px-4 py-10 flex-1">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold mb-2">Giỏ hàng</h1>

            <StatsAndFilters
              cart={cart}
              onFilteredChange={(indices) => {
                setFilteredIndices(indices);
                setPage(1);
              }}
            />

            <div className="text-sm text-gray-600 mt-2">
              Đang có <strong>{cart.length}</strong> sản phẩm trong giỏ hàng •
              Hiển thị <strong>{filtered.length}</strong>
            </div>
          </div>

          <div className="space-y-4">
            {pageItems.map((item) => (
              <div
                key={item.cartId}
                className={`flex items-center gap-4 p-4 border rounded-xl ${
                  selected.includes(item.cartId) ? "ring-2 ring-indigo-500" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected.includes(item.cartId)}
                  onChange={() => toggle(item.cartId)}
                />

                <img
                  src={item?.image || item?.images?.[0]}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    Màu: {item.selectedColor} • Size: {item.selectedSize}
                  </div>
                  <div className="text-sm">SL: {item.qty}</div>
                </div>

                <div className="font-semibold">{item.price * item.qty}$</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center">
            <ClothesListPagination
              handleNext={() => setPage((p) => Math.min(p + 1, totalPages))}
              handlePrev={() => setPage((p) => Math.max(p - 1, 1))}
              handlePageChange={(p) => setPage(p)}
              page={page}
              totalPages={totalPages}
            />
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="text-xl font-bold">Tổng: {total}$</div>

            <div className="flex gap-3">
              <button
                onClick={removeSelected}
                disabled={selected.length === 0}
                className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-40"
              >
                <Trash2 size={18} />
              </button>

              <button
                onClick={checkout}
                disabled={selected.length === 0}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-40"
              >
                <ShoppingCart size={18} />
                Thanh toán
              </button>
            </div>
          </div>
        </main>

        <HomeFooter />
      </div>
    </div>
  );
};

export default CartPage;
