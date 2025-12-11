import React, { useState, useEffect } from "react";
import EmptyState from "../EmptyState";
import ClothesCard from "../ClothesCard";
import { ShoppingCart, Trash2 } from "lucide-react";

const ClothesList = ({ filteredClothes }) => {
  const [clothesList, setClothesList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const filter = "all";

  useEffect(() => {
    setClothesList(filteredClothes);
  }, [filteredClothes]);

  if (!clothesList || clothesList.length === 0) {
    return <EmptyState filter={filter} />;
  }

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setClothesList((prev) =>
      prev.filter((item) => !selectedIds.includes(item._id))
    );
    setSelectedIds([]);
  };

  const handlePaySelected = () => {
    alert(`Thanh toán các sản phẩm: ${selectedIds.join(", ")}`);
    setSelectedIds([]);
  };

  return (
    <div className="space-y-4 pb-10">
      {/* Danh sách sản phẩm */}
      {clothesList.map((clothes, i) => (
        <ClothesCard
          key={clothes._id}
          clothes={clothes}
          index={i}
          isSelected={selectedIds.includes(clothes._id)}
          toggleSelect={() => toggleSelect(clothes._id)}
        />
      ))}

      {/* Thanh công cụ ngay dưới danh sách */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={handlePaySelected}
          className={`px-4 py-2 bg-gradient-to-r from-green-500 to-green-300 text-white rounded-xl shadow flex items-center gap-2 transition transform hover:scale-105 ${
            selectedIds.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
          disabled={selectedIds.length === 0}
        >
          <ShoppingCart size={18} />
          <span>
            Thanh toán{" "}
            {selectedIds.length > 0
              ? selectedIds.length + " sản phẩm"
              : "sản phẩm"}
          </span>
        </button>

        <button
          onClick={handleDeleteSelected}
          className={`px-4 py-2 bg-gradient-to-r from-red-500 to-red-300 text-white rounded-xl shadow flex items-center gap-2 transition transform hover:scale-105 ${
            selectedIds.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
          }`}
          disabled={selectedIds.length === 0}
        >
          <Trash2 size={18} />
          <span>
            Xóa{" "}
            {selectedIds.length > 0
              ? selectedIds.length + " sản phẩm"
              : "sản phẩm"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ClothesList;
