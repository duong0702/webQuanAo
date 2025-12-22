import React, { useState, useRef } from "react";

const categories = ["hoodie", "polo", "jacket", "t-shirt", "pant", "short"];
const sizes = ["s", "m", "l", "xl"];

const HomeFilter = ({ onApplyFilter, onJump }) => {
  // 🔥 Khởi tạo rỗng - chưa chọn gì từ phía người dùng
  // Mặc định từ logic: tất cả categories, sizes, prices được chọn
  const [selectedCats, setSelectedCats] = useState([]);
  const [priceRange, setPriceRange] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState([]);

  // 🔥 Track để chỉ gọi callback khi user tương tác, không phải mount
  const isMountedRef = useRef(false);

  function toggle(arr, v) {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  }

  // 🔥 Auto-apply filter whenever categories change
  const handleCategoryToggle = (c) => {
    if (!isMountedRef.current) return;
    const updated = toggle(selectedCats, c);
    setSelectedCats(updated);
    // Apply filter immediately, without jump
    onApplyFilter &&
      onApplyFilter({
        categories: updated,
        sizes: selectedSizes,
        price: priceRange,
      });
    console.log("🔔 Category toggle:", updated);
  };

  // 🔥 Auto-apply filter whenever size changes
  const handleSizeToggle = (s) => {
    if (!isMountedRef.current) return;
    const updated = toggle(selectedSizes, s);
    setSelectedSizes(updated);
    // Apply filter immediately
    onApplyFilter &&
      onApplyFilter({
        categories: selectedCats,
        sizes: updated,
        price: priceRange,
      });
    console.log("🔔 Size toggle:", updated);
  };

  // 🔥 Auto-apply filter whenever price changes
  const handlePriceChange = (e) => {
    if (!isMountedRef.current) return;
    const value = e.target.value;
    setPriceRange(value);
    // Apply filter immediately
    onApplyFilter &&
      onApplyFilter({
        categories: selectedCats,
        sizes: selectedSizes,
        price: value,
      });
    console.log("🔔 Price change:", value);
  };

  // 🔥 Set isMounted sau first render để skip callback trong mount
  React.useEffect(() => {
    isMountedRef.current = true;
    console.log("✅ HomeFilter mounted - ready for user interaction");
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md px-6 py-5 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-lg text-gray-900">Danh sách sản phẩm</h3>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          Hãy mua sắm theo sở thích của bạn
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 text-sm mb-3 uppercase tracking-wide">
          Loại
        </h4>
        <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
          {categories.map((c) => {
            const label = c.charAt(0).toUpperCase() + c.slice(1);
            const active = selectedCats.includes(c);
            return (
              <button
                key={c}
                onClick={() => handleCategoryToggle(c)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-indigo-300"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Deselected categories tags */}
        {selectedCats.length < categories.length && selectedCats.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {selectedCats.map((c) => (
              <div
                key={c}
                className="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-full text-sm flex items-center gap-2"
              >
                <span className="capitalize text-indigo-700 font-medium">
                  {c}
                </span>
                <button
                  onClick={() => {
                    const updated = selectedCats.filter((x) => x !== c);
                    setSelectedCats(updated);
                    onApplyFilter &&
                      onApplyFilter({
                        categories: updated,
                        sizes: selectedSizes,
                        price: priceRange,
                      });
                  }}
                  className="text-indigo-400 hover:text-indigo-600 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Size & Price Section */}
      <div className="border-t border-gray-100 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Size */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3 uppercase tracking-wide">
              Kích cỡ
            </h4>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSizeToggle(s)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedSizes.includes(s)
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
            {selectedSizes.length > 0 && (
              <div className="mt-2 text-xs text-indigo-600 font-medium">
                Đã chọn: {selectedSizes.length}/{sizes.length}
              </div>
            )}
          </div>

          {/* Price */}
          <div>
            <h4 className="font-semibold text-gray-800 text-sm mb-3 uppercase tracking-wide">
              Giá
            </h4>
            <select
              value={priceRange}
              onChange={handlePriceChange}
              className="w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 bg-white hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <option value="all">Tất cả</option>
              <option value="0-20">$0 - $20</option>
              <option value="20-30">$20 - $30</option>
              <option value="30-40">$30 - $40</option>
              <option value="40-50">$40 - $50</option>
              <option value="50+">&gt; $50</option>
            </select>
            {priceRange !== "all" && (
              <div className="mt-2 text-xs text-indigo-600 font-medium">
                Giá: ${priceRange}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFilter;
