import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* =======================
   1. CẤU HÌNH CƠ BẢN
======================= */

// Thứ tự category hiển thị ở trang Home
const defaultCategoryOrder = ["hoodie", "polo", "shirt", "pant", "short"];

// Hàm chia mảng thành nhiều trang (phục vụ nút ◀ ▶)
const chunk = (arr, size) => {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
};

/* =======================
   2. COMPONENT CHÍNH
======================= */

const HomeList = ({ filters }) => {
  /* ---------- STATE ---------- */
  const [products, setProducts] = useState([]); // toàn bộ sản phẩm
  const [query, setQuery] = useState(""); // search text
  const [pageByCat, setPageByCat] = useState({}); // trang hiện tại của từng category
  const [visiblePerPage, setVisiblePerPage] = useState(4); // số card hiển thị / hàng
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  /* =======================
     3. FETCH DATA TỪ BACKEND
  ======================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/clothes/all");

        // backend có dạng { clothes: [...] }
        const raw = res.data?.clothes || [];

        // 🔥 CHUẨN HÓA DATA (FIX LỖI ẢNH + FIELD)
        const normalized = raw.map((r) => {
          let image = "";

          // fix trường hợp images là array / string
          if (Array.isArray(r.images) && r.images.length > 0) {
            image = r.images[0];
          } else if (typeof r.images === "string") {
            image = r.images.split(",")[0];
          } else if (typeof r.image === "string") {
            image = r.image.split(",")[0];
          }

          return {
            ...r,
            image,
            brand: r.brand || r.name || "",
            title: r.title || r.name || "",
            size: Array.isArray(r.size) ? r.size[0] : r.size,
            type: (r.type || "other").toLowerCase(), // ⭐ QUAN TRỌNG
          };
        });

        console.log("HOME FETCH DATA:", normalized);
        setProducts(normalized);
      } catch (err) {
        setError("Không tải được sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =======================
     4. RESPONSIVE (SỐ CARD / HÀNG)
  ======================= */
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w >= 1280) setVisiblePerPage(4);
      else if (w >= 768) setVisiblePerPage(3);
      else setVisiblePerPage(2);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* =======================
     5. FILTER + GROUP THEO CATEGORY
  ======================= */
  const grouped = useMemo(() => {
    let list = [...products];

    // search
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.brand.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
      );
    }

    // filter size
    if (filters?.sizes?.length) {
      list = list.filter((p) => filters.sizes.includes(p.size));
    }

    // filter price
    if (filters?.price && filters.price !== "all") {
      const [min, max] = filters.price.split("-").map(Number);
      list = list.filter((p) => p.price >= min && p.price <= (max || Infinity));
    }

    // group theo category
    const map = {};
    defaultCategoryOrder.forEach((c) => (map[c] = []));

    list.forEach((p) => {
      if (!map[p.type]) map[p.type] = [];
      map[p.type].push(p);
    });

    return map;
  }, [products, query, filters]);

  /* =======================
     6. PAGINATION THEO CATEGORY
  ======================= */
  const nextPage = (cat, total) => {
    setPageByCat((prev) => ({
      ...prev,
      [cat]: Math.min((prev[cat] || 0) + 1, total - 1),
    }));
  };

  const prevPage = (cat) => {
    setPageByCat((prev) => ({
      ...prev,
      [cat]: Math.max((prev[cat] || 0) - 1, 0),
    }));
  };

  console.log("HOME PRODUCTS STATE:", products);

  /* =======================
     7. RENDER UI
  ======================= */
  return (
    <div>
      {/* SEARCH BAR */}
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

      {/* DANH SÁCH CATEGORY */}
      {defaultCategoryOrder.map((cat) => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;

        const pages = chunk(items, visiblePerPage);
        const cur = pageByCat[cat] || 0;

        return (
          <section key={cat} className="mb-10">
            <div className="flex justify-between mb-3">
              <h2 className="font-bold text-lg capitalize">{cat}</h2>
              <div>
                <button onClick={() => prevPage(cat)} disabled={cur === 0}>
                  ◀
                </button>
                <span className="mx-2">
                  {cur + 1}/{pages.length}
                </span>
                <button
                  onClick={() => nextPage(cat, pages.length)}
                  disabled={cur === pages.length - 1}
                >
                  ▶
                </button>
              </div>
            </div>

            <div className="flex gap-4 overflow-hidden">
              {pages[cur].map((p) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="w-72 cursor-pointer bg-gray-50 rounded shadow"
                >
                  <img
                    src={p.image}
                    alt={p.brand}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-3">
                    <div className="text-sm text-gray-500">
                      {p.type} · {p.size}
                    </div>
                    <div className="font-semibold">{p.brand}</div>
                    <div className="text-indigo-600 font-bold">${p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default HomeList;
