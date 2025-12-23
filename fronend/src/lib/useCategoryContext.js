// src/lib/useCategoryContext.js
import { useLocation } from "react-router-dom";
import { CATEGORY_CONFIG } from "../constants/categoryConfig";

export const useCategoryContext = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const group = params.get("group");
  const type = params.get("type");
  const status = params.get("status");

  /* ================= GROUP ƯU TIÊN CAO NHẤT ================= */

  if (group === "shirt") {
    return {
      isAll: false,
      config: CATEGORY_CONFIG.shirtGroup,
      showSubNav: true,
    };
  }

  if (group === "pant") {
    return {
      isAll: false,
      config: CATEGORY_CONFIG.pantGroup,
      showSubNav: true,
    };
  }

  /* ================= TYPE (ITEM) ================= */

  if (type && CATEGORY_CONFIG[type]) {
    return {
      isAll: false,
      config: CATEGORY_CONFIG[type],
      showSubNav: false,
    };
  }

  /* ================= STATUS ================= */

  if (status && CATEGORY_CONFIG[status]) {
    return {
      isAll: false,
      config: CATEGORY_CONFIG[status],
      showSubNav: false,
    };
  }

  /* ================= ALL ================= */

  return { isAll: true, config: null, showSubNav: false };
};
