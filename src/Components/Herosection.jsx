import React from "react";
import Texttype from "./Texttype";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)]">



      {/* Subtle luxury background */}
      <div
        className="
    absolute inset-0
    bg-gradient-to-tr
    from-stone-100 via-white to-stone-50
    dark:from-slate-900 dark:via-slate-900 dark:to-slate-800
  "
      ></div>


      <div className="relative max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block mb-6 text-xs tracking-widest text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)]">
            Premium Women Collection
          </span>

          {/* <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 leading-tight">
            Redefining <br />
            Modern Elegance
          </h1> */}
          <h1 className="text-4xl md:text-6xl font-semibold text-gray-900 leading-tight text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-primary)]" >
            <Texttype
              words={["Redefining Modern Elegance"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
            />
          </h1>






          <p className="mt-6 max-w-xl text-lg text-gray-600 text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-primary)]">
            Discover exclusive women’s fashion crafted with elegance,
            confidence, and timeless beauty.
          </p>

          {/* PREMIUM BUTTONS */}
          <div className="mt-12 flex flex-wrap gap-6">
             <button className="px-10 py-4 rounded-full border text-gray-900 font-medium hover: transition  dark:text-[var(--color-dark-text-primary)]">
              Shop Collection
            </button>

            <button className="px-10 py-4 rounded-full border border-gray-300 text-gray-900 font-medium   dark:text-[var(--color-dark-text-primary)]">
              View Lookbook
            </button>
          </div>

          {/* TRUST LINE */}
          <div className="mt-14 flex items-center gap-12 text-sm text-gray-500 ">
            <div>
              <p className="text-2xl font-semibold text-gray-900  dark:text-[var(--color-dark-text-primary)]">15K+</p>
              <p className=" dark:text-[var(--color-dark-text-primary)]">Global Customers</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900  dark:text-[var(--color-dark-text-primary)]">5★</p>
              <p className=" dark:text-[var(--color-dark-text-primary)]">Premium Reviews</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          {/* Editorial frame */}
          <div className="absolute -top-8 -left-8 w-full h-full border border-gray-200 rounded-[2.5rem] dark:border-gray-700"></div>

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
