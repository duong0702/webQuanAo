import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const VALID_TYPES = ["jacket", "hoodie", "polo", "pant", "short", "t-shirt"];
const VALID_SIZES = ["s", "m", "l", "xl"];
const VALID_COLORS = [
  "black",
  "white",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "orange",
  "brown",
  "gray",
  "grey",
  "beige",
  "navy",
  "teal",
  "gold",
];
const VALID_STATUS = ["new", "hot", "sale", "limited"];

const AdminProductCreatePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    type: "",
    color: [],
    size: [],
    status: [],
    images: [],
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleStatusToggle = (status) => {
    setForm((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));

    if (errors.status) {
      setErrors({ ...errors, status: null });
    }
  };

  const handleColorToggle = (color) => {
    setForm((prev) => ({
      ...prev,
      color: prev.color.includes(color)
        ? prev.color.filter((c) => c !== color)
        : [...prev.color, color],
    }));
    if (errors.color) {
      setErrors({ ...errors, color: null });
    }
  };

  const handleSizeToggle = (size) => {
    setForm((prev) => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size],
    }));
    if (errors.size) {
      setErrors({ ...errors, size: null });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Tên sản phẩm không được để trống";
    }

    if (!form.price || form.price < 5 || form.price > 100) {
      newErrors.price = "Giá phải từ 5 đến 100";
    }

    if (!form.type || !VALID_TYPES.includes(form.type)) {
      newErrors.type = "Vui lòng chọn loại sản phẩm";
    }
    if (form.status.length === 0) {
      newErrors.status = "Vui lòng chọn ít nhất 1 trạng thái";
    }

    if (form.color.length === 0) {
      newErrors.color = "Vui lòng chọn ít nhất 1 màu sắc";
    }

    if (form.size.length === 0) {
      newErrors.size = "Vui lòng chọn ít nhất 1 kích thước";
    }

    if (!form.images || form.images.length === 0) {
      newErrors.images = "Vui lòng chọn ít nhất 1 ảnh";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert("Vui lòng sửa các lỗi được đánh dấu");
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("price", Number(form.price));
      formData.append("type", form.type);
      form.color.forEach((c) => formData.append("color", c));
      form.size.forEach((s) => formData.append("size", s));
      form.status.forEach((s) => formData.append("status", s));
      form.images.forEach((img) => formData.append("images", img));
      formData.append("description", form.description.trim() || "");

      await axios.post("http://localhost:3000/api/clothes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Tạo sản phẩm thành công ✅");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert(
        `Tạo sản phẩm thất bại: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HomeHeader />

      <main className="flex-1 max-w-3xl mx-auto p-6 w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">➕ Tạo sản phẩm mới</h1>
          <p className="text-gray-600 text-sm mt-1">
            Điền đầy đủ thông tin sản phẩm bên dưới
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
              value={form.name}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-indigo-600"
              }`}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Giá */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Giá ($) <span className="text-red-500">*</span>
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.price
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-indigo-600"
              }`}
              onChange={handleChange}
              required
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Loại */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Loại <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={form.type}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.type
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-indigo-600"
              }`}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn loại --</option>
              {VALID_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type}</p>
            )}
          </div>
          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Trạng thái <span className="text-red-500">*</span>
            </label>

            <div
              className={`grid grid-cols-2 gap-3 p-3 border rounded-lg ${
                errors.status ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              {VALID_STATUS.map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.status.includes(status)}
                    onChange={() => handleStatusToggle(status)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm capitalize">{status}</span>
                </label>
              ))}
            </div>

            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>

          {/* Màu sắc */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Màu sắc <span className="text-red-500">*</span>
            </label>
            <div
              className={`grid grid-cols-3 gap-3 p-3 border rounded-lg ${
                errors.color ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              {VALID_COLORS.map((color) => (
                <label
                  key={color}
                  className="flex items-center cursor-pointer gap-2"
                >
                  <input
                    type="checkbox"
                    checked={form.color.includes(color)}
                    onChange={() => handleColorToggle(color)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{color}</span>
                </label>
              ))}
            </div>
            {errors.color && (
              <p className="text-red-500 text-sm mt-1">{errors.color}</p>
            )}
          </div>

          {/* Kích thước */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kích thước <span className="text-red-500">*</span>
            </label>
            <div
              className={`grid grid-cols-4 gap-3 p-3 border rounded-lg ${
                errors.size ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            >
              {VALID_SIZES.map((size) => (
                <label
                  key={size}
                  className="flex items-center cursor-pointer gap-2"
                >
                  <input
                    type="checkbox"
                    checked={form.size.includes(size)}
                    onChange={() => handleSizeToggle(size)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">
                    {size.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
            {errors.size && (
              <p className="text-red-500 text-sm mt-1">{errors.size}</p>
            )}
          </div>

          {/* Ảnh */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ảnh sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                console.log("IMAGES SELECTED (frontend):", files);
                console.log("NUMBER OF IMAGES:", files.length);

                setForm({ ...form, images: files });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.images
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 focus:border-indigo-600"
              }`}
              required
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">{errors.images}</p>
            )}
            {form.images.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-2">Xem trước:</p>
                <div className="flex gap-2 flex-wrap">
                  {form.images.map((file, i) => (
                    <div key={i} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${i}`}
                        className="w-20 h-20 object-cover rounded border border-gray-200"
                      />
                      {i === 0 && (
                        <span className="absolute top-0 left-0 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                </div>
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
              placeholder="Nhập mô tả chi tiết sản phẩm (tuỳ chọn)..."
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
              disabled={saving}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Đang lưu..." : "Tạo sản phẩm"}
            </button>
          </div>
        </form>
      </main>

      <HomeFooter />
    </div>
  );
};

export default AdminProductCreatePage;
