import React, { useState, useEffect } from "react";

const categories = ["hoodie", "polo", "shirt", "pant", "short"];
const sizes = ["XS", "S", "M", "L", "XL"];

const HomeFilter = ({ onChange, onJump }) => {
  const [selectedCats, setSelectedCats] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState([]);

  function toggle(arr, v) {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  }

  useEffect(() => {
    onChange &&
      onChange({
        categories: selectedCats,
        sizes: selectedSizes,
        price: priceRange,
      });
  }, [selectedCats, selectedSizes, priceRange]);

  return (
    <div className="bg-white rounded-md shadow-sm px-3 py-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Danh mục</h4>
        <div className="text-sm text-gray-500">Lọc nhanh</div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((c) => {
          const label = c.charAt(0).toUpperCase() + c.slice(1);
          const active = selectedCats.includes(c);
          return (
            <button
              key={c}
              onClick={() => {
                setSelectedCats((s) => toggle(s, c));
                onJump && onJump(c);
              }}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm border ${
                active
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Selected tags row */}
      <div className="mt-3 flex gap-2 items-center overflow-x-auto">
        {selectedCats.length === 0 ? (
          <div className="text-sm text-gray-500">
            Chọn danh mục để lọc (hoặc để trống hiển thị tất cả)
          </div>
        ) : (
          selectedCats.map((c) => (
            <div
              key={c}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
            >
              <span className="capitalize">{c}</span>
              <button
                onClick={() => setSelectedCats((s) => s.filter((x) => x !== c))}
                className="text-xs text-gray-500"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Size + Price compact row */}
      <div className="mt-3 flex items-center gap-3">
        <div className="flex gap-2 items-center">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSizes((st) => toggle(st, s))}
              className={`px-2 py-1 border rounded text-sm ${
                selectedSizes.includes(s)
                  ? "bg-indigo-600 text-white"
                  : "bg-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="ml-auto border rounded p-2 text-sm"
        >
          <option value="all">Tất cả</option>
          <option value="0-50">0 - 50</option>
          <option value="50-100">50 - 100</option>
          <option value=">100">&gt; 100</option>
        </select>
      </div>
    </div>
  );
};

export default HomeFilter;
