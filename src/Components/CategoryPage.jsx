
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProductsByCategory } from "../api";
import { useParams } from "react-router-dom";

function CategoryPage({ categoryName, apiCategory }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { query } = useParams(); // For generic use if needed, but props are preferred here

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            let data = [];
            if (apiCategory) {
                data = await fetchProductsByCategory(apiCategory);
            } else {
                // Fallback or mock for 'kids' etc if not in API
                // For 'Kids', we might simulate by mixing or just showing empty state with message
                // Or fetching 'jewelery' as a placeholder
                if (categoryName === 'Kids') {
                    // Mocking kids data from generic products for demo
                    const response = await fetch('https://fakestoreapi.com/products');
                    const allDocs = await response.json();
                    // Just take a subset or random
                    data = allDocs.slice(0, 4).map(p => ({ ...p, title: `Kid's ${p.title}`, category: 'kids' }));
                } else {
                    data = [];
                }
            }
            setProducts(data);
            setLoading(false);
        };
        getProducts();
    }, [apiCategory, categoryName]);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-12 min-h-screen transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white capitalize mb-4">
                        {categoryName} Collection
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Explore our exclusive premium collection for {categoryName}. Quality and style, curated just for you.
                    </p>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse"></div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500 dark:text-gray-400">No products found in this category.</p>
                    </div>
                )}

            </div>
        </section>
    );
}

export default CategoryPage;
