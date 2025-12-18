import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* =======================
   1. CẤU HÌNH CƠ BẢN
======================= */

// Thứ tự category hiển thị ở trang Home
const defaultCategoryOrder = ["hoodie", "polo", "shirt", "pant", "short"];

// Trước đây dùng chunk/pagination; bây giờ dùng start-index + vòng quay (circular)

/* =======================
   2. COMPONENT CHÍNH
======================= */

const HomeList = ({ filters }) => {
  /* ---------- STATE ---------- */
  const [products, setProducts] = useState([]); // toàn bộ sản phẩm
  const [query, setQuery] = useState(""); // search text
  const [visiblePerPage, setVisiblePerPage] = useState(4); // số card hiển thị / hàng
  const [filteredProducts, setFilteredProducts] = useState([]); // single source of truth after filters
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // sectionRefs and complex observers/carousel removed in this refactor

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

          // đảm bảo URL hợp lệ, nếu không có protocol thì dùng fallback
          let imageUrl = typeof image === "string" ? image.trim() : "";
          if (
            imageUrl &&
            !/^https?:\/\//i.test(imageUrl) &&
            !imageUrl.startsWith("data:")
          ) {
            // nếu là đường dẫn tương đối, thử tiền tố backend, còn không thì dùng placeholder
            const base = "http://localhost:3000";
            if (imageUrl.startsWith("/")) imageUrl = `${base}${imageUrl}`;
            else if (imageUrl.startsWith("uploads") || imageUrl.includes("/"))
              imageUrl = `${base}/${imageUrl}`;
            else imageUrl = "/404.png"; // fallback to local placeholder
          }
          if (!imageUrl) imageUrl = "/404.png";

          return {
            ...r,
            image: imageUrl,
            brand: r.brand || r.name || "",
            title: r.title || r.name || "",
            size: Array.isArray(r.size)
              ? r.size.map((s) => s.toLowerCase())
              : [],
            price: Number(r.price) || 0,
            type: (r.type || "other").toLowerCase(), // ⭐ QUAN TRỌNG
          };
        });

        console.log("HOME FETCH DATA:", normalized);
        setProducts(normalized);
      } catch (err) {
        console.error(err);
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

  /* Compute filteredProducts from `products`, `query`, and `filters` so UI has one source of truth */
  useEffect(() => {
    let list = [...products];

    // search
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.brand.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
      );
    }

    // filter category
    if (
      filters?.categories &&
      Array.isArray(filters.categories) &&
      filters.categories.length > 0
    ) {
      list = list.filter((p) => filters.categories.includes(p.type));
    }

    // filter size
    if (
      filters?.sizes &&
      Array.isArray(filters.sizes) &&
      filters.sizes.length > 0
    ) {
      list = list.filter((p) => p.size.some((s) => filters.sizes.includes(s)));
    }

    // filter price
    if (filters?.price && filters.price !== "all") {
      const [min, max] = filters.price.split("-").map(Number);
      list = list.filter((p) => p.price >= min && p.price <= (max || Infinity));
    }

    setFilteredProducts(list);
  }, [products, query, filters]);
  const groupedByCategory = useMemo(() => {
    const map = {};
    defaultCategoryOrder.forEach((c) => (map[c] = []));
    filteredProducts.forEach((p) => {
      if (!map[p.type]) map[p.type] = [];
      map[p.type].push(p);
    });
    return map;
  }, [filteredProducts]);

  // Carousel/animation logic removed — rendering uses groupedByCategory directly

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
        <span className="text-gray-500">
          Tổng {filteredProducts.length} sản phẩm
        </span>
      </div>

      {loading && <div className="text-center">Đang tải...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {/* DANH SÁCH CATEGORY - render only non-empty groups from filteredProducts */}
      {(() => {
        const groups = groupedByCategory;
        const catsToRender = defaultCategoryOrder.filter(
          (c) => groups[c] && groups[c].length > 0
        );
        return catsToRender.map((cat) => (
          <section key={cat} className="mb-10">
            <div className="flex justify-between mb-3 items-center">
              <h2 className="font-bold text-lg capitalize">{cat}</h2>
              <div className="text-sm text-gray-500">
                {groups[cat].length} items
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groups[cat].map((p) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="cursor-pointer bg-gray-50 rounded shadow overflow-hidden"
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
        ));
      })()}
    </div>
  );
};

export default HomeList;
