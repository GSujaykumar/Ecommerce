import React, { useContext, useState, useEffect } from 'react';
import { useQuickView } from '../Context/QuickViewContext';
import { ShopContext } from '../Context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiShoppingCart, FiStar, FiEye, FiZap, FiActivity } from 'react-icons/fi';
import { formatPrice } from '../utils';

const QuickViewModal = () => {
    const { selectedProduct, closeQuickView } = useQuickView();
    const { addToCart } = useContext(ShopContext);
    const [socialProof, setSocialProof] = useState(null);

    useEffect(() => {
        if (!selectedProduct?.id) return;
        let isMounted = true;

        const fetchSocialProof = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/products/${selectedProduct.id}/social-proof`);
                if (res.ok && isMounted) setSocialProof(await res.json());
            } catch (err) { }
        };

        fetchSocialProof();
        const interval = setInterval(fetchSocialProof, 5000); // Poll every 5s for hyper-activity feel

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [selectedProduct?.id]);

    if (!selectedProduct) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeQuickView}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                ></motion.div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-4xl bg-white dark:bg-[#121212] rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto"
                >
                    <button
                        onClick={closeQuickView}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition backdrop-blur-md"
                    >
                        <FiX size={20} className="dark:text-white" />
                    </button>

                    {/* Image Side */}
                    <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-12 relative overflow-hidden group">
                        <motion.div
                            className="absolute -inset-10 bg-gradient-to-tr from-indigo-500/20 to-purple-500/0 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700"
                        ></motion.div>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal relative z-10"
                        />
                    </div>

                    {/* Details Side */}
                    <div className="p-10 flex flex-col justify-center">
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-indigo-600 font-bold text-xs uppercase tracking-wide bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full">
                                {selectedProduct.category}
                            </span>

                            {/* LIVE WIDGET */}
                            {socialProof && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full border border-red-100 dark:border-red-900/50"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                    <FiEye size={12} /> {socialProof.activeViewers} viewing right now
                                </motion.div>
                            )}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            {selectedProduct.title}
                        </h2>

                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-yellow-400">
                                {[...Array(4)].map((_, i) => <FiStar key={i} className="fill-current" />)}
                                <FiStar className="text-gray-300 dark:text-gray-600" />
                            </div>
                            <span className="text-sm text-gray-500 font-medium">(128 Reviews)</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                            {selectedProduct.description}
                        </p>

                        {/* HIGH CONVERSION FOMO BADGES */}
                        {socialProof && (
                            <div className="flex flex-col gap-2 mb-6">
                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                    <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 rounded-md">
                                        <FiZap size={14} />
                                    </div>
                                    <span>High Demand: <span className="text-gray-500 dark:text-gray-400 font-normal">Purchased {socialProof.recentPurchaseText}</span></span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                    <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 rounded-md">
                                        <FiActivity size={14} />
                                    </div>
                                    <span>Hurry! <span className="text-orange-600 dark:text-orange-400 font-bold">Only {socialProof.stockLeft} left</span> in stock.</span>
                                </div>
                            </div>
                        )}

                        <div className="mt-auto">
                            <div className="flex items-end gap-4 mb-8">
                                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                                    {formatPrice(selectedProduct.price)}
                                </span>
                                <span className="text-lg text-gray-400 line-through mb-1">
                                    {formatPrice(selectedProduct.price * 1.3)}
                                </span>
                            </div>

                            <button
                                onClick={() => { addToCart(selectedProduct); closeQuickView(); }}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                            >
                                <FiShoppingCart size={20} /> Add to Cart
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickViewModal;
