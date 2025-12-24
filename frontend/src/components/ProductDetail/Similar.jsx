import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Similar = ({ type }) => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/clothes/all`
        );
        const all = res.data.clothes || [];
        setItems(all.filter((p) => p.type === type));
      } catch (err) {
        console.error(err);
      }
    };
    if (type) load();
  }, [type]);

  if (!items || items.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - itemsPerView, prev + 1));
  };

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < items.length - itemsPerView;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Sản phẩm tương tự</h3>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={!canGoLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 p-2 rounded-full transition-all duration-300 ${
            canGoLeft
              ? "bg-black/20 hover:bg-black/40 text-white cursor-pointer"
              : "bg-black/10 text-white/50 cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {items.map((it) => (
              <div
                key={it._id}
                className="min-w-1/4 flex-shrink-0"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <Link
                  to={`/product/${it._id}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="
                    group block bg-white p-2 rounded-xl
                    transition-all duration-300 ease-out
                    hover:shadow-xl hover:-translate-y-1 h-full
                  "
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={it.mainImage || it.image}
                      alt={it.title || it.name}
                      className="
                        w-full h-40 object-cover
                        transition-transform duration-500 ease-out
                        group-hover:scale-110
                        group-hover:brightness-110
                      "
                    />
                  </div>

                  {/* INFO */}
                  <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                    {it.brand || it.title || it.name}
                  </div>

                  <div className="text-indigo-600 font-semibold mt-1">
                    {it.price.toLocaleString()}đ
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={!canGoRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 p-2 rounded-full transition-all duration-300 ${
            canGoRight
              ? "bg-black/20 hover:bg-black/40 text-white cursor-pointer"
              : "bg-black/10 text-white/50 cursor-not-allowed"
          }`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Similar;
