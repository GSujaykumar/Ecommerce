import React from "react";
import { FiShoppingBag, FiStar, FiTruck, FiGlobe, FiAward } from "react-icons/fi";
import { useState, useEffect } from "react";
import StoreMap from "./StoreMap";
import Achievements from "./Achievements";

const About = () => {


    return (
        <section className="bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] transition-colors duration-300">

            {/* ===== HERO / INTRO ===== */}
            <div className="max-w-7xl mx-auto px-6 lg:px-24 py-32 space-y-32">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className="inline-block px-4 py-1.5 mb-6 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 font-bold rounded-full text-xs uppercase tracking-wider">
                            Since 2023
                        </div>
                        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight dark:text-white">
                            We Are <span className="text-black dark:text-red-500">ObitoStore</span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            Born from a passion for bold aesthetics and high-performance gear, ObitoStore isn't just a marketplace—it's a movement. We curate the finest collection of urban techwear, streetwear, and lifestyle essentials for the modern visionary.
                        </p>

                        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                            Our mission is simple: To empower your individuality through designs that break the mold. Authenticity is our creed, and quality is our promise.
                        </p>

                        <div className="mt-10">
                            <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition shadow-lg">
                                Join the Movement
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 border-2 border-gray-200 dark:border-red-500/20 rounded-3xl transform translate-x-4 translate-y-4"></div>
                        <img
                            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2574&auto=format&fit=crop"
                            alt="Fashion Studio"
                            className="rounded-3xl shadow-2xl w-full h-[500px] object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </div>

            {/* ===== ACHIEVEMENTS & STATS ===== */}
            <Achievements />

            {/* ===== GLOBAL MAP ===== */}
            <StoreMap />

            <div className="max-w-7xl mx-auto px-6 lg:px-24 py-32 space-y-32">

                {/* ===== WHY CHOOSE US ===== */}
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
                        The <span className="dark:text-red-500">Obito</span> Standard
                    </h2>

                    <div className="mt-16 grid md:grid-cols-3 gap-10">
                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition border border-transparent hover:border-gray-100 dark:hover:border-gray-700 group">
                            <div className="bg-black dark:bg-red-600 text-white p-4 rounded-xl w-fit group-hover:scale-110 transition">
                                <FiAward size={26} />
                            </div>
                            <h4 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                                Authentic Quality
                            </h4>
                            <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                                We don't do knock-offs. Every item is verified authentic and sourced directly from top-tier manufacturers.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition border border-transparent hover:border-gray-100 dark:hover:border-gray-700 group">
                            <div className="bg-black dark:bg-red-600 text-white p-4 rounded-xl w-fit group-hover:scale-110 transition">
                                <FiGlobe size={26} />
                            </div>
                            <h4 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                                Worldwide Shipping
                            </h4>
                            <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                                From Tokyo to New York, we deliver swiftly to over 50 countries with real-time tracking.
                            </p>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl transition border border-transparent hover:border-gray-100 dark:hover:border-gray-700 group">
                            <div className="bg-black dark:bg-red-600 text-white p-4 rounded-xl w-fit group-hover:scale-110 transition">
                                <FiStar size={26} />
                            </div>
                            <h4 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                                Customer First
                            </h4>
                            <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                                24/7 dedicated support team ready to assist you with sizing, styling, and returns.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ===== FOUNDER / VISION ===== */}
                <div className="bg-black text-white rounded-[3rem] p-12 lg:p-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full opacity-20">
                        <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">"Fashion is the armor to survive the reality of everyday life."</h2>
                        <p className="text-xl text-gray-300 mb-8">– Bill Cunningham</p>
                        <p className="text-gray-400">At ObitoStore, we believe your clothes tell your story before you speak. Make it a legend.</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default About;
