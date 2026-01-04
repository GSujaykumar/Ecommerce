import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchProducts } from '../api';
import { FiArrowRight } from 'react-icons/fi';
import { formatPrice } from '../utils';

const RelatedProducts = ({ currentProductId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            // In a real app, verify by category. Here we fetch random/all and shuffle
            const allProducts = await fetchProducts();
            const filtered = allProducts
                .filter(p => p.id !== currentProductId) // Exclude current
                .sort(() => 0.5 - Math.random()) // Shuffle
                .slice(0, 4); // Take 4
            setProducts(filtered);
        };
        loadProducts();
    }, [currentProductId]);

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">You Might Also Like</h2>
                <NavLink to="/men" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition">
                    View Match <FiArrowRight />
                </NavLink>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <NavLink key={product.id} to={`/product/${product.id}`} className="group relative">
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 relative">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-contain object-center group-hover:opacity-75 group-hover:scale-105 transition-all duration-300 p-6"
                            />
                            {/* Quick Add Button overlay could go here */}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                                    {product.title}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 capitalize">{product.category}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
