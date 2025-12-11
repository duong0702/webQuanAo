import React from "react";
import { FilterTypes } from "@/lib/data";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Filter } from "lucide-react";

const StatsAndFilters = ({
  shirtClothesCount = 0,
  pantsClothesCount = 0,
  filter = "all",
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20"
        >
          {shirtClothesCount} {FilterTypes.shirt}{" "}
        </Badge>

        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20"
        >
          {pantsClothesCount} {FilterTypes.pants}{" "}
        </Badge>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {Object.keys(FilterTypes).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"}
            size="sm"
            className="capitalize"
          >
            <Filter className="size-4" />
            {FilterTypes[type]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StatsAndFilters;
