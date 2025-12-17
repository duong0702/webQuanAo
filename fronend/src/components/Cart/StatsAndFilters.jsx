import React, { useEffect, useState } from "react";
import { FilterTypes } from "@/lib/data";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Filter } from "lucide-react";

const StatsAndFilters = ({ cart = [], onFilteredChange }) => {
  const [filter, setFilter] = useState("all");

  // Chỉnh classifyType để dùng đúng field của cart
  const classifyType = (item) => {
    if (!item) return "unknown";
    const typeField = item.type || item.name || "";
    const type = typeField.toString().trim().toLowerCase();

    const shirtTypes = ["hoodie", "polo", "shirt"];
    const pantTypes = ["pant", "short"];

    if (shirtTypes.some((t) => type.includes(t))) return "shirt";
    if (pantTypes.some((t) => type.includes(t))) return "pant";

    return "unknown";
  };

  const itemsWithIndex = cart.map((item, i) => ({
    item,
    i,
    type: classifyType(item),
  }));

  const shirtClothesCount = itemsWithIndex.filter(
    (t) => t.type === "shirt"
  ).length;
  const pantClothesCount = itemsWithIndex.filter(
    (t) => t.type === "pant"
  ).length;

  useEffect(() => {
    const filteredIndices = itemsWithIndex
      .filter((t) => (filter === "all" ? true : t.type === filter))
      .map((t) => t.i);

    // Debug log
    console.log("Current filter:", filter);
    console.log(
      "Filtered items:",
      filteredIndices.map((i) => cart[i]?.name)
    );
    console.log(
      "cart types:",
      itemsWithIndex.map((t) => t.type)
    );
    console.log("cart items:", cart);

    if (typeof onFilteredChange === "function") {
      onFilteredChange(filteredIndices);
    }
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
