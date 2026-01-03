
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
        <section className="bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] pt-8 pb-20 min-h-screen transition-colors duration-300">
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
                        fixed inset-0 z-40 bg-white dark:bg-[#0b0f19] p-6 transform transition-transform duration-300 md:static md:translate-x-0 md:w-64 md:border-none md:bg-transparent md:p-0 md:block
                        ${showFilters ? 'translate-x-0' : '-translate-x-full'}
                    `}>
                        <div className="flex justify-between items-center md:hidden mb-6">
                            <h3 className="text-lg font-bold">Filters</h3>
                            <button onClick={() => setShowFilters(false)}><FiX size={24} /></button>
                        </div>

                        <div className="space-y-6">
                            {/* Price Filter */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Price Range</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                        <span>${priceRange.min}</span>
                                        <span>${priceRange.max}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-black dark:accent-white"
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={priceRange.min}
                                            onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md text-sm text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]"
                                            placeholder="Min"
                                        />
                                        <input
                                            type="number"
                                            value={priceRange.max}
                                            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md text-sm text-[var(--color-text-primary)] dark:text-[var(--color-dark-text-primary)]"
                                            placeholder="Max"
                                        />
                                    </div>
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
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-80 bg-gray-200 dark:bg-slate-800 rounded-2xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
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
