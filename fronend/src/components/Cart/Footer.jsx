import React from "react";

const Footer = ({ shirtCount = 0, pantsCount = 0 }) => {
  return (
    <>
      {shirtCount + pantsCount === 0 ? (
        <div className="text-center py-6 text-gray-500">
          Giỏ hàng của bạn đang trống. Hãy thêm một số sản phẩm!
        </div>
      ) : (
        <div className="text-center py-6 text-gray-700 font-medium">
          Tổng số sản phẩm trong giỏ hàng: {shirtCount + pantsCount}
        </div>
      )}
    </>
  );
};

export default Footer;
