import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";
import { useNavigate } from "react-router-dom";

const PayPage = () => {
  const navigate = useNavigate();
  const checkoutItems = JSON.parse(
    localStorage.getItem("checkout_items") || "[]"
  );

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ================= LOAD USER NAME =================
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCustomerName(user.name || "");
      } catch {
        setCustomerName("");
      }
    }
  }, []);

  // ================= REDIRECT IF NO ITEMS (MOVE TO useEffect) =================
  useEffect(() => {
    if (checkoutItems.length === 0) {
      toast.error("Không có sản phẩm để thanh toán");
      navigate("/cart");
    }
  }, [checkoutItems, navigate]);

  const totalPrice = checkoutItems.reduce(
    (sum, i) => sum + i.price * (i.quantity || i.qty || 1),
    0
  );

  // ================= VALIDATE =================
  const validate = () => {
    const newErrors = {};

    // Phone: chỉ số, 9–11 số
    if (!phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone = "Số điện thoại chỉ được chứa chữ số";
    } else if (phone.length < 9 || phone.length > 11) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Address: hơn 5 ký tự
    if (!address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
    } else if (address.trim().length < 5) {
      newErrors.address = "Hãy nhập đúng tên 1 địa chỉ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Thông tin chưa hợp lệ");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn cần đăng nhập");
      return;
    }

    const orderItems = checkoutItems.map((item) => ({
      product: item.product || item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity || item.qty || 1,
    }));

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3000/api/orders",
        {
          orderItems,
          shippingAddress: { phone, address },
          customerName,
          message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("🎉 Đặt hàng thành công");

      // Remove only checked-out items, keep remaining items in cart
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
      const fullCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      const checkedOutIds = checkoutItems.map((ci) => ci.cartId);
      const remain = fullCart.filter(
        (item) => !checkedOutIds.includes(item.cartId)
      );

      localStorage.setItem(cartKey, JSON.stringify(remain));
      localStorage.removeItem("checkout_items");
      navigate("/my-orders");
    } catch (err) {
      toast.error("Đặt hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  if (checkoutItems.length === 0) {
    return <div className="p-10 text-center">Đang chuyển hướng...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      <main className="container mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>

          <div className="mb-4 p-3 bg-indigo-50 rounded border border-indigo-200">
            <p className="text-sm text-gray-600">Họ và tên</p>
            <p className="font-semibold text-lg text-indigo-700">
              {customerName}
            </p>
          </div>

          <input
            placeholder="Số điện thoại (chỉ số)"
            className="w-full border p-3 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}

          <textarea
            placeholder="Địa chỉ giao hàng (ít nhất 5 từ)"
            className="w-full border p-3 rounded mt-4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}

          <textarea
            placeholder="Lời nhắn (tùy chọn)"
            className="w-full border p-3 rounded mt-4 resize-none"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đặt hàng"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>

          {checkoutItems.map((item) => (
            <div key={item.cartId} className="flex gap-4 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Size: {item.selectedSize || "-"} | Màu:{" "}
                  {item.selectedColor || "-"}
                </p>
                <p className="text-sm">
                  {item.quantity || item.qty || 1} ×{" "}
                  {item.price.toLocaleString()}$
                </p>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 text-lg font-semibold flex justify-between">
            <span>Tổng tiền</span>
            <span>{totalPrice.toLocaleString()}$</span>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default PayPage;
