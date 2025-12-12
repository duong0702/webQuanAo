import React, { useState } from "react";

const categories = ["Hoodie", "Polo", "Shorts", "Pants", "Dress"];
const sizes = ["XS", "S", "M", "L", "XL"];

const HomeFilter = ({ onChange }) => {
  const [selectedCats, setSelectedCats] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState([]);

  function toggle(arr, v) {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  }

  const emit = () => {
    onChange &&
      onChange({
        categories: selectedCats,
        sizes: selectedSizes,
        price: priceRange,
      });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm sticky top-24">
      <h4 className="font-semibold mb-3">Bộ lọc</h4>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-600 mb-2">Danh mục</div>
        <div className="flex flex-col gap-2">
          {categories.map((c) => (
            <label key={c} className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedCats.includes(c)}
                onChange={() => {
                  setSelectedCats((s) => toggle(s, c));
                }}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-600 mb-2">Size</div>
        <div className="flex gap-2 flex-wrap">
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
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-600 mb-2">Giá</div>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full border rounded p-2 text-sm"
        >
          <option value="all">Tất cả</option>
          <option value="0-50">0 - 50</option>
          <option value="50-100">50 - 100</option>
          <option value=">100">&gt; 100</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            setSelectedCats([]);
            setSelectedSizes([]);
            setPriceRange("all");
            onChange && onChange({ categories: [], sizes: [], price: "all" });
          }}
          className="flex-1 bg-gray-100 py-2 rounded-md text-sm"
        >
          Reset
        </button>
        <button
          onClick={emit}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-md text-sm"
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default HomeFilter;
