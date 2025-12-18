import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const AdminProductCreatePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.type || !form.image) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/clothes",
        {
          ...form,
          price: Number(form.price),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Tạo sản phẩm thành công ✅");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Tạo sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HomeHeader />

      <main className="flex-1 max-w-3xl mx-auto p-6 w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">➕ Thêm sản phẩm mới</h1>
          <p className="text-gray-600 text-sm mt-1">
            Điền đầy đủ thông tin để thêm sản phẩm vào cửa hàng
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow space-y-5"
        >
          {/* Tên sản phẩm */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              placeholder="VD: Áo hoodie mickey"
              value={form.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
              onChange={handleChange}
              required
            />
          </div>

          {/* Giá */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Giá (₫) <span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              type="number"
              placeholder="VD: 150000"
              value={form.price}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
              onChange={handleChange}
              required
            />
          </div>

          {/* Danh mục */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loại (type) <span className="text-red-500">*</span>
            </label>
            <input
              name="type"
              placeholder="VD: shirt | pant | hoodie"
              value={form.type}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
              onChange={handleChange}
              required
            />
          </div>

          {/* Ảnh */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Link ảnh <span className="text-red-500">*</span>
            </label>
            <input
              name="image"
              type="url"
              placeholder="VD: https://..."
              value={form.image}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
              onChange={handleChange}
              required
            />
            {form.image && (
              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-2">Xem trước:</p>
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border border-gray-200"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            )}
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mô tả
            </label>
            <textarea
              name="description"
              placeholder="Nhập mô tả chi tiết sản phẩm..."
              value={form.description}
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600"
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Đang tạo..." : "Tạo sản phẩm"}
            </button>
          </div>
        </form>
      </main>

      <HomeFooter />
    </div>
  );
};

export default AdminProductCreatePage;
