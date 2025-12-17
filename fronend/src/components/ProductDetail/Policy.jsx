import React, { useState } from "react";
import {
  Truck,
  Clock,
  MapPin,
  ShieldCheck,
  RefreshCcw,
  Package,
  Shirt,
  Ruler,
  Layers,
} from "lucide-react";

/*
  ======================================================
  POLICY COMPONENT
  - Shipping policy
  - Exchange policy
  - Product description (ÁO / QUẦN)
  - Logic phân loại CHUẨN theo backend enum
  ======================================================
*/

const Policy = ({ product }) => {
  /* =======================
     TAB MODE
     ======================= */
  const [mode, setMode] = useState("shipping");

  /* =======================
     TYPE FROM BACKEND
     ======================= */
  const isTop = ["hoodie", "polo", "shirt"].includes(product?.type);
  const isBottom = ["pant", "short"].includes(product?.type);

  return (
    <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-200">
      {/* =======================
         TABS
         ======================= */}
      <div className="flex gap-3 border-b p-4">
        <TabButton
          active={mode === "shipping"}
          onClick={() => setMode("shipping")}
        >
          Chính sách giao hàng
        </TabButton>

        <TabButton
          active={mode === "exchange"}
          onClick={() => setMode("exchange")}
        >
          Chính sách đổi hàng
        </TabButton>

        <TabButton
          active={mode === "describe"}
          onClick={() => setMode("describe")}
        >
          Mô tả sản phẩm
        </TabButton>
      </div>

      {/* =======================
         CONTENT
         ======================= */}
      <div className="p-6 md:p-8">
        {/* =======================
           SHIPPING
           ======================= */}
        {mode === "shipping" && (
          <>
            <SectionTitle icon={<Truck />} title="Chính sách giao hàng" />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <PolicyItem
                icon={<Clock />}
                title="Thời gian giao hàng"
                desc="Nội thành từ 1–2 ngày làm việc. Các tỉnh thành khác từ 3–5 ngày tùy khu vực và đơn vị vận chuyển."
              />

              <PolicyItem
                icon={<MapPin />}
                title="Phạm vi giao hàng"
                desc="Giao hàng toàn quốc, hỗ trợ thanh toán khi nhận hàng (COD)."
              />

              <PolicyItem
                icon={<Truck />}
                title="Phí vận chuyển"
                desc="Miễn phí với đơn hàng từ 500.000đ. Đơn dưới mức này áp dụng phí từ 20.000–40.000đ."
              />

              <PolicyItem
                icon={<ShieldCheck />}
                title="Lưu ý khi nhận hàng"
                desc="Quý khách vui lòng kiểm tra sản phẩm trước khi thanh toán để đảm bảo quyền lợi."
              />
            </div>
          </>
        )}

        {/* =======================
           EXCHANGE
           ======================= */}
        {mode === "exchange" && (
          <>
            <SectionTitle icon={<RefreshCcw />} title="Chính sách đổi hàng" />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <PolicyItem
                icon={<Clock />}
                title="Thời gian đổi hàng"
                desc="Hỗ trợ đổi sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng."
              />

              <PolicyItem
                icon={<Package />}
                title="Điều kiện đổi"
                desc="Sản phẩm còn nguyên tem mác, chưa qua sử dụng và có hóa đơn mua hàng."
              />

              <PolicyItem
                icon={<ShieldCheck />}
                title="Trường hợp hỗ trợ"
                desc="Áp dụng cho sản phẩm lỗi sản xuất, giao sai mẫu hoặc sai size."
              />

              <PolicyItem
                icon={<RefreshCcw />}
                title="Lưu ý quan trọng"
                desc="Mỗi đơn hàng chỉ hỗ trợ đổi 1 lần duy nhất."
              />
            </div>
          </>
        )}

        {/* =======================
           DESCRIPTION
           ======================= */}
        {mode === "describe" && (
          <>
            {/* ===== TITLE ICON THEO LOẠI ===== */}
            <SectionTitle
              icon={isBottom ? <Layers /> : <Shirt />}
              title="Mô tả sản phẩm"
            />

            {/* =======================
               ÁO
               ======================= */}
            {isTop && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <DescriptionItem
                  icon={<Package />}
                  title="Chất liệu & cảm giác mặc"
                  desc="Sản phẩm được may từ chất liệu vải cao cấp, mềm mại và thoáng khí, giúp người mặc luôn cảm thấy dễ chịu dù mặc trong thời gian dài. Vải ít nhăn, dễ bảo quản và giữ form tốt sau nhiều lần giặt."
                />

                <DescriptionItem
                  icon={<Ruler />}
                  title="Form dáng & ứng dụng"
                  desc="Thiết kế form Regular vừa vặn, không bó sát nhưng cũng không quá rộng. Dễ dàng phối cùng quần jean, kaki hoặc quần tây, phù hợp mặc đi làm, đi học hay dạo phố hằng ngày."
                />
              </div>
            )}

            {/* =======================
               QUẦN
               ======================= */}
            {isBottom && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <DescriptionItem
                  icon={<Package />}
                  title="Chất liệu kaki – giữ form tốt"
                  desc="Quần sử dụng chất liệu kaki dày vừa, cầm chắc tay nhưng không gây cứng hay bí. Bề mặt vải mịn, bền màu, hạn chế nhăn, giúp quần giữ được form dáng đẹp trong suốt quá trình sử dụng."
                />

                <DescriptionItem
                  icon={<Ruler />}
                  title="Thiết kế & tính ứng dụng"
                  desc="Form quần gọn gàng, tôn dáng người mặc. Dễ phối cùng áo thun, sơ mi hoặc hoodie. Phù hợp mặc đi làm, đi chơi, đi cà phê hay di chuyển hằng ngày."
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* =======================
   UI COMPONENTS
   ======================= */

const TabButton = ({ active, children, ...props }) => (
  <button
    {...props}
    className={`px-4 py-2 text-sm rounded-lg transition
      ${active ? "bg-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
  >
    {children}
  </button>
);

const SectionTitle = ({ icon, title }) => (
  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
    <span className="text-indigo-600">{icon}</span>
    {title}
  </h2>
);

const PolicyItem = ({ icon, title, desc }) => (
  <div className="flex gap-4">
    <span className="text-indigo-600 mt-1">{icon}</span>
    <div>
      <h4 className="font-medium text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </div>
  </div>
);

const DescriptionItem = ({ icon, title, desc }) => (
  <div>
    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
      <span className="text-indigo-600">{icon}</span>
      {title}
    </h4>
    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{desc}</p>
  </div>
);

export default Policy;
