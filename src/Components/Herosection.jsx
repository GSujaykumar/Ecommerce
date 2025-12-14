import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      
      {/* Subtle luxury background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-100 via-white to-stone-50"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-6 text-xs tracking-widest text-gray-500 uppercase">
            Premium Women Collection
          </span>

          <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 leading-tight">
            Redefining <br />
            Modern Elegance
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600">
            Discover exclusive women’s fashion crafted with elegance,
            confidence, and timeless beauty.
          </p>

          {/* PREMIUM BUTTONS */}
          <div className="mt-12 flex flex-wrap gap-6">
            <button className="px-10 py-4 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition shadow-xl">
              Shop Collection
            </button>

            <button className="px-10 py-4 rounded-full border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 transition">
              View Lookbook
            </button>
          </div>

          {/* TRUST LINE */}
          <div className="mt-14 flex items-center gap-12 text-sm text-gray-500">
            <div>
              <p className="text-2xl font-semibold text-gray-900">15K+</p>
              <p>Global Customers</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">5★</p>
              <p>Premium Reviews</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          {/* Editorial frame */}
          <div className="absolute -top-8 -left-8 w-full h-full border border-gray-200 rounded-[2.5rem]"></div>

          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1

"
            alt="Luxury Fashion Model"
            className="relative rounded-[2.5rem] shadow-2xl object-cover w-full h-[560px]"
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
