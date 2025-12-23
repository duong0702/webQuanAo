import React from "react";
import { useLocation } from "react-router-dom";
import CategoryBanner from "../components/CategoryPage/CategoryBanner";
import CategoryContent from "../components/CategoryPage/CategoryContent";
import HomeList from "../components/Home/HomeList";

const CategoryPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const type = params.getAll("type");
  const status = params.getAll("status");

  return (
    <>
      <CategoryBanner type={type} status={status} />

      {/* ID để HomeHeader scroll xuống */}
      <div id="product-list">
        <HomeList />
      </div>

      <CategoryContent type={type} status={status} />
    </>
  );
};

export default CategoryPage;
