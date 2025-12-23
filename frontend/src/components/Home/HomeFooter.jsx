import React from "react";
import { Mail, Phone, MapPin, Heart, ShoppingBag } from "lucide-react";

const HomeFooter = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      {/* TOP */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="md:pr-12">
            <h4 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-yellow-400" />
              ShopName – Men Fashion
            </h4>

            <p className="mt-3 text-gray-300 leading-relaxed text-sm">
              Chúng tôi mang đến những sản phẩm thời trang nam{" "}
              <span className="text-white font-medium">
                chất lượng – hiện đại – phù hợp xu hướng
              </span>
              , giúp bạn tự tin trong mọi khoảnh khắc cuộc sống.
            </p>

            <p className="mt-2 text-gray-400 text-sm flex items-center gap-1">
              Được tạo ra với <Heart className="w-4 h-4 text-red-500" /> dành
              cho phong cách của bạn
            </p>
          </div>

          {/* RIGHT */}
          <div className="text-sm text-gray-300 space-y-3 ml-auto md:pl-12">
            <div className="flex items-center gap-3 hover:text-white transition">
              <Mail className="w-4 h-4 text-yellow-400" />
              <span>MenFashion@gmail.com</span>
            </div>

            <div className="flex items-center gap-3 hover:text-white transition">
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>0966 699 154</span>
            </div>

            <div className="flex items-start gap-3 hover:text-white transition">
              <MapPin className="w-4 h-4 text-yellow-400 mt-0.5" />
              <span>110 Trần Phú, Hà Đông, Hà Nội</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        © {new Date().getFullYear()} ShopName. All rights reserved.
      </div>
    </footer>
  );
};

export default HomeFooter;
