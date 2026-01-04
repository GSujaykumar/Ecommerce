
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProductsByCategory, fetchMensProducts, fetchWomensProducts, fetchKidsProducts } from "../api";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";

function CategoryPage({ categoryName, apiCategory, type }) {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Filter State
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [sortOption, setSortOption] = useState("default");

    // eslint-disable-next-line no-unused-vars
    const { query } = useParams();

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            let data = [];

            if (type === 'men') {
                data = await fetchMensProducts();
            } else if (type === 'women') {
                data = await fetchWomensProducts();
            } else if (type === 'kids') {
                data = await fetchKidsProducts();
            } else if (apiCategory) {
                data = await fetchProductsByCategory(apiCategory);
            }

            // Set initial price max dynamically if needed, or keep generic 1000
            setAllProducts(data);
            setFilteredProducts(data);
            setLoading(false);
        };
        getProducts();
    }, [apiCategory, categoryName, type]);

    // Apply Filters
    useEffect(() => {
        let result = [...allProducts];

        // Price Filter
        result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        // Sorting
        if (sortOption === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-high") {
            result.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(result);
    }, [priceRange, sortOption, allProducts]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <section className="bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] pt-24 pb-20 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)] capitalize">
                            {categoryName}
                        </h2>
                        <p className="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-dark-text-secondary)] mt-1">
                            Showing {filteredProducts.length} items
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-sm"
                        >
                            <FiFilter /> Filters
                        </button>

                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]"
                        >
                            <option value="default">Sort by: Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-8 items-start">
                    {/* Sidebar Filters (Desktop) */}
                    <aside className={`
                        fixed inset-0 z-40 bg-white dark:bg-[#0b0f19] p-8 transform transition-transform duration-300 md:static md:translate-x-0 md:w-72 md:border-none md:bg-transparent md:p-0 md:block
                        ${showFilters ? 'translate-x-0' : '-translate-x-full'}
                    `}>
                        <div className="flex justify-between items-center md:hidden mb-8">
                            <h3 className="text-xl font-bold tracking-tight">Filters</h3>
                            <button onClick={() => setShowFilters(false)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full"><FiX size={20} /></button>
                        </div>

                        <div className="space-y-10">
                            {/* Price Filter */}
                            <div className="group">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Price Range</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between font-mono text-sm text-gray-900 dark:text-white">
                                        <span>${priceRange.min}</span>
                                        <span>${priceRange.max}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-800 accent-indigo-600 hover:accent-indigo-500 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Availability Filter */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Availability</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer checked:bg-indigo-600 checked:border-indigo-600" defaultChecked />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">In Stock</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input type="checkbox" className="peer w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer checked:bg-indigo-600 checked:border-indigo-600" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors">Out of Stock</span>
                                    </label>
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Min. Rating</h3>
                                <div className="space-y-3">
                                    {[4, 3, 2].map((stars) => (
                                        <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input type="checkbox" className="peer w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer checked:bg-indigo-600 checked:border-indigo-600" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1 group-hover:text-yellow-500 transition-colors">
                                                <span className="text-yellow-400 font-bold">{stars}★</span> & up
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Overlay for mobile filter */}
                    {showFilters && (
                        <div
                            className="fixed inset-0 bg-black/50 z-30 md:hidden"
                            onClick={() => setShowFilters(false)}
                        ></div>
                    )}

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                <AnimatePresence>
                                    {filteredProducts.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            variants={itemVariants}
                                            layout
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-300 dark:border-slate-700">
                                <p className="text-xl text-gray-500 dark:text-gray-400">No products match your filters.</p>
                                <button
                                    onClick={() => setPriceRange({ min: 0, max: 1000 })}
                                    className="mt-4 text-indigo-600 hover:underline"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategoryPage;
