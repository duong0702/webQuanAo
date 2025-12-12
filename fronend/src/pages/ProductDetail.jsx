import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/clothes/${id}`);
        if (!res.ok) throw new Error("Not found");
        const json = await res.json();
        setProduct(json);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-indigo-600 mb-4"
      >
        ← Back
      </button>
      <div className="bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={product.image}
            alt={product.brand}
            className="w-full h-96 object-cover rounded"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.brand}</h1>
          <div className="text-gray-600 mt-2">
            {product.type} · {product.size}
          </div>
          <div className="text-indigo-600 font-bold text-xl mt-4">
            ${product.price}
          </div>
          <p className="mt-4 text-sm text-gray-700">Color: {product.color}</p>
          <div className="mt-6">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
