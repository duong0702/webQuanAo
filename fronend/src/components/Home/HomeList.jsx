import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Mock 50 products
const generateMockProducts = () =>
  Array.from({ length: 50 }).map((_, i) => ({
    _id: `prod_${i + 1}`,
    id: i + 1,
    title: `Product ${i + 1}`,
    brand: `Brand ${(i % 8) + 1}`,
    price: Math.round(20 + Math.random() * 150),
    type: ["hoodie", "polo", "shorts", "pants", "dress"][i % 5],
    size: ["XS", "S", "M", "L", "XL"][i % 5],
    color: ["red", "blue", "green", "black", "white"][i % 5],
    image: `https://picsum.photos/seed/product${i + 1}/400/400`,
  }));

const mockProducts = generateMockProducts();

const HomeList = ({ filters }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 12;
  const navigate = useNavigate();

  // Filter products by search query and filter options
  const filtered = useMemo(() => {
    let list = mockProducts;

    // Search filter
    if (query) {
      list = list.filter(
        (p) =>
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter (from HomeFilter)
    if (filters && filters.categories && filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.type));
    }

    // Size filter
    if (filters && filters.sizes && filters.sizes.length > 0) {
      list = list.filter((p) => filters.sizes.includes(p.size));
    }

    // Price filter
    if (filters && filters.price && filters.price !== "all") {
      const parts = filters.price.split("-");
      const min = Number(parts[0]);
      const max = parts[1] ? Number(parts[1]) : Infinity;
      list = list.filter((p) => p.price >= min && p.price <= max);
    }

    return list;
  }, [query, filters]);

  const pageCount = Math.ceil(filtered.length / perPage) || 1;
  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <input
          placeholder="Tìm kiếm sản phẩm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded p-2 w-1/2"
        />
        <div className="text-sm text-gray-500">
          Tổng {filtered.length} sản phẩm
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.length > 0 ? (
          visible.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/product/${p._id}`)}
            >
              <div className="h-48 bg-gray-100">
                <img
                  src={p.image}
                  alt={p.brand}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              <div className="p-3">
                <div className="text-sm text-gray-600">
                  {p.type} · {p.size}
                </div>
                <h4 className="font-semibold mt-1">{p.brand}</h4>
                <div className="mt-2 font-bold text-indigo-600">${p.price}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            Không tìm thấy sản phẩm phù hợp
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={page === pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="text-sm text-gray-500">
          Trang {page} / {pageCount}
        </div>
      </div>
    </div>
  );
};

export default HomeList;
