import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar, CheckCircle2, Circle, Square, Trash2 } from "lucide-react";

const ClothesCard = ({ clothes, index, isSelected, toggleSelect }) => {
  return (
    <Card
      onClick={toggleSelect}
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group cursor-pointer",
        isSelected && "ring-2 ring-primary/80"

        // "p4-4 bg-gradient-card bor,der-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        // (clothes.status === "shirt" || clothes.status === "pants") &&
        //   "opacity-75"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nut tron */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            isSelected
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {isSelected ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* thong tin quan ao */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">
            {clothes.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            Màu: {clothes.color} • Size: {clothes.size} • ${clothes.price}
          </p>
        </div>

        {/* ngay them vao gio hang */}
        <div className=" flex items-center gap-2 mt-1">
          <Calendar className=" size-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {clothes.addedAt
              ? new Date(clothes.addedAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        {/* nut chinh sua */}
        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          {/* nut thanh toan */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 size-8 rounded-full transition-all duration-200 text-primary hover:text-primary/80"
          >
            <Square className="size-5" />
          </Button>

          {/* nut xoa */}
          <Button
            variant="ghost"
            size="icon"
            className="flex-shrink-0 size-8 rounded-full transition-all duration-200 text-destructive hover:text-destructive/80"
          >
            <Trash2 className="size-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ClothesCard;
