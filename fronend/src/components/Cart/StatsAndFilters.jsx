import React, { useEffect, useState } from "react";
import { FilterTypes } from "@/lib/data";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Filter } from "lucide-react";

const StatsAndFilters = ({
  cart = [],
  onFilteredChange,
  onFilterKeyChange,
}) => {
  const [filter, setFilter] = useState("all");

  // Map logical groups: hoodie/polo/shirt => shirt, pant/short => pant
  const shirtTypes = ["hoodie", "polo", "jacket", "t-shirt"];
  const pantTypes = ["pant", "short"];

  const shirtClothesCount = cart.filter((item) =>
    shirtTypes.includes(item.type)
  ).length;
  const pantClothesCount = cart.filter((item) =>
    pantTypes.includes(item.type)
  ).length;

  useEffect(() => {
    const filteredIndices = cart
      .map((item, i) => ({ item, i }))
      .filter(({ item }) => {
        if (filter === "all") return true;
        if (filter === "shirt") return shirtTypes.includes(item.type);
        if (filter === "pant") return pantTypes.includes(item.type);
        return item.type === filter;
      })
      .map(({ i }) => i);

    onFilteredChange?.(filteredIndices);
    onFilterKeyChange?.(filter);
  }, [cart, filter]);

  return (
    <div className="relative inline-block w-full bg-[#fefcff] rounded-xl p-6 overflow-hidden ">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center relative z-10">
        <div className="flex flex-col gap-3">
          {/* TITLE */}
          <h1 className="text-2xl font-semibold italic text-purple-600">
            Giỏ hàng của bạn hiện đang có
          </h1>

          {/* BADGES */}
          <div className="flex gap-3">
            <Badge
              variant="secondary"
              className="bg-white/60 text-accent-foreground border-info/30
                 px-4 py-1.5 text-sm font-medium"
            >
              {shirtClothesCount} {FilterTypes.shirt}
            </Badge>

            <Badge
              variant="secondary"
              className="bg-white/60 text-success border-success/30
                 px-4 py-1.5 text-sm font-medium"
            >
              {pantClothesCount} {FilterTypes.pant}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {Object.keys(FilterTypes).map((typeKey) => (
            <Button
              key={typeKey}
              variant={filter === typeKey ? "gradient" : "ghost"}
              size="sm"
              className="capitalize"
              onClick={() => setFilter(typeKey)}
            >
              <Filter className="h-4 w-4" />
              {FilterTypes[typeKey]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsAndFilters;
