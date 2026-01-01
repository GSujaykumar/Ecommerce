import React from "react";
import { motion } from "framer-motion";

const bannerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

function PromoBanner() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={bannerVariants}
      className="relative w-full py-16 mt-16 overflow-hidden"
    >
      {/* Dynamic Background with Particles */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-900 to-black opacity-80" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0.2, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="z-10 text-center lg:text-left">
          <motion.div custom={0} variants={textVariants}>
            <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/50 bg-purple-500/10 text-purple-300 text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
              Limited Time Event
            </span>
          </motion.div>

          <motion.h2 custom={1} variants={textVariants} className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Season <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Finale Sale
            </span>
          </motion.h2>

          <motion.p custom={2} variants={textVariants} className="text-lg text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
            Unbeatable prices on premium fashion. Up to 70% off on selected items. Don't miss out on the trends of tomorrow.
          </motion.p>

          <motion.div custom={3} variants={textVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300">
              Shop Men
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm">
              Shop Women
            </button>
          </motion.div>
        </div>

        {/* Right: Graphic / Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
        >
          {/* Abstract Glassmorphism Cards */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-64 h-80 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl z-10 transform -rotate-6 shadow-2xl flex items-center justify-center"
          >
            <span className="text-8xl font-black text-white/10">50%</span>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute w-64 h-80 bg-gradient-to-bl from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/10 rounded-3xl z-0 transform rotate-6 scale-90 translate-x-12 translate-y-8"
          >
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default PromoBanner;
