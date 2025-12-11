import ClothesList from "@/components/Cart/ClothesList";
import Footer from "@/components/Cart/Footer";
import DateTimerFilter from "@/components/Cart/DateTimerFilter";
import Herder from "@/components/Cart/Header";
import StatsAndFilters from "@/components/Cart/StatsAndFilters";
import ClothesListPagination from "@/components/Cart/ClothesListPagination";
import React from "react";

const CartPage = () => {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* White Sphere Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "white",
          backgroundImage: `
       linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
       linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
       radial-gradient(circle at 50% 50%, rgba(139,92,246,0.25) 0%, rgba(139,92,246,0.1) 40%, transparent 80%)
     `,
          backgroundSize: "32px 32px, 32px 32px, 100% 100%",
        }}
      />
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6"></div>
        <Herder />

        <StatsAndFilters />

        <ClothesList />

        <div className="flex flex-col item-center justify-between gap-6 sm:flex-row">
          <ClothesListPagination />
          <DateTimerFilter />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default CartPage;
