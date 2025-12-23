import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

const AdminProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // FORM
  const [form, setForm] = useState(null);

  // OLD IMAGES
  const [oldMainImage, setOldMainImage] = useState(null);
  const [oldDetailImages, setOldDetailImages] = useState([]);

  // NEW IMAGES
  const [mainImage, setMainImage] = useState(null);
  const [detailImages, setDetailImages] = useState([]);

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/api/clothes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const images = res.data.images || [];
      const main = images.find((i) => i.isMain);
      const details = images.filter((i) => !i.isMain);

      setForm({
        name: res.data.name,
        price: res.data.price,
        type: res.data.type,
        color: res.data.color || [],
        size: res.data.size || [],
        status: res.data.status || [],
        description: res.data.description || "",
      });

      setOldMainImage(main?.url || null);
      setOldDetailImages(details.map((i) => i.url));
    };

    fetchProduct();
  }, [id]);

  if (!form) return <div className="p-10 text-center">Đang tải...</div>;

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const toggleArray = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const removeOldDetailImage = (index) => {
    setOldDetailImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Tên sản phẩm không được trống";
    if (!form.price || form.price < 5) e.price = "Giá không hợp lệ";
    if (!form.type) e.type = "Chọn loại";
    if (!form.status.length) e.status = "Chọn trạng thái";
    if (!form.color.length) e.color = "Chọn màu";
    if (!form.size.length) e.size = "Chọn size";
    if (!mainImage && !oldMainImage) e.mainImage = "Cần ảnh main";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const token = localStorage.getItem("token");
    const fd = new FormData();

    fd.append("name", form.name.trim());
    fd.append("price", Number(form.price));
    fd.append("type", form.type);
    fd.append("description", form.description || "");

    form.color.forEach((c) => fd.append("color", c));
    form.size.forEach((s) => fd.append("size", s));
    form.status.forEach((s) => fd.append("status", s));

    // NEW MAIN IMAGE -> replace old main
    if (mainImage) {
      fd.append("images", mainImage);
      fd.append("oldMainImage", "");
    } else {
      fd.append("oldMainImage", oldMainImage || "");
    }

    // DETAIL IMAGES
    oldDetailImages.forEach((img) => fd.append("oldDetailImages", img));
    detailImages.forEach((img) => fd.append("images", img));

    await axios.put(`http://localhost:3000/api/clothes/${id}`, fd, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Cập nhật thành công! 🎉");
    navigate("/admin/products");
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HomeHeader />

      <main className="flex-1 max-w-3xl mx-auto p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">✏️ Sửa sản phẩm</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow space-y-5"
        >
          {/* NAME */}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Tên sản phẩm"
          />

          {/* PRICE */}
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Giá"
          />

          {/* TYPE */}
          <div>
            <label className="font-semibold block mb-2">Loại sản phẩm *</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">-- Chọn loại --</option>
              {VALID_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type}</p>
            )}
          </div>

          {/* STATUS */}
          <div>
            <label className="font-semibold block mb-2">Trạng thái *</label>
            <div className="flex flex-wrap gap-3">
              {VALID_STATUS.map((s) => (
                <label key={s} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.status.includes(s)}
                    onChange={() => toggleArray("status", s)}
                  />
                  <span className="capitalize">{s}</span>
                </label>
              ))}
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>

          {/* MAIN IMAGE */}
          <div>
            <label className="font-semibold block mb-2">Ảnh chính *</label>

            <div className="flex gap-4 items-center">
              {/* preview */}
              <div>
                {mainImage ? (
                  <img
                    src={URL.createObjectURL(mainImage)}
                    className="w-32 h-32 rounded shadow object-cover"
                  />
                ) : oldMainImage ? (
                  <img
                    src={oldMainImage}
                    className="w-32 h-32 rounded shadow object-cover"
                  />
                ) : null}
              </div>

              {/* UPLOAD BUTTON */}
              <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Chọn ảnh mới
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setMainImage(e.target.files[0]);
                    setOldMainImage(null);
                  }}
                />
              </label>
            </div>

            {errors.mainImage && (
              <p className="text-red-500 text-sm">{errors.mainImage}</p>
            )}
          </div>

          {/* DETAIL IMAGES */}
          <div>
            <label className="font-semibold block mb-2">Ảnh chi tiết</label>

            <div className="flex gap-3 flex-wrap mb-3">
              {oldDetailImages.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img}
                    className="w-24 h-24 rounded object-cover shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeOldDetailImage(i)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>

            {/* NEW UPLOAD PREVIEW */}
            <div className="flex gap-3 flex-wrap mb-3">
              {detailImages.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  className="w-24 h-24 rounded object-cover shadow"
                />
              ))}
            </div>

            <label className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Thêm ảnh chi tiết
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  setDetailImages(Array.from(e.target.files || []))
                }
              />
            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-2 border rounded-lg"
            >
              Hủy
            </button>
            <button
              disabled={saving}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </main>

      <HomeFooter />
    </div>
  );
};

export default AdminProductEditPage;
