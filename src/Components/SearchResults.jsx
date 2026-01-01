
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api';

function SearchResults() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';

    useEffect(() => {
        const getSearchResults = async () => {
            setLoading(true);
            const allProducts = await fetchProducts();

            const filtered = allProducts.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );

            setProducts(filtered);
            setLoading(false);
        };

        if (query) {
            getSearchResults();
        } else {
            setProducts([]);
            setLoading(false);
        }

    }, [query]);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    {products.length} results for "{query}"
                </h2>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                        {[...Array(4)].map((_, i) => (
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
                    <div className="text-center py-24">
                        <p className="text-xl text-gray-500 dark:text-gray-400">We couldn't find any matches for "{query}".</p>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Try checking your spelling or use different keywords.</p>
                        <Link to="/" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition">
                            Return Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults;
