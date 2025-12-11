import React from "react";
import { Card } from "./ui/card";
import { Circle } from "lucide-react";

const EmptyState = ({ filter }) => {
  return (
    <div>
      <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
        <div className="space-y-3">
          <Circle className="mx-auto size-12 text-muted-foreground"></Circle>
        </div>

        <h3 className="font-medium text-foreground">
          {filter === "shirt"
            ? "Hiện chưa có chiếc quần nào trong giỏ hàng."
            : filter === "pants"
            ? "Hiện chưa có chiếc áo nào trong giỏ hàng."
            : "Giỏ hàng của bạn đang trống."}
        </h3>
        <p className="text-sm text-muted-foreground">
          {filter === "all"
            ? "Hãy thêm một số món đồ vào giỏ hàng của bạn để bắt đầu mua sắm!"
            : "Hãy thêm một số món đồ loại " +
              filter +
              " vào giỏ hàng của bạn để bắt đầu mua sắm!"}
        </p>
      </Card>
    </div>
  );
};

export default EmptyState;
