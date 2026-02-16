import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { formatPrice } from '../utils';

const RecentlyViewed = () => {
    const [recentProducts, setRecentProducts] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('recentlyViewed');
        if (stored) {
            setRecentProducts(JSON.parse(stored));
        }
    }, []);

    if (recentProducts.length === 0) return null;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Recently Viewed</h2>
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                {recentProducts.map((product, idx) => (
                    <NavLink key={`${product.id}-${idx}`} to={`/product/${product.id}`} className="min-w-[200px] w-[200px] group flex-shrink-0">
                        <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 relative mb-3">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-contain p-4 group-hover:scale-105 transition duration-300"
                            />
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{product.title}</h3>
                        <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewed;
