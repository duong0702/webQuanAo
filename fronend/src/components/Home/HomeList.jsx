import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import AOS from "aos";

const defaultCategoryOrder = [
  "hoodie",
  "polo",
  "jacket",
  "t-shirt",
  "pant",
  "short",
];

const AUTO_SLIDE_MS = 4000;
const MAX_PER_ROW = 5;

const HomeList = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // lưu start index cho từng hàng
  const [rowIndex, setRowIndex] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const queryObj = useMemo(() => {
    const obj = {};
    queryParams.forEach((value, key) => {
      obj[key] = obj[key] ? [].concat(obj[key], value) : value;
    });
    return obj;
  }, [location.search]);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res =
          Object.keys(queryObj).length > 0
            ? await axios.get("http://localhost:3000/api/clothes/search", {
                params: queryObj,
              })
            : await axios.get("http://localhost:3000/api/clothes/all");

        const normalized = (res.data?.clothes || []).map((r) => ({
          ...r,
          image: r.mainImage || "/404.png",
          brand: r.brand || "",
          price: Number(r.price) || 0,
          size: Array.isArray(r.size) ? r.size : [],
          type: (r.type || "").toLowerCase(),
        }));

        setProducts(normalized);
      } catch {
        setError("Không tải được sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  /* ================= GROUP ================= */
  const groupedByCategory = useMemo(() => {
    const map = {};
    defaultCategoryOrder.forEach((c) => (map[c] = []));
    products.forEach((p) => {
      if (!map[p.type]) map[p.type] = [];
      map[p.type].push(p);
    });
    return map;
  }, [products]);

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    const timers = [];

    Object.entries(groupedByCategory).forEach(([cat, items]) => {
      if (!items.length) return;

      const half = Math.ceil(items.length / 2);

      ["top", "bottom"].forEach((pos, idx) => {
        const key = `${cat}-${pos}`;
        const rowItems = idx === 0 ? items.slice(0, half) : items.slice(half);

        timers.push(
          setInterval(() => {
            setRowIndex((prev) => ({
              ...prev,
              [key]: ((prev[key] || 0) + 1) % rowItems.length,
            }));
          }, AUTO_SLIDE_MS)
        );
      });
    });

    return () => timers.forEach(clearInterval);
  }, [groupedByCategory]);

  /* ================= RENDER ROW ================= */
  const renderRow = (items, rowKey) => {
    if (!items.length) return null;

    const start = rowIndex[rowKey] || 0;

    return (
      <div className="relative flex items-center gap-4">
        <button
          onClick={() =>
            setRowIndex((p) => ({
              ...p,
              [rowKey]: (start - 1 + items.length) % items.length,
            }))
          }
          className="bg-white shadow rounded-full p-2"
        >
          ◀
        </button>

        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: Math.min(MAX_PER_ROW, items.length) }).map(
            (_, i) => {
              const p = items[(start + i) % items.length];
              return (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="w-[250px] cursor-pointer bg-gray-50 rounded shadow hover:shadow-xl"
                >
                  <div className="h-64 overflow-hidden bg-gray-200">
                    <img
                      src={p.image}
                      alt={p.brand}
                      className="h-full w-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-sm text-gray-500">
                      {p.type} · {p.size.join(" - ").toUpperCase()}
                    </div>
                    <div className="font-semibold">{p.brand}</div>
                    <div className="text-indigo-600 font-bold">${p.price}</div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        <button
          onClick={() =>
            setRowIndex((p) => ({
              ...p,
              [rowKey]: (start + 1) % items.length,
            }))
          }
          className="bg-white shadow rounded-full p-2"
        >
          ▶
        </button>
      </div>
    );
  };

  /* ================= RENDER ================= */
  return (
    <div>
      <div className="flex justify-between mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm sản phẩm"
          className="border p-2 rounded w-1/2"
        />
        <span className="text-gray-500">Tổng {products.length} sản phẩm</span>
      </div>

      {loading && <div className="text-center">Đang tải...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {defaultCategoryOrder.map(
        (cat) =>
          groupedByCategory[cat]?.length > 0 && (
            <section key={cat} className="mb-12">
              <h2 className="font-bold text-lg mb-4 capitalize">{cat}</h2>

              {(() => {
                const items = groupedByCategory[cat];
                const half = Math.ceil(items.length / 2);

                return (
                  <div className="space-y-6">
                    {renderRow(items.slice(0, half), `${cat}-top`)}
                    {renderRow(items.slice(half), `${cat}-bottom`)}
                  </div>
                );
              })()}
            </section>
          )
      )}
    </div>
  );
};

export default HomeList;
