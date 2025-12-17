import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { addToCart } from "@/lib/cart";
import { Calendar, CheckCircle2, Circle } from "lucide-react";

const ClothesCard = ({ clothes, index, isSelected, toggleSelect }) => {
  return (
    <Card
      onClick={toggleSelect}
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group cursor-pointer",
        isSelected && "ring-2 ring-primary/80"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-4">
        {/* nút tròn */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 h-8 w-8 rounded-full transition-all duration-200",
            isSelected
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"
          )}
        >
          {isSelected ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </Button>

        {/* thông tin quần áo */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate">
            {clothes.type} - {clothes.brand}
          </h3>

          <p className="text-sm text-muted-foreground truncate">
            Màu: {clothes.color} • Size: {clothes.size} • {clothes.price} VND
          </p>
        </div>

        {/* ngày tạo */}
        <div className="flex items-center gap-2 mt-1">
          <Calendar className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {clothes.createdAt
              ? new Date(clothes.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        {/* add to cart button */}
        <div className="ml-3">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                product: clothes._id,
                name: clothes.brand || clothes.title || "",
                image: clothes.image || "",
                price: clothes.price || 0,
              });
              alert("Đã thêm vào giỏ hàng");
            }}
          >
            Thêm
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ClothesCard;
