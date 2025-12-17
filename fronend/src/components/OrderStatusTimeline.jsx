import { CheckCircle, Clock, Truck, PackageCheck, XCircle } from "lucide-react";

const steps = [
  { key: "pending", label: "Đã đặt hàng", icon: Clock },
  { key: "paid", label: "Đã thanh toán", icon: CheckCircle },
  { key: "shipped", label: "Đang giao hàng", icon: Truck },
  { key: "completed", label: "Hoàn thành", icon: PackageCheck },
];

const statusIndex = {
  pending: 0,
  paid: 1,
  shipped: 2,
  completed: 3,
};

const OrderStatusTimeline = ({ status }) => {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-2 text-red-500 font-semibold mt-4">
        <XCircle size={20} />
        Đơn hàng đã bị huỷ
      </div>
    );
  }

  const currentStep = statusIndex[status];

  return (
    <div className="mt-4 pt-4 border-t">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;

          return (
            <div key={step.key} className="flex-1 flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full transition
                  ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  }
                `}
              >
                <Icon size={18} />
              </div>
              <p
                className={`mt-2 text-xs text-center ${
                  isActive ? "text-green-600 font-medium" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>

              {index < steps.length - 1 && (
                <div
                  className={`hidden sm:block h-1 w-full mt-3 ${
                    index < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTimeline;
