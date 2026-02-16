import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../api';

// Fallback images for known categories or random ones
const categoryImages = {
    men: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800",
    women: "https://images.pexels.com/photos/5705475/pexels-photo-5705475.jpeg?auto=compress&cs=tinysrgb&w=800",
    kids: "https://images.pexels.com/photos/1619697/pexels-photo-1619697.jpeg?auto=compress&cs=tinysrgb&w=800",
    home: "https://images.pexels.com/photos/1125130/pexels-photo-1125130.jpeg?auto=compress&cs=tinysrgb&w=800",
    electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800"
};

const defaultImage = "https://images.pexels.com/photos/396547/pexels-photo-396547.jpeg?auto=compress&cs=tinysrgb&w=800";

function Categoriesection() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const cats = await getAllCategories();
                // If API returns strings, map them. If empty, fall back to hardcoded for demo if needed, but per request we rely on API.
                // Assuming API returns List<String> e.g. ["men", "women"]
                if (cats && cats.length > 0) {
                    const mapped = cats.map(cat => ({
                        id: cat.toLowerCase(),
                        label: cat.charAt(0).toUpperCase() + cat.slice(1),
                        desc: "Explore " + cat,
                        image: categoryImages[cat.toLowerCase()] || defaultImage,
                        path: "/category/" + cat.toLowerCase()
                    }));
                    setCategories(mapped);
                } else {
                    // Fallback if no categories found (or API down during init)
                    setCategories([]);
                }
            } catch (e) {
                console.error("Failed to load categories", e);
            } finally {
                setLoading(false);
            }
        };
        fetchCats();
    }, []);

    if (loading) return <div className="py-24 text-center">Loading Categories...</div>;
    if (categories.length === 0) return null; // Don't show section if no categories

    return (
        <section className="bg-white dark:bg-gray-900 py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Shop by Category
                    </h2>
                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        Explore collections crafted for every style
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {categories.map((cat, index) => (
                        <Link to={cat.path} key={cat.id}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer h-96"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.label}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-left">
                                    <h3 className="text-white text-2xl font-bold">{cat.label}</h3>
                                    <p className="text-gray-300 text-sm mt-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0">
                                        {cat.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categoriesection;
