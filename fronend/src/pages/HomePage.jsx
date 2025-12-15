import React, { useState } from "react";
import HomeHeader from "../components/Home/HomeHeader";
import Banner from "../components/Home/Banner";
import HomeFilter from "../components/Home/HomeFilter";
import HomeList from "../components/Home/HomeList";
import HomeFooter from "../components/Home/HomeFooter";

const HomePage = () => {
  const [filters, setFilters] = useState({});

  const handleJump = (cat) => {
    const el = document.getElementById(`cat-${cat}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Diagonal Grid with Electric Orange */}
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
      <HomeHeader />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Banner */}
        <div className="pt-6">
          <Banner />
        </div>

        {/* Horizontal filter under banner */}
        <div className="mt-6">
          <HomeFilter
            onChange={(f) => setFilters(f)}
            onJump={(cat) => handleJump(cat)}
          />
        </div>

        {/* Product rows (each category is a horizontal row) */}
        <div className="mt-6 mb-12">
          <HomeList filters={filters} />
        </div>
      </div>

      <HomeFooter />
    </div>
  );
};

export default HomePage;
