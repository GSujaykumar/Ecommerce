import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const float = {
  initial: { y: 0, x: 0 },
  animate: {
    y: [0, -12, 0],
    x: [0, 4, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] transition-colors duration-300">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-violet-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_60%_-10%,rgba(139,92,246,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_70%_at_60%_-10%,rgba(139,92,246,0.08),transparent)]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-violet-200/60 dark:bg-violet-900/30 blur-3xl"
        variants={float}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl"
        variants={float}
        initial="initial"
        animate="animate"
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Left content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-1.5 mb-5 py-2 px-4 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-semibold tracking-wider uppercase"
          >
            New Arrivals
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-5"
          >
            Style that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400">
              works for you
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed mx-auto lg:mx-0"
          >
            Premium fashion and essentials, delivered with care. Shop the latest collection and enjoy free shipping on orders over $50.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              to="/women"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm shadow-lg shadow-gray-900/20 dark:shadow-gray-500/20 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Shop Now
            </Link>
            <Link
              to="/men"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              View All
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8"
          >
            {[
              { value: "15K+", label: "Customers" },
              { value: "4.9", label: "Rating" },
              { value: "24/7", label: "Support" },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/10 dark:shadow-black/30 ring-1 ring-gray-200/80 dark:ring-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
              alt="Featured collection"
              className="w-full aspect-[4/5] sm:max-h-[580px] object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16">
              <p className="text-violet-300 text-xs font-semibold uppercase tracking-wider mb-1">Featured</p>
              <p className="text-xl font-bold text-white">Summer Edition</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
