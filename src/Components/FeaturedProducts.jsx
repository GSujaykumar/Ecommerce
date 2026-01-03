
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api";
import { motion } from "framer-motion";

function FeaturedProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setAllProducts(data);
      setVisibleProducts(data.slice(0, 8)); // Initial 8
      setLoading(false);
    };
    getProducts();
  }, []);

  useEffect(() => {
    setVisibleProducts(allProducts.slice(0, displayCount));
  }, [displayCount, allProducts]);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 4);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Reduced movement for professional feel
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <section className="bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] mb-2">
              Featured Products
            </h2>
            <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
              Handpicked items just for you
            </p>
          </div>
        </motion.div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
          >
            {visibleProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Load More Button */}
        {allProducts.length > visibleProducts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100"
            >
              View All Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default FeaturedProducts;
