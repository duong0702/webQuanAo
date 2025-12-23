import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaSort,
  FaSortAmountUp,
  FaSortAmountDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [priceSort, setPriceSort] = useState("default");
  const [typeSort, setTypeSort] = useState("default");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

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
            image: d.mainImage || "",
          }))
        );
      } catch (err) {
        alert("Không tải được sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:3000/api/clothes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Xóa thất bại");
    }
  };

  // sort
  const sortedProducts = [...products]
    .sort((a, b) => {
      if (priceSort === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (priceSort === "asc") return a.price - b.price;
      if (priceSort === "desc") return b.price - a.price;
      return 0;
    })
    .sort((a, b) => {
      if (typeSort === "default") return 0;
      if (a.type === typeSort && b.type !== typeSort) return -1;
      if (a.type !== typeSort && b.type === typeSort) return 1;
      return 0;
    });

  const togglePriceSort = () => {
    if (priceSort === "default") setPriceSort("newest");
    else if (priceSort === "newest") setPriceSort("asc");
    else if (priceSort === "asc") setPriceSort("desc");
    else setPriceSort("default");
  };

  // pagination
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginated = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) return <div className="text-center p-8">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <HomeHeader />

      <main className="flex-1 max-w-6xl mx-auto p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🛍 Quản lý sản phẩm</h1>
          <button
            onClick={() => navigate("/admin/products/new")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            + Thêm sản phẩm
          </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto relative">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Ảnh</th>
                <th className="p-4 text-left">Tên</th>

                <th
                  className="p-4 text-left cursor-pointer"
                  onClick={togglePriceSort}
                >
                  <div className="flex items-center gap-2">
                    Giá
                    {priceSort === "default" && <FaSort />}
                    {priceSort === "newest" && <FaSort />}
                    {priceSort === "asc" && <FaSortAmountUp />}
                    {priceSort === "desc" && <FaSortAmountDown />}
                  </div>
                </th>

                <th className="p-4 text-left relative">
                  <div className="flex items-center gap-2">
                    Loại quần áo
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setShowTypeDropdown((prev) => !prev)}
                    >
                      <FaSort />
                    </button>
                  </div>

                  {showTypeDropdown && (
                    <div className="absolute z-20 mt-2 bg-white w-40 border rounded-lg shadow p-2">
                      <button
                        onClick={() => {
                          setTypeSort("default");
                          setShowTypeDropdown(false);
                        }}
                        className="block w-full px-3 py-2 text-left hover:bg-gray-100 rounded"
                      >
                        Mặc định
                      </button>

                      {[
                        "hoodie",
                        "polo",
                        "jacket",
                        "t-shirt",
                        "pant",
                        "short",
                      ].map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setTypeSort(t);
                            setShowTypeDropdown(false);
                          }}
                          className="block w-full px-3 py-2 text-left hover:bg-gray-100 rounded capitalize"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </th>

                <th className="p-4 text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((p) => (
                <tr
                  key={p._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={p.image}
                      alt=""
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </td>

                  <td className="p-4 font-medium max-w-xs truncate">
                    {p.name}
                  </td>

                  <td className="p-4 font-bold text-indigo-600">
                    {p.price.toLocaleString()}$
                  </td>

                  <td className="p-4 capitalize">{p.type}</td>

                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/products/${p._id}/edit`)}
                      className="px-4 py-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                    >
                      ✏️ Sửa
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      🗑️ Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 border rounded disabled:opacity-30"
          >
            <FaChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-2 rounded border ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 border rounded disabled:opacity-30"
          >
            <FaChevronRight />
          </button>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
};

export default AdminProductsPage;
