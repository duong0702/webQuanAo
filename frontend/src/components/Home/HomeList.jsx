import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORY_CONFIG } from "../../constants/categoryConfig";

/* ================= CONFIG ================= */

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

/* ================= ANIMATION VARIANTS ================= */

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0.6, y: 0 },
  show: {
    opacity: 1,
    y: -8,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/* ================= COMPONENT ================= */

const HomeList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const sortKey = queryParams.get("sort") || "price_asc";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* Auto slide index per row */
  const [rowIndex, setRowIndex] = useState({});

  /* Hover row → pause auto slide */
  const [hoveredRow, setHoveredRow] = useState(null);

  /* ================= QUERY PARAM ================= */

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
            ? await axios.get(
                `${import.meta.env.VITE_API_URL}/api/clothes/search`,
                {
                  params: queryObj,
                }
              )
            : await axios.get(
                `${import.meta.env.VITE_API_URL}/api/clothes/all`
              );

        const normalized = (res.data?.clothes || []).map((r) => ({
          ...r,
          image: r.mainImage || "/404.png",
          price: Number(r.price) || 0,
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

  /* ================= GROUP BY CATEGORY ================= */

  const groupedByCategory = useMemo(() => {
    const map = {};
    defaultCategoryOrder.forEach((c) => (map[c] = []));

    // group trước
    products.forEach((p) => {
      if (!map[p.type]) map[p.type] = [];
      map[p.type].push(p);
    });

    // sort TRONG TỪNG CATEGORY
    Object.keys(map).forEach((cat) => {
      map[cat] = [...map[cat]].sort((a, b) => {
        switch (sortKey) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          case "oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          default:
            return 0;
        }
      });
    });

    return map;
  }, [products, sortKey]);

  /* ================= AUTO SLIDE (PAUSE ON HOVER) ================= */

  useEffect(() => {
    const timers = [];

    Object.entries(groupedByCategory).forEach(([cat, items]) => {
      if (!items.length) return;

      const half = Math.ceil(items.length / 2);

      ["top", "bottom"].forEach((pos, idx) => {
        const key = `${cat}-${pos}`;
        const rowItems = idx === 0 ? items.slice(0, half) : items.slice(half);

        if (!rowItems.length) return;

        timers.push(
          setInterval(() => {
            if (hoveredRow === key) return;

            setRowIndex((prev) => ({
              ...prev,
              [key]: ((prev[key] || 0) + 1) % rowItems.length,
            }));
          }, AUTO_SLIDE_MS)
        );
      });
    });

    return () => timers.forEach(clearInterval);
  }, [groupedByCategory, hoveredRow]);

  /* ================= RENDER ROW ================= */

  const renderRow = (items, rowKey) => {
    if (!items.length) return null;

    const start = rowIndex[rowKey] || 0;

    return (
      <div
        className="relative flex items-center gap-4"
        onMouseEnter={() => setHoveredRow(rowKey)}
        onMouseLeave={() => setHoveredRow(null)}
      >
        {/* LEFT */}
        <button
          onClick={() =>
            setRowIndex((p) => ({
              ...p,
              [rowKey]: (start - 1 + items.length) % items.length,
            }))
          }
          className="group bg-white/80 backdrop-blur border shadow-lg rounded-full p-3 hover:bg-indigo-600 transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-white" />
        </button>

        {/* PRODUCTS */}
        <motion.div
          key={start}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex gap-4 overflow-hidden"
        >
          {Array.from({ length: Math.min(MAX_PER_ROW, items.length) }).map(
            (_, i) => {
              const p = items[(start + i) % items.length];
              return (
                <motion.div
                  key={p._id}
                  variants={itemVariants}
                  whileHover={{ y: -12 }}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="w-[250px] cursor-pointer bg-gray-50 rounded-xl shadow-md hover:shadow-xl"
                >
                  <div className="h-64 overflow-hidden rounded-t-xl">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-3">
                    <div className="font-semibold line-clamp-2">{p.name}</div>
                    <div className="text-indigo-600 font-bold">${p.price}</div>
                  </div>
                </motion.div>
              );
            }
          )}
        </motion.div>

        {/* RIGHT */}
        <button
          onClick={() =>
            setRowIndex((p) => ({
              ...p,
              [rowKey]: (start + 1) % items.length,
            }))
          }
          className="group bg-white/80 backdrop-blur border shadow-lg rounded-full p-3 hover:bg-indigo-600 transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-white" />
        </button>
      </div>
    );
  };

  /* ================= RENDER ================= */

  return (
    <div>
      {loading && <div className="text-center">Đang tải...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {defaultCategoryOrder.map(
        (cat) =>
          groupedByCategory[cat]?.length > 0 && (
            <motion.section
              key={cat}
              variants={sectionVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="mb-12"
            >
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
            </motion.section>
          )
      )}
    </div>
  );
};

export default HomeList;
