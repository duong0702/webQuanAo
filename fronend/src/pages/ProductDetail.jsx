import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HomeHeader from "@/components/Home/HomeHeader";
import HomeFooter from "@/components/Home/HomeFooter";
import Product from "@/components/ProductDetail/Product";
import Describe from "@/components/ProductDetail/Describe";
import Policy from "@/components/ProductDetail/Policy";
import Similar from "@/components/ProductDetail/Similar";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/clothes/${id}`);
        setProduct(res.data || res.data.clothes || null);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* BACKGROUND LAYER */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
          radial-gradient(circle at top center,
            rgba(59,130,246,0.25),
            transparent 70%)
        `,
        }}
      />

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <HomeHeader />

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Product images={product.images} />
            <Describe product={product} />
          </div>

          {/* POLICY */}
          <Policy product={product} />

          {/* SIMILAR */}
          <Similar type={product.type} />
        </main>

        <HomeFooter />
      </div>
    </div>
  );
};

export default ProductDetail;
