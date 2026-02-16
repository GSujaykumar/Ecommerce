import React from "react";
// import CategoryCard from "../shared/CategoryCard";
// import CategoryCard from "../shared/CategoryCard";
import CategoryCard from "../CategoryCard";

const womenCategories = [
  {
    title: "Dresses",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Tops",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1200&auto=format&fit=crop",
  },
];

const WomenCategories = () => {
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-20 text-center">
          <h2 className="text-4xl font-semibold text-gray-900">
            Women’s Collection
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Curated styles designed for confidence, elegance, and everyday luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {womenCategories.map((item, i) => (
            <CategoryCard key={i} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default WomenCategories;
