import ClothesList from "@/components/Cart/ClothesList";
import Footer from "@/components/Cart/Footer";
import Herder from "@/components/Cart/Header";
import StatsAndFilters from "@/components/Cart/StatsAndFilters";
import ClothesListPagination from "@/components/Cart/ClothesListPagination";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { visibleClothesLimit } from "@/lib/data";
import HomeHeader from "@/components/Home/HomeHeader";

const CartPage = () => {
  const [clothesBuffer, setClothesBuffer] = useState([]);
  const [shirtClothesCount, setShirtClothesBuffer] = useState(0);
  const [pantClothesCount, setPantClothesBuffer] = useState(0);

  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchClothes();
  }, []);

  // Fetch API
  const fetchClothes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/clothes/all");
      console.log("API DATA:", res.data);

      setClothesBuffer(res.data.clothes || []);
      setShirtClothesBuffer(res.data.shirtCount || 0);
      setPantClothesBuffer(res.data.pantCount || 0);
    } catch (error) {
      console.log("Failed to fetch clothing:", error);
      toast.error("Không thể tải danh sách quần áo.");
    }
  };

  // ---- PAGINATION LOGIC ----
  const totalPages = Math.ceil(
    clothesBuffer.filter((c) => {
      if (filter === "shirt") return c.type === "shirt";
      if (filter === "pant") return c.type === "pant";
      return true;
    }).length / visibleClothesLimit
  );

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // Apply filter
  const filteredClothes = clothesBuffer.filter((clothes) => {
    switch (filter) {
      case "shirt":
        return clothes.type === "shirt";
      case "pant":
        return clothes.type === "pant";
      default:
        return true;
    }
  });

  const visibleClothes = filteredClothes.slice(
    (page - 1) * visibleClothesLimit,
    page * visibleClothesLimit
  );

  return (
    <div className="min-h-screen w-full bg-white relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
                           radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)`,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />

      <div className="container pt-8 mx-auto relative z-10">
        <HomeHeader />

        <Herder />

        <StatsAndFilters
          filter={filter}
          setFilter={setFilter}
          shirtClothesCount={shirtClothesCount}
          pantClothesCount={pantClothesCount}
        />

        <ClothesList filteredClothes={visibleClothes} filter={filter || []} />

        <div className="flex flex-col item-center justify-between gap-6 sm:flex-row">
          <ClothesListPagination
            handleNext={handleNext}
            handlePrev={handlePrev}
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>

        <Footer shirtCount={shirtClothesCount} pantCount={pantClothesCount} />
      </div>
    </div>
  );
};

export default CartPage;
