import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Map API categories to images and readable names
const categoryConfig = {
    "electronics": {
        image: "https://images.unsplash.com/photo-1498049381945-a7a24af541f9?auto=format&fit=crop&q=80&w=800",
        label: "Electronics",
        desc: "Latest Gadgets"
    },
    "jewelery": {
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800",
        label: "Jewelry",
        desc: "Shine Bright"
    },
    "men's clothing": {
        image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800",
        label: "Men's Fashion",
        desc: "Classic Styles"
    },
    "women's clothing": {
        image: "https://images.pexels.com/photos/5705475/pexels-photo-5705475.jpeg?auto=compress&cs=tinysrgb&w=800",
        label: "Women's Fashion",
        desc: "Trending Now"
    }
};

function Categoriesection() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    if (categories.length === 0) return null;

    return (
        <section className="bg-white dark:bg-gray-50 py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Shop by Category
                    </h2>
                    <p className="mt-3 text-gray-500">
                        Explore collections crafted for every style
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {categories.map((cat, index) => {
                        const config = categoryConfig[cat] || {
                            image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800",
                            label: cat,
                            desc: "Explore"
                        };

                        // Determine the path based on your routes
                        let path = "/women"; // Default
                        if (cat === "men's clothing") path = "/men";
                        if (cat === "electronics") path = "/kids"; // Per your routing
                        if (cat === "jewelery") path = "/search?q=jewelery"; // Since you don't have a specific route for jewelery? Or render dynamically.
                        // Actually, looking at main.jsx, you have /men, /women, /kids (electronics). 
                        // Maybe we should link to a generic CategoryPage if easy, but sticking to existing routes:

                        return (
                            <Link to={path} key={cat}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer h-96"
                                >
                                    <img
                                        src={config.image}
                                        alt={config.label}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 text-left">
                                        <h3 className="text-white text-2xl font-bold">{config.label}</h3>
                                        <p className="text-gray-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            {config.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Categoriesection;
