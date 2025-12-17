import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Similar = ({ type }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/clothes/all`);
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
      <h3 className="text-lg font-semibold mb-3">Sản phẩm tương tự</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => (
          <Link
            key={it._id}
            to={`/product/${it._id}`}
            className="block bg-white p-2 rounded shadow-sm"
          >
            <img
              src={it.images?.[0] || it.image}
              alt={it.title || it.name}
              className="w-full h-40 object-cover rounded"
            />
            <div className="mt-2 text-sm text-gray-700">
              {it.brand || it.title}
            </div>
            <div className="text-indigo-600 font-semibold">${it.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Similar;
