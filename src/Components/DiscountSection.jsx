
import { fetchProducts } from '../api';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function DiscountSection() {
    const [deals, setDeals] = useState([]);
    const { addToCart } = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getDeals = async () => {
            const products = await fetchProducts();
            // Shuffle and pick 3
            const shuffled = products.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3).map(p => ({
                ...p,
                originalPrice: (p.price * 1.5).toFixed(2),
                discount: "33%"
            }));
            setDeals(selected);
        };
        getDeals();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="bg-white dark:bg-gray-900 py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                            Today's Deals
                        </h2>
                        <div className="h-1 w-20 bg-indigo-600 mt-4 rounded-full"></div>
                    </div>

                    <a href="#" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                        View All Deals &rarr;
                    </a>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                >
                    {deals.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={cardVariants}
                            className="relative group bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >

                            {/* Badge */}
                            <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                {product.discount} OFF
                            </div>

                            <div
                                className="h-64 overflow-hidden relative cursor-pointer"
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain p-8 transform group-hover:scale-110 transition-transform duration-700 bg-white"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors"></div>
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1 capitalize">{product.category}</p>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{product.title}</h3>

                                <div className="flex items-end gap-3 mt-4">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
                                    <span className="text-sm text-gray-500 line-through mb-1">${product.originalPrice}</span>
                                </div>

                                <button
                                    onClick={() => addToCart(product)}
                                    className="w-full mt-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:opacity-90 transition-opacity"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default DiscountSection;
