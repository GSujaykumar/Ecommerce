import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiClock, FiZap } from "react-icons/fi";
import { formatPrice } from "../utils";
import { fetchProductsByCategory } from "../api";

const FlashSale = () => {
    const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Timer Logic
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // Fetch some products for the sale
        const loadProducts = async () => {
            const data = await fetchProductsByCategory('electronics'); // Example category
            setProducts(data.slice(0, 4));
        };
        loadProducts();

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}h : ${m.toString().padStart(2, "0")}m : ${s.toString().padStart(2, "0")}s`;
    };

    return (
        <section className="py-12 bg-gray-900 dark:bg-black text-white overflow-hidden relative">
            {/* Plain simplified background */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-yellow-400 p-3 rounded-full text-indigo-900 animate-pulse">
                            <FiZap size={32} fill="currentColor" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold uppercase tracking-tight">Flash Sale</h2>
                            <p className="text-indigo-100">Exclusive 24-Hour Deals</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                        <FiClock className="text-xl" />
                        <span className="text-2xl font-mono font-bold tracking-widest text-yellow-300 shadow-black">
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    <Link to="/electronics" className="hidden md:inline-block px-6 py-2 bg-white text-indigo-600 font-bold rounded-full hover:bg-yellow-300 hover:text-indigo-800 transition shadow-lg">
                        View All Deals
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl hover:-translate-y-2 transition duration-300 group">
                            <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-white flex items-center justify-center p-4">
                                <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    -40%
                                </div>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full w-auto object-contain group-hover:scale-110 transition duration-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900 dark:text-white truncate">{product.title}</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{formatPrice(product.price * 0.6)}</span>
                                    <span className="text-sm text-gray-400 line-through mb-1">{formatPrice(product.price)}</span>
                                </div>

                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full" style={{ width: `${Math.random() * 40 + 60}%` }}></div>
                                </div>
                                <p className="text-xs text-orange-500 font-medium pt-1">Almost Sold Out!</p>
                            </div>
                        </div>
                    ))}

                    {products.length === 0 && (
                        // Skeletons
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white/10 rounded-2xl h-80 animate-pulse"></div>
                        ))
                    )}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/electronics" className="inline-block px-8 py-3 bg-white text-indigo-600 font-bold rounded-full shadow-lg">
                        View All Deals
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FlashSale;
