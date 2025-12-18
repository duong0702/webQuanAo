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
  const shirtTypes = ["hoodie", "polo", "shirt"];
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
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {shirtClothesCount} {FilterTypes.shirt}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {pantClothesCount} {FilterTypes.pant}
        </Badge>
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
  );
};

export default StatsAndFilters;
