import React, { useState } from "react";
import EmptyState from "../EmptyState";
import ClothesCard from "../ClothesCard";

const ClothesList = () => {
  const [clothesList, setClothesList] = useState([
    {
      _id: "1",
      name: "T-Shirt",
      color: "red",
      size: "M",
      price: 20,
      addedAt: Date.now(),
    },
    {
      _id: "2",
      name: "Hoodie",
      color: "blue",
      size: "L",
      price: 35,
      addedAt: Date.now(),
    },
  ]);

  const [selectedIds, setSelectedIds] = useState([]);
  const filter = "all";

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
    <div className="space-y-4 pb-20">
      {/* Thanh công cụ nằm hẳn bên phải */}
      {selectedIds.length > 0 && (
        <div className="sticky top-0 bg-white z-10 border-b py-3">
          <div className="flex justify-end items-center gap-3 pr-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              onClick={handlePaySelected}
            >
              Thanh toán tất cả ({selectedIds.length})
            </button>

            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              onClick={handleDeleteSelected}
            >
              Xóa tất cả
            </button>
          </div>
        </div>
      )}

      {/* Danh sách card */}
      {clothesList.map((clothes, i) => (
        <ClothesCard
          key={clothes._id}
          clothes={clothes}
          index={i}
          isSelected={selectedIds.includes(clothes._id)}
          toggleSelect={() => toggleSelect(clothes._id)}
        />
      ))}
    </div>
  );
};

export default ClothesList;
