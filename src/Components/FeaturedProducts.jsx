import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      // Show first 8 products for "Featured" section
      setProducts(data.slice(0, 8));
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <section className="bg-gray-50 py-24 bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Products
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Handpicked items just for you
            </p>
          </div>

          <button className="hidden md:inline-flex px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 dark:text-white font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
            View All
          </button>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default FeaturedProducts;
