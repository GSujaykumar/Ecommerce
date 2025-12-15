import React from "react";
import ProductCard from "./ProductCard";
function FeaturedProducts() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="mt-2 text-gray-500">
              Handpicked items just for you
            </p>
          </div>

          <button className="hidden md:inline-flex px-6 py-2 rounded-full border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition">
            View All
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
         
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;
