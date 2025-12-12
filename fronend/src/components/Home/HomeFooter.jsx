import React from "react";

const HomeFooter = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <h4 className="font-semibold text-lg">Cảm ơn bạn đã ghé ShopName</h4>
          <p className="text-sm text-gray-300">
            We appreciate your business. Follow us on social media.
          </p>
        </div>
        <div className="text-sm text-gray-300">
          <div>Email: hello@shopname.com</div>
          <div>Phone: +84 123 456 789</div>
          <div>Address: 123 Nguyễn Trãi, Hà Nội</div>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-3 text-xs text-gray-500">
        © {new Date().getFullYear()} ShopName. All rights reserved.
      </div>
    </footer>
  );
};

export default HomeFooter;
