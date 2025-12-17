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

  const images =
    product.images && product.images.length
      ? product.images
      : [product.image].filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Product images={images} />
          </div>

          <div>
            <Describe product={product} />
          </div>
        </div>

        <Policy product={product} />

        <Similar type={product.type} />
      </main>

      <HomeFooter />
    </div>
  );
};

export default ProductDetail;
