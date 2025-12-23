import React, { useEffect, useRef, useState } from "react";

const featured = [
  {
    id: 1,
    title: "Premium Hoodie",
    price: "49.99",
    oldPrice: "79.99",
    image:
      "https://images.unsplash.com/photo-1654765437278-9f356466acdb?w=700&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Classic Polo Shirt",
    price: "39.99",
    oldPrice: "59.99",
    image:
      "https://images.unsplash.com/photo-1603798125914-7b5d27789248?w=700&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Designer T-Shirt",
    price: "34.99",
    oldPrice: "54.99",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Slim Fit Pants",
    price: "69.99",
    oldPrice: "99.99",
    image:
      "https://images.unsplash.com/photo-1441984261150-55796ff52afc?w=700&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    title: "Casual Shorts",
    price: "44.99",
    oldPrice: "64.99",
    image:
      "https://images.unsplash.com/photo-1764779169348-353c6d99dbd0?w=700&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "Fashion Styles",
    price: "54.99",
    oldPrice: "84.99",
    image:
      "https://images.unsplash.com/photo-1596574197254-1d6710b7063a?w=700&auto=format&fit=crop&q=60",
  },
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timeoutRef = useRef(null);
  const resetTimerRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;

    timeoutRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % featured.length);
    }, 5000);

    return () => clearInterval(timeoutRef.current);
  }, [autoPlay]);

  const restartAutoPlayTimer = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setAutoPlay(true), 3000);
  };

  return (
    <section className="relative w-full bg-black">
      {/* Carousel Container */}
      <div className="relative h-96 md:h-[32rem] overflow-hidden rounded-none">
        {/* Slides */}
        <div className="relative h-full">
          {featured.map((f, i) => (
            <div
              key={f.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                i === index ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20">
                <div className="max-w-md">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    {f.title}
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl font-bold text-indigo-400">
                      ${f.price}
                    </span>
                    <span className="text-lg md:text-xl text-gray-400 line-through">
                      ${f.oldPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          onClick={() => {
            setAutoPlay(false);
            setIndex((i) => (i - 1 + featured.length) % featured.length);
            restartAutoPlayTimer();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition hover:scale-110"
        >
          ‹
        </button>

        <button
          onClick={() => {
            setAutoPlay(false);
            setIndex((i) => (i + 1) % featured.length);
            restartAutoPlayTimer();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition hover:scale-110"
        >
          ›
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAutoPlay(false);
                setIndex(i);
                restartAutoPlayTimer();
              }}
              className={`rounded-full transition-all ${
                i === index ? "bg-indigo-500 w-8 h-2" : "bg-white/40 w-2 h-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
