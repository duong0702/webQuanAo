import React, { useState, useEffect } from "react";
import EmptyState from "../EmptyState";
import ClothesCard from "../ClothesCard";
import { ShoppingCart, Trash2 } from "lucide-react";

const ClothesList = ({ filteredClothes }) => {
  const [clothesList, setClothesList] = useState([]);

  const [selectedIds, setSelectedIds] = useState([]);
  const filter = "all";

  // mỗi khi props thay đổi → update state
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
    <div className="space-y-4 pb-20">
      <div className="flex justify-end items-center gap-3 pr-4 fixed right-0 top-10 ">
        <button
          className="px-4 py-2 bg-gradient-to-r from-green-500 via-green-100 to-white rounded-lg shadow group transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg flex items-center gap-2"
          onClick={handlePaySelected}
        >
          <ShoppingCart size={18} className="text-white" />
          <span>
            Thanh toán {selectedIds.length > 0 ? selectedIds.length : ""} sản
            phẩm
          </span>
        </button>

        <button
          onClick={handleDeleteSelected}
          className="px-4 py-2 bg-gradient-to-r from-red-500 via-red-100 to-white rounded-lg shadow group transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg flex items-center gap-2"
        >
          <Trash2 size={18} className="text-white" />
          <span>
            Xóa {selectedIds.length > 0 ? selectedIds.length : ""} sản phẩm
          </span>
        </button>
      </div>

      {/* render danh sách */}
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
