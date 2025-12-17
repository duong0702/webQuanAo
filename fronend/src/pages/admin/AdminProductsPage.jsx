import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await axios.get("http://localhost:3000/api/clothes/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data?.clothes || res.data || [];
        setProducts(
          data.map((d) => ({
            ...d,
            image:
              Array.isArray(d.images) && d.images.length
                ? d.images[0]
                : d.image || "",
          }))
        );
      } catch (err) {
        console.error(err);
        alert("Không tải được sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3000/api/clothes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Xóa sản phẩm thành công ✅");
    } catch (err) {
      console.error(err);
      alert("Xóa sản phẩm thất bại");
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HomeHeader />

      <main className="flex-1 max-w-6xl mx-auto p-6 w-full">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">🛍 Quản lý sản phẩm</h1>
            <p className="text-gray-600 text-sm mt-1">
              Tổng cộng: {products.length} sản phẩm
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/products/new")}
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow"
          >
            + Thêm sản phẩm
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 text-left">Ảnh</th>
                <th className="p-4 text-left">Tên sản phẩm</th>
                <th className="p-4 text-left">Giá</th>
                <th className="p-4 text-left">Danh mục</th>
                <th className="p-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded border border-gray-200"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-900 max-w-xs truncate">
                    {p.name}
                  </td>
                  <td className="p-4 text-indigo-600 font-bold">
                    {p.price.toLocaleString()}$
                  </td>
                  <td className="p-4 text-gray-600">
                    <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-medium">
                      {p.category || "N/A"}
                    </span>
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/products/${p._id}/edit`)}
                      className="px-4 py-2 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition"
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
                    >
                      🗑️ Xóa
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-8 text-gray-500 font-medium"
                  >
                    Chưa có sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default AdminProductsPage;
