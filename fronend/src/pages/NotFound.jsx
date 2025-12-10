import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-slate-50">
      <img src="/404.png" alt="not found" className="max-w-full mb-6 w-96" />

      <p className="text-xl font-semibold">
        Bạn đã truy cập vào địa chỉ không tồn tại{" "}
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 font-medium text-white transition shadow-md bg-purple-400 rounded-2xl hover:bg-purple-800"
      >
        {" "}
        Quay về trang chủ
      </a>
    </div>
  );
};

export default NotFound;
