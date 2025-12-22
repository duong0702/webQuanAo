import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Similar = ({ type }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/clothes/all");
        const all = res.data.clothes || [];
        setItems(all.filter((p) => p.type === type).slice(0, 6));
      } catch (err) {
        console.error(err);
      }
    };
    if (type) load();
  }, [type]);

  if (!items || items.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Sản phẩm tương tự</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => (
          <Link
            key={it._id}
            to={`/product/${it._id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="
              group block bg-white p-2 rounded-xl
              transition-all duration-300 ease-out
              hover:shadow-xl hover:-translate-y-1
            "
          >
            {/* IMAGE */}
            <div className="overflow-hidden rounded-lg">
              <img
                src={it.mainImage || it.image}
                alt={it.title || it.name}
                className="
                  w-full h-40 object-cover
                  transition-transform duration-500 ease-out
                  group-hover:scale-110
                  group-hover:brightness-110
                "
              />
            </div>

            {/* INFO */}
            <div className="mt-2 text-sm text-gray-700 line-clamp-2">
              {it.brand || it.title || it.name}
            </div>

            <div className="text-indigo-600 font-semibold mt-1">
              {it.price.toLocaleString()}đ
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Similar;
