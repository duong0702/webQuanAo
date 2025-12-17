import React, { useEffect, useState, useMemo, useRef } from "react";
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
  const [pageByCat, setPageByCat] = useState({}); // trang hiện tại của từng category
  const [visiblePerPage, setVisiblePerPage] = useState(4); // số card hiển thị / hàng
  const [animByCat, setAnimByCat] = useState({}); // animation state per category
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scrollInView, setScrollInView] = useState(new Set()); // categories in view

  const navigate = useNavigate();
  const sectionRefs = useRef({});

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

  /* =======================
     4B. SCROLL ANIMATION - INTERSECTION OBSERVER
  ======================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cat = entry.target.id.replace("cat-", "");
          setScrollInView((prev) => {
            const updated = new Set(prev);
            if (entry.isIntersecting) {
              updated.add(cat);
            } else {
              updated.delete(cat);
            }
            return updated;
          });
        });
      },
      { threshold: 0.2 }
    );

    // Delay để đảm bảo refs đã được gán
    const timer = setTimeout(() => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Re-observe when products change
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cat = entry.target.id.replace("cat-", "");
          console.log(
            `Scroll animation: ${cat} isIntersecting=${entry.isIntersecting}`
          );
          setScrollInView((prev) => {
            const updated = new Set(prev);
            if (entry.isIntersecting) {
              updated.add(cat);
            } else {
              updated.delete(cat);
            }
            return updated;
          });
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, [products]);

  // 🔥 RESET pagination khi filter thay đổi
  useEffect(() => {
    setPageByCat({});
  }, [filters]);
  const grouped = useMemo(() => {
    let list = [...products];

    console.log("🔍 DEBUG - Input filters:", filters);

    // search
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.brand.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
      );
    }

    // filter category
    // 🔥 Nếu user chọn categories, chỉ lọc theo những cái chọn
    // Nếu không chọn gì (rỗng), hiển thị tất cả
    if (
      filters?.categories &&
      Array.isArray(filters.categories) &&
      filters.categories.length > 0
    ) {
      console.log("📌 Lọc categories:", filters.categories);
      list = list.filter((p) => filters.categories.includes(p.type));
    }

    // filter size
    // 🔥 Nếu user chọn sizes, chỉ lọc theo những cái chọn
    // Nếu không chọn gì (rỗng), hiển thị tất cả
    if (
      filters?.sizes &&
      Array.isArray(filters.sizes) &&
      filters.sizes.length > 0
    ) {
      console.log("📌 Lọc sizes:", filters.sizes);
      list = list.filter((p) => p.size.some((s) => filters.sizes.includes(s)));
    }

    // filter price
    if (filters?.price && filters.price !== "all") {
      console.log("📌 Lọc price:", filters.price);
      const [min, max] = filters.price.split("-").map(Number);
      list = list.filter((p) => p.price >= min && p.price <= (max || Infinity));
    }

    console.log("✅ Kết quả filter - items:", list.length);

    // group theo category
    const map = {};
    defaultCategoryOrder.forEach((c) => (map[c] = []));

    list.forEach((p) => {
      if (!map[p.type]) map[p.type] = [];
      map[p.type].push(p);
    });

    console.log("📊 Grouped result:", map);
    return map;
  }, [products, query, filters]);

  /* =======================
     6. CIRCULAR CAROUSEL THEO CATEGORY
     - `pageByCat[cat]` sẽ lưu startIndex hiện tại (có thể > length -> modulo)
     - next/prev sẽ tăng/giảm theo 1 và wrap bằng modulo để không có điểm dừng
  ======================= */
  const nextPage = (cat, length) => {
    if (!length) return;
    setPageByCat((prev) => ({
      ...prev,
      [cat]: ((prev[cat] || 0) + 1) % length,
    }));
  };

  const prevPage = (cat, length) => {
    if (!length) return;
    setPageByCat((prev) => ({
      ...prev,
      [cat]: ((prev[cat] || 0) - 1 + length) % length,
    }));
  };

  // Handlers that trigger a small lift animation before switching items
  const handleNext = (cat, length) => {
    if (!length) return;
    setAnimByCat((s) => ({ ...s, [cat]: true }));
    setTimeout(() => {
      nextPage(cat, length);
      setTimeout(() => setAnimByCat((s) => ({ ...s, [cat]: false })), 220);
    }, 180);
  };

  const handlePrev = (cat, length) => {
    if (!length) return;
    setAnimByCat((s) => ({ ...s, [cat]: true }));
    setTimeout(() => {
      prevPage(cat, length);
      setTimeout(() => setAnimByCat((s) => ({ ...s, [cat]: false })), 220);
    }, 180);
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

        const length = items.length;
        const start = pageByCat[cat] || 0;
        const visibleCount = Math.min(visiblePerPage, length);
        const visible = [];
        for (let i = 0; i < visibleCount; i++) {
          visible.push(items[(start + i) % length]);
        }

        return (
          <section
            id={`cat-${cat}`}
            key={cat}
            className="mb-10"
            ref={(el) => {
              sectionRefs.current[cat] = el;
            }}
          >
            <div className="flex justify-between mb-3 items-center">
              <h2 className="font-bold text-lg capitalize">{cat}</h2>
              <div className="text-sm text-gray-500">
                {start + 1}/{length}
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => handlePrev(cat, length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow z-10"
              >
                ◀
              </button>

              <div
                className={`flex gap-4 overflow-hidden px-8 ${
                  cat === "pant" && length === 3 ? "justify-center" : ""
                }`}
              >
                {visible.map((p, idx) => (
                  <div
                    key={p._id}
                    onClick={() => navigate(`/product/${p._id}`)}
                    className={`w-64 sm:w-72 shrink-0 cursor-pointer bg-gray-50 rounded shadow transform transition-all duration-1000 ${
                      scrollInView.has(cat) && !animByCat[cat]
                        ? "translate-y-0 opacity-100"
                        : animByCat[cat]
                        ? "-translate-y-3 opacity-80"
                        : "translate-y-12 opacity-0"
                    }`}
                    style={{
                      transitionDelay: scrollInView.has(cat)
                        ? `${idx * 150}ms`
                        : "0ms",
                    }}
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
                      <div className="text-indigo-600 font-bold">
                        ${p.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleNext(cat, length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-3 py-2 rounded-full shadow z-10"
              >
                ▶
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default HomeList;
