import React, { useState, useMemo } from "react";

const Product = ({ images = [] }) => {
  /**
   * Chuẩn hóa images:
   * - Sản phẩm cũ: ["url"] -> { url, isMain }
   * - Sản phẩm mới: { url, isMain } -> giữ nguyên
   */
  const normalizedImages = useMemo(() => {
    if (!Array.isArray(images)) return [];

    return images
      .map((img, index) => {
        if (typeof img === "string") {
          return {
            url: img,
            isMain: index === 0, // ảnh đầu coi là main
          };
        }

        if (typeof img === "object" && img?.url) {
          return {
            url: img.url,
            isMain: Boolean(img.isMain),
          };
        }

        return null;
      })
      .filter(Boolean);
  }, [images]);

  // Tìm ảnh main, fallback về index 0
  const mainIndex =
    normalizedImages.findIndex((img) => img.isMain) !== -1
      ? normalizedImages.findIndex((img) => img.isMain)
      : 0;

  const [index, setIndex] = useState(mainIndex);

  console.log("IMAGES RECEIVED (raw):", images);
  console.log("IMAGES NORMALIZED:", normalizedImages);

  // Không có ảnh
  if (normalizedImages.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded">
        <span className="text-gray-400">No image</span>
      </div>
    );
  }

  const prev = () =>
    setIndex(
      (i) => (i - 1 + normalizedImages.length) % normalizedImages.length
    );

  const next = () => setIndex((i) => (i + 1) % normalizedImages.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <div className="flex items-start gap-4">
          {/* THUMBNAILS */}
          <div className="w-20 hidden md:block space-y-2">
            {normalizedImages.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`thumb-${i}`}
                onClick={() => setIndex(i)}
                className={`w-full h-20 object-cover rounded cursor-pointer border transition ${
                  i === index
                    ? "border-indigo-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="relative flex-1 flex items-center justify-center">
            {/* PREV */}
            {normalizedImages.length > 1 && (
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-2 z-20 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50"
              >
                ‹
              </button>
            )}

            <div className="overflow-hidden rounded w-full md:w-[105%]">
              <img
                src={normalizedImages[index]?.url}
                alt={`selected-${index}`}
                className="w-full h-96 object-cover rounded transition-transform duration-200"
              />
            </div>

            {/* NEXT */}
            {normalizedImages.length > 1 && (
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-2 z-20 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50"
              >
                ›
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
