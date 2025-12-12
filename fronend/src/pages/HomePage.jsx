import React from "react";
import HomeHeader from "../components/Home/HomeHeader";
import Banner from "../components/Home/Banner";
import HomeFilter from "../components/Home/HomeFilter";
import HomeList from "../components/Home/HomeList";
import HomeFooter from "../components/Home/HomeFooter";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-[#fafafa] relative text-gray-900">
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
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <HomeHeader />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <Banner />
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="hidden lg:block">
              <HomeFilter />
            </aside>
            <main className="lg:col-span-3">
              <HomeList />
            </main>
          </div>
        </div>
        <HomeFooter />
      </div>
    </div>
  );
};

export default HomePage;
