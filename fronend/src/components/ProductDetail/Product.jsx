import React, { useState } from "react";

const Product = ({ images = [] }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0)
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">No image</span>
      </div>
    );

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <div className="flex items-start gap-4">
          {/* Thumbnails */}
          <div className="w-20 hidden md:block space-y-2">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`thumb-${i}`}
                className={`w-full h-20 object-cover rounded cursor-pointer border ${
                  i === index ? "border-indigo-500" : "border-transparent"
                }`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          {/* Main image with nicer controls */}
          <div className="relative flex-1 flex items-center justify-center">
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-2 z-20 -ml-2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50"
            >
              ‹
            </button>

            <div className="overflow-hidden rounded w-full md:w-[105%]">
              <img
                src={images[index]}
                alt={`selected-${index}`}
                className="w-full h-96 object-cover rounded transition-transform duration-200"
              />
            </div>

            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-2 z-20 -mr-2 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
