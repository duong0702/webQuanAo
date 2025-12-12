import React, { useEffect, useRef, useState } from "react";

const featured = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  title: `Featured ${i + 1}`,
  price: (30 + i * 5).toFixed(2),
  image: `https://picsum.photos/seed/featured${i + 1}/900/500`,
}));

const Banner = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % featured.length);
    }, 3000);
    return () => clearInterval(timeoutRef.current);
  }, []);

  return (
    <section className="relative">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {featured.map((f) => (
            <div key={f.id} className="min-w-full shrink-0">
              <div className="relative">
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute left-6 bottom-6 bg-white/90 p-4 rounded-md shadow-md max-w-xs">
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="text-indigo-600 font-bold mt-2">${f.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <button
          className="bg-white p-2 rounded-full shadow"
          onClick={() =>
            setIndex((i) => (i - 1 + featured.length) % featured.length)
          }
        >
          ‹
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <button
          className="bg-white p-2 rounded-full shadow"
          onClick={() => setIndex((i) => (i + 1) % featured.length)}
        >
          ›
        </button>
      </div>
    </section>
  );
};

export default Banner;
