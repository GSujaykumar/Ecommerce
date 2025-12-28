import React from "react";
import { FiShoppingBag, FiStar, FiTruck, FiUsers } from "react-icons/fi";
import { useState, useEffect } from "react";

const About = () => {


    const Counter = ({ end, duration = 2000 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let start = 0;
            const increment = end / (duration / 8);

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }, [end, duration]);

        return <span>{count}</span>;
    };

    return (
        <section className="bg-[var(--color-normalbg)] dark:bg-[var(--color-darkbg)] py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-24 space-y-32">

                {/* ===== HERO / INTRO ===== */}
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight dark:text-[var(--color-dark-text-primary)]">
                            About <span className="text-black dark:text-[var(--color-dark-text-primary)]">LuxeMart</span>
                        </h1>

                        <p className="mt-6 text-lg text-gray-700 dark:text-[var(--color-dark-text-secondary)]">
                            LuxeMart is a modern e-commerce platform built for customers who
                            value quality, authenticity, and refined design. We bring together
                            premium fashion, lifestyle, and home essentials — all in one place.
                        </p>

                        <p className="mt-4 text-lg text-gray-700 dark:text-[var(--color-dark-text-secondary)]">
                            From everyday wear to luxury essentials, our products are carefully
                            selected to meet the highest standards of craftsmanship, comfort,
                            and style.
                        </p>

                        <div className="mt-10">
                            <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-white-900 transition">
                                Explore Our Collection
                            </button>
                        </div>
                    </div>

                    <div>
                        <img
                            src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="Ecommerce lifestyle"
                            className="rounded-3xl shadow-2xl w-full object-cover"
                        />
                    </div>
                </div>

                {/* ===== TRUST STATS ===== */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                    <div>
                        <h3 className="text-4xl font-extrabold text-black dark:text-[var(--color-dark-text-primary)]">
                            <Counter end={50} />K+
                        </h3>
                        <p className="mt-2 text-gray-600">Happy Customers</p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-extrabold text-black dark:text-[var(--color-dark-text-primary)]">
                            <Counter end={5} />K+
                        </h3>
                        <p className="mt-2 text-gray-600">Premium Products</p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-extrabold text-black dark:text-[var(--color-dark-text-primary)]">
                            <Counter end={30} />+
                        </h3>
                        <p className="mt-2 text-gray-600">Countries Served</p>
                    </div>

                    <div>
                        <h3 className="text-4xl font-extrabold text-black dark:text-[var(--color-dark-text-primary)]">
                            24/7
                        </h3>
                        <p className="mt-2 text-gray-600">Customer Support</p>
                    </div>
                </div>


                {/* ===== WHY CHOOSE US ===== */}
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900 text-center">
                        Why Choose LuxeMart
                    </h2>

                    <div className="mt-16 grid md:grid-cols-3 gap-10">
                        <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition">
                            <div className="bg-black text-white p-4 rounded-full w-fit">
                                <FiShoppingBag size={26} />
                            </div>
                            <h4 className="mt-6 text-xl font-semibold text-gray-900">
                                Curated Collections
                            </h4>
                            <p className="mt-3 text-gray-600">
                                Every product is carefully selected to ensure premium quality,
                                durability, and timeless design.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition">
                            <div className="bg-black text-white p-4 rounded-full w-fit">
                                <FiTruck size={26} />
                            </div>
                            <h4 className="mt-6 text-xl font-semibold text-gray-900">
                                Fast & Reliable Delivery
                            </h4>
                            <p className="mt-3 text-gray-600">
                                We partner with trusted logistics providers to deliver your
                                orders safely and on time.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition">
                            <div className="bg-black text-white p-4 rounded-full w-fit">
                                <FiStar size={26} />
                            </div>
                            <h4 className="mt-6 text-xl font-semibold text-gray-900">
                                Premium Experience
                            </h4>
                            <p className="mt-3 text-gray-600">
                                From browsing to checkout, we focus on a smooth, secure, and
                                enjoyable shopping experience.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ===== BRAND STORY ===== */}
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <img
                        src="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt="Brand story"
                        className="rounded-3xl shadow-xl w-full object-cover"
                    />

                    <div>
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            Built for Modern Shoppers
                        </h2>
                        <p className="mt-6 text-lg text-gray-700">
                            LuxeMart was created to bridge the gap between luxury brands and
                            everyday shopping. We believe premium products should be accessible,
                            transparent, and trustworthy.
                        </p>
                        <p className="mt-4 text-lg text-gray-700">
                            Our platform is continuously evolving to bring you better design,
                            faster performance, and a seamless checkout experience.
                        </p>
                    </div>
                </div>

                {/* ===== FINAL CTA ===== */}
                <div className="text-center">
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        Start Your Premium Shopping Journey
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover premium products trusted by thousands of customers worldwide.
                    </p>
                    <button className="mt-8 bg-black text-white px-10 py-4 rounded-xl font-semibold hover:bg-gray-900 transition">
                        Shop with LuxeMart
                    </button>
                </div>

            </div>
        </section>
    );
};

export default About;
