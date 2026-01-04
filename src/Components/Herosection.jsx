import React from "react";
import Texttype from "./Texttype";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] transition-colors duration-300 min-h-[90vh] flex items-center">

      {/* Background Gradient */}
      <div
        className="
    absolute inset-0
    bg-gradient-to-tr
    from-stone-50 via-white to-stone-100
    dark:from-slate-900 dark:via-gray-900 dark:to-slate-800
    opacity-80
  "
      ></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block mb-4 py-1 px-3 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold tracking-widest uppercase">
            New Summer Collection
          </span>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
            Redefining <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Modern Elegance
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover exclusive fashion crafted with confidence and sophistication. Upgrade your wardrobe with our premium selection.
          </p>

          {/* PREMIUM BUTTONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/women" className="px-8 py-4 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 hover:scale-105 transition-all shadow-xl dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
              Shop Now
            </Link>

            <Link to="/men" className="px-8 py-4 rounded-full border border-gray-300 text-gray-900 font-semibold hover:border-gray-900 hover:bg-gray-50 transition-all dark:border-gray-600 dark:text-gray-300 dark:hover:border-white dark:hover:text-white dark:hover:bg-white/10">
              View All Products
            </Link>
          </div>

          {/* TRUST LINE */}
          <div className="mt-12 flex items-center gap-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">15K+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Global Customers</p>
            </div>
            <div className="w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">4.9</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Star Reviews</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900/40 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/40 rounded-full blur-3xl opacity-50"></div>

          {/* Image Container */}
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 group">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
              alt="Luxury Fashion Model"
              className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay Tag */}
            <div className="absolute bottom-8 left-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg transform transition-transform hover:-translate-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Featured</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">Summer Edition</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
