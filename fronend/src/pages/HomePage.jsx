import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeHeader from "../components/Home/HomeHeader";
import Banner from "../components/Home/Banner";
import HomeFilter from "../components/Home/HomeFilter";
import HomeList from "../components/Home/HomeList";
import HomeFooter from "../components/Home/HomeFooter";

const HomePage = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({});

  // 🎯 Lấy query params từ URL (từ mega menu)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const typeParams = searchParams.getAll("type"); // ✅ Lấy tất cả type values
    const statusParams = searchParams.getAll("status"); // ✅ Lấy tất cả status values

    // Nếu có query từ URL, cập nhật filters
    if (typeParams.length > 0 || statusParams.length > 0) {
      const newFilters = {};
      if (typeParams.length > 0) {
        newFilters.type = typeParams.length === 1 ? typeParams[0] : typeParams; // String hoặc Array
      }
      if (statusParams.length > 0) {
        newFilters.status =
          statusParams.length === 1 ? statusParams[0] : statusParams;
      }
      setFilters(newFilters);
    }
  }, [location.search]);

  const handleJump = (cat) => {
    const el = document.getElementById(`cat-${cat}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFilterApply = (f) => {
    setFilters(f);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <HomeHeader />

      {/* MAIN WRAPPER */}
      <div className="relative flex-1">
        {/* BACKGROUND */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
          repeating-linear-gradient(45deg, rgba(255, 0, 100, 0.1) 0, rgba(255, 0, 100, 0.1) 1px, transparent 1px, transparent 20px),
          repeating-linear-gradient(-45deg, rgba(255, 0, 100, 0.1) 0, rgba(255, 0, 100, 0.1) 1px, transparent 1px, transparent 20px)
        `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          {/* Banner */}
          <div className="pt-6">
            <Banner />
          </div>

          {/* Filter */}
          <div className="mt-6">
            <HomeFilter
              onApplyFilter={handleFilterApply}
              onJump={(cat) => handleJump(cat)}
            />
          </div>

          {/* Products */}
          <div id="product-list" className="mt-6 pb-12">
            <HomeList filters={filters} />
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
};

export default HomePage;
