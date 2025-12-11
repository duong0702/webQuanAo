import React from "react";

const Footer = ({ shirtCount = 0, pantCount = 0 }) => {
  return (
    <>
      {shirtCount + pantCount === 0 ? (
        <div className="text-center py-6 text-gray-500">
          Giỏ hàng của bạn đang trống. Hãy thêm một số sản phẩm!
        </div>
      ) : (
        <div className="text-center py-6 text-gray-700 font-medium">
          Tổng số sản phẩm trong giỏ hàng: {shirtCount + pantCount}
        </div>
      )}
    </>
  );
};

export default Footer;
