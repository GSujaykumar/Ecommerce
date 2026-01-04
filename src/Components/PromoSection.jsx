import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const PromoSection = () => {
    return (
        <section className="py-16 bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                            alt="Promo"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="relative py-24 px-8 md:px-16 max-w-2xl">
                        <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm">Limited Time Offer</span>
                        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-white leading-tight">
                            Get 50% Off On All <br /> Spring Collections
                        </h2>
                        <p className="mt-6 text-lg text-gray-300">
                            Upgrade your wardrobe with our latest premium arrivals. Shop the newest trends in fashion with an exclusive discount for early birds.
                        </p>
                        <div className="mt-10 flex gap-4">
                            <Link to="/women" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-black bg-white hover:bg-gray-100 transition">
                                Shop Women
                            </Link>
                            <Link to="/men" className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-xl text-white hover:bg-white/10 transition">
                                Shop Men <FiArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoSection;
